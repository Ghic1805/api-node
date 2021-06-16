const express = require('express');
const router = express.Router();

const ProductController = require('./controllers/ProductController');
const ClientController = require('./controllers/ClientController');

router.get('/ping', ProductController.ping);

//GET /api/products -> pega todas as notas (id, titulo)
router.get('/products', ProductController.all);
router.get('/clients', ClientController.all);

//GET /api/product/123 -> pega informações de UMA nota
router.get('/product/:id', ProductController.one);
router.get('/client/:id', ClientController.one);

//POST /api/product -> adicionar uma nova nota
router.post('/product', ProductController.new);
router.post('/client', ClientController.new);

//PUT /api/product/123 -> alterar uma nota
router.put('/product/:id', ProductController.edit);
router.put('/client/:id', ClientController.edit);

//DELETE /api/product/123 -> delete
router.delete('/product/:id', ProductController.delete);
router.delete('/client/:id', ClientController.delete);

module.exports = router;