/**
 * Submarket.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  // primaryKey : 'name',
  attributes: {

    name: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    market: {
      model: 'market'
    },
    blocks: {
      collection: 'block',
      via: 'subMarket'
    }
  },

};

