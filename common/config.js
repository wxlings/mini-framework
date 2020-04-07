
import constant from './const.js'

const DEV = constant.Env.DEV
const PRE = constant.Env.PRE
const PRO = constant.Env.PRO

/**
 * 关键点:发布版本时重新赋值Env即可及
 */
const ENV = DEV 
const VERTIONS = ['1','1','1'] // 当前小程序版本,依据实际开发版本修改

// HOST DOMAIN
const HOST_DEV = 'https://jdtest.renrenyoupin.com' //开发模式
const HOST_PRE = 'https://jdtest.renrenyoupin.com' // 体验模式
const HOST_PRO = 'https://jd.renrenyoupin.com' // 正式环境

// HOST VARIABLES
const HOST = {
	[DEV]:{
		host:HOST_DEV,
		env:ENV,
		version:VERTIONS[0]
	},
	[PRE]:{
		host:HOST_PRE,
		env:ENV,
		version:VERTIONS[1]
	},
	[PRO]:{
		host:HOST_PRO,
		env:ENV,
		version:VERTIONS[2]
	}
}

module.exports = HOST[ENV]

