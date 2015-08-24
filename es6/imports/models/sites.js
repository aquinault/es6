import mongoose from 'mongoose';
import logger from '../conf/logger';

var siteSchema = mongoose.Schema({
  name: { type: String, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  created_at: { type: Date },
  updated_at: { type: Date }
})

siteSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
}); 

// on every save, add the date
siteSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

siteSchema.pre('findOneAndUpdate', function(next) {
  //this.updated_at = Date.now();
  this.findOneAndUpdate({}, { updated_at: Date.now() });
  next();
});

siteSchema.pre('update', function(next) {
  this.updated_at = Date.now();
  next();
});

var Site = mongoose.model('Site', siteSchema)
export default Site;
