import restify from 'restify';
import Mongorito from 'mongorito';
import co from 'co';

var Model = Mongorito.Model;


class Post extends Model {
}


function onerror(err) {
  // log any uncaught errors
  // co will not throw any errors you do not handle!!!
  // HANDLE ALL YOUR ERRORS!!!
  console.error(err.stack);
}

export class Service1{
    constructor(debug = false){
        this.name = 'Service1 API!';
        console.log("Loading ", this.name); //this == the object instance.

    }
    init(){
		Mongorito.connect('localhost/blog2');
    }/*
    savePost(){
		co(function *(){
		  // yield any promise
			var post = new Post({
			    title: 'Node.js with --harmony rocks!',
			    body: 'Long post body',
			    author: {
			        name: 'John Doe'
			    }
			});

    		console.log(post.save);
			yield post.save();
			console.log("Saving Post1");		
		}).catch(onerror);
    }  */ 
    *findPosts() {
		var posts = yield Post.all();
		console.log("Find Posts");
		//console.log(posts);
		return posts;  		
    }
    *removePosts() {
		var posts = yield Post.remove();
		console.log("Remove Posts");
		//console.log(posts);
		return posts;  		
    }
    *addPost(myPost) {
		
		//console.log(t1);

		var post22 = new Post(myPost);		

		var post11 = new Post({title: 'Californie',body: 'Mypost',author: {name: 'anthony'}});


		/*var post = new Post({
		    title: 'Node.js with --harmony rocks!',
		    body: 'Long post body',
		    author: {
		        name: 'John Doe'
		    }
		});
		*/
		console.log(myPost);

		//var post = new Post(myPost);		
		let post2 = yield post22.save();
		return post2;
	
    }
    exit(){
		Mongorito.disconnect();
    }

}

//module.exports = Service1; //set what can be imported from this file
