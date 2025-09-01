import mongoose, { connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log("DB connected");
    })

    await mongoose.connect(`${process.env.MONGODB_URL}/ecommerce`)

}

export default connectDB;