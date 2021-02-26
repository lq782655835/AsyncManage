# AsyncManage
简易的异步进程管理器

``` js
import AsyncManage from 'async-manage'
const AutoReceiveTaskAsyncManage = new AsyncManage('AutoReceiveTask').fnQueue(2);

AutoReceiveTaskAsyncManage.listen(() => {}) // 监听
AutoReceiveTaskAsyncManage.push()
AutoReceiveTaskAsyncManage.push() // 队列塞满后触发事件
```