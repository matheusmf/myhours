var mongoose = require('mongoose');

module.exports = function() {
    var schema = mongoose.Schema({
        name: {
            type: String, 
            required: true
        },
        number: {
            type: Number,
            required: true
        },
        year: {
            type: mongoose.Schema.ObjectId,
            ref: 'Year'
        },
        days: [{
            type: mongoose.Schema.ObjectId,
            ref: 'Day'
        }]
    });
    
    return mongoose.model('Month', schema);
};