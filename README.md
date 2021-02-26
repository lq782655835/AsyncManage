# AsyncManage
简易的异步进程管理器

异步管理类，解决多个不同的异步任务，必须都完成后再执行（类似PromiseAll）
``` js
import AsyncManage from 'async-manage'
const AutoReceiveTaskAsyncManage = new AsyncManage('AutoReceiveTask').fnQueue(2);

AutoReceiveTaskAsyncManage.listen(() => {}) // 监听
AutoReceiveTaskAsyncManage.push()
AutoReceiveTaskAsyncManage.push() // 队列塞满后触发事件
```