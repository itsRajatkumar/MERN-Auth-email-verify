const mongoose = require('mongoose');
// var MongoClient = require('mongodb').MongoClient;
// const dotenv = require('dotenv')


const db = () =>{
    try{
        // MongoClient.connect(process.env.MONGO_URI).then(()=> console.log('connected to db')).catch((err)=> console.error(err)
// );
        mongoose.connect(process.env.MONGO_URI).then(res => console.log("res")).catch((err)=> console.error(err))
        // , function(err, db) {
        //     if (err){
        //         throw err;
        //     } 
        //     else{
        //         // console.log(db);
        //         console.log("Database Connected!");
        //     }
            
        //   }) 
    }   
    catch(err){
        console.log(err)
    }
}


module.exports=db;