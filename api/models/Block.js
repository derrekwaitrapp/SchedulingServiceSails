/**
 * Block.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */


module.exports = {

  attributes: {
    title: {
      type: "string"
    },
    start: {
      type: 'string',
      columnType: 'datetime'
    },
    end: {
      type: 'string',
      columnType: 'datetime'
    },
    claimedByUser: {
      model: "user"
    },
    subMarket: {
      model: "submarket"
    }
  },

};

