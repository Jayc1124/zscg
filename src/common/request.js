// const baseUrl = 'https://cdn.zhoukaiwen.com/';
// const baseUrl = 'http://192.168.137.1:7777/';
const baseUrl = 'https://wx.jaycao.com/';
// const baseUrl = 'http://localhost:7777/';
// const baseUrl = 'http://221.236.130.237:81/';

const request = (opts, data) => {
	uni.onNetworkStatusChange(function(res) {
		if (!res.isConnected) {
			uni.showToast({
				title: '网络连接不可用！',
				icon: 'none'
			});
		}
		return false
	});
	let httpDefaultOpts = {
		url: opts.url,
		data: data,
		method: opts.method,
		header: opts.method == 'get' ? {
			'X-Requested-With': 'XMLHttpRequest',
			"Accept": "application/json",
			"Content-Type": "application/json; charset=UTF-8"
		} : {
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/json; charset=UTF-8'
		},
		dataType: 'json',
	}
	let promise = new Promise(function(resolve, reject) {
		uni.request(httpDefaultOpts).then(
			(res) => {
				resolve(res)
			}
		).catch(
			(response) => {
				reject(response)
			}
		)
	})
	return promise
};
// 不带token请求
const httpRequest = (opts, data) => {
	uni.showLoading({
		title: '加载中'
	});
	uni.onNetworkStatusChange(function(res) {
		if (!res.isConnected) {
			uni.showToast({
				title: '网络连接不可用！',
				icon: 'none'
			});
		}
		return false
	});
	let httpDefaultOpts = {
		url: baseUrl + opts.url,
		data: data,
		method: opts.method,
		header: opts.method == 'get' ? {
			'X-Requested-With': 'XMLHttpRequest',
			"Accept": "application/json",
			"Content-Type": "application/json; charset=UTF-8"
		} : {
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/json; charset=UTF-8'
		},
		dataType: 'json',
	}
	let promise = new Promise(function(resolve, reject) {
		
		uni.request(httpDefaultOpts).then(
			(res) => {
				// console.log(res[1])
				uni.hideLoading()
				resolve(res)
			}
		).catch(
			(response) => {
				uni.hideLoading()
				reject(response)
			}
		)
	})
	return promise
};
const httpTokenRequest = (opts, data) => {
	
	uni.onNetworkStatusChange(function(res) {
		if (!res.isConnected) {
			uni.showToast({
				title: '网络连接不可用！',
				icon: 'none'
			});
		}
		return false
	});
	let token = uni.getStorageSync('token');
	// hadToken()
	if (token == '' || token == undefined || token == null) {
		uni.showToast({
			title: '账号已过期，请重新登录',
			icon: 'none',
			complete: function() {
				uni.setStorage({
					key: 'login_id',
					data: false,
					success: () => {
						uni.reLaunch({
							url: '/pages/login/login'
						});
					}
				});
			}
		});
	} else {
		uni.showLoading({
			// title: '加载中'
		});
		let httpDefaultOpts = {
			url: baseUrl + opts.url,
			data: data,
			method: opts.method,
			header: opts.method == 'get' ? {
				'Authorization': 'wx ' + token,
				'X-Requested-With': 'XMLHttpRequest',
				"Accept": "application/json",
				"Content-Type": "application/json; charset=UTF-8"
			} : {
				'Authorization': 'wx ' + token,
				'X-Requested-With': 'XMLHttpRequest',
				'Content-Type': 'application/json; charset=UTF-8'
			},
			dataType: 'json',
		}
		let promise = new Promise(function(resolve, reject) {
			uni.request(httpDefaultOpts).then(
				(res) => {
					if (res.data.code == 200) {
						uni.hideLoading()
						resolve(res)
					} else {
						
						uni.hideLoading()
						if (res.data.code == 401) {
							
							uni.showToast({
								title: 'Token已过期',
								icon: "none",
							});
							setTimeout(() => {
								uni.reLaunch({
									url: '/pages/login/login'
								});
								uni.setStorageSync('login_id',false);
							}, 1000)
						} else {
							uni.hideLoading()
							resolve(res)
							// uni.showToast({
							// 	title: '' + res[1].data.message,
							// 	icon: 'none'
							// })
						}
					}
				}
			).catch(
				(response) => {
					uni.hideLoading()
					reject(response)
				}
			)
		})
		return promise
	}
	// let token = uni.getStorageSync('token')
	//此token是登录成功后后台返回保存在storage中的
};


