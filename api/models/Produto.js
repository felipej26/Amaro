/**
 * Produto.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    nome: {
      type: 'string',
      size: 250,
      required: true
    },
    
    categoria: {
      type: 'integer',
      required: true
    },

    imagem: {
      type: 'string',
      size: 500,
      required: true
    },

    filhos: {
			collection: 'ProdutoFilho',
			via: 'produtoPai',
			required: false
		}
  },

  mapping: {
    "_all": {
        "enabled": false
    },
    nome: {
        type: 'string',
        analyzer: 'whitespace',
        fields: {
            raw: {
                type: 'string',
                index: 'not_analyzed'
            }
        }
    },
    imagem: {
        type: 'string',
        analyzer: 'whitespace'
    }
  }
};

