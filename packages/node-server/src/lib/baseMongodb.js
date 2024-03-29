const URI = `mongodb+srv://vast-root:123456@cluster0.7aqyr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`


const uri = "mongodb+srv://test:test@cluster0.ejxpm.mongodb.net/";

const MongoClient = require('mongodb').MongoClient;

let baseMongodb;

class BaseMongodb {
    constructor() {
        this.mongoClient = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true});
        this.mongoClient.connect(err => {
            if(err){
                console.log('connect db error', err);
                return;
            }
            this.client = this.mongoClient;
        });
    }

    async getClient() {
        if(!this.client) {
            this.client = await this.mongoClient.connect();  
        }
        return this.client;
    }
}

 module.exports = () => {
     if(!baseMongodb){
        baseMongodb = new BaseMongodb();
     }
     return baseMongodb;
 }