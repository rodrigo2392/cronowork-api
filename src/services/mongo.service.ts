import mongoose, {ConnectOptions} from "mongoose";

class MongoService {
    private options: ConnectOptions = {
        serverSelectionTimeoutMS: 5000,
    }

    constructor() {
        this.connect();
    }

    getMongoose() {
        return mongoose;
    }
    connect = () => {
        console.log("Connecting to the DB...")
        console.log({uri:process.env.MONGO_URI})
        mongoose.connect(process.env.MONGO_URI ?? "", this.options).then(() => {
            console.log("MongoDB is connected.")
        })
        .catch((err) => {
            console.log("MongoDB error:" + err)
        })
    }
}
export default new MongoService();