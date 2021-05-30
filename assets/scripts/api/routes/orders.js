import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Orders were fetched'
  });
});

router.post('/', (req, res, next) => {
  const _order = {
    productId: req.body.productId,
    quantity: req.body.quantity
  };
  res.status(201).json({
    message: 'Order was created',
    order: _order
  });
});

router.get('/:orderId', (req, res, next) => {
  res.status(200).json({
    message: 'Order details',
    ID: req.params.orderId
    // ID: orderId
  });
});

router.delete('/:orderId', (req, res, next) => {
  // Status 200 send the message but 204 will not.
  res.status(200).json({
    message: 'Order deleted'
  });
});


export default router;
