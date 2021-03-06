const db = require('../db');

module.exports = {
    getAll: () => {
        return new Promise((resolve, reject)=>{

            db.query('SELECT propostas.id as proposta_id, propostas.codigo as codigo, propostas.assunto as assunto, propostas.data as data, propostas.data_validade as data_validade, clients.id as client_id, clients.nome as nome FROM propostas inner join clients on propostas.id_client = clients.id', (error, results)=>{
                if(error) { reject(error); return; }
                resolve(results);
            });

        });
    },
    findById: (id) => {
        return new Promise((resolve, reject)=>{

            db.query('SELECT * FROM propostas WHERE id = ?', [id], (error, results) => {
                if(error) { reject(error); return; }
                if(results.length > 0) {
                    resolve(results[0]);
                } else {
                    resolve(false);
                }
            });

        });
    },
    add: ({codigo, assunto, data, data_validade, id_client}) => {
        return new Promise((resolve, reject)=>{

            db.query('INSERT INTO propostas (codigo, assunto, data, data_validade, id_client) VALUES (?, ?, ?, ?, ?)',
                [codigo, assunto, data, data_validade, id_client],
                (error, results) => {
                    if(error) { reject(error); return; }
                    resolve(results.insertId);
                }
            )

        });
    },
    update: (id, codigo, assunto, data, data_validade, id_client) => {        

        return new Promise((resolve, reject)=>{
            db.query('UPDATE propostas SET codigo = ?, assunto = ?, data = ?, data_validade = ?, id_client = ? WHERE id = ?',
                [codigo, assunto, data, data_validade, id_client, id],
                (error, results) => {
                    // console.log(error);
                    // console.log(results);
                    if(error) { reject(error); return; }
                    resolve(results);
                }
            )
        });
    },
    delete: (id) => {
        return new Promise((resolve, reject)=>{

            db.query('DELETE FROM propostas WHERE id = ?', [id], (error, results) => {
                if(error) { reject(error); return; }
                resolve(results);
            });
        });
    }
};