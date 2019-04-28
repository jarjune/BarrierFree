# BarrierFree
无障碍阅读js库

## 用法

```javascript
// 实例化
// 参数 => 
// {id: '', barrierFreeDOM: '', gap: '', min: '', max: ''}
var bf = new BarrierFree();
```

| 参数 | 默认值 | 类型 | 描述 |
| ------ | ------ | ------ | ------ |
| id | BarrierFreeId | String | 需要无障碍阅读的DOMId, 传入id就不需要传dom |
| barrierFreeDOM | document.getElementById('BarrierFreeId') | Element | 需要无障碍阅读的DOM, 传入dom就不需要传id |
| gap | 0.2 | Number | 每次放大缩小的间距 |
| min | 1 | Number | 缩小的最小倍数 |
| max | 2 | Number | 放大的最大倍数 |

```javascript
// 获取标准线，工具栏组件
// 参数 => 
// {line: {className: ''}, toolbar: {el_toolbar: '<div></div>', className: ''}}
var component = bf.build();
```
> line  

| 参数 | 默认值 | 类型 | 描述 |
| ------ | ------ | ------ | ------ |
| className | line | String | 样式名 |

> toolbar

| 参数 | 默认值 | 类型 | 描述 |
| ------ | ------ | ------ | ------ |
| el_toolbar | ... | String | 默认的html |
| className | line | String | 样式名 |

```javascript
// 显示隐藏，参数为：组件【标准线】【工具栏】
bf.toggle(component.line)
bf.toggle(component.toolbar)

// 放大缩小
bf.increaseScale();
bf.decreaseScale();

// 改变背景颜色，参数为：颜色(在1.1及以后版本不建议使用)
bf.changeBackground('red');

// 改变背景颜色，参数为：css样式(1.1版本建议)
// example:
bf.changeStyle('.test button{ width: 100px; color: red }');
```
