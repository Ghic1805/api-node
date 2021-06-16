const ProductService = require('../services/ProductService');

module.exports = {
    ping: (req, res) => {
        res.json({pong:true});
    },
    all: async (req, res)=>{
        let json = {error: '', result: []}

        let products = await ProductService.getAll();

        for(let i in products) {
            json.result.push({
                id: products[i].id,
                descricao: products[i].descricao,
                descritivo: products[i].descritivo,
                valor_de_venda: products[i].valor_de_venda,
                tipo: products[i].tipo,
                forma_de_comercializacao: products[i].forma_de_comercializacao
            });
        }

        res.json(json);
    },
    one: async (req, res) => {
        let json = {error: '', result: {}}

        let id = req.params.id;
        let product = await ProductService.findById(id);

        if(product) {
            json.result = product;
        }

        res.json(json);
    },
    new: async (req, res) => {
        let json = {error: '', result: {}}

        let body = req.body;

        if(body) {

            // if (!['SaaS', 'Locação', 'Serviço Técnico', 'Produto'].includes(body.descricao)) {
            //     json.error = 'campos invaliso';
            //     res.json(json);
            //     return;
            // }

            let productId = await ProductService.add(body);

            json.result = {
                id: productId,
                ...body
            }

        } else {
            json.error = 'campos não enviados';
        }


        res.json(json);
    },
    edit: async (req, res) => {
        let json = {error: '', result: {}};

        let id = req.params.id;
        let descricao = req.body.descricao;
        let descritivo = req.body.descritivo;
        let valor_de_venda = req.body.valor_de_venda;
        let tipo = req.body.tipo;
        let forma_de_comercializacao = req.body.forma_de_comercializacao;

        if(id && descricao && descritivo && valor_de_venda && tipo && forma_de_comercializacao) {

            const result = await ProductService.update(id, descricao, descritivo, valor_de_venda, tipo, forma_de_comercializacao);
            
            if (result.affectedRows === 0) {
                json.error = 'falhou';
            } else {
                json.result = {
                    id,
                    descricao,
                    descritivo,
                    valor_de_venda,
                    tipo,
                    forma_de_comercializacao
                };

            };


        } else {
            json.error = 'campos não enviados';
        }

        res.json(json);
    },
    delete: async (req, res) => {
        let json = {error: '', result: {}}

        await ProductService.delete(req.params.id);

        res.json(json);
    }
};