String.prototype.startWith = function(str) {
	if (str == null || str == "" || this.length == 0
			|| str.length > this.length)
		return false;
	if (this.substr(0, str.length) == str)
		return true;
	else
		return false;
}
Array.prototype.inArray = function(value) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == value)
			return true;
	}
	return false;
}
var AutoComplete = function(dom, options) {
	this.dom = dom;
	this.dom_value = dom.value;
	this.startPoint = options.startPoint || 10;
	this.handle_func = options.handle_func;
	this.callback = options.callback || function() {
	};
	this.onClick = options.onClick || function() {
	};
	this.selectAtEnter = options.selectAtEnter === void 0 ? true
			: options.selectAtEnter;
	this.promptNum = options.promptNum;
	this.automatic = options.automatic || false;
	this.selector = new AutoCompleteSelector(this);
	var __this = this;
	this.hide = function() {
		this.selector.hide();
	};
	this.dom.onkeypress = function(e) {
		if (__this.selector.visiable) {
			var e = e || event;
			var keynum;
			var cur_index;
			try {
				keynum = e.keyCode
			} catch (e) {
				keynum = e.which
			}
			if (keynum == 38) {
				if (__this.selector.last_item_index < 0) {
					cur_index = __this.selector.dom.childNodes.length - 1;
					__this.dom.value = __this.selector.dom.childNodes[cur_index].autoCompleteSelectItem.name;
				} else if (__this.selector.last_item_index == 0) {
					cur_index = -1;
					__this.dom.value = __this.dom_value;
				} else {
					cur_index = __this.selector.last_item_index - 1
					__this.dom.value = __this.selector.dom.childNodes[cur_index].autoCompleteSelectItem.name;
				}
				__this.selector.selectItem(cur_index);
			} else if (keynum == 40) {
				if (__this.selector.last_item_index == __this.selector.dom.childNodes.length - 1) {
					cur_index = -1;
					__this.dom.value = __this.dom_value;
				} else {
					cur_index = __this.selector.last_item_index + 1;
					__this.dom.value = __this.selector.dom.childNodes[cur_index].autoCompleteSelectItem.name;
				}
				__this.selector.selectItem(cur_index);
			} else if ((keynum == 13 || keynum == 9) && __this.selectAtEnter) {
				__this.selector.hide();
				if (__this.selector.last_item_index != -1)
					__this.dom.value = __this.selector.dom.childNodes[__this.selector.last_item_index].autoCompleteSelectItem.name;
				__this.callback();
				__this.selector.last_item_index = -1;
				return false;
			}
		} else {
			var e = e || event;
			var keynum;
			try {
				keynum = e.keyCode
			} catch (e) {
				keynum = e.which
			}
			if (keynum == 13 && __this.selectAtEnter) {
				__this.callback("no_use_value");
			}
		}
	}
	if (window.addEventListener) {
		__this.dom.addEventListener('input', function() {
			if (__this.dom.value.length < __this.startPoint)
				__this.selector.hide();
			else {
				__this.selector.last_item_index = -1;
				__this.search();
			}
		}, false);
	} else {
		this.dom.onkeyup = function(e) {
			var e = e || event;
			var keynum;
			try {
				keynum = e.keyCode
			} catch (e) {
				keynum = e.which
			}
			if (keynum != 38 && keynum != 40 && keynum != 13) {
				if (__this.dom.value.length < __this.startPoint)
					__this.selector.hide();
				else {
					__this.selector.last_item_index = -1;
					__this.search();
				}
			}
		}
	}
	function onMouseClick(evt) {
		var evt = evt || event;
		var target = evt.target || evt.srcElement;
		if (target != __this.dom && target != __this.selector.dom) {
			if (__this.automatic && __this.selector.last_item_index != -1)
				__this.dom.value = __this.selector.dom.childNodes[__this.selector.last_item_index].autoCompleteSelectItem.name;
			__this.selector.hide();
		}
	}
	if (document.body.attachEvent)
		document.body.attachEvent('onclick', onMouseClick);
	else
		document.body.addEventListener('click', onMouseClick, false);
}
AutoComplete.prototype = {
	search : function() {
		this.dom_value = this.dom.value;
		var keyword = this.dom.value;
		var result = this.handle_func(keyword);
		if (!result) {
			return;
		}
		this.set_result(result);
	},
	set_result : function(result) {
		if (result.length > this.promptNum)
			result = result.slice(0, this.promptNum);
		this.parseData.call(this, result);
		if (result.length > 0) {
			var ul = this.selector.dom;
			ul.style.width = 'auto';
			if (ul.clientWidth > this.dom.offsetWidth)
				ul.style.width = 'auto';
			else
				ul.style.width = this.dom.offsetWidth + 'px';
			this.selector.selectItem(0);
		}
	},
	parseData : function(data) {
		this.selector.load(data);
		if (this.selector.dom.childNodes.length > 0) {
			this.selector.show();
		} else {
			this.selector.hide();
		}
	}
}
var AutoCompleteSelector = function(autoCompleteObject) {
	this.autoCompleteObject = autoCompleteObject;
	this.last_item_index = -1;
	this.visiable = false;
	if (arguments[1]) {
		this.dom = arguments[1];
	} else {
		this.dom = this.createDefaultSelectorElement();
	}
}
AutoCompleteSelector.prototype = {
	createDefaultSelectorElement : function() {
		var target = this.autoCompleteObject.dom;
		var obj = target;
		var width = target.offsetWidth;
		var left = target.offsetLeft;
		var _top = target.offsetHeight + target.offsetTop;
		var div = document.createElement('div');
		div.className = 'drop';
		div.style.left = left + 'px';
		div.style.top = _top + 'px';
		this.autoCompleteObject.dom.parentNode.insertBefore(div,
				this.autoCompleteObject.dom.nextSibling);
		var ul = document.createElement("ul");
		ul.autoCompleteSelectorObject = this;
		div.appendChild(ul);
		return ul;
	},
	show : function() {
		this.visiable = true;
		this.dom.style.display = 'block';
	},
	hide : function() {
		this.visiable = false;
		this.dom.style.display = 'none';
	},
	load : function(data) {
		this.clear();
		for (var i = 0; i < data.length; i++) {
			var item = new AutoCompleteSelectItem(data[i], this);
			this.add(item);
		}
	},
	clear : function() {
		this.dom.innerHTML = '';
	},
	add : function(item) {
		this.dom.appendChild(item.dom);
	},
	remove : function(item) {
		this.dom.removeChild(item.dom);
	},
	selectItem : function(index) {
		if (this.last_item_index >= 0) {
			this.dom.childNodes[this.last_item_index].className = '';
		}
		if (index >= 0) {
			this.dom.childNodes[index].className = 'on';
		}
		if (this.last_item_index != index) {
			this.last_item_index = index;
		}
	}
}
var AutoCompleteSelectItem = function(data, autoCompleteSelectorObject) {
	this.name = data;
	this.autoCompleteSelectorObject = autoCompleteSelectorObject;
	this.dom = this.create();
	var __this = this;
	this.dom.onclick = function() {
		__this.autoCompleteSelectorObject.autoCompleteObject.dom.value = __this.name;
		__this.autoCompleteSelectorObject.autoCompleteObject.dom.select();
		__this.autoCompleteSelectorObject.hide();
		__this.autoCompleteSelectorObject.autoCompleteObject.onClick();
	}
}
AutoCompleteSelectItem.prototype = {
	get_index : function(obj) {
		for (var i = 0; i < this.autoCompleteSelectorObject.dom.childNodes.length; i++) {
			if (this.autoCompleteSelectorObject.dom.childNodes[i] == obj)
				return i;
		}
		return -1;
	},
	create : function() {
		var li = document.createElement('li');
		__this = this;
		li.onmouseover = function(evt) {
			var evt = evt || event;
			var target = evt.target || evt.srcElement;
			div_index = __this.get_index(target);
			if (div_index == -1)
				return

			__this.autoCompleteSelectorObject.selectItem(div_index);
			__this.autoCompleteSelectorObject.autoCompleteObject.dom.focus();
		}
		li.innerHTML = this.name;
		li.autoCompleteSelectItem = this;
		return li;
	}
}