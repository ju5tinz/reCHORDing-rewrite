const createError = require('http-errors');

module.exports = (app) => {
  const userRouter = require('../routes/user')();
  const chordRouter = require('../routes/chord')();
  const chordGroupRouter = require('../routes/chordGroup')();

  app.use('/user', userRouter);
  app.use('/chord', chordRouter);
  app.use('/chordgroup', chordGroupRouter);

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    next(createError(404));
  });

  // error handler
  app.use((err, req, res, next) => {
    // render the error page
    res.status(err.status || 500);
    res.json({
      error: {
        message: err.message
      },
    });
  });
}