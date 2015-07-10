var mongoose = require('mongoose');

module.exports = function() {
    var schema = mongoose.Schema({
        name: {
            type: Number, 
            required: true,
            index: {
                unique: true
            }
        },
        months: [{
            type: mongoose.Schema.ObjectId,
            ref: 'Moth'
        }]
    });
    
    return mongoose.model('Year', schema);
};