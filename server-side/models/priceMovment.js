import mongoose from 'mongoose'


const priceMovmentSchema = new mongoose.Schema({
    
    price: Number,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    creator: String,
})



const PriceMovment = mongoose.model('priceMovment', priceMovmentSchema);

export default PriceMovment;