const bcrypt = require('bcrypt');
const db = require('../../configuration/database');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const saltRounds = process.env.SALT_ROUNDS;


module.exports = (req, res) => {
    const { id } = req.params;
    const { username, password, email, role } = req.body;

    // Primeiro, buscar os dados atuais do usuário
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: 'Usuário não encontrado' });

        const currentUser = results[0];

        const updatedUsername = username || currentUser.username;
        const updatedEmail = email || currentUser.email;
        const updatedRole = role !== undefined ? role : currentUser.role;

        if (password) {
            bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
                if (err) return res.status(500).json({ error: 'Erro ao gerar hash da senha' });
                executeUpdate(updatedUsername, hashedPassword, updatedEmail, updatedRole);
            });
        } else {
            executeUpdate(updatedUsername, currentUser.password, updatedEmail, updatedRole);
        }
    });

    function executeUpdate(username, password, email, role) {
        const sql = 'UPDATE users SET username = ?, password = ?, email = ?, role = ? WHERE id = ?';
        const values = [username, password, email, role, id];

        db.query(sql, values, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });

            db.query('SELECT id, username, email FROM users WHERE id = ?', [id], (err, rows) => {
                if (err) return res.status(500).json({ error: err.message });

                const user = rows[0];
                const updatedToken = jwt.sign(
                    { id: user.id, name: user.username, email: user.email },
                    secret,
                    { expiresIn: "1h" }
                );

                return res.json({
                    message: 'Usuário atualizado!',
                    token: updatedToken,
                    user: { id: user.id, username: user.username }
                });
            });
        });
    }
};
