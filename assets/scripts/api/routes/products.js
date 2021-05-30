import express from 'express';
import mongoose from 'mongoose';
import Product from '../models/product.js';

const router = express.Router();

// The URL passed as a parameter is just '/' because
// app has already parsed the left of the path:

router.get('/', (req, res, next) => {
// router.get('/', (res) => {
  res.status(200).json({
    message: 'Handling GET requests to /products'
  });
});

router.post('/', (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  // Save the new product in the DB:
  product.save().then(result => {
    console.log(result);
  }).catch(err => console.log(err));

  res.status(201).json({
    message: 'Handling POST requests to /products',
    createdProduct: product
  });
});

router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;
  if (id === 'special') {
    res.status(200).json({
      message: 'You discovered the special ID',
      ID: id
    });
  } else {
    res.status(200).json({
      message: 'You passed an ID'
    });
  }
});

// No need for a return statement in the method because
// you are not running any code in the same method after
// the response.

router.patch('/:productId', (req, res, next) => {
  res.status(200).json({
    message: 'Updated product!',
    ID: id
  });
});

router.delete('/:productId', (req, res, next) => {
  res.status(200).json({
    message: 'Deleted product!'
  });
});

export default router;
