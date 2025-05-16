const bcrypt = require('bcrypt');
const pool = require('../../configuration/database');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const saltRounds = Number(process.env.SALT_ROUNDS);

module.exports = async (req, res) => {
    const { id } = req.params;
    const { username, password, email, role } = req.body;

    try {
        const results = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        if (results.rows.length === 0) return res.status(404).json({ error: 'Usuário não encontrado' });

        const currentUser = results.rows[0];
        const updatedUsername = username || currentUser.username;
        const updatedEmail = email || currentUser.email;
        const updatedRole = role !== undefined ? role : currentUser.role;

        let updatedPassword = currentUser.password;

        if (password) {
            updatedPassword = await bcrypt.hash(password, saltRounds);
        }

        const sql = 'UPDATE users SET username = $1, password = $2, email = $3, role = $4 WHERE id = $5';
        const values = [updatedUsername, updatedPassword, updatedEmail, updatedRole, id];

        await pool.query(sql, values);

        const userResult = await pool.query('SELECT id, username, email FROM users WHERE id = $1', [id]);
        const user = userResult.rows[0];

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

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
