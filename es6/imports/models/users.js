var mongoose = require('mongoose');


/*var bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;*/

var userSchema = mongoose.Schema({
	username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    email: { type: String, required: false },
    admin: { type: Boolean, default: false },
    created_at: Date,
	updated_at: Date
})

userSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.password;
  }
}); 

// on every save, add the date
userSchema.pre('save', function(next) {
  //console.log('save');
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

userSchema.pre('findOneAndUpdate', function(next) {
  //console.log('pre findOneAndUpdate');
  //this.updated_at = Date.now();
  this.findOneAndUpdate({}, { updated_at: Date.now() });
  next();
});

userSchema.pre('update', function() {
  //console.log('pre update');
  this.updated_at = Date.now();
  next();
});

/*
UserSchema.pre(save, function(next) {
    var user = this;
 
	// only hash the password if it has been modified (or is new)
	if (!user.isModified('password')) return next();
	 
	// generate a salt
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
	    if (err) return next(err);
	 
	    // hash the password using our new salt
	    bcrypt.hash(user.password, salt, function(err, hash) {
	        if (err) return next(err);
	 
	        // override the cleartext password with the hashed one
	        user.password = hash;
	        next();
	    });
	});
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
*/
var User = mongoose.model('User', userSchema)
export default User;