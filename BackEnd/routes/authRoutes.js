const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../configuration/database');
const router = express.Router();

const secret = process.env.JWT_SECRET;

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Usuário não encontrado!' });
        }

        const user = result.rows[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ error: 'Senha incorreta!' });
        }

        const token = jwt.sign(
            { id: user.id, name: user.username, email: user.email },
            secret,
            { expiresIn: '1h' }
        );

        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
            }
        });
    } catch (err) {
        res.status(500).json({ error: 'Erro no servidor' });
    }
});

module.exports = router;
