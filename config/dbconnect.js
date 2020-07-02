var mongoose = require('mongoose')

const URI = 'mongodb+srv://aieOdufu:aieOdufu@saharainvestment.m5jsn.mongodb.net/saharainvestment?retryWrites=true&w=majority';

const connectDb = async() => {
    await mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true });
    console.log('db connected...');

}

module.exports = connectDb