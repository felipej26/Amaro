/**
 * ProdutoController
 *
 * @description :: Server-side logic for managing Produtoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	show: function(req, res) {

        console.log('Chegou Aqui 1');

        Produto.find()
        .populate('filhos')
        .exec(function(err, produtos) {
            if (err) return res.send(err, 500);
            console.log('Chegou Aqui 2');
            res.view('produto/produtos', { produtos: produtos });
        });
    }
};

