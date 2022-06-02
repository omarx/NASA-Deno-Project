import {MongoClient,log} from "../deps.ts";
import "https://deno.land/x/dotenv@v3.2.0/load.ts";
const MONGO_URL=Deno.env.get("MONGO_URL");
const client = new MongoClient();

try{
    await client.connect(String(MONGO_URL))
        .then(()=>log.info(`Database is connected`))
}catch(e){
    log.warning(`Database is not connected see error ${e}`)
}

const db=client.database('NasaDB')
export const Planets=db.collection('planets');
export const Launches=db.collection('launches');



