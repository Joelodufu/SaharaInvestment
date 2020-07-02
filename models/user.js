var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs')

var userSchema = new Schema({
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: Number, required: true },
    password: { type: String, required: true },
    invitEmail: { type: String }
})

userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null)
}

userSchema.methods.comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}

module.exports = mongoose.model('User', userSchema);