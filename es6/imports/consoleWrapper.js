//imports/ConsoleWrapper.js 
class ConsoleWrapper{
    constructor(debug = false){
        this.name = 'Console wrapper!';
    }
    speak(){
        //debugger;
        console.log("Hello, I am ", this.name); //this == the object instance.
    }
}

module.exports = ConsoleWrapper; //set what can be imported from this file