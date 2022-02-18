const mongoose =require('mongoose');

const mongooseURL="mongodb://localhost:27017/praved?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

const connectToMongo=()=>{

    mongoose.connect(mongooseURL,()=>{
        console.log("Database Connection Successful");
    })
}

module.exports =connectToMongo;