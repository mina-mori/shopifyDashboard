const Shopify = require('shopify-api-node');

const shopify = new Shopify({
  shopName: 'testbeautyindustrygroup',
  accessToken: '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',
  // apiKey: 'c5dfed97f5dbf4214384ffb8b21ceedf',
  // password: 'e6358497d08b2ef6b10e4a5d08220ad6',
});

module.exports = shopify;