const httpupload = (opts, data) => {
	uni.onNetworkStatusChange(function(res) {
		if (!res.isConnected) {
			uni.showToast({
				title: '网络连接不可用！',
				icon: 'none'
			});
		}
		return false
	});
	let token = uni.getStorageSync('token');
	// hadToken()
	if (token == '' || token == undefined || token == null) {
		uni.showToast({
			title: '账号已过期，请重新登录',
			icon: 'none',
			complete: function() {
				uni.setStorage({
					key: 'login_id',
					data: false,
					success: () => {
						uni.reLaunch({
							url: '/pages/login/login'
						});
					}
				});
			}
		});
	} else {
		let httpDefaultOpts = {
			url: baseUrl + opts.url, //仅为示例，非真实的接口地址
			filePath: opts.filePath,
			name: 'image',
			formData: {},
			header: {
				'Authorization': 'wx ' + token,
				'X-Requested-With': 'XMLHttpRequest',
			},
		}
		let promise = new Promise(function(resolve, reject) {
			uni.uploadFile(httpDefaultOpts).then(
				(res) => {
					if (res[1].data.code == 200) {
						resolve(res[1])
					} else {
						if (res[1].data.code == 401) {
							uni.showToast({
								title: 'Token已过期',
								icon: "none",
							});
							setTimeout(() => {
								uni.reLaunch({
									url: '/pages/login/login'
								});
								uni.setStorageSync('login_id',false);
							}, 1000)
						} else {
							resolve(res[1])
						}
					}
				}
			).catch(
				(response) => {
					reject(response)
				}
			)
		})
		return promise
	}
	// let token = uni.getStorageSync('token')
	//此token是登录成功后后台返回保存在storage中的
};


const httpJwRequest = (opts, data) => {
	
	uni.onNetworkStatusChange(function(res) {
		if (!res.isConnected) {
			uni.showToast({
				title: '网络连接不可用！',
				icon: 'none'
			});
		}
		return false
	});
	let token= uni.getStorageSync("jwToken")
	console.log("token:"+token)
	if (token == '' || token == undefined || token == null) {
		uni.showToast({
			title: '服务尚未开启',
			icon: 'none'
		
		});
	} else {
		uni.showLoading({
			// title: '加载中'
		});
		let httpDefaultOpts = {
			url: "https://jw.jaycao.com/cdgyxyhd/" + opts.url,
			data: data,
			method: opts.method,
			header: opts.method == 'get' ? {
				'token': token,
				'X-Requested-With': 'XMLHttpRequest',
				"Accept": "application/json",
				"Content-Type": "application/json; charset=UTF-8"
			} : {
				'token': token,
		
				'Content-Type': 'application/json; charset=UTF-8'
			},
			dataType: 'json',
		}
		let promise = new Promise(function(resolve, reject) {
			uni.request(httpDefaultOpts).then(
				(res) => {
					if (res.data.code == 200) {
						uni.hideLoading()
						resolve(res)
					} else {
						
						uni.hideLoading()
						if (res.data.code == 401) {
							
							uni.showToast({
								title: '服务未开启',
								icon: "none",
							});
							
						} else {
							uni.hideLoading()
							resolve(res)
							// uni.showToast({
							// 	title: '' + res[1].data.message,
							// 	icon: 'none'
							// })
						}
					}
				}
			).catch(
				(response) => {
					uni.hideLoading()
					reject(response)
				}
			)
		})
		return promise
	}
	// let token = uni.getStorageSync('token')
	//此token是登录成功后后台返回保存在storage中的
};
const hadToken = () => {
	let token = uni.getStorageSync('token');

	if (token == '' || token == undefined || token == null) {
		uni.showToast({
			title: '账号已过期，请重新登录',
			icon: 'none',
			complete: function() {
				uni.reLaunch({
					url: '/pages/login/login'
				});
			}
		});
		return false;
	}
	return true
}
export default {
	baseUrl,
	httpJwRequest,
	httpRequest,
	httpTokenRequest,
	hadToken,
	request,
	httpupload
}
