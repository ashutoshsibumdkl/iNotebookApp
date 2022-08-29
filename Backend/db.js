const mongoose = require('mongoose')
const mongoURI = 'mongodb://localhost:27017/notebook?directConnection=true&readPreference=primary' 

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected to Mongo Successfully"); 
    }).catch((e)=>{
        console.log('Error in connecting to Mongo');
    })
}


module.exports = connectToMongo;