const bcrypt = require('bcrypt');
const db = require('../../configuration/database');
const saltRounds = 10;

module.exports = (req, res) => {
    const { id } = req.params;
    const { username, password, email, role } = req.body;

    let passwordToSave = password;

    if (password) {
        bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
            if (err) return res.status(500).json({ error: 'Erro ao gerar hash da senha' });
            passwordToSave = hashedPassword;
            updateUserInDatabase();
        });
    } else {
        updateUserInDatabase();
    }

    function updateUserInDatabase() {
        let sql, values;

        if (role !== undefined) {
            sql = 'UPDATE users SET username = ?, password = ?, email = ?, role = ? WHERE id = ?';
            values = [username, passwordToSave, email, role, id];
        } else {
            sql = 'UPDATE users SET username = ?, password = ?, email = ? WHERE id = ?';
            values = [username, passwordToSave, email, id];
        }

        db.query(sql, values, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
            res.json({ message: 'Usuário atualizado!' });
        });
    }
};
