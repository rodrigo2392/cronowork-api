import mongoService from "../services/mongo.service";
class User {

    schema = mongoService.getMongoose().Schema;

    userSchema = new this.schema({
        _id: String,
        name: String,
        email: String,
        password: String
    }, {timestamps: true})
    User = mongoService.getMongoose().model('User', this.userSchema);

    constructor() {
        console.log("Created user instance")
    }

}

export default new User()