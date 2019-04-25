# BarrierFree
无障碍阅读js库

## 用法

```javascript
// 实例化
var bf = new BarrierFree();

// 获取标准线，工具栏组件
var component = bf.build();

// 显示隐藏，参数为：组件【标准线】【工具栏】
bf.toggle(component.line)
bf.toggle(component.toolbar)

// 放大缩小
bf.increaseScale();
bf.decreaseScale();

// 改变背景颜色，参数为：颜色
bf.changeBackground('red');
```
