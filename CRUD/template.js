const {MongoClient}=require('mongodb')
const dotenv=require('dotenv').config();

async function startConnection(){
    const uri=process.env.SAMPLE_DB
    const client=new MongoClient(uri, {useUnifiedTopology:true})
    try{
        await client.connect()
        console.log('Connected Successfully')
      
    } catch(e){
        console.error(e)
    } finally{
        await client.close()
        console.log('Unconnected Sucessfully')
    }
}

main().catch(console.err)



