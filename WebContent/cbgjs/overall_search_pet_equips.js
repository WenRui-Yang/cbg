var SearchFormObj = null;
var QueryArgs = null;
var EquipAddonStatus = [ "高级合纵", "高级法术抵抗", "高级盾气", "合纵", "法术抵抗", "盾气", "惊心一剑",
		"死亡召唤", "上古灵符", "善恶有报", "力劈华山", "夜舞倾城", "剑荡四方" ];
var OVERALL_SEARCH_PET_EQUIP_ARGS_CONFIG = [ [ 'level', '等级', 'sub_list', {
	belong : '等级',
	sub_type : 'slider',
	elem : 'level_slider',
	rank : 1
} ], [ 'equip_pos', '装备类型', 'sub_list', {
	belong : '装备类型',
	sub_type : 'list',
	elem : '#EquipPosBox li',
	rank : 2
} ], [ 'speed', '速度', 'sub_list', {
	belong : '装备属性',
	sub_type : 'input',
	rank : 3,
	elem : '#speed'
} ], [ 'fangyu', '防御', 'sub_list', {
	belong : '装备属性',
	sub_type : 'input',
	rank : 3,
	elem : '#fangyu'
} ], [ 'hp', '气血', 'sub_list', {
	belong : '装备属性',
	sub_type : 'input',
	rank : 3,
	elem : '#hp'
} ], [ 'shanghai', '伤害', 'sub_list', {
	belong : '装备属性',
	sub_type : 'input',
	rank : 3,
	elem : '#shanghai'
} ], [ 'mofa', '魔法', 'sub_list', {
	belong : '装备属性',
	sub_type : 'input',
	rank : 3,
	elem : '#mofa'
} ], [ 'xiangqian_stone_attr', '精魄灵石', 'sub_list', {
	belong : '装备属性',
	sub_type : 'list',
	rank : 3,
	elem : '#xiangqian_stone_attr_panel li',
	typeName : '精魄灵石'
} ], [ 'xiang_qian_level', '灵石锻炼等级', 'sub_list', {
	belong : '装备属性',
	sub_type : 'input',
	rank : 3,
	elem : '#xiang_qian_level'
} ], [ 'addon_sum_min', '属性总和', 'sub_list', {
	belong : '附加属性',
	sub_type : 'input',
	rank : 4,
	elem : '#addon_sum_min'
} ], [ 'addon_minjie_reduce', '敏捷减少', 'sub_list', {
	belong : '附加属性',
	sub_type : 'input',
	rank : 4,
	elem : '#addon_minjie_reduce'
} ], [ 'addon_fali', '法力', 'sub_list', {
	belong : '附加属性',
	sub_type : 'button',
	rank : 4,
	elem : '#addon_skill_box li'
} ], [ 'addon_liliang', '力量', 'sub_list', {
	belong : '附加属性',
	sub_type : 'button',
	rank : 4,
	elem : '#addon_skill_box li'
} ], [ 'addon_lingli', '灵力', 'sub_list', {
	belong : '附加属性',
	sub_type : 'button',
	rank : 4,
	elem : '#addon_skill_box li'
} ], [ 'addon_minjie', '敏捷', 'sub_list', {
	belong : '附加属性',
	sub_type : 'button',
	rank : 4,
	elem : '#addon_skill_box li'
} ], [ 'addon_tizhi', '体质', 'sub_list', {
	belong : '附加属性',
	sub_type : 'button',
	rank : 4,
	elem : '#addon_skill_box li'
} ], [ 'addon_naili', '耐力', 'sub_list', {
	belong : '附加属性',
	sub_type : 'button',
	rank : 4,
	elem : '#addon_skill_box li'
} ], [ 'repair_failed_times', '修理失败', 'sub_list', {
	belong : '修理失败',
	sub_type : 'input',
	rank : 5,
	elem : '#repair_failed_times',
	mark : '<='
} ], [ 'price', '价格', 'sub_list', {
	belong : '价格',
	sub_type : 'range',
	rank : 6,
	elem : 'price'
} ], [ 'server_type', '开服时间', 'sub_list', {
	belong : '开服时间',
	sub_type : 'list',
	rank : 7,
	elem : '#server_type li'
} ], [ 'addon_status', '附加状态', 'autocomplete', 'addon_status', function() {
	var _map = {};
	var arr = SENIOR_YAO_JUE.extend(PRIMARY_YAO_JUE).extend(EquipAddonStatus);
	for (var i = 0; i < arr.length; i++) {
		_map[arr[i]] = arr[i];
	}
	return _map;
}() ] ];
var PetEquipSearchFormInit = new Class({
	initialize : function() {
		this.level_slider = this.init_level_slider();
		this.init_addon_skill_box();
		this.reg_item_selected_ev();
		this.reg_reset_event();
		this.select_server = new DropSelectServer($('sel_area'),
				$('switchto_serverid'));
		$("btn_do_query").addEvent("click", function() {
			query_pet_equips();
		});
	},
	init_level_slider : function() {
		this.level_slider = new LevelSlider($('level_slider'), {
			grid : 20,
			offset : -23,
			range : [ 65, 145 ],
			step : 10,
			default_value : [ 65, 145 ]
		});
		return this.level_slider;
	},
	reg_item_selected_ev : function() {
		var item_list = $$("#EquipPosBox li");
		item_list.append($$('#xiangqian_stone_attr_panel li'));
		item_list.append($$("#addon_skill_box li"));
		item_list.append($$("#server_type li"));
		for (var i = 0; i < item_list.length; i++) {
			var item = item_list[i];
			item.addEvent("click", function() {
				var el = $(this);
				if (el.hasClass("on")) {
					el.removeClass("on");
				} else {
					el.addClass("on");
				}
			})
		}
	},
	init_addon_skill_box : function() {
		var self = this;
		var skill_search = function(keyword) {
			var result = [];
			for (var i = 0; i < SENIOR_YAO_JUE.length; i++) {
				if (SENIOR_YAO_JUE[i].indexOf(keyword) != -1) {
					result.push(SENIOR_YAO_JUE[i]);
				}
			}
			for (var i = 0; i < PRIMARY_YAO_JUE.length; i++) {
				if (PRIMARY_YAO_JUE[i].indexOf(keyword) != -1) {
					result.push(PRIMARY_YAO_JUE[i]);
				}
			}
			for (var i = 0; i < EquipAddonStatus.length; i++) {
				if (EquipAddonStatus[i].indexOf(keyword) != -1) {
					result.push(EquipAddonStatus[i]);
				}
			}
			return result;
		};
		var $addon = $('addon_status');
		new AutoComplete($addon, {
			"startPoint" : 1,
			"promptNum" : 20,
			"handle_func" : skill_search,
			"callback" : function() {
			}
		});
		var $has = $('has_suit_effect'), hasTimer;
		var check = function(e) {
			var ctx = this;
			clearTimeout(hasTimer);
			hasTimer = setTimeout(
					function() {
						var value = ctx.value.trim();
						var isOk = value
								&& PetEquipSearchFormInit
										.isAddonStatusOk(value);
						$has.getParent()[isOk ? 'removeClass' : 'addClass']
								('disabled');
						$has.set('disabled', !isOk);
					}, 200);
		};
		$addon.addEvents({
			keyup : check,
			change : check
		});
	},
	empty_input_box : function(item_list) {
		for (var i = 0; i < item_list.length; i++) {
			$(item_list[i]).value = "";
		}
	},
	clear_select_items : function(item_list) {
		for (var i = 0; i < item_list.length; i++) {
			var item = item_list[i];
			if (item.hasClass("on")) {
				item.removeClass("on");
			}
		}
	},
	reg_reset_event : function() {
		var self = this;
		$("reset_basic").addEvent("click", function() {
			self.clear_select_items($$("#EquipPosBox li"));
			self.level_slider.reset_value();
			return false;
		});
		$("reset_equips_attr").addEvent("click", function() {
			self.clear_select_items($$("#addon_skill_box li"));
			self.clear_select_items($$("#xiangqian_stone_attr_panel li"));
			self.empty_input_box($$("#PetEquipAttrBox input"));
			self.empty_input_box($$("#PetEquipAttrBox select"));
			return false;
		});
		$("reset_price").addEvent("click", function() {
			self.empty_input_box($$("#EquipPriceBox input"));
			return false;
		});
		$("reset_server_selected").addEvent("click", function() {
			self.select_server.reset_value();
			self.clear_select_items($$("#server_type li"));
			return false;
		});
		$("reset_all").addEvent("click", function() {
			$("reset_basic").fireEvent("click");
			$("reset_equips_attr").fireEvent("click");
			$("reset_price").fireEvent("click");
			$("reset_server_selected").fireEvent("click");
			return false;
		});
	}
});
PetEquipSearchFormInit.extend({
	isAddonStatusOk : function(value) {
		if (!MO_SHOU_YAO_JUE.contains(value)
				&& !EquipAddonStatus.contains(value)) {
			return false;
		}
		return true;
	}
});
function check_int_args(args_config_list) {
	var re = /^[0-9]\d*$/;
	var args = {};
	for (var i = 0; i < args_config_list.length; i++) {
		var item = args_config_list[i];
		var item_value = $(item[0] + "").value.trim();
		if (item_value.length == 0) {
			continue;
		}
		if (!re.test(item_value) || item_value.length > 9) {
			return {
				"result" : false,
				"msg" : item[1] + "填写错误，请重新输入"
			}
		}
		item_value = parseInt(item_value);
		if (item_value <= 0) {
			continue;
		}
		args[item[0]] = item_value;
	}
	return {
		"result" : true,
		"args" : args
	};
}
function get_item_selected(item_list) {
	var value_list = [];
	for (var i = 0; i < item_list.length; i++) {
		var item = item_list[i];
		if (item.hasClass("on")) {
			value_list.push(item.getAttribute("data_value"));
		}
	}
	if (value_list.length == item_list.length) {
		return "";
	} else {
		return value_list.join(",");
	}
}
function query_pet_equips() {
	var args_config = [ [ "speed", "速度" ], [ "fangyu", "防御" ],
			[ "mofa", "魔法" ], [ "shanghai", "伤害" ], [ "hp", "气血" ],
			[ "xiang_qian_level", "宝石" ], [ "addon_sum_min", "属性总和" ],
			[ "addon_minjie_reduce", "敏捷减少" ], [ "switchto_serverid", "转服至" ] ];
	var result = check_int_args(args_config);
	if (!result["result"]) {
		alert(result["msg"]);
		return;
	}
	var args = result["args"];
	args["level_min"] = SearchFormObj.level_slider.value.min;
	args["level_max"] = SearchFormObj.level_slider.value.max;
	var equip_pos = get_item_selected($$("#EquipPosBox li"));
	if (equip_pos) {
		args["equip_pos"] = equip_pos;
	}
	var xiangqian_stone_attr = get_item_selected($$('#xiangqian_stone_attr_panel li'));
	if (xiangqian_stone_attr) {
		args['xiangqian_stone_attr'] = xiangqian_stone_attr;
	}
	var addon_el_list = $$("#addon_skill_box li");
	for (var i = 0; i < addon_el_list.length; i++) {
		var item = addon_el_list[i];
		if (item.hasClass("on")) {
			var attr_name = item.getAttribute("data_value");
			args[attr_name] = 1;
		}
	}
	var repair_failed_times = $("repair_failed_times").value;
	if (repair_failed_times.length > 0) {
		args["repair_failed_times"] = repair_failed_times;
	}
	if ($("price_min").value.trim().length > 0) {
		var price_min_value = parseFloat($("price_min").value);
		if (!price_min_value || price_min_value <= 0) {
			alert("您输入的最低价格有错误");
			return false;
		}
		args["price_min"] = parseInt(price_min_value * 100);
	}
	if ($("price_max").value.trim().length > 0) {
		var price_max_value = parseFloat($("price_max").value);
		if (!price_max_value || price_max_value <= 0) {
			alert("您输入的最高价格有错误");
			return false;
		}
		args["price_max"] = parseInt(price_max_value * 100);
	}
	if (args["price_min"] && args["price_max"]) {
		if (args["price_max"] < args["price_min"]) {
			alert("您输入的价格有错误");
			return false;
		}
	}
	var addon_status = $("addon_status").value;
	if (addon_status.length > 0) {
		if (!PetEquipSearchFormInit.isAddonStatusOk(addon_status)) {
			alert("附加状态填写错误");
			return false;
		}
		args["addon_status"] = addon_status;
	}
	var $noSuitEffect = $('no_suit_effect'), $hasSuitEffect = $('has_suit_effect');
	if ($noSuitEffect.checked) {
		args['include_no_skill'] = 1;
	}
	if (!$hasSuitEffect.disabled) {
		if ($hasSuitEffect.checked) {
			args['include_can_cover_skill'] = 1;
		}
	}
	var server_type = get_item_selected($$("#server_type li"));
	if (server_type.length > 0) {
		args["server_type"] = server_type;
	}
	if ($("user_serverid") && $("user_serverid").value) {
		args['cross_buy_serverid'] = $("user_serverid").value;
	}
	if (Object.getLength(args) == 0) {
		alert("请选择搜索条件");
		return false;
	}
	QueryArgs = args;
	save_args_in_cookie(args, "overall_pet_equip_search");
	update_overall_search_saved_query();
	do_query(1);
}
function add_orderby_ev() {
	var el_list = $$("#order_menu a");
	for (var i = 0; i < el_list.length; i++) {
		var el = el_list[i];
		el.addEvent("click", function() {
			change_query_order($(this));
			return false;
		})
	}
}
var OrderInfo = {
	"field_name" : "",
	"order" : ""
};
function change_query_order(el) {
	var attr_name = el.getAttribute("data_attr_name");
	var new_order = "DESC"
	var orderby = attr_name + " " + new_order;
	if (OrderInfo["field_name"] == attr_name) {
		var new_order = OrderInfo["order"] == "DESC" ? "ASC" : "DESC";
		orderby = attr_name + " " + new_order;
	}
	OrderInfo["field_name"] = attr_name;
	OrderInfo["order"] = new_order;
	QueryArgs["order_by"] = orderby;
	do_query(1);
}
function get_equip_addon_attr(equip_desc) {
	var re = new RegExp("#G[^#]+", "g");
	var match_result = equip_desc.match(re);
	if (!match_result) {
		return "";
	}
	var attr_list = [];
	for (var i = 0; i < match_result.length; i++) {
		attr_list.push(match_result[i].replace("#G", ""));
	}
	return attr_list.join("&nbsp;");
}
function show_loading() {
	$("loading_img").setStyle("display", "");
}
function loading_finish() {
	$("loading_img").setStyle("display", "none");
}
function show_query_result(result, txt) {
	loading_finish();
	if (result["status"] == QueryStatus["need_captcha"]) {
		show_captcha_layer();
		return;
	}
	if (result["status"] != 0) {
		alert(result["msg"]);
		return;
	}
	if (result["equip_list"].length == 0) {
		render_to_replace("query_result", "no_result", {});
		return;
	}
	for (var i = 0; i < result["equip_list"].length; i++) {
		var equip = result["equip_list"][i]
		equip["equip_icon_url"] = ResUrl + '/images/small/' + equip["icon"];
		equip["addon_attr"] = get_equip_addon_attr(equip["equip_desc"]);
	}
	var ctx = {
		"equip_list" : result["equip_list"],
		"pager" : result["pager"]
	}
	QueryResult = result["equip_list"];
	render_to_replace("query_result", "equip_list_templ", ctx);
	add_orderby_ev();
	render_to_replace("pager_bar", "pager_templ", {
		"pager" : result["pager"]
	});
	var el_list = $$("#soldList a.soldImg");
	for (var i = 0; i < el_list.length; i++) {
		var el = el_list[i];
		el.addEvent("mouseover", function() {
			show_equip_tips_box($(this));
		});
		el.addEvent("mouseout", hidden_tips_box);
	}
}
function goto(page_num) {
	do_query(page_num);
}
function show_error() {
	loading_finish();
	alert("系统繁忙，请稍后再试");
}
function do_query(page_num) {
	var query_url = CgiRootUrl + "/xyq_overall_search.py";
	QueryArgs["act"] = "overall_search_pet_equip";
	QueryArgs["page"] = page_num;
	var Ajax = new Request.JSON({
		"url" : query_url,
		"onSuccess" : show_query_result,
		"onException" : show_error,
		"noCache" : true,
		"onError" : show_error,
		"onFailure" : show_error,
		"onRequest" : function() {
			$('loading_img').setStyle('display', '');
			$('query_result').empty();
		}
	});
	show_loading();
	Ajax.get(QueryArgs);
}
function show_equip_tips_box(el) {
	var icon_url = ResUrl + '/images/big/' + el.getAttribute("data_icon");
	var ctx = {
		"icon_url" : icon_url,
		"name" : el.getAttribute("data_name"),
		"type_desc" : el.getAttribute("data_type_desc"),
		"desc" : el.getAttribute("data_desc")
	};
	render_to_replace("TipsBox", "EquipTipsTempl", ctx);
	adjust_tips_position(el, $("TipsBox"));
}
function hidden_tips_box() {
	$("TipsBox").setStyle("display", "none");
}