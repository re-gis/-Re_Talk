import mongoose from "mongoose";
import colors from 'colors'

export const connectDb = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }, console.log('Mongodb connected...'.underline.cyan))
    } catch (error) {
        console.log(error)
        process.exit()
    }
}
