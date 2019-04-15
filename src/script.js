var Universe = (function(){
	var instance;

	function Singleton() {
		if (!instance) {
			instance = this;
			this.size = 100;
		} else {
			return instance;
		}
	}

	Singleton.prototype.getSize = function() {
		return this.size;
	}

	Singleton.prototype.setSize = function(value) {
		this.size = value;
	}
	return Singleton;	
}());



let a = new Universe();
let b = new Universe();

console.log(a === b);
console.log(a.getSize(), b.getSize()); 
a.setSize(200);
console.log(a.getSize(), b.getSize()); 
