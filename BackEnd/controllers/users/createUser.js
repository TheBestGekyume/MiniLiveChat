const bcrypt = require('bcrypt');
const pool = require('../../configuration/database');
const saltRounds = 10;

module.exports = async (req, res) => {
    const { username, password, email, role } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ error: 'Preencha username, password e email' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        let sql;
        let values;

        if (role) {
            sql = 'INSERT INTO users (username, password, email, role) VALUES ($1, $2, $3, $4) RETURNING id';
            values = [username, hashedPassword, email, role];
        } else {
            sql = 'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING id';
            values = [username, hashedPassword, email];
        }

        const result = await pool.query(sql, values);
        res.status(201).json({ message: 'Usuário criado!', userId: result.rows[0].id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
