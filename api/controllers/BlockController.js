/**
 * BlockController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  dropClaim: async function (req, res){
    const {id} = req.params;
    const response = await Block.update({id}, {claimedByUser: null});
    res.send(response);
  },

};

