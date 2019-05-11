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


// ========================================Промисы (практика промисов и асинхронности)===========

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


// ========Реализовать функции объединения, пересечения, разности элементов двух массивов=====

// function union(arr1, arr2) {
// 	let set = new Set([...arr1, ...arr2]);
// 	return [...set];
// }

// //console.log(union([4,5,7,2,1,5],[1,2,3,7,9]));

// // function intersection(arr1, arr2) {
// // 	let set = new Set([...arr1].filter(elem => arr2.includes(elem)));
// // 	return [...set]; 
// // }
// const intersection = (first, second) => [... new Set(first)].filter(el => new Set(second).has(el));
// //console.log(intersection([1,2,3], [4,3,2])); 

// function diff(arr1, arr2) {
// 	let newArr = arr1.filter( elem => !arr2.includes(elem));
// 	let set = new Set([...newArr]);
// 	return [...set];
// }

// // console.log(diff([1,2,3,7,9],[4,5,7,2,1,5]));
// // console.log(diff([4,5,7,2,1,5], [1,2,3,7,9]));

// //=====Функция, принимающую строку  и возвращающая объект======================

// function makeObjectFromString(str) {
// 	let array = str.split(".");
	

// 	// for (let i = 0; i < array.length; i++) {
// 	// 	Object.defineProperty(obj, array[i], {
// 	// 		value: Object.create(Object.prototype)
// 	// 	});
// 	// }

// 	return array.reduceRight( (accumulator, item, index, arr) => {
//       	let obj = {};
//       	obj[item] = Object.assign({}, accumulator);
      	
//       	if (index === arr.length-1) {
//       		obj[item] = null;
//       	}
//       	return obj;
//     	}, {});
// }

// console.log(makeObjectFromString("a.b.c.d"));

// //=======Аннаграммы============================================================
// function findAnnagram(arr) {
// 	let obj = {};
// 	let newArr = [];

// 	arr.forEach( elem => {
// 		obj[elem] = elem.toLowerCase().split("").sort().join("");
// 	});

// 	[... new Set(Object.values(obj))].filter(el => {
// 		let temp = [];
		
// 		for (let key in obj) {
// 			if (obj[key] === el) {
// 				temp.push(key);
// 			}
// 		}

// 		newArr.push(temp);
// 	});	
	
// 	// new Set([...Object.values(obj)]).forEach(item => {
// 	// 	let temp = [];

// 	// 	for (let key in obj) {
// 	// 		if (obj[key] === item) {
// 	// 			temp.push(key);
// 	// 		}
// 	// 	}

// 	// 	newArr.push(temp);
// 	// });
	
// 	return newArr;
// }


// const input = [
//    'вертикаль',
//    'кильватер',
//    'апельсин',
//    'спаниель',
//    'австралопитек',
//    'ватерполистка',
//    'кластер',
//    'сталкер',
//    'стрелка'
// ];

// console.log(findAnnagram(input));


// //========Функция sum, которая работает с многим количеством последовательных вызовов====
// function sum(a) {

// 	var value = a;

// 	function f(b) {
// 		value += b;
// 		return f;
// 	}

// 	f.toString = function() {
// 		return value;
// 	};

// 	return f;
// }

// console.log(sum(1)(2)(3)()); 
// console.log(sum(1)(2)(3)(4) + 1); 
// console.log(sum(1)(2)(3)(4)(5) + 1);



// ====Функции compose, add, mul. add и mul - каррированные функции (только на 2 вызова). 

// function add(a) {
// 	return function(b) {
// 		return a + b;
// 	}
// }

// function mul(a) {
// 	return function(b) {
// 		return a * b;
// 	}
// }
// const add = a => b => a + b;
// const mul = a => b => a * b;

// function compose(func, ...anotherFunc) {
// 	return function(x) {
// 		return func(anotherFunc.reduce( (value, elem) => elem(value), x) );
// 	}
// }

// // const composed = compose(mul(2), add(5), add(2));
// // console.log(composed(3)); 
// // console.log([1, 2, 6].map(composed)); 


// //=====Функция prop, в которую передается ключ для получение значение по этому ключу================

// const tweeps = [
//   { name: 'Peter', age: 20 },
//   { name: 'Mary', age: 32 }
// ];

// function prop(key) {
// 	return function(item) {
// 		return item[key];
// 	}
// }

// const str = 'Mentioned by ' + tweeps.map(prop('name')).join(', ');
// // console.log(str);
// const agesStr = `They are ${tweeps.map(prop('age')).join(',')}`;
// // console.log(agesStr);

