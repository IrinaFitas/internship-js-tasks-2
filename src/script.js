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


// =======Наделение функционалом======

// Array.prototype.dublicate = function() {
// 	return [...this, ...this];
// }

// var arr = [1, 2, 3, [4, 5]];
// console.log(arr.dublicate());

// =============Полифилы======================

// ===call, apply, bind======================

// const obj1 = {
//   a: 20,
//   foo: function(...numbers) {
//       return this.a + numbers.reduce((prev, curr) => prev + curr);
//   }
// };

// const obj2 = {
//   a: 30
// };

// Function.prototype.myApply = function(obj, arr) {
// 	return this.call(obj, ...arr);
// }

// Function.prototype.myCall = function(obj, ...arg) {
// 	return this.apply(obj, arg);
// }

// Function.prototype.myBindByCall = function(obj, ...arg) {
// 	var self = this;

// 	return function() {
// 		return self.call(obj, ...arg);
// 	}
// }

// // console.log(obj1.foo.myApply(obj2, [5, 5])); 
// // console.log(obj1.foo.myApply(obj2, [5, 5, 10])); 
// // console.log(obj1.foo.myCall(obj2, 5, 5, 20));
// // console.log(obj1.foo.myCall(obj2, 5, 5, 10, 20)); 
// // const f1 = obj1.foo.myBindByCall(obj2, 5, 5);
// // console.log(f1());
// // const f2 = obj1.foo.myBindByCall(obj2, 5, 5, 10);
// // console.log(f2());

// //====Object.create========
// const obj3 = {
//     a: 1
// };

// const obj4 = objectCreate(obj3, {
//     p: {
//         value: 20
//     },
//     k: {
//         value: 30
//     }
// });


// function objectCreate(parent, properties) {
// 	function EmptyObj() {}
// 	EmptyObj.prototype = parent;
// 	let obj = new EmptyObj();
	
// 	for (let prop in properties) {
// 		if (properties.hasOwnProperty((prop))) {
// 			Object.defineProperty(obj, prop, {
// 			value: properties[prop].value,
// 			writable: true,
// 			configurable: true,
// 			enumerable: true,
// 			});
// 		}
// 	}
// 	return obj;
// }

// console.log(obj4);

// //======Своя реализация New========
// function myNew(func) {
// 	var obj = Object.create(func.prototype);
// 	func.prototype.constructor = func;
// 	func.apply(obj, arguments);
// 	return obj;
// }

// function F() {
//     this.a = 10;
// }

// F.prototype.foo = function () {
//     return this.a;
// }

// const a = myNew(F);
// console.log(a); 
// console.log(a.foo()); 


//========Реализовать функции объединения, пересечения, разности элементов двух массивов=====

function union(arr1, arr2) {
	let set = new Set([...arr1, ...arr2]);
	return [...set];
}

//console.log(union([4,5,7,2,1,5],[1,2,3,7,9]));

function intersection(arr1, arr2) {
	let set = new Set([...arr1].filter(elem => arr2.includes(elem)));
	return [...set]; 
}

//console.log(intersection([1,2,3], [4,3,2])); 

function diff(arr1, arr2) {
	let newArr = arr1.filter( elem => !arr2.includes(elem));
	let set = new Set([...newArr]);
	return [...set];
}

// console.log(diff([1,2,3,7,9],[4,5,7,2,1,5]));
// console.log(diff([4,5,7,2,1,5], [1,2,3,7,9]));

//=====Функция, принимающую строку  и возвращающая объект======================

function makeObjectFromString(str) {
	let array = str.split(".");
	

	// for (let i = 0; i < array.length; i++) {
	// 	Object.defineProperty(obj, array[i], {
	// 		value: Object.create(Object.prototype)
	// 	});
	// }

	return array.reduceRight( (accumulator, item, index, arr) => {
      	let obj = {};
      	if (index === arr.length-1) {
      		obj[item] = null;
      	} else {
      		obj[item] = Object.assign({}, accumulator);
      	}
      	
      	return obj;
    	}, {});
}

//console.log(makeObjectFromString("a.b.c.d"));

//=======Аннаграммы============================================================
function findAnnagram(arr) {
	let obj = {};
	let newArr = [];

	arr.forEach( elem => {
		obj[elem] = elem.toLowerCase().split("").sort().join("");
	});

	
	new Set([...Object.values(obj)]).forEach(item => {
		let temp = [];

		for (let key in obj) {
			if (obj[key] === item) {
				temp.push(key);
			}
		}

		newArr.push(temp);
	});
	
	return newArr;
}


const input = [
   'вертикаль',
   'кильватер',
   'апельсин',
   'спаниель',
   'австралопитек',
   'ватерполистка',
   'кластер',
   'сталкер',
   'стрелка'
];

console.log(findAnnagram(input));


//========Функция sum, которая работает с многим количеством последовательных вызовов====
function sum(a) {

	var value = a;

	function f(b) {
		value += b;
		return f;
	}

	f.toString = function() {
		return value;
	};

	return f;
}

// console.log(sum(1)(2)(3)()); 
// console.log(sum(1)(2)(3)(4) + 1); 
// console.log(sum(1)(2)(3)(4)(5) + 1);