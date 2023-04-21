const Product = require('../models/product');
const shopify = require('../shopify');

exports.createProduct = async (req, res) => {
  //const files = req.files;
  const attachments = [];
  const files = req.files;

  for (let i = 0; i < files.length; i++) {
    attachments.push({
      attachment: files[i].buffer.toString('base64'),
      name: files[i].originalname,
      mime_type: files[i].mimetype,
    });
  }
  // Create a new product object
  const reqProduct = {
    title: req.body.title,
    body_html: req.body.description,
    tags: req.body.tags,
    vendor: req.body.vendor,
    variants: [
      {
        sku: req.body.sku,
        price: req.body.price,
        option1: 'Default Title',
        option2: null,
        option3: null,
        requires_shipping: true,
      },
    ],
    images: attachments,
  };
  const product = new Product(reqProduct);
  try {
    const shopifyProduct = await shopify.product.create(product);
    if (shopifyProduct)
      res.status(200).json({
        product: {
          id: shopifyProduct.id,
          title: shopifyProduct.title,
        },
      });
  } catch (error) {
    res.status(500).json({
      errors: [
        {
          message: error.message,
        },
      ],
    });
  }
};
