/**
 * @author jarjune
 * @version 1.1
 * @description
 * @date 2019/04/25
 */
function BarrierFree(paramsObj) {

	this._body = document.getElementsByTagName('body')[0];

	this.defaultId = 'BarrierFreeId';
	this.barrierFreeDOM = document.getElementById(this.defaultId);

	// 缩放参数
	this._scale = 1;
	this._gap = 0.2;
	this._min = 1;
	this._max = 2;

	if(paramsObj instanceof Object) {

		this.defaultId = paramsObj['id'] || this.defaultId;
		this.barrierFreeDOM = paramsObj['barrierFreeDOM'] || document.getElementById(this.defaultId);

		// 缩放参数
		this._gap = paramsObj['gap'] || this._gap;
		this._min = paramsObj['min'] || this._min;
		this._max = paramsObj['max'] || this._max;
	}
}

BarrierFree.Line = function(paramsObj) {

	this.className = 'line';

	if(paramsObj instanceof Object) {
		this.className = paramsObj['className'] || this.className;
	}
};
BarrierFree.Line.prototype.create = function() {

	console.log('>>> 创建线 <<<');
	this.node = document.createElement('div');
	this.node.setAttribute('class', this.className);

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

BarrierFree.ToolBar = function(paramsObj) {

	var css1 = 'body{ color: #19f; font-size: 50px; }';
	var css2 = '.test button{ width: 100px; color: red }';

	this.el_toolbar = '无障碍阅读\
	<button onclick="bf.toggle(component.line);">线</button>\
	<button onclick="bf.increaseScale()">放大</button>\
	<button onclick="bf.decreaseScale()">缩小</button>\
	<button onclick="bf.changeBackground(\'red\')">颜色1</button>\
	<button onclick="bf.changeBackground(\'yellow\')">颜色2</button>\
	<button onclick="bf.changeBackground(\'blue\')">颜色3</button>\
	<button onclick="bf.changeBackground(\'\')">重置颜色</button>\
	<button onclick="bf.changeStyle(\''+ css1 +'\')">改变样式1</button>\
	<button onclick="bf.changeStyle(\''+ css2 +'\')">改变样式2</button>\
	<button onclick="bf.changeStyle(\'\')">重置样式</button>';

	this.className = 'toolbar';

	if(paramsObj instanceof Object) {
		this.el_toolbar = paramsObj['el_toolbar'] || this.el_toolbar;
		this.className = paramsObj['className'] || this.className;
	}
};
BarrierFree.ToolBar.prototype.create = function() {

	this.node = document.createElement('div');
	this.node.setAttribute('class', this.className);
	this.node.innerHTML = this.el_toolbar;

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

 	this.barrierFreeDOM.style.transformOrigin = 'top left';
 	this._scale = this._scale + this._gap;
 	this.barrierFreeDOM.style.transform = 'scale('+ (this._scale > this._max? (this._scale = this._max): (this._scale)) +')';
 	return this;
 }

/**
 * 缩小
 */
 BarrierFree.prototype.decreaseScale = function() {

 	this.barrierFreeDOM.style.transformOrigin = 'top left';
 	this._scale = this._scale - this._gap;
 	this.barrierFreeDOM.style.transform = 'scale('+ (this._scale < this._min? (this._scale = this._min): (this._scale)) +')';
 	return this;
 }

 /**
 * 改变背景颜色
 * @deprecated since 1.0
 */
 BarrierFree.prototype.changeBackground = function(color) {

 	console.warn('>>> 已弃用修改背景方法，建议使用[changeStyle] <<<');
 	var className = 'changeBackground-' + this.color;
 	this.barrierFreeDOM.classList.remove(className)
 	this.color = color;

 	className = 'changeBackground-' + color;
 	if(color) {
 		if(this.styleElement) {
 			this.colorElement && this.styleElement.removeChild(this.colorElement);
	 		this.colorElement = document.createTextNode('.' + className + ', .' + className + ' *{ background-color: '+ color +' !important; }');
	 		this.styleElement.appendChild(this.colorElement);
 		} else {
	 		this.styleElement = document.createElement('style');
	 		this.styleElement.type = 'text/css';
	 		document.getElementsByTagName('head')[0].appendChild(this.styleElement);

	 		this.colorElement = document.createTextNode('.' + className + ', .' + className + ' *{ background-color: '+ color +' !important; }');
	 		this.styleElement.appendChild(this.colorElement);
 		}

 		this.barrierFreeDOM.classList.add(className)
 	} else {
 		// fix.还未设置样式的时候点重置出错
 		this.styleElement && document.getElementsByTagName('head')[0].removeChild(this.styleElement);
 		this.styleElement = null;
 		this.colorElement = null;
 	}

 	return this;
 }

 /**
 * 改变css样式
 */
 BarrierFree.prototype.changeStyle = function(_css) {

 	if(_css) {
 		if(this.styleElement) {
 			this.cssElement && this.styleElement.removeChild(this.cssElement);
	 		this.cssElement = document.createTextNode(_css);
	 		this.styleElement.appendChild(this.cssElement);
 		} else {
	 		this.styleElement = document.createElement('style');
	 		this.styleElement.type = 'text/css';
	 		document.getElementsByTagName('head')[0].appendChild(this.styleElement);

	 		this.cssElement = document.createTextNode(_css);
	 		this.styleElement.appendChild(this.cssElement);
 		}

 	} else {
 		this.styleElement && document.getElementsByTagName('head')[0].removeChild(this.styleElement);
 		this.styleElement = null;
 		this.cssElement = null;
 	}

 	return this;
 }

/**
 * 返回内部组件实例
 */
 BarrierFree.prototype.build = function(paramsObj) {

 	var lineParamsObj;
 	var toolBarParamsObj;

 	if(paramsObj instanceof Object) {
 		lineParamsObj = paramsObj['line'];
 		toolBarParamsObj = paramsObj['toolbar'];
 	}

 	return {
 		line: new BarrierFree.Line(lineParamsObj),
 		toolbar: new BarrierFree.ToolBar(toolBarParamsObj)
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