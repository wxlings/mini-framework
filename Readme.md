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


	对象的深复制:
	let a = {a:1,b:2}
	
	let b = Object.assin({},a)
	
```


 > ###[Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 对象用于表示一个异步操作的最终完成 (或失败), 及其结果值 ;Promise是一个函数返回的对象，我们可以在它上面绑定回调函数，这样我们就不需要在一开始把回调函数作为参数传入这个函数了。
 ```js
	let _this = this
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
		console.log("resolve callback:",res)
	},err=>{
		console.log("reject callback:",res)
	})
	
	Promist 支持链式调用
 ```
 
 
 > ###[Map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)保存键值对，并且能够记住键的原始插入顺序。任何值(对象或者原始值) 都可以作为一个键或一个值。
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