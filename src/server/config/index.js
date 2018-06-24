module.exports = {
  development: {
    port: process.env.PORT || 4000,
    mongourl: 'mongodb://localhost:27017/vrstore',
    db: null
  },

  production: {
    port: process.env.PORT || 4000,
    mongourl:  'mongodb://localhost:27017/vrstore',
    db: null
  }
};
