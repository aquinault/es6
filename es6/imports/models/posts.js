var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
    name: String
})

postSchema.set('toJSON', {
     transform: function (doc, ret, options) {
         ret.id = ret._id;
         delete ret._id;
         delete ret.__v;
     }
}); 

var Post = mongoose.model('Post', postSchema)
export default Post;