const { getDbConnection } = require('./database');

async function initDb() {
    const db = await getDbConnection();

    console.log('Initializing database schema...');

    await db.exec(`
    CREATE TABLE IF NOT EXISTS admins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS complaints (
        id VARCHAR(50) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        department VARCHAR(100), 
        description TEXT NOT NULL,
        urgency VARCHAR(20) NOT NULL CHECK (urgency IN ('Low', 'Medium', 'High')),
        status VARCHAR(50) NOT NULL DEFAULT 'Submitted' CHECK (status IN ('Submitted', 'Under Review', 'In Progress', 'Resolved')),
        is_anonymous BOOLEAN DEFAULT 0,
        date_submitted TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        admin_response TEXT,
        assigned_to VARCHAR(100)
    );

    CREATE INDEX IF NOT EXISTS idx_complaints_status ON complaints(status);
    CREATE INDEX IF NOT EXISTS idx_complaints_date ON complaints(date_submitted);
    CREATE INDEX IF NOT EXISTS idx_complaints_urgency ON complaints(urgency);
  `);

    console.log('Schema created or already exists.');

    // Check if default admin exists
    const adminExists = await db.get('SELECT id FROM admins WHERE username = ?', ['admin']);
    if (!adminExists) {
        console.log('Creating default admin user...');
        // In production, you MUST use bcrypt or Argon2 to hash passwords.
        // For this simple example without user management, we'll just store a simple hash or plaintext string.
        // Since we didn't install bcrypt yet, let's just insert 'admin123' as password_hash.
        await db.run(
            'INSERT INTO admins (username, password_hash) VALUES (?, ?)',
            ['admin', 'admin123']
        );
        console.log('Default admin created (username: admin, password: admin123).');
    }

    console.log('Database initialization complete.');
}

if (require.main === module) {
    initDb()
        .then(() => process.exit(0))
        .catch((err) => {
            console.error('Initialization failed:', err);
            process.exit(1);
        });
}

module.exports = { initDb };
