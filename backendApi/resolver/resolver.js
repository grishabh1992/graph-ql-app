const { noInputError } = require('../errors/error');

const getNoteResolver = (input, connectorQuery) => {
    console.log(input);
    return connectorQuery.apply(this, [input]);
};

const getNotesResolver = (context, connectorQuery) => {
    return connectorQuery.apply(this, context);
};

const createNoteResolver = (input, connectorQuery) => {
    console.log(input);
    if (!input || !input.name) {
        throw new noInputError({
            message: `You must supply a valid Input!`
        });
    }
    return connectorQuery.apply(this, [input]);
};

const updateNoteResolver = (input, connectorQuery) => {
    console.log(input);
    if (!input || !input.name || !input._id) {
        throw new noInputError({
            message: `You must supply a valid Input!`
        });
    }
    return connectorQuery.apply(this, [input]);
};

const deleteNoteResolver = (input, connectorQuery) => {
    console.log(input);
    if (!input) {
        throw new noInputError({
            message: `You must supply a valid Input!`
        });
    }
    return connectorQuery.apply(this, [input]);
};

module.exports = {
    getNoteResolver,
    getNotesResolver,
    createNoteResolver,
    deleteNoteResolver,
    updateNoteResolver,
};