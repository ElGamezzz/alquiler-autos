    // En tu archivo de servidor Node.js (app.js o similar)

    import express from 'express';
    import mysql from 'mysql';
    import cors from 'cors'

    const app = express();

    // Configura la conexión a la base de datos
    const connection = mysql.createConnection({
        host: 'localhost',
        database: 'signup',
        user: 'root',
        password: '',
        port: 3306
    });

    app.use(express.json()); // Para poder manejar datos JSON en las peticiones

    app.use(cors());

    // Ruta para el registro de usuarios
    app.post('/signup', (req, res) => {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }

        const newUser = { name, email, password };

        connection.query('INSERT INTO login SET ?', newUser, (error) => {
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
