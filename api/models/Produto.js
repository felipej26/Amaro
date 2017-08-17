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

    descricao: {
      type: 'string',
      size: 500,
      required: true
    },

    imagem: {
      type: 'string',
      size: 500,
      required: true
    },
    
    categoria: {
      type: 'integer',
      required: true
    },

    subcategoria: {
      type: 'integer',
      required: true
    },

    cor: {
      type: 'string',
      size: 100,
      required: true
    },

    tecido: {
      type: 'string',
      size: 100,
      required: true
    },

    tamanho: {
      type: 'string',
      size: 10,
      required: true
    },

    preco: {
      type: 'float',
      required: true
    }
  }
};

