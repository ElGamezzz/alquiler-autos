    // En tu archivo de servidor Node.js (app.js o similar)

import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';
import mysql from 'mysql';

    const app = express();

    // Configura la conexión a la base de datos
    const connection = mysql.createConnection({
        host: 'localhost',
        database: 'carsharing_db',
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
                return res.status(200).json({ token , userId: user.id });
            } else {
                return res.status(401).json({ error: 'Credenciales incorrectas' });
            }
        });
    });
    app.post('/ubicacion', (req, res) => {
        const { idVehiculos } = req.body;
    
        if (!idVehiculos) {
            return res.status(400).json({ error: 'se requiere id' });
        }
    
        // Buscar el vehículo en la base de datos
        connection.query('SELECT * FROM ubicacion_v WHERE idVehiculos = ?', [idVehiculos], (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error al buscar vehiculo' });
            }
            if (results.length === 0) {
                return res.status(404).json({ error: 'Vehículo no encontrado' });
            }
            const ub_data = results[0];
            res.json({
                idUbicacion: ub_data.idUbicacion_V,
                latitud: ub_data.Ubicacion_V_LAT,
                longitud: ub_data.Ubicacion_V_LON,
                estado: ub_data.Disponibilidad
            });
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

    app.get('/vehiculos', (req, res) => {
        const { Caracteristicas } = req.query;
    
        connection.query('SELECT * FROM vehiculos ', [Caracteristicas], (error, results) => {
            if (error) {
                console.error('Error en la base de datos:', error);
                return res.status(500).send('Error al procesar la solicitud');
            }
    
            if (results.length > 0) {
                const datos_vehiculo = results;
                
                res.json(datos_vehiculo);
            } else {
                res.status(404).send('No se encontraron vehículos con las características especificadas');
            }
        });
    });

    app.post('/setalquiler', async (req, res) => {
        const { date_alquiler, date_alquiler_final, id_vehiculo_alquilado, id_user_alquilador } = req.body;
        try {
          const [result] = await connection.query('INSERT INTO alquiler_v (date_alquiler, date_alquiler_final, id_vehiculo_alquilado, id_user_alquilador) VALUES (?, ?, ?, ?)', 
          [date_alquiler, date_alquiler_final, id_vehiculo_alquilado, id_user_alquilador]);
          res.json({ idAlquiler_V: result.insertId });
        } catch (err) {
          res.status(400).json({ error: err.message });
        }
      });

    // Otros middleware y rutas...

    const PORT = 4000;
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
