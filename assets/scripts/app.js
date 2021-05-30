import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import productRoutes from './api/routes/products.js';
import orderRoutes from './api/routes/orders.js';

const app = express();

// mongoose.connect(
//   'mymongo://localhost/mongoose_basics',
//   {
//     // useMongoClient: true
//     useNewUrlParser: true
//   }
// );

mongoose.connect('mongodb://localhost:27017/[mymongo]', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

app.use(morgan('dev'));
// 'false' to parse simple url bodies and not rich text.
app.use(express.urlencoded({ extended: false }));
// To parse the incoming requests with JSON payloads:
app.use(express.json());

// Add a header to the first response to relax access control (CORS):
app.use((req, res, next) => {
  // any client:
  res.header('Access-Control-Allow-Origin', '*');
  // types of headers (could also be '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Accept, Authorizaton, Content-Type, Origin, X-Requested-With'
  );
  // Required because the client sendS an options request
  // at the start of the session:
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'DELETE, GET, PATCH, POST, PUT');
    res.status(200).json({});
  } else {
    // Let the following route handlers take over:
    next();
  }
});

// Here the first argument of app.use is acting as
// a filter, only passing requests that have that path
//  to some handler passed as the second argument:

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// We can handle errors by catching any requests that
// get past the handlers:

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// This second middleware is for handling errors either passed by
// the preceding middleware or by anywhere else in the application;
// for example if an operation on a db fails.
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

// Don't mix ES6 modules (import, export)
// with CommonJS (require/module.exports).

// module.exports = app; // commonJS
// export const app = _app; // ES6, named export

export default app; // ES6, default export
