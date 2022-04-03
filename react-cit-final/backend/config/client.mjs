import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://admin:Abezm5Buw1PwRuxU@cluster0.qas53.mongodb.net";
export const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

