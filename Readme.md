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