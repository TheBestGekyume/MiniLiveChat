const pool = require('../../configuration/database');

module.exports = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM users WHERE id = $1', [id]);
        if (result.rowCount === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
        res.json({ message: 'Usuário deletado!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
