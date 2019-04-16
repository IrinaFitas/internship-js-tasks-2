// ==========Singleton. Задача на замыкания и понимания фунции-конструктора===================
// var Universe = (function(){
// 	var instance;

// 	function Singleton() {
// 		if (!instance) {
// 			instance = this;
// 			this.size = 100;
// 		} else {
// 			return instance;
// 		}
// 	}

// 	Singleton.prototype.getSize = function() {
// 		return this.size;
// 	}

// 	Singleton.prototype.setSize = function(value) {
// 		this.size = value;
// 	}
// 	return Singleton;	
// }());

// let a = new Universe();
// let b = new Universe();

// console.log(a === b);
// console.log(a.getSize(), b.getSize()); 
// a.setSize(200);
// console.log(a.getSize(), b.getSize()); 


// ===Переписать наследование с ES6 на ES5===============================================

// class Person {
//   constructor (name) {
//     this.name = name;
//   }

//   getName () {
//     return this.name;
//   }
// }


// class Man extends Person {
//   constructor (name, facialHair) {
//     super(name);
//     this.facialHair = facialHair;
//   }

//   getName () {
//     return `Name: ${super.getName()}`;
//   }
  
//   getFacialHair () {
//     return this.facialHair;
//   }
// }

// const person = new Person('somebody');
// console.log(person.getName()); // somebody

// const man = new Man('Viktor', true);
// console.log(man.getName()); // Name: Viktor
// console.log(man.getFacialHair()); // true

// function Person(name) {
// 	this.name = name;
// }

// Person.prototype.getName = function() {
// 	return this.name;
// }

// function Man(name, facialHair) {
// 	Person.call(this, name);
// 	this.facialHair = facialHair;
// }

// Man.prototype = Object.create(Person.prototype);
// Man.prototype.constructor = Man;

// Man.prototype.getName = function() {
// 	return "Name: " + Person.prototype.getName.apply(this, arguments);
// }
// Man.prototype.getFacialHair = function() {
// 	return this.facialHair;
// }

// var some = new Person("Vasya");

// var man = new Man("Ivan", true);
// console.log(some.getName());
// console.log(man.getFacialHair());
// console.log(man);
// console.log(man.getName());


// ============================Реализовать функциональное наследование=========================

// function Person(name) {
// 	var obj = {};
// 	obj.name = name;
// 	obj.getName = function() {
// 		return obj.name;
// 	}

// 	return obj;
// }

// function Man(name, facialHair) {
// 	var objChild = Person(name);
// 	objChild.facialHair = facialHair;
// 	objChild.getFacialHair = function() {
// 		return objChild.facialHair;
// 	}
// 	objChild.getName = function() {
// 		return "Name: " + objChild.name;
// 	}
// 	return objChild;
// }

// var somebody = Person("Bob");
// var somebody2 = Person("Bobbbb");
// console.log(somebody,somebody2);
// console.log(somebody.getName());
// var man = Man("Ivan", true);
// console.log(man.getName());
// console.log(man.getFacialHair());


//========================================Промисы (практика промисов и асинхронности)===========

function delay(ms) {
	return new Promise(function(resolve, reject) {
		var value = 100;
		setTimeout(resolve(value), ms);
	});
}

//delay(1000).then(value => console.log("Done with value: " + value));

function getDataUsers() {
	fetch("http://www.json-generator.com/api/json/get/cfQCylRjuG")
	.then( res => res.json())
	.then ( data => {
		if(data.getUsersData) {
			fetch("http://www.json-generator.com/api/json/get/cfVGucaXPC")
				.then( res => res.json())
				.then( data => console.log(data))
				.catch ( error => console.log(error))
		}
	});	
}

//getDataUsers();

let promisesArr = ["http://www.json-generator.com/api/json/get/ceQMMKpidK", "http://www.json-generator.com/api/json/get/cfkrfOjrfS", "http://www.json-generator.com/api/json/get/cfDZdmxnDm", "http://www.json-generator.com/api/json/get/cguaPsRxAi", "http://www.json-generator.com/api/json/get/cevhxOsZnS"];

function parallelLoadPromises() {
	Promise.all(promisesArr.forEach( item => 
	fetch(item)
	.then( resolve => resolve.json())
	.then ( data => console.log(data))
	.catch( error => console.log(error))));
}

//parallelLoadPromises();

function serialLoadPromises() {
	let result = [];
	promisesArr.forEach( item => 
		fetch(item)
		.then( resolve => resolve.json())
		.then( data => result.push(data))
		.catch( error => console.log(error))
	);

	console.log(result);
}

//serialLoadPromises();






