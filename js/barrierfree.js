/**
 * @author jarjune
 * @version 1.0
 * @description
 * @date 2019/04/25
 */
function BarrierFree() {

	this._body = document.getElementsByTagName('body')[0];

	this.defaultId = 'BarrierFreeId';
	this.barrierFreeIdDOM = document.getElementById(this.defaultId);

	// 缩放参数
	this._scale = 1;
	this._gap = 0.2;
	this._min = 1;
	this._max = 2;
}

BarrierFree.Line = function() {};
BarrierFree.Line.prototype.create = function() {

	console.log('>>> 创建线 <<<');
	this.node = document.createElement('div');
	this.node.setAttribute('class', 'line');

	var horizontalLine = document.createElement('div');
	var verticalLine = document.createElement('div');
	this.node.appendChild(horizontalLine);
	this.node.appendChild(verticalLine);

	document.getElementsByTagName('body')[0].appendChild(this.node);

	window.onmousemove = function(e) {
		var x = e.clientX + 5;
		var y = e.clientY + 5;

		verticalLine.style.top = y + 'px'
		horizontalLine.style.left = x + 'px'
	}
}

BarrierFree.Line.prototype.remove = function() {

	window.onmousemove = null;
	document.getElementsByTagName('body')[0].removeChild(this.node);
	console.log('>>> 删除线 <<<');
}

BarrierFree.ToolBar = function() {};
BarrierFree.ToolBar.prototype.create = function() {

	this.node = document.createElement('div');
	this.node.setAttribute('class', 'toolbar');
	this.node.innerHTML = '无障碍阅读\
	<button onclick="bf.toggle(component.line);">线</button>\
	<button onclick="bf.increaseScale()">放大</button>\
	<button onclick="bf.decreaseScale()">缩小</button>\
	<button onclick="bf.changeBackground(\'red\')">颜色1</button>\
	<button onclick="bf.changeBackground(\'yellow\')">颜色2</button>\
	<button onclick="bf.changeBackground(\'blue\')">颜色3</button>\
	<button onclick="bf.changeBackground(\'\')">重置颜色</button>'

	document.getElementsByTagName('body')[0].appendChild(this.node);
	console.log('>>> 创建工具栏 <<<');

}

BarrierFree.ToolBar.prototype.remove = function() {

	document.getElementsByTagName('body')[0].removeChild(this.node);
	console.log('>>> 删除工具栏 <<<');
}

/**
 * 放大
 */
 BarrierFree.prototype.increaseScale = function() {

 	this.barrierFreeIdDOM.style.transformOrigin = 'top left';
 	this._scale = this._scale + this._gap;
 	this.barrierFreeIdDOM.style.transform = 'scale('+ (this._scale > this._max? (this._scale = this._max): (this._scale)) +')';
 	return this;
 }

/**
 * 缩小
 */
 BarrierFree.prototype.decreaseScale = function() {

 	this.barrierFreeIdDOM.style.transformOrigin = 'top left';
 	this._scale = this._scale - this._gap;
 	this.barrierFreeIdDOM.style.transform = 'scale('+ (this._scale < this._min? (this._scale = this._min): (this._scale)) +')';
 	return this;
 }

 /**
 * 改变颜色
 */
 BarrierFree.prototype.changeBackground = function(color) {

 	var className = 'changeBackground-' + this.color;
 	this.barrierFreeIdDOM.classList.remove(className)
 	this.color = color;

 	className = 'changeBackground-' + color;
 	if(color) {
 		if(this.styleElement) {
 			this.styleElement.removeChild(this.colorElement);
	 		this.colorElement = document.createTextNode('.' + className + ', .' + className + ' *{ background-color: '+ color +' !important; }');
	 		this.styleElement.appendChild(this.colorElement);
 		} else {
	 		this.styleElement = document.createElement('style');
	 		this.styleElement.type = 'text/css';
	 		document.getElementsByTagName('head')[0].appendChild(this.styleElement);

	 		this.colorElement = document.createTextNode('.' + className + ', .' + className + ' *{ background-color: '+ color +' !important; }');
	 		this.styleElement.appendChild(this.colorElement);
 		}

 		this.barrierFreeIdDOM.classList.add(className)
 	} else {
 		document.getElementsByTagName('head')[0].removeChild(this.styleElement);
 		this.styleElement = null;
 		this.colorElement = null;
 	}

 	return this;
 }

/**
 * 返回内部组件实例
 */
 BarrierFree.prototype.build = function() {
 	return {
 		line: new BarrierFree.Line(),
 		toolbar: new BarrierFree.ToolBar()
 	}
 }

 BarrierFree.prototype.create = function(obj) {

 	obj.isCreated || obj.create();
 	obj.isCreated = true;
 }

 BarrierFree.prototype.remove = function(obj) {

 	obj.isCreated && obj.remove();
 	obj.isCreated = false;
 }

 BarrierFree.prototype.toggle = function(obj) {

 	if(obj.isCreated) {
 		obj.remove();
 		obj.isCreated = false;
 	} else {
 		obj.create();
 		obj.isCreated = true;
 	}
 }

 var bf = new BarrierFree();
 var component = bf.build();