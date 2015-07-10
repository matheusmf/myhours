var mongoose = require('mongoose');

module.exports = function() {
    var schema = mongoose.Schema({
        date: {
            type: Date, 
            required: true
        },
        points: [{
            type: mongoose.Schema.ObjectId,
            ref: 'Point'
        }]
    });
    
    return mongoose.model('Day', schema);
};