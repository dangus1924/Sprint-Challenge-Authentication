const knex = require('knex');

const knexConfig = require('../knexfile.js');
const enviornment = process.env.NODE_ENV || "dev"

module.exports = knex(knexConfig[enviornment]);
