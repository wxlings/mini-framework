> js 语法
```js

	js 空格:&nbsp >:&gt;
	

	数组操作： let first = ['a','b','c','d'] let second = ['e','f','g']
	数组合并： concat
	let new = first.concat(second) //合并到 ['a','b','c','d','e','f','g'] 
	
	向数组+最后插入元素：push
	first.push("z") // ['a','b','c','d','z']
	移除最后一个元素：pop
	first.pop() // ['a','b','c']
	向数组第一位插入数据： shift
	first.shift('k') // ['k','a','b','c','d']
	移除数组第一位元素：unshift
	first.unshift() // ['b','c','d']
	
	indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
	
	如果没有找到匹配的字符串则返回 -1。
	
	
	数组的深复制:
	let a = [1,2,3]
	
	> es6 ...
	let b = [...a]
	b.push(4) // b = [1,2,3,4]
	
	> concat
	let c = concat([],a) 
	c.push(4) // c = [1,2,3,4]
	
	> from


	对象的深复制: 常用方式
	let a = {name:'w',age:20}
	let b = Object.assin({},a) // 方式一 常用
	let c = Object.create(a) // 方式二
	let d = {...a} // 方式三 es6
	
```

> #### 基础
 ```js
	变量声明: var ,let ,const
	`var` 全局有效 可以重复声明
	`let` 声明的变量只在'let'命令所在的代码块内有效。声明范围内只能声明一次 适合for循环
	`const` 声明一个只读的常量，一旦声明，常量的值就不能改变。如果是引用类型的值,引用数据内部数据可以修改
 ```

#### [es6](https://www.runoob.com/w3cnote/es6-object.html)

 > #### 常量符号：
 ```js
	人民币符号:  `¥`  `￥`
	html实体符号: `空格` => `&nbsp` , `>` => `&gt;` , `<` => `&lt;` , `"` =>`&quot;` , `&` => `&amp;`
 ```

> #### [数据类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)
```js
	> 基本类型（基本数值、基本数据类型）是一种既非对象也无方法的数据 所有基本类型的值都是不可改变的。
	> 在 JavaScript 中，共有7种基本类型：
	> [String](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)，
	> [Number](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number)，
	> [Boolean](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean)，
	> BigInt，Null，Undefined，Symbol (ECMAScript 2016新增)。
	
	全局类型转换:
		parseInt() parseFloat() toString()
		
	Boolean: 对象是一个布尔值的对象包装器, 0、-0、null、false、NaN、undefined、或者空字符串（""），则生成的 Boolean 对象的值为 false。
			> 注意:字符串'false'是真值,let a = Boolean("false") // a === true
	Number: 对象是经过封装的能让你处理数字值的对象,
			> Number.isNaN(param) 确定传递的值是否为 NaN，并且检查其类型是否为 Number。
			> Number.MAX_VALUE 能表示的最大正数。
			> let a = Number("123") // a === 123  等同于全局方法:parseInt("123")
			> let b = Number('adb') // b ==== NaN
	String: 对象是一个用于字符串或一个字符序列的构造函数。和其他语言一样使用''或者""进行包裹
			> 转义: \0, \' , \" , \\ , \n (next) , \r (return), \t
			
			> 可以使用 '+'把多个字符拼接: let a = 'This is ' + 'letter ' + 'a'
			> 如果字符串过长可以使用 '\' 进行标识 
				let str = "Hello(h e l l o),\
				world(w o r l d)\
				!!!(speech)" 
				console.log(temp,temp.length)
			str.concat('@#$$%') // 不建议使用;将一个或多个字符串与原字符串连接合并，形成一个新的字符串并返回 建议使用 赋值操作符（+, +=）代替 concat 方法。		
			str.startsWith('Hello',startIndex) // 是否以指定字符开始
			str.endsWith('speech',startIndex) // 是否以指定字符结束 
			str.indexOf('world',startIndex) // 从指定的index开始查找是否包含指定的子串,并返回index,没有即返回-1,index 不声明默认为0,支持负数
			str.includes('hello',startIndex) // 是否包含指定的字符
			str.substring(5,10) // 返回指定index之间的字串,末位index不声明默认字符串最后一位,不可以是负数
			str.substr(1,2) // 不建议使用,可能会被废弃,请使用subString()替换
			str.slice() //与subStrin()相同,但是支持负数
			str.trim() //从一个字符串的两端删除空白字符,并返回除空的新值
			str.trimStart() //从字符串的开头删除空格。trimLeft() 是此方法的别名
			str.trimEnd() // 从一个字符串的末端移除空白字符.trimRight() 是此方法的别名
			str.toUpperCase() //转为大写,并返回
			str.toLowerCase() // 转为小写,并返回
			str.split(',') // 根据参数把字符串分割为数组返回
			str.padStart(totalLength,'tag') // 左侧补全,使用指定tag补全到指定位数 ,例如 :h.padStart(5,'-')  => 'h----'
			str.padEnd(totalLength,'tag') // 右侧补全,使用指定tag补全到指定位数,例如 :h.padEnd(5,'-')  => '----h'
			str.match(RegExp) // 检索返回一个字符串匹配正则表达式的的结果。
			regExp.text(str) // 返回Boolean ,字符串是否满足正则条件 	
			
			字符串模板:
			let a = 100
			funcation add(params){
				resturn "params:" + params
			}
			let b = `This is ${a},and ${add(100)}` 
		
