import mongoose, {ConnectOptions} from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

class MongoService {
    private options: ConnectOptions = {
        serverSelectionTimeoutMS: 5000,
    }

    constructor() {
        this.connect();
    }

    getMongoose() {
        mongoose.plugin(mongoosePaginate)
        return mongoose;
    }
    connect = () => {
        console.log("Connecting to the DB...")
        mongoose.connect(process.env.MONGO_URI ?? "", this.options).then(() => {
            console.log("MongoDB is connected.")
        })
        .catch((err) => {
            console.log("MongoDB error:" + err)
        })
    }
}
export default new MongoService();