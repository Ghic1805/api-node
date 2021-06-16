const db = require('../db');

module.exports = {
    getAll: () => {
        return new Promise((resolve, reject)=>{

            db.query('SELECT * FROM items', (error, results)=>{
                if(error) { reject(error); return; }
                resolve(results);
            });

        });
    },
    findById: (id) => {
        return new Promise((resolve, reject)=>{

            db.query('SELECT * FROM items WHERE id = ?', [id], (error, results) => {
                if(error) { reject(error); return; }
                if(results.length > 0) {
                    resolve(results[0]);
                } else {
                    resolve(false);
                }
            });

        });
    },
    add: ({id_proposta, id_products, quantidade, valor_unitario, desconto}) => {
        return new Promise((resolve, reject)=>{

            db.query('INSERT INTO items (id_proposta, id_products, quantidade, valor_unitario, desconto) VALUES (?, ?, ?, ?, ?)',
                [id_proposta, id_products, quantidade, valor_unitario, desconto],
                (error, results) => {
                    if(error) { reject(error); return; }
                    resolve(results.insertId);
                }
            )

        });
    },
    update: (id, id_proposta, id_products, quantidade, valor_unitario, desconto) => {        

        return new Promise((resolve, reject)=>{
            db.query('UPDATE items SET id_proposta = ?, id_products = ?, quantidade = ?, valor_unitario = ?, desconto = ? WHERE id = ?',
                [id_proposta, id_products, quantidade, valor_unitario, desconto, id],
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

            db.query('DELETE FROM items WHERE id = ?', [id], (error, results) => {
                if(error) { reject(error); return; }
                resolve(results);
            });
        });
    }
};