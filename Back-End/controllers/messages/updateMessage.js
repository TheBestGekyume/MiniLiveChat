const db = require('../../database');

module.exports = (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    if (!content) return res.status(400).json({ error: 'Informe o novo conteúdo.' });

    db.query('UPDATE messages SET content = ? WHERE id = ?', [content, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Mensagem atualizada!' });
    });
};
