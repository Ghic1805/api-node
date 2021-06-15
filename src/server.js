require('dotenv').config(); // carregar o .env dentro da aplicação
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const routes = require('./routes');
const { route } = require('./routes');

const server = express();
server.use(cors()); //requisitar nossa api em qualquer dispositivo
server.use(bodyParser.urlencoded({extended: false})); //vai pegar dados de post, get, parametros e ajustar para podemos usar no codigo
server.use('/api', routes);

//inicializar server
server.listen(process.env.PORT, ()=>{
    console.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
});