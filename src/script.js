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

// function delay(ms) {
// 	return new Promise(function(resolve, reject) {
// 		var value = 100;
// 		setTimeout(resolve(value), ms);
// 	});
// }

// //delay(1000).then(value => console.log("Done with value: " + value));

// function getDataUsers() {
// 	fetch("http://www.json-generator.com/api/json/get/cfQCylRjuG")
// 		.then( res => res.json())
// 		.then ( data => { 
// 	            if (data.getUsersData) { 
// 		       	return fetch("http://www.json-generator.com/api/json/get/cfVGucaXPC");
// 		     	}
//                      throw Error('something wrong');
// 		})
//             .then( res => res.text())
// 		.then ( data => console.log(data))
// 		.catch ( error => console.log(error))	
// }

// getDataUsers();

// let promisesArr = ["http://www.json-generator.com/api/json/get/ceQMMKpidK", "http://www.json-generator.com/api/json/get/cfkrfOjrfS", "http://www.json-generator.com/api/json/get/cfDZdmxnDm", "http://www.json-generator.com/api/json/get/cguaPsRxAi", "http://www.json-generator.com/api/json/get/cevhxOsZnS"];

// function parallelLoadPromises() {
// 	var arr = promisesArr.map( item => fetch(item));
// 	Promise.all(arr).then ( res => res.map( item => item.json())).then( data => data.forEach(item => item.then(res => console.log(res))))
// }

// //parallelLoadPromises();

// function fetchUrl(url) {
//     return fetch(url).then(function (response) { return response.json(); });
// }
// function getDataSeq(urlArray) {
//     var finalData = [];
//     var fetchSequentally = function () { return urlArray.reduce(function (promise, url) { return promise.then(function () { return fetchUrl(url).then(function (response) { return finalData.push(response); }); }); }, Promise.resolve()); };
//     return fetchSequentally().then(function () { return finalData; });
// }
// //getDataSeq(promisesArr).then(function (data) { return console.log(data); });


// function getResolvedPromise(value) {
// 	return Promise.resolve(value);
// }

// getResolvedPromise(500)
// 	.then( res => { if (res > 300) { throw "Error"; }})
// 	.catch( err => console.log(err))
// 	.finally( () => console.log("This is finally!"));


//=======Наделение функционалом======

// Array.prototype.dublicate = function() {
// 	return [...this, ...this];
// }

// var arr = [1, 2, 3, [4, 5]];
// console.log(arr.dublicate());

//=============Полифилы======================

//===call, apply, bind======================

const obj1 = {
  a: 20,
  foo: function(...numbers) {
      return this.a + numbers.reduce((prev, curr) => prev + curr);
  }
};

const obj2 = {
  a: 30
};

Function.prototype.myApply = function(obj, arr) {
	return this.call(obj, ...arr);
}

Function.prototype.myCall = function(obj, ...arg) {
	return this.apply(obj, arg);
}


console.log(obj1.foo.myApply(obj2, [5, 5])); 
console.log(obj1.foo.myApply(obj2, [5, 5, 10])); 
console.log(obj1.foo.myCall(obj2, 5, 5, 20));
console.log(obj1.foo.myCall(obj2, 5, 5, 10, 20)); 