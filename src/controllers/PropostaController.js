const PropostaService = require('../services/PropostaService');

module.exports = {
    ping: (req, res) => {
        res.json({pong:true});
    },
    all: async (req, res)=>{
        let json = {error: '', result: []}

        let propostas = await PropostaService.getAll();

        for(let i in propostas) {
            json.result.push({
                id: propostas[i].id,
                codigo: propostas[i].codigo,
                assunto: propostas[i].assunto,
                data: propostas[i].data,
                data_validade: propostas[i].data_validade,
                id_client: propostas[i].id_client
            });
        }

        res.json(json);
    },
    one: async (req, res) => {
        let json = {error: '', result: {}}

        let id = req.params.id;
        let proposta = await PropostaService.findById(id);

        if(proposta) {
            json.result = proposta;
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

            let propostaId = await PropostaService.add(body);

            json.result = {
                id: propostaId,
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
        let codigo = req.body.codigo;
        let assunto = req.body.assunto;
        let data = req.body.data;
        let data_validade = req.body.data_validade;
        let id_client = req.body.id_client;

        if(id && codigo && assunto && data && data_validade && id_client) {

            const result = await PropostaService.update(id, codigo, assunto, data, data_validade, id_client);
            
            if (result.affectedRows === 0) {
                json.error = 'falhou';
            } else {
                json.result = {
                    id,
                    codigo,
                    assunto,
                    data,
                    data_validade,
                    id_client
                }

            }


        } else {
            json.error = 'campos não enviados';
        }

        res.json(json);
    },
    delete: async (req, res) => {
        let json = {error: '', result: {}}

        await PropostaService.delete(req.params.id);

        res.json(json);
    }
};