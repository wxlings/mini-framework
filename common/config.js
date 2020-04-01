
import constant from './const.js'

const DEV = constant.Env.DEV
const PRE = constant.Env.PRE
const PRO = constant.Env.PRO
/**
 * 关键点:发布版本时重新赋值Env即可
 */
const ENV = DEV 

// 域名设置
const versions = ['v1','v2','v3'] // 当前小程序版本

const HOST_DEV = "https://jdtest.renrenyoupin.com" //开发模式
const HOST_PRE = "https://jdtest.renrenyoupin.com" // 体验模式
const HOST_PRO = "https://jd.renrenyoupin.com" // 正式环境

const HOST = {
	develop:{
		host:HOST_DEV,
		env:ENV,
		version:versions[0]
	},
	preview:{
		host:HOST_PRE,
		env:ENV,
		version:versions[1]
	},
	production:{
		host:HOST_PRO,
		env:ENV,
		version:versions[2]
	}
}

module.exports = HOST[ENV]

