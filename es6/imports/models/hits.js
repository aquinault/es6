var mongoose = require('mongoose');

/*var childVersionSchema = new mongoose.Schema({ 
  v: { type: String},
  c: { type: Number}
});
*/

/*var childNameSchema = new mongoose.Schema({ 
  name: { type: String},
  version: [mongoose.Schema.Types.Mixed]
});
*/
var hitSchema = mongoose.Schema({
    id2 : { type: String, required: true, index: true }, 
    browser: [mongoose.Schema.Types.Mixed],
    browser_name : { type: String },
    platform : { type: String },
    visit: { type: Number},
    site_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    created_at: { type: Date },
	updated_at: { type: Date }
})

hitSchema.set('toJSON', {
     transform: function (doc, ret, options) {
         ret.id = ret._id;
         delete ret._id;
         delete ret.__v;
     }
}); 

// on every save, add the date
hitSchema.pre('save', function(next) {

console.log('pre save');

  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

var Hit = mongoose.model('Hit', hitSchema)
export default Hit;