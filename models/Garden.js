const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');

const GardenSchema = new mongoose.Schema({
    gardenId: {
        type: String,
        required: [true, 'Please add a garden ID'],
        unique: true,
        trim: true,
        maxlength: [10, 'Garden ID must be less than 10 chars']
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    location: {
        type: {
            type: String, 
            enum: ['Point']
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Geocode and create location
GardenSchema.pre('save', async function(next) {
    const loc = await geocoder.geocode(this.address);
    console.log(loc);
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress
    }

    // Do not save address
    this.address = undefined;
    next();
})

module.exports = mongoose.model('Garden', GardenSchema);