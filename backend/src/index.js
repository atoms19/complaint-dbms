const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const { getDbConnection } = require('./db/database');
const { initDb } = require('./db/init');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Wait for DB initialization before starting the server
initDb().then(() => {
    console.log('Database initialized, starting server...');

    // --- PUBLIC ENDPOINTS ---

    // Submit a complaint
    app.post('/api/complaints', async (req, res) => {
        try {
            const { title, category, department, description, urgency, isAnonymous } = req.body;

            if (!title || !category || !description || !urgency) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const id = 'CMP' + uuidv4().slice(0, 8).toUpperCase();
            const status = 'Submitted';
            const isAnonInt = isAnonymous ? 1 : 0;

            const db = await getDbConnection();
            await db.run(
                `INSERT INTO complaints (id, title, category, department, description, urgency, status, is_anonymous)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [id, title, category, department, description, urgency, status, isAnonInt]
            );

            res.status(201).json({ success: true, id, message: 'Complaint submitted successfully' });
        } catch (error) {
            console.error('Error submitting complaint:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    // Track a specific complaint
    app.get('/api/complaints/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const db = await getDbConnection();
            const complaint = await db.get('SELECT * FROM complaints WHERE id = ?', [id]);

            if (!complaint) {
                return res.status(404).json({ error: 'Complaint not found' });
            }

            // Convert is_anonymous integer back to boolean for front end mapping if needed
            complaint.is_anonymous = !!complaint.is_anonymous;

            res.json(complaint);
        } catch (error) {
            console.error('Error fetching complaint:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    // --- ADMIN ENDPOINTS ---

    // Admin Login
    app.post('/api/admin/login', async (req, res) => {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({ error: 'Missing username or password' });
            }

            const db = await getDbConnection();
            const admin = await db.get('SELECT * FROM admins WHERE username = ?', [username]);

            // Simple plain text check for now
            if (admin && admin.password_hash === password) {
                // Dummy token approach (replace with JWT block for production if needed)
                const token = Buffer.from(username + ':' + Date.now()).toString('base64');
                res.json({ success: true, token });
            } else {
                res.status(401).json({ error: 'Invalid credentials' });
            }
        } catch (error) {
            console.error('Error logging in:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    // Simple auth middleware
    const requireAdmin = (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            next();
        } else {
            res.status(403).json({ error: 'Unauthorized' });
        }
    };

    // Get all complaints for Admin Dashboard
    app.get('/api/admin/complaints', requireAdmin, async (req, res) => {
        try {
            const db = await getDbConnection();
            const complaints = await db.all('SELECT * FROM complaints ORDER BY date_submitted DESC');

            const viewFormat = complaints.map(c => ({
                ...c,
                is_anonymous: !!c.is_anonymous
            }));

            res.json(viewFormat);
        } catch (error) {
            console.error('Error fetching all complaints:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    // Update a complaint
    app.patch('/api/admin/complaints/:id', requireAdmin, async (req, res) => {
        try {
            const { id } = req.params;
            const { status, admin_response, assigned_to } = req.body;

            const db = await getDbConnection();

            const existing = await db.get('SELECT * FROM complaints WHERE id = ?', [id]);
            if (!existing) {
                return res.status(404).json({ error: 'Complaint not found' });
            }

            const newStatus = status || existing.status;
            const newResponse = admin_response !== undefined ? admin_response : existing.admin_response;
            const newAssigned = assigned_to !== undefined ? assigned_to : existing.assigned_to;

            await db.run(
                `UPDATE complaints 
         SET status = ?, admin_response = ?, assigned_to = ?
         WHERE id = ?`,
                [newStatus, newResponse, newAssigned, id]
            );

            res.json({ success: true, message: 'Complaint updated successfully' });
        } catch (error) {
            console.error('Error updating complaint:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    // Get Analytics
    app.get('/api/admin/analytics', requireAdmin, async (req, res) => {
        try {
            const db = await getDbConnection();

            const statusCounts = await db.all('SELECT status, COUNT(*) as count FROM complaints GROUP BY status');
            const priorityCounts = await db.all('SELECT urgency, COUNT(*) as count FROM complaints GROUP BY urgency');
            const categoryCounts = await db.all('SELECT category, COUNT(*) as count FROM complaints GROUP BY category');

            res.json({
                status: statusCounts,
                urgency: priorityCounts,
                category: categoryCounts
            });
        } catch (error) {
            console.error('Error fetching analytics:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

}).catch(err => {
    console.error('Failed to initialize database. Server not started.', err);
});
