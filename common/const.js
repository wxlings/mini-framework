/*
 * 常量声明
 */

const Env = {
	DEV:'develop',
	PRE:'preview',
	PRO:'production'
}

// 关于Storage key 声明
const Storage = {
	USER:'user_info',
	HISTORY:'history_product',
	TOKEN:'token'
}

// 关于事件发送key,建议使用域名前缀
const Event = {
	LOGIN_SUCCESS:'/minimall/login_success',
	LOGIN_OUT:'/minimall/logout_success'
}

// 关于运行时的配置
const Runtime = {
	
}

export default {Env,Storage,Event,Runtime}