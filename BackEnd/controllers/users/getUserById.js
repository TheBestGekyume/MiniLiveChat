const pool = require('../../configuration/database');

module.exports = async (req, res) => {
    const { id } = req.params;

    try {
        const results = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        if (results.rows.length === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
        res.json(results.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
