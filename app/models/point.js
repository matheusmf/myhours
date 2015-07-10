var mongoose = require('mongoose');

module.exports = function() {
    var schema = mongoose.Schema({
        input: {
            type: Date
        },
        exit: {
            type: Date
        }
    });
    
    return mongoose.model('Point', schema);
};