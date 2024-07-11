const { request, response } = require('express');
const nodemailer = require('nodemailer');

const enviarCorreo = (req = request, res = response) => {
    let body = req.body;

    // Configura el transportador de Nodemailer
    let config = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'teoriasnanase@gmail.com', // Cambia a tu email
            pass: 'vitx disj eszf tugh' // Cambia a tu contraseña
        }
    });

    const opciones = {
        from: `${body.name} <${body.email}>`,
        to: 'danielg200345@gmail.com', // Cambia al correo donde quieres recibir los mensajes
        subject: body.subject, // Asegúrate de usar `subject` ya que así lo llamas en tu frontend
        replyTo: body.email, // Para que las respuestas vayan al correo del remitente
        html: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f9;
        }
        .container {
            background-color: #fff;
            border-radius: 8px;
            border: 1px solid #ddd; /* Añadido borde */
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            padding: 20px;
            max-width: 600px;
            margin: 20px auto;
        }
        .header {
            background-color: #000; /* Color negro para la cabecera */
            color: #fff;
            padding: 10px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .section {
            margin: 20px 0;
        }
        .section h4 {
            color: #333;
            font-size: 20px;
            margin-bottom: 10px;
        }
        .section p, .section ul {
            color: #555;
            margin: 10px 0;
            line-height: 1.6;
        }
        .section ul {
            padding-left: 20px;
        }
        .section ul li {
            margin-bottom: 5px;
        }
        .label {
            font-weight: bold;
            color: #333;
        }
        .value {
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Contacto</h1>
        </div>
        <div class="section">
            <h4>Información de Contacto</h4>
            <p class="label">Nombre:</p>
            <p class="value">${body.name}</p>
            <p class="label">Email:</p>
            <p class="value">${body.email}</p>
            <p class="label">Mensaje:</p>
            <p class="value">${body.message}</p>
        </div>
    </div>
</body>
</html>`
    };

    config.sendMail(opciones, function (error, result) {
        if (error) return res.json({ ok: false, msg: error });

        return res.json({
            ok: true,
            msg: result
        });
    });
};

module.exports = {
    enviarCorreo
};
