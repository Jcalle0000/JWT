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
    console.log('get-http://localhost/users')
})

// Using bycrypt which makes the function async
app.post('/users', async (req,res)=> {
    try{
        // const salt=await bcrypt.genSalt() // bycrypt is async so await is needed
        const hashedPassword=await bcrypt.hash(req.body.password,10)
        const user={name: req.body.name,
        password: hashedPassword} 
        users.push(user)
        res.status(201).send() // created status response
        console.log('Post '+user.name)
    }
    catch{
        console.log('Error Posting in /users')
        res.status(500).send() // generic errpr internal Server Error
    }
  
    // users is our array of data
})

app.post('/users/login', async (req,res)=>{
    const user=users.find(user=>user.name===req.body.name);
    console.log('post/login:user', user);
    if(user==null){
        console.log('post user/login: User does not exist')
        return res.status.send('post/login:user: Cannot find user')
    }
    try{
        if(await bcrypt.compare(req.body.password, user.password)){
            console.log('post user/login:Successful find')
            return res.status(400).send('Succesful Login')
        }
        else{
            res.send('Not allowed')
        }
    }
    catch{
        console.log('User was not verified')
        res.status(500).send()
    }
} )

app.listen(3100);