```

 > #### [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 对象用于表示一个异步操作的最终完成 (或失败), 及其结果值 ;Promise是一个函数返回的对象，我们可以在它上面绑定回调函数，这样我们就不需要在一开始把回调函数作为参数传入这个函数了。
 
 ```js
	let request = new Promise((resolve,reject) =>{
		setTimeout(()=>{
			let success = {
				code:1,
				msg:'success'
			}
			let fail={
				code:0,
				msg:'fail'
			}
			resolve(success)
			//reject(fail)
		},3000)
	})
	
	request.then(res=>{
		console.log("resolve:",res)
	},err=>{
		console.log("reject:",res)
	})
	
	Promist 支持链式调用
 ```
 
 
 > #### [Map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map) 保存键值对，并且能够记住键的原始插入顺序。任何值(对象或者原始值) 都可以作为一个键或一个值。
 
 ```js
	let map = new Map(['k','v']) // 可以在构造函数直接初始化值
	map.set('key','value') // add key-value 键值对
	let hadKey = map.has(key) // 是否含有key值 :Boolean
	let value = map.get(key) // 获取key对应的value，如果没有则返回undifine
	let keys = map.keys() // 返回所有key的Iterator
	let values = map.values() // 返回所有value的Iterator
	let entries = map.entries() // 返回一个key-value键值对的Iterator
	map.delete(key) // 移除指定的key关联的键值对
	map.clear() // 移除所有键值对
	map.forEach((value,key,map)=>{ // 遍历Map并执行函数
		console.log('key:',key,'value:',value,'lenth:',map.length)
	})
 ```
 
 > #### [Object](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object) 创建一个对象包装器。
```js

	let person = {
		name:'Jeck',
		age:18,
		eat(food){
			console.log('This person eat:',food)
		}
	}
	
	let title = 'hello,world'
	let content = "This is a text!"
	let c = {title,content} // 使用字面量创建对象
	
	> 获取属性: object.key 和 object['key']
	console.log('Person`s name:',person.name)
	console.log('Person`s age:',person['age'])
	person.eat()
	
	> this 只当前运行上下文
	let a = {name:'wxl',age:21}
	let b = {name:'jeck',gender:'male'}
	let c = {job:'....'}
	Object.assin(a,b,c) // 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。{name:'jeck',age:21,gender:'male'}

	> 深层次复制对象,生成一个新对象
	let c = Object.create(a)
	console.log(c === a) // false 
	
	`...`  对象的拓展运算符:用于取出参数对象所有可遍历属性然后拷贝到当前对象。
	let d = {...b} // d 与 b的属性相同
```



> ####[Funcation]()
> 
```js
	基本声明一个函数
	funcation f(params){
		console.log(params)
	}
	
	箭头函数:把函数看作对象然后赋值给一个变量 
	let f = (param) =>{
		console.log(params)
	}
```

> ####[JSON](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON)  对象包含两个方法,除了这两个方法, JSON这个对象本身并没有其他作用，也不能被调用或者作为构造函数调用。
```js
	JSON.parse() 解析JSON字符串并返回对应的值，可以额外传入一个转换函数，用来将生成的值和其属性, 在返回之前进行某些修改。
	JSON.stringify() 返回与指定值对应的JSON字符串，可以通过额外的参数, 控制仅包含某些属性, 或者以自定义方法来替换某些key对应的属性值。
	let params = {
		name:'Jeck',
		age:18,
		male:True
	}
	let s = JSON.stringify(params)
	let o = JSON.parse(s)
```