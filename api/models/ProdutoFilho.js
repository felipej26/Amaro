/**
 * ProdutoFilho.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    produtoPai: {
      model: 'Produto',
      required: true
    },
    
    tamanho: {
      type: 'string',
      size: 100,
      required: true
    },

    cor: {
      type: 'string',
      size: 100,
      required: true
    },

    mascara: {
      type: 'boolean',
      defaultsTo: false
    }
  }
};

