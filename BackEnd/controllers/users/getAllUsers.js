const pool = require('../../configuration/database');

module.exports = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM users');
        res.json(results.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
