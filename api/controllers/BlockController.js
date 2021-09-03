/**
 * BlockController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  dropClaim: async function (req, res){
    const {id, userId} = req.params;
    sails.log.info(`Block Controller::dropClaim(blockId: ${id}, userId: ${userId})`);
    const response = await Block.removeFromCollection(id, `claimedByUsers`).members([userId]);
    res.send(response);
  },
  claim: async function (req, res){
    const {id, userId} = req.params;
    sails.log.info(`Block Controller::claim(blockId: ${id}, userId: ${userId})`);
    const maxClaims = 5;
    const block = await Block
      .findOne({id})
      .populate(`claimedByUsers`);
    if (block.claimedByUsers.length < maxClaims) {
      const response = await Block.addToCollection(id, 'claimedByUsers').members([userId]);
      // sails.log.info(response);
      res.send(response);
    }else{
      res.badRequest(`Cannot create claim. Max amount of claims created for this block.`);
    }
  }
};

