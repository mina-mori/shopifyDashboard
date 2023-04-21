const express = require('express');
const app = express();
const multer = require('multer');
const productsRoutes = require('./routes/products');

const cors = require('cors');
app.use(
  cors({
    origin: '*',
  })
);

// app.use('/api/products', productsRoutes);

const upload = multer();
app.use('/api/products', upload.array('images'), productsRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
module.exports = app;
