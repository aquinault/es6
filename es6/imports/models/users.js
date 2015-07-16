var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: String
})

userSchema.set('toJSON', {
     transform: function (doc, ret, options) {
         ret.id = ret._id;
         delete ret._id;
         delete ret.__v;
     }
}); 

var User = mongoose.model('User', userSchema)
export default User;