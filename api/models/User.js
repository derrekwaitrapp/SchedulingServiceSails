/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string'
    },
    role: {
      type: 'string',
      defaultsTo: 'driver'
    },
    blocks: {
      collection: 'block',
      via: 'claimedByUsers'
    }
  },

};

