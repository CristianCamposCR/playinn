const express = require('express');
require('dotenv').config();
const cors = require('cors');
const {
    personRouter,userRouter,gameRouter,authRouter, historyRouter
} = require('../modules/controller/routes');
const app = express();//instanciamos el server

//configurcion de la aplicacion
//se trae la configuracion del .env o se le da uno
//por defecto
app.set('port', process.env.PORT || 3000);

//middlewares
//permite la comunicacion entre varias aplicaciones
app.use(cors({origins: '*'}));// permite recibir peticiones desde cualquier origen
//limitamos el tamaño de la peticion
app.use(express.json({limit: '50mb'}));//permite peticiones de hasta 50 mb
//Routes
app.get('/', (request, response) => {
    response.send('Bienvenido a la app de playin');
});

//Endpints
app.use(`/api/person`, personRouter);
app.use(`/api/game`, gameRouter);
app.use(`/api/auth`, authRouter);
app.use(`/api/user`, userRouter);
app.use(`/api/history`, historyRouter);






module.exports = {
    app
}




