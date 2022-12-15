var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var novedadesModel = require('../models/novedadesModel')

/* GET home page. */
router.get('/', async function(req, res, next) {
  
  var novedades = await novedadesModel.getNovedades();

  res.render('index', {
    novedades 

  });

});

router.post('/', async (req, res, next) =>{

  console.log(req.body)

  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var email = req.body.email;
  var tel = req.body.tel;
  var mensaje = req.body.mensaje;

  var obj = {
    to: 'matidepa22@hotmail.com',
    subject: 'contacto desde la web',
    html: nombre + " " + apellido +" se contaacto a trabes y quiere mas info a este mail" + email + ". <br> Su tel es " + tel
  }

  var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    }
  })
  var info = await transporter.sendMail(obj);

  res.render('index', {
    message: 'mensaje enviado correctamente',
  });
})

module.exports = router;
