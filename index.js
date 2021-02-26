/**
 * 异步管理类
 * 解决多个不同的异步任务，必须都完成后再执行（类似PromiseAll）
 * // 使用
 * const AutoReceiveTaskAsyncManage = new EventClass('AutoReceiveTask').fnQueue(2);
 * AutoReceiveTaskAsyncManage.listen(() => {}) // 监听
 * AutoReceiveTaskAsyncManage.push()
 * AutoReceiveTaskAsyncManage.push() // 队列塞满后触发事件
 */
export default class EventClass {
	constructor(eventName) {
		this.queue = {};
		this.eventName = eventName;
	}

	listen(eventName, callback) {
		const list = this.queue[eventName] || (this.queue[eventName] = []);
		list.push(callback);
		return this;
	}

	trigger(eventName, data) {
		const list = this.queue[eventName] || (this.queue[eventName] = []);

		for (let i = 0; i < list.length; i++) {
			list[i].call(this, data);
		}
		return this;
	}

	fnQueue(len = 2) {
		const funs = []; // 线程队列
		let runs = 0; // 当前运行的线程数
		const that = this;
		return {
			/* eslint-disable object-shorthand */
			push: function (fn = () => {}) {
				funs.push(fn);
				this.run();
			},
			/* eslint-disable object-shorthand */
			run: function () {
				if (runs < len && funs.length) {
					funs.shift()(this);
					runs++;

					// 异步全部完成后触发事件
					if (runs === len) {
						that.trigger(that.eventName);
					}
				}
			},
			listen: (callback) => that.listen(that.eventName, callback),
		};
	}
}
