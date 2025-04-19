const db = require('../../database');

module.exports = (req, res) => {
    const { id } = req.params;
    const { username, password, email } = req.body;
    db.query('UPDATE users SET username = ?, password = ?, email = ? WHERE id = ?', [username, password, email, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
        res.json({ message: 'Usuário atualizado!' });
    });
};
