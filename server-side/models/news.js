import mongoose from 'mongoose'


const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    creator: String,
})



const News = mongoose.model('news', newsSchema);

export default News;