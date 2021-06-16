const express = require('express');
const router = express.Router();

const ProductController = require('./controllers/ProductController');
const ClientController = require('./controllers/ClientController');
const PropostaController = require('./controllers/PropostaController');
const ItemController = require('./controllers/ItemController');

router.get('/ping', ProductController.ping);

//GET /api/products -> pega todas
router.get('/products', ProductController.all);
router.get('/clients', ClientController.all);
router.get('/propostas', PropostaController.all);
router.get('/items', ItemController.all);

//GET /api/product/123 -> pega informações de UMA
router.get('/product/:id', ProductController.one);
router.get('/client/:id', ClientController.one);
router.get('/proposta/:id', PropostaController.one);
router.get('/item/:id', ItemController.one);

//POST /api/product -> adicionar uma nova
router.post('/product', ProductController.new);
router.post('/client', ClientController.new);
router.post('/proposta', PropostaController.new);
router.post('/item', ItemController.new);

//PUT /api/product/123 -> alterar uma
router.put('/product/:id', ProductController.edit);
router.put('/client/:id', ClientController.edit);
router.put('/proposta/:id', PropostaController.edit);
router.put('/item/:id', ItemController.edit);

//DELETE /api/product/123 -> delete
router.delete('/product/:id', ProductController.delete);
router.delete('/client/:id', ClientController.delete);
router.delete('/proposta/:id', PropostaController.delete);
router.delete('/item/:id', ItemController.delete);

module.exports = router;