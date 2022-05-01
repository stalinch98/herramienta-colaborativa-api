const {validationResult} = require('express-validator')
const bcryptjs = require('bcryptjs')
const nodemailer = require('nodemailer');
const Usuario = require('../models/Usuario')
require('dotenv').config({path: '.env'})

exports.recuperarContrasena = async (req, res) => {
    const errs = validationResult(req)
    if (!errs.isEmpty()) {
        res.status(400).json({errores: errs.array()})
    }

    const sendMail = async (infoMail) => {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            secure: true,
            port: 465,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        await transporter.sendMail(infoMail);
        return {message: 'Email sent'};
    }

    const sendCode = async (email, code, subj, text) => {
        let newHashedCode = "";
        const hashedCode = await bcryptjs.hash(`${code}`, 10);
        if (hashedCode.includes('/')) {
            newHashedCode = hashedCode.replace(/\//g, 'slash');
        } else {
            newHashedCode = hashedCode;
        }
        const mail = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: `${subj}`,
            html: `${text}${code}`,
        }
        const rta = await sendMail(mail);
        rta.hashedCode = newHashedCode;
        return rta;
    }

    const {correo, code} = req.body
    try {
        const usuarioEncontrado = await Usuario.findOne({correo})
        if (!usuarioEncontrado) {
            res.status(400).json({msg: 'usuario no existe'})
            return
        }
        const emailData = await sendCode(usuarioEncontrado.correo, code, 'Recuperar contraseña', 'Su codigo de recuperacion es: ');
        res.status(200).json({msg: emailData.message, code: emailData.hashedCode, userId: usuarioEncontrado._id})

    } catch (error) {
        res.status(500).json({msg: 'hubo un error en el servidor'})
    }
}