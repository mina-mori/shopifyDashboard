class Product {
  constructor({
    title,
    body_html,
    tags,
    vendor,
    variants,
    images
  }) {
    this.title = title;
    this.body_html = body_html;
    this.tags = tags;
    this.vendor = vendor;
    this.variants = variants;
    this.images = images;
  }
}

module.exports = Product;
