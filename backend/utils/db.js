import mongoose from "mongoose";
import dns from "dns";
// Force Google DNS to bypass ISP blocking of MongoDB Atlas SRV lookups
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('mongodb connected successfully');

        // Clean up legacy global employeeCode_1 index if it exists in favor of compound index
        try {
            await mongoose.connection.collection("employees").dropIndex("employeeCode_1");
            console.log("Dropped legacy global employeeCode_1 index");
        } catch (e) {
            // Index does not exist or already dropped, ignore
        }
    } catch (error) {
        console.log(error);
    }
}
export default connectDB;