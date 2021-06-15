/**
 * SubmarketController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  findOne: async function (req, res){
    const {id} = req.params;
    Submarket
      .findOne(id)
      .populateAll()
      .then(function (submarket){
        let blocks = Block.find({ "subMarket": submarket.id })
          .populate('claimedByUser')
          .populate('company')
          .then(function (blocks){
            return blocks;
          });
        return [submarket, blocks];
      })
      .spread(function (submarket, blocks){
        submarket.blocks = blocks; // It will work now
        res.json(submarket);
      }).catch(function (err){
        return res.serverError(err);
      });
  },

  // No longer needed - I am now using the above to solve my data needs
  getSubMarketBlocks: async function (req, res){
    const {id} = req.params;
    const Blocks = await Block
      .find({"subMarket":id})
      .populate(['claimedByUser', 'company', 'subMarket'])
    const response = Blocks;
    res.send(response);
  }
};

