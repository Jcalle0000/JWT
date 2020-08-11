const express=require('express')
const app=express()
const bcrypt=require('bcrypt') // used to hash passwords

app.use(express.json() ) // allows for json posts?

const users=[
    {
        // name:'Jason'
    }
]

app.get('/users', (req,res)=>{
    res.json(users)
    console.log('Acessing http://localhost/users')
})

// Using bycrypt which makes the function async
app.post('/users', async (req,res)=> {
    try{
        
        const salt=await bcrypt.genSalt() // bycrypt is async so await is needed
        const hashedPassword=await bcrypt.hash(req.body.password,salt)
        console.log(salt)
        console.log(hashedPassword)  
        // Our user info being saved
        const user={name: req.body.name,
        password: hashedPassword} 
        users.push(user)
        res.status(201).send() // created status response
        console.log('Posted')
    }
    catch{
        console.log('Error')
        res.status(500).send() // generic errpr internal Server Error
    }
  
    // users is our array of data
    
})
app.listen(3100);