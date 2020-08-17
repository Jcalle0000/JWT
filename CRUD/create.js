const {MongoClient}=require('mongodb')
const dotenv=require('dotenv').config();

main().catch(console.err)

async function main(){
    const uri=process.env.SAMPLE_DB
    const client=new MongoClient(uri, {useUnifiedTopology:true})

    try{
        await client.connect()
        console.log('Connected Successfully')
        await createListing(client, {
            name:"Lovely Loft",
            summary:"A charming loft in paris",
            bedrooms:1,
            bathrooms:1
        })
    } catch(e){
        console.error(e)
    } finally{
        await client.close()
        console.log('Unconnected Sucessfully')
    }
}

async function createListing(client, newListing){
    const result=await client.db('sample_airbnb').collection('listingAndReviews').insertOne(newListing)
    console.log(`New listing created with the follwoing id: ${result.insertedId}`)
}


