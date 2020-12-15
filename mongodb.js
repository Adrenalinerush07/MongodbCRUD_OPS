// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongo.ObjectID

// destructuring above lines
const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// constructure function hai ye isliye
const id = new ObjectID()
console.log(id)
console.log(id.getTimestamp())


// connect honge mein time lag sakta ha isliye call back func bhi leta hai as an argument
MongoClient.connect(connectionURL, {useNewUrlParser:true, useUnifiedTopology: true }, (error,client)=> {
    if(error){
        return console.log('Unable to connect!')
    }

    console.log('Connected to database bro!')

    const db = client.db(databaseName)

    // * Code for insertion * 

    // db.collection('users').insertOne({
    //     name: 'Kartik',
    //     Likes: 'Chess'
    // })

    // db.collection('users').insertMany([
    //     {
    //         Name: 'Kartik',
    //         Likes: 'Chess'
    //     }, {
    //         Name: 'Maa',
    //         Likes: 'Gardening'
    //     }
    // ],(error, result) =>{
    //     if(error){
    //         return consolse.log('Unable to connect to database!')
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('task').insertMany([
    //     {
    //         description: 'dev',
    //         completed: true
    //     }, {
    //         description: 'contest',
    //         completed: false
    //     }
    // ] ,(error, result) => {
    //     if(error){
    //         return console.log('Unable to connect to database!')
    //     }
    //     console.log(result.ops) 
    // })

    // * Code for find * 

    db.collection('users').findOne({ name:'Kartik'}, (error, user) =>{
        if(error){
            return console.log('Unable to fetch!')
        }

        console.log(user)
    })

    // find by object id
    db.collection('users').findOne({ _id: new ObjectID("5fd4de745748e94da00a0f0e")}, (error, user) =>{
        if(error){
            return console.log('Unable to fetch!')
        }

        console.log(user)
    })

    // find method to find mutiple tuple
    db.collection('users').find({Likes: 'Chess'}).toArray((error, user) =>{
        if(error){
            return console.log('Unable to fetch!')
        }

        console.log(user)
    })

    db.collection('users').find({Likes: 'Chess'}).count((error, user) =>{
        if(error){
            return console.log('Unable to fetch!')
        }

        console.log(user)
    })  

    // update function ussing promises -> (2 syntax)

    // 1 ->
    // const updatePromise = db.collection('users').updateOne({
    //     _id: new ObjectID("5fd4fa0b4a9c98504c26cdb3")   
    // }, {
    //     $set: {
    //         name: 'Jaiswal'
    //     }
    // })

    // updatePromise.then((result) =>{
    //     console.log(result)
    // }).catch((error) => {
    //     console.log;ongotpointercapture(error)
    // })

    // 2->
    db.collection('users').updateOne({
        _id: new ObjectID("5fd4fa0b4a9c98504c26cdb3")   
    }, {
        $set: {
            name: 'Jaiswal'
        }
    }).then((result) =>{
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

    db.collection('users').updateMany({
        Likes: 'Gardening'  
    }, {
        $set: {
            Likes: 'Chess'
        }
    }).then((result) =>{
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

    // Delete operation
    db.collection('users').deleteOne({
        Name: 'Kartik'  
    }).then((result) =>{
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

    db.collection('users').deleteMany({
        Name: 'Kartik'  
    }).then((result) =>{
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
})