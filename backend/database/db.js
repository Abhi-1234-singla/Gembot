import mongoose from "mongoose";

const connectDb = async () => {
    try{
        await mongoose.connect(process.env.Db_url, {
            dbName: "ChatbotYoutube",
        })
        console.log("Mongodb connected successfully");
    }catch(error){
        console.error("MongoDB Connection Failed:", error);
    }
};

export default connectDb