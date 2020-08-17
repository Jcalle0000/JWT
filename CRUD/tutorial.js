const {MongoClient}= require('mongodb')
const { format } = require('path')
const dotenv = require("dotenv").config();
const template=require('./template')

async function main(){
    const uri=process.env.SAMPLE_DB
    const client=new MongoClient(uri,  { useUnifiedTopology: true } )
    try{
          await client.connect()
        //   await listDatabases(client)
          await createListing(client, {
              name:"Lovely Loft",
              summary:"A charming loft in paris",
              bedrooms:1,
              bathrooms:1

          })
    }catch(e){
        console.error(e)
    }finally{
        await client.close()
    }
}
main().catch(console.err)

async function createListing(client, newListing){
    const result=await client.db("sample_airbnb").collection("listingAndReviews").insertOne(newListing)
    console.log(result)
}

async function listDatabases(client){
    const databaseList=await client.db().admin().listDatabases()
    console.log("Databases: ")
    databaseList.databases.forEach( db => console.log(` -${db.name}`))
}