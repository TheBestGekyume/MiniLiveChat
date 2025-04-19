const db = require('../../database');

module.exports = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM messages WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Mensagem deletada!' });
    });
};