// //========Заполнить таблицу, и понимать как работает || и &&==========

// let x = false && '' //здесь будет false, так && возвратит первое ложное значение
// x = false || '' // возвратит "", так как оба ложны, возвратит последнее ложное
// x = '' || 'Yes' // "Yes", так как || возвратит первое истинное значение
// x = {} && 'Some' // "Some", так как {} = true и строка true, а && вернет последнее истинное значение
// x = {} || 'Some' // {} - так как || вернет первое истинное значение
// x = {a: 10} && 'Some' // "Some", так как {} = true и строка true, а && вернет последнее истинное значение
// x = {a: 10} || 'Some' // {a: 10} - так как || вернет первое истинное значение
// x = 0 || true // true, так как || возвращает первое истинное утверждение
// x = null || 0 // 0 потому, что если все значения ложны || возвращает последнее ложное
// x = undefined && 0 // undefined потому, что && возвращает первое ложное
// x = '' || 0 && true // 0 - у && приоритет выше, поэтому сначала он вернёт 0, а оператор || в этом случае вернёт последнее ложное 0
// x = {} || 0 && true // {} - выполнится сначала && и вернёт 0, но оператор || вернёт первое истинное {}
// x = false || {} && true // true - выполнится сначала && и вернёт true(последнее истинное), а оператор || вернёт первое истинное true

// //========.reduce()=====================================

// function reduce(arr, callbackFunc, initialValue) {
// 	let accumulator;

// 	function cycle(start) {
// 		for (let i=start; i<arr.length; i++) {
// 			accumulator = callbackFunc(accumulator, arr[i], i, arr);
// 		}
// 	}

// 	if (initialValue) {
// 		accumulator = initialValue;
// 		cycle(0);
// 	} else {
// 		accumulator = arr[0];
// 		cycle(1);
// 	}

// 	return accumulator;
// }

// let arr = [10, 20, 30, 40];
// const sum = (a, b) => a + b;
// let result1 = reduce(arr, sum);
// console.log(result1); 
// let result2 = reduce(arr, sum, 10);
// console.log(result2);


//=====Reverse Number========================

// function reverseNumber(num) {
// 	var str = num.toString();
// 	var result;
// 	if (str === "") {
// 		return "";
// 	} else {
// 		result = reverseNumber(str.substr(1)) + str.charAt(0);
// 	}

// 	return Number(result);
    
// }

// console.log(reverseNumber(1508));

// function reverse(num) {
//    return '\u202E' + num;
// }

// console.log(reverse(4512));

var rev_num = 0;
var base_pos = 1;

function reverseNum(num) {

	if (num > 0) {
		reverseNum(Math.floor(num / 10));
		rev_num += (num % 10) * base_pos;
		base_pos *= 10;
	}

    return rev_num;
}

console.log(reverseNum(876));

//============NestingStr Function==============
function showNestingStr(str) {

	if (str.length <= 1) {
		return false;
	}

	let openingBrackets = ["[", "{", "("];
  	let closingBrackets = ["]", "}", ")"];

  	let symbol;
  	let openSymbol;
    let stack = [];

	for (let i = 0; i < str.length; i++) {
		symbol = str[i];

		if (closingBrackets.indexOf(symbol) > -1) {
			openSymbol = openingBrackets[closingBrackets.indexOf(symbol)];
			if (stack.length === 0 || (stack.pop() !== openSymbol)) {
				return false;
			}
		} else {
			stack.push(symbol);
		}
	}

 	return stack.length === 0;
};

console.log(showNestingStr("{{}}}}}}}}"));
console.log(showNestingStr('{}')); 
console.log(showNestingStr('{{}}'));
console.log(showNestingStr('{{}}}'));
console.log(showNestingStr('{}{}{}{{}}'));
console.log(showNestingStr('}{{}'));

console.log(showNestingStr("(()))))))))"));
console.log(showNestingStr('())')); 
console.log(showNestingStr('(())))'));
console.log(showNestingStr('(()))))'));
console.log(showNestingStr('()()()(())))'));
console.log(showNestingStr(')(()))'));

console.log(showNestingStr("[[]]]]]]]]"));
console.log(showNestingStr('[]')); 
console.log(showNestingStr('[[]]'));
console.log(showNestingStr('[[]]]'));
console.log(showNestingStr('[][][][][]]'));
console.log(showNestingStr('][[]'));