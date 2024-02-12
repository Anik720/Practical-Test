const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const path = require('path');
const hpp = require('hpp');
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express");
const userRouter = require('./routers/userRouter');
const authRoutes = require('./routers/authRoutes');
const articleRoutes = require('./routers/articleRoutes');

const globalErrorHandler = require('./middlewares/globalErrorHandler');

const AppError = require('./utils/appError');

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// var whitelist = ['http://example1.com', 'http://example2.com']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
// app.use(cors(corsOptions))


app.use(express.json());

console.log(process.env.NODE_ENV);

// set security http headers
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// $ CORS
app.use(cors());

//  set limit request from same API in timePeroid from same ip
const limiter = rateLimit({
  max: 100, //   max number of limits
  windowMs: 60 * 60 * 1000, // hour
  message:
    ' Too many req from this IP , please Try  again in an Hour ! ',
});

app.use('/api', limiter);

//  Body Parser  => reading data from body into req.body protect from scraping etc
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSql query injection
app.use(mongoSanitize()); //   filter out the dollar signs protect from  query injection attact

// Data sanitization against XSS
app.use(xss()); //    protect from molision code coming from html

// testing middleware
app.use((req, res, next) => {
  console.log('this is a middleware');
  next();
});

// routes
app.get('/', (req, res) => {
  res.send("Hello, Node.js!")
  next()
});

app.use('/api/info', (req, res) => {
  res.status(200).json({
    details: "This Node.js project which is a Article Express API building Express.js applications with MongoDB integration. It includes Docker configuration for containerization.    The features of this project is that user can sign up and login into the system and token will be generate. Using that token a protected route api/v1/articles is implemented which user can get access. For that two two middlewares are used. One is for user is loggedin or not and another one is for checking the role."
  })
});

app.use('/api/users', userRouter);
app.use('/api/article', articleRoutes);
app.use('/api', authRoutes);
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Anik Article Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple Article API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Golam Kibria Anik",

      },
    },
    servers: [
      {
        url: "http://localhost:7000/",
      },
    ],
  },
  apis: ["./routers/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

// app.use('/api/v1/article', (req,res)=>{
//   res.send("HElloo there")
// });

// handling all (get,post,update,delete.....) unhandled routes
app.all('*', (req, res, next) => {
  next(
    new AppError(`Can't find ${req.originalUrl} on the server`, 404)
  );
});

// error handling middleware
app.use(globalErrorHandler);

module.exports = app;
