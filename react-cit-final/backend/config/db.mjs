import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        //database Name
        const con = await mongoose.connect(`mongodb+srv://admin:Abezm5Buw1PwRuxU@cluster0.qas53.mongodb.net/wantThis`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Database connected`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}
export const keys = {
    secret: "secret"
}
export default connectDB

