const mongoose = require('mongoose')



const MongoDB_Connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, () => console.log('MongoDB connected'))
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = MongoDB_Connect