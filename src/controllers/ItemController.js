const ItemService = require('../services/ItemService');

module.exports = {
    ping: (req, res) => {
        res.json({pong:true});
    },
    all: async (req, res)=>{
        let json = {error: '', result: []}

        let items = await ItemService.getAll();

        for(let i in items) {
            json.result.push({
                id: items[i].id,
                id_proposta: items[i].id_proposta,
                id_products: items[i].id_products,
                quantidade: items[i].quantidade,
                valor_unitario: items[i].valor_unitario,
                desconto: items[i].desconto
            });
        }

        res.json(json);
    },
    one: async (req, res) => {
        let json = {error: '', result: {}}

        let id = req.params.id;
        let item = await ItemService.findById(id);

        if(item) {
            json.result = item;
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

            let itemtId = await ItemService.add(body);

            json.result = {
                id: itemtId,
                ...body
            }

        } else {
            json.error = 'campos não enviados';
        }


        res.json(json);
    },
    edit: async (req, res) => {
        let json = {error: '', result: {}}

        let id = req.params.id;
        let id_proposta = req.body.id_proposta;
        let id_products = req.body.id_products;
        let quantidade = req.body.quantidade;
        let valor_unitario = req.body.valor_unitario;
        let desconto = req.body.desconto;

        if(id && id_proposta && id_products && quantidade && valor_unitario && desconto) {

            const result = await ItemService.update(id, id_proposta, id_products, quantidade, valor_unitario, desconto);
            
            if (result.affectedRows === 0) {
                json.error = 'falhou';
            } else {
                json.result = {
                    id,
                    id_proposta,
                    id_products,
                    quantidade,
                    valor_unitario,
                    desconto
                }

            }


        } else {
            json.error = 'campos não enviados';
        }

        res.json(json);
    },
    delete: async (req, res) => {
        let json = {error: '', result: {}}

        await ItemService.delete(req.params.id);

        res.json(json);
    }
};