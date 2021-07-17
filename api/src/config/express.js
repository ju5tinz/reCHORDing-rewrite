const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

module.exports = (app) => {
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(cors({
    origin: true,
    credentials: true,
    allowedHeaders: 'Content-Type,Set-Cookie,Cookie,Origin,Host'
  }));
}