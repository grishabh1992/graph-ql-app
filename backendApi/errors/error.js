const { createError } = require('apollo-errors');

const noInputError = createError('noInputError', { message: 'No valid Input is provided.' });

module.exports = {
    noInputError,
};