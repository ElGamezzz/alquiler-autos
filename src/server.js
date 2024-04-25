    // En tu archivo de servidor Node.js (app.js o similar)

    import cors from 'cors';
    import express from 'express';
    import mysql from 'mysql';
    import jwt from 'jsonwebtoken';

    const app = express();

    // Configura la conexión a la base de datos
    const connection = mysql.createConnection({
        host: 'localhost',
        database: 'prueba',
        user: 'mysql_user',
        password: 'mysql123@',
        port: 3306
    });

    app.use(express.json()); // Para poder manejar datos JSON en las peticiones
    app.use(cors());

    // Ruta para verificar la autenticación
    // app.get('/checkAuth', (req, res) => {
    //     const token = req.headers.authorization;

    //     if (!token) {
    //         return res.status(401).json({ authenticated: false, user: null });
    //     }

        
    //     return res.status(200).json({ authenticated: true, user });
    // }); 
    

    //Ruta para el login
    app.post('/login', (req, res) => {
        const { email, password } = req.body;
    
        if (!email || !password) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }
    
        // Buscar el usuario en la base de datos
        connection.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error al buscar usuario' });
            }
    
            if (results.length === 0) {
                return res.status(401).json({ error: 'Credenciales incorrectas' });
            }
    
            const user = results[0];
            // Comparar la contraseña
            if (password === user.password) {
                // Generar token de sesión (ejemplo usando JWT)
                const token = jwt.sign({ userId: user.id }, 'secret_key', { expiresIn: '1h' });
                return res.status(200).json({ token });
            } else {
                return res.status(401).json({ error: 'Credenciales incorrectas' });
            }
        });
    });

    // Ruta para el registro de usuarios
    app.post('/signup', (req, res) => {
        const { name, email, password, ubicacion, cedula } = req.body;

        if (!name || !email || !password || !ubicacion || !cedula ) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }

        const newUser = { name, email, password, ubicacion, cedula };

        connection.query('INSERT INTO users SET ?', newUser, (error) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error al registrar usuario' });
            }
            return res.status(200).json({ message: 'Usuario registrado correctamente' });
        });
    });

    // Otros middleware y rutas...

    const PORT = 4000;
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
