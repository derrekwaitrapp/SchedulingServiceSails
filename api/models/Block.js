/**
 * Block.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */


module.exports = {

  attributes: {

    title: {
      type: 'string'
    },
    start: {
      type: 'ref',
      columnType: 'timestamp'
    },
    end: {
      type: 'ref',
      columnType: 'timestamp'
    },
    publishedAt: {
      type: 'ref',
      columnType: 'timestamp'
    },
    claimedByUsers: {
      collection: 'user',
      via: 'blocks'
    },
    subMarket: {
      model: 'submarket'
    }
  },

};

