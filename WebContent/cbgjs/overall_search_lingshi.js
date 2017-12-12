var OverallSearchAct = 'overall_search_lingshi';
var Kinds = [ [ 61, '戒指' ], [ 62, '耳饰' ], [ 63, '手镯' ], [ 64, '佩饰' ] ];
var AddedAttr1 = [ [ 1, '固伤' ], [ 2, '伤害' ], [ 3, '速度' ], [ 4, '法伤' ],
		[ 5, '狂暴' ], [ 6, '物理暴击' ], [ 7, '法术暴击' ], [ 8, '封印' ], [ 9, '法伤结果' ],
		[ 10, '穿刺' ], [ 11, '治疗' ] ];
var AddedAttr2 = [ [ 12, '气血' ], [ 13, '防御' ], [ 14, '法防' ], [ 15, '抗物理暴击' ],
		[ 16, '抗法术暴击' ], [ 17, '抗封' ], [ 18, '格挡' ], [ 19, '回复' ] ];
var AddedAttrNum = [ [ 2, '2条' ], [ 3, '3条' ] ];
var AddedAttrRepeatNum = AddedAttrNum;
var ServerTypes = [ [ 3, '3年以上服' ], [ 2, '1到3年服' ], [ 1, '1年内服' ] ];
var FairShowStatus = [ [ 1, '已上架' ], [ 0, '公示期' ] ];
var OVERALL_SEARCH_LINGSHI_ARGS_CONFIG = [ [ 'equip_level', '等级', 'sub_list', {
	belong : '等级',
	sub_type : 'slider',
	elem : 'equip_level',
	rank : 1
} ], [ 'kindid', '类型', 'sub_list', {
	belong : '类型',
	sub_type : 'list',
	elem : '#kind_panel li',
	rank : 2
} ], [ 'damage', '戒指·伤害', 'sub_list', {
	belong : '基础属性',
	sub_type : 'input',
	elem : '#sel_basic_attr_type',
	rank : 3
} ], [ 'defense', '戒指·防御', 'sub_list', {
	belong : '基础属性',
	sub_type : 'input',
	elem : '#sel_basic_attr_type',
	rank : 3
} ], [ 'magic_damage', '耳饰·法伤', 'sub_list', {
	belong : '基础属性',
	sub_type : 'input',
	elem : '#sel_basic_attr_type',
	rank : 3
} ], [ 'magic_defense', '耳饰·法防', 'sub_list', {
	belong : '基础属性',
	sub_type : 'input',
	elem : '#sel_basic_attr_type',
	rank : 3
} ], [ 'magic_defense', '耳饰·法防', 'sub_list', {
	belong : '基础属性',
	sub_type : 'input',
	elem : '#sel_basic_attr_type',
	rank : 3
} ], [ 'fengyin', '手镯·封印', 'sub_list', {
	belong : '基础属性',
	sub_type : 'input',
	elem : '#sel_basic_attr_type',
	rank : 3
} ], [ 'anti_fengyin', '手镯·抗封', 'sub_list', {
	belong : '基础属性',
	sub_type : 'input',
	elem : '#sel_basic_attr_type',
	rank : 3
} ], [ 'speed', '佩饰·速度', 'sub_list', {
	belong : '基础属性',
	sub_type : 'input',
	elem : '#sel_basic_attr_type',
	rank : 3
} ], [ 'jinglian_level', '精练等级', 'sub_list', {
	belong : '精练等级',
	sub_type : 'input',
	elem : '#txt_jinglian_level',
	rank : 4
} ], [ 'added_attr.1', '固伤', 'sub_list', {
	belong : '附加属性',
	sub_type : 'button',
	elem : '#added_attr1_panel li',
	rank : 5
} ], [ 'added_attr.2', '伤害', 'sub_list', {
	belong : '附加属性',
	sub_type : 'button',
	elem : '#added_attr1_panel li',
	rank : 5
} ], [ 'added_attr.3', '速度', 'sub_list', {
	belong : '附加属性',
	sub_type : 'button',
	elem : '#added_attr1_panel li',
	rank : 5
} ], [ 'added_attr.4', '法伤', 'sub_list', {
	belong : '附加属性',
	sub_type : 'button',
	elem : '#added_attr1_panel li',
	rank : 5
} ], [ 'added_attr.5', '狂暴', 'sub_list', {
	belong : '附加属性',
	sub_type : 'button',
	elem : '#added_attr1_panel li',
	rank : 5
} ], [ 'added_attr.6', '物理暴击', 'sub_list', {
	belong : '附加属性',
	sub_type : 'button',
	elem : '#added_attr1_panel li',
	rank : 5
} ], [ 'added_attr.7', '法术暴击', 'sub_list', {
	belong : '附加属性',
	sub_type : 'button',
	elem : '#added_attr1_panel li',
	rank : 5
} ], [ 'added_attr.8', '封印', 'sub_list', {
	belong : '附加属性',
	sub_type : 'button',
	elem : '#added_attr1_panel li',
	rank : 5
} ], [ 'added_attr.9', '法伤结果', 'sub_list', {
	belong : '附加属性',
	sub_type : 'button',
	elem : '#added_attr1_panel li',
	rank : 5
} ], [ 'added_attr.10', '穿刺', 'sub_list', {
	belong : '附加属性',
	sub_type : 'button',
	elem : '#added_attr1_panel li',
	rank : 5
} ], [ 'added_attr.11', '治疗', 'sub_list', {
	belong : '附加属性',
	sub_type : 'button',
	elem : '#added_attr1_panel li',
	rank : 5
} ], [ 'added_attr.12', '气血', 'sub_list', {
	belong : '附加属性',
	sub_type : 'button',
	elem : '#added_attr2_panel li',
	rank : 5
} ], [ 'added_attr.13', '防御', 'sub_list', {
	belong : '附加属性',
	sub_type : 'button',
	elem : '#added_attr2_panel li',
	rank : 5
} ], [ 'added_attr.14', '法防', 'sub_list', {
	belong : '附加属性',
	sub_type : 'button',
	elem : '#added_attr2_panel li',
	rank : 5
} ], [ 'added_attr.15', '抗物理暴击', 'sub_list', {
	belong : '附加属性',
	sub_type : 'button',
	elem : '#added_attr2_panel li',
	rank : 5
} ], [ 'added_attr.16', '抗法术暴击', 'sub_list', {
	belong : '附加属性',
	sub_type : 'button',
	elem : '#added_attr2_panel li',
	rank : 5
} ], [ 'added_attr.17', '抗封', 'sub_list', {
	belong : '附加属性',
	sub_type : 'button',
	elem : '#added_attr2_panel li',
	rank : 5
} ], [ 'added_attr.18', '格挡', 'sub_list', {
	belong : '附加属性',
	sub_type : 'button',
	elem : '#added_attr2_panel li',
	rank : 5
} ], [ 'added_attr.19', '回复', 'sub_list', {
	belong : '附加属性',
	sub_type : 'button',
	elem : '#added_attr2_panel li',
	rank : 5
} ], [ 'added_attr_logic', '附加全部属性', 'sub_list', {
	belong : '附加属性',
	sub_type : 'radio',
	elem : 'input[name=added_attr_logic]',
	rank : 5
} ], [ 'added_attr_num', '附加属性条目', 'sub_list', {
	belong : '属性条目数',
	sub_type : 'list',
	elem : '#added_attr_num_panel li',
	rank : 6,
	typeName : '附加属性条目'
} ], [ 'added_attr_repeat_num', '相同属性条目', 'sub_list', {
	belong : '属性条目数',
	sub_type : 'list',
	elem : '#added_attr_repeat_num_panel li',
	rank : 6,
	typeName : '相同属性条目'
} ], [ 'special_effect', '带有“超级简易”', 'sub_list', {
	belong : '特效',
	sub_type : 'checkbox',
	elem : '#chk_has_eazy_effect',
	rank : 7
} ], [ 'price', '价格', 'sub_list', {
	belong : '价格',
	sub_type : 'range',
	elem : 'txt_price',
	rank : 8
} ], [ 'pass_fair_show', '出售状态', 'sub_list', {
	belong : '出售状态',
	sub_type : 'list',
	elem : '#fair_show_panel li',
	rank : 9
} ], [ 'server_type', '开服时间', 'sub_list', {
	belong : '开服时间',
	sub_type : 'list',
	elem : '#server_type_panel li',
	rank : 10
} ] ];
function fix_overall_search_lingshi_args_config() {
	var basic_attr_config = [ [ 'damage', '戒指·伤害' ], [ 'defense', '戒指·防御' ],
			[ 'magic_damage', '耳饰·法伤' ], [ 'magic_defense', '耳饰·法防' ],
			[ 'fengyin', '手镯·封印' ], [ 'anti_fengyin', '手镯·抗封' ],
			[ 'speed', '佩饰·速度' ] ];
	for (var i = 0; i < basic_attr_config.length; i++) {
		var config = basic_attr_config[i];
		OVERALL_SEARCH_LINGSHI_ARGS_CONFIG.push([ config[0], config[1], 'func',
				function(val) {
					return val
				}, function(val) {
					$('sel_basic_attr_type').set('value', this.key);
					$('txt_basic_attr_value').set('value', val);
				}.bind({
					'key' : config[0]
				}) ])
	}
};
fix_overall_search_lingshi_args_config();
var OverallLingshiSearcher = new Class(
		{
			initialize : function() {
				this.server_type_checker = new ButtonChecker(ServerTypes,
						$('server_type_panel'));
				this.fair_show_checker = new ButtonChecker(FairShowStatus,
						$('fair_show_panel'));
				this.kind_checker = new ButtonChecker(Kinds, $('kind_panel'));
				this.added_attr1_checker = new ButtonChecker(AddedAttr1,
						$('added_attr1_panel'));
				this.added_attr2_checker = new ButtonChecker(AddedAttr2,
						$('added_attr2_panel'));
				this.added_attr_num_checker = new ButtonChecker(AddedAttrNum,
						$('added_attr_num_panel'));
				this.added_attr_repeat_num_checker = new ButtonChecker(
						AddedAttrNum, $('added_attr_repeat_num_panel'));
				this.init_level_slider();
				this.init_sel_add_attr();
				this.init_search_btn();
				this.init_role_search_event();
				this.init_reset_btn();
			},
			init_reset_btn : function() {
				var __this = this;
				$('reset_basic').addEvent('click', function() {
					__this.reset_basic();
				});
				$('reset_detail').addEvent('click', function() {
					__this.reset_detail();
				});
				$('reset_server_info').addEvent('click', function() {
					__this.reset_server_info();
				});
				$('reset_all').addEvent('click', function() {
					__this.reset_basic();
					__this.reset_detail();
					__this.reset_server_info();
				});
			},
			reset_basic : function() {
				var checkers = [ this.level_slider, this.kind_checker ];
				this.reset(checkers, []);
			},
			reset_detail : function() {
				var checkers = [ this.fair_show_checker,
						this.added_attr1_checker, this.added_attr2_checker,
						this.added_attr_num_checker,
						this.added_attr_repeat_num_checker ];
				var txt_inputs = [ $('txt_basic_attr_value'),
						$('txt_price_min'), $('txt_price_max'),
						$('txt_jinglian_level'), $('sel_add_attr1'),
						$('sel_add_attr2'), $('sel_add_attr3') ];
				this.reset(checkers, txt_inputs);
				$('sel_basic_attr_type').set('value', '');
				$('chk_has_eazy_effect').checked = false;
			},
			reset_server_info : function() {
				var checkers = [ this.server_type_checker ];
				this.reset(checkers, []);
			},
			reset : function(checkers, txt_inputs) {
				for (var i = 0; i < checkers.length; i++) {
					checkers[i].reset_value();
				}
				for (var i = 0; i < txt_inputs.length; i++) {
					txt_inputs[i].set('value', '');
				}
			},
			init_level_slider : function() {
				this.level_slider = new LevelSlider($('equip_level_slider'), {
					grid : 40,
					offset : -23,
					range : [ 60, 160 ],
					step : 20,
					default_value : [ 60, 160 ]
				});
			},
			init_sel_add_attr : function() {
				var option_html = '<option value="">不限</option>';
				var add_attr1 = [ [ 1, '固伤' ], [ 2, '伤害' ], [ 3, '速度' ],
						[ 4, '法伤' ], [ 5, '狂暴' ], [ 6, '物理暴击' ], [ 7, '法术暴击' ],
						[ 8, '封印' ], [ 9, '法伤结果' ], [ 10, '穿刺' ], [ 11, '治疗' ] ];
				var add_attr2 = [ [ 12, '气血' ], [ 13, '防御' ], [ 14, '法防' ],
						[ 15, '抗物理暴击' ], [ 16, '抗法术暴击' ], [ 17, '抗封' ],
						[ 18, '格挡' ], [ 19, '回复' ] ];
				add_attr1.concat(add_attr2).each(
						function(item) {
							option_html += '<option value="' + item[0] + '">'
									+ item[1] + '</option>';
						});
				$('sel_add_attr1').set('html', option_html);
				$('sel_add_attr2').set('html', option_html);
				$('sel_add_attr3').set('html', option_html);
				$('sel_add_attr_panel').set('html',
						$('sel_add_attr_panel').get('html'));
				$$('.j_sel_add_attr').addEvent('click', function() {
					$('added_attr_logic_detail').checked = true;
				});
			},
			init_search_btn : function() {
				var __this = this;
				$('btn_lingshi_search').addEvent('click', function() {
					__this.search();
				});
			},
			init_role_search_event : function() {
				var __this = this;
				$('link_search_related_role')
						.addEvent(
								'click',
								function() {
									__this
											.search(function(args) {
												document.query_form.search_act.value = "overall_search_role_by_lingshi";
												$('query_args').value = JSON
														.encode(args);
												document.query_form.submit();
											});
								});
			},
			search : function(func) {
				var arg = {};
				arg['equip_level_min'] = this.level_slider.value.min;
				arg['equip_level_max'] = this.level_slider.value.max;
				var check_items = [
						[ 'pass_fair_show', this.fair_show_checker, true ],
						[ 'server_type', this.server_type_checker, true ],
						[ 'kindid', this.kind_checker, true ],
						[ 'added_attr_num', this.added_attr_num_checker, false ],
						[ 'added_attr_repeat_num',
								this.added_attr_repeat_num_checker, false ] ];
				for (var i = 0; i < check_items.length; i++) {
					var item = check_items[i];
					if (item[2] && item[1].is_check_all()) {
						continue;
					}
					var value = item[1].get_value();
					if (value) {
						arg[item[0]] = value;
					}
				}
				var added_attr_values = this.added_attr1_checker
						.get_value_array().concat(
								this.added_attr2_checker.get_value_array());
				$$('input[name=added_attr_logic]').each(function(el) {
					if (el.checked) {
						arg['added_attr_logic'] = el.value;
					}
				});
				if (arg.added_attr_logic == 'detail') {
					for (var i = 1; i <= 3; ++i) {
						var value = $('sel_add_attr' + i).value;
						if (value > 0)
							arg['added_attr.' + value] = (arg['added_attr.'
									+ value] || 0) + 1;
					}
				} else {
					if (added_attr_values.length > 0) {
						for (var i = 0; i < added_attr_values.length; i++) {
							var value = added_attr_values[i];
							arg['added_attr.' + value] = 1;
						}
					}
				}
				for (var k = 1; k < 20; k++) {
					var addedAttrKey = 'added_attr.' + k;
					var count = [];
					if (arg[addedAttrKey]) {
						break;
					} else {
						if (k == 19) {
							arg['added_attr_logic']
									&& delete arg.added_attr_logic;
						}
					}
				}
				if ($('chk_has_eazy_effect').checked) {
					arg['special_effect'] = 1;
				}
				var txt_int_items = [ [ 'basic_attr_value', 0, 10000, '技能数量' ],
						[ 'price_min', 0, MaxTradeYuan, '价格' ],
						[ 'price_max', 0, MaxTradeYuan, '价格' ],
						[ 'jinglian_level', 0, 16, '价格' ] ];
				var intReg = /^\d+$/;
				for (var i = 0; i < txt_int_items.length; i++) {
					var item = txt_int_items[i];
					var el = $('txt_' + item[0]);
					var value = el.value;
					if (!value) {
						continue;
					}
					if (!intReg.test(value)) {
						alert(item[3] + '必须是整数');
						el.focus();
						return;
					}
					if (!(item[1] <= parseInt(value) && parseInt(value) <= item[2])) {
						alert(item[3] + '超出取值范围:' + item[1] + '-' + item[2]);
						el.focus();
						return;
					}
					arg[item[0]] = parseInt(value);
				}
				var basic_attr_type = $("sel_basic_attr_type").value;
				var basic_attr_value = $("txt_basic_attr_value").value;
				if (basic_attr_type.length > 0) {
					if (basic_attr_value.length == 0) {
						arg["basic_attr_value"] = 1;
					}
				}
				if (arg['price_min'] > arg['price_max']) {
					alert('最低价格不能大于最高价格');
					return;
				}
				if (arg['price_min']) {
					arg['price_min'] = arg['price_min'] * 100;
				}
				if (arg['price_max']) {
					arg['price_max'] = arg['price_max'] * 100;
				}
				var basic_attr_type = $('sel_basic_attr_type').value;
				if (basic_attr_type && arg.basic_attr_value) {
					arg[basic_attr_type] = arg.basic_attr_value;
				}
				if (arg.basic_attr_value) {
					delete arg.basic_attr_value;
				}
				if ($("user_serverid") && $("user_serverid").value) {
					arg['cross_buy_serverid'] = $("user_serverid").value;
				}
				save_args_in_cookie(arg, "overall_lingshi_search");
				var f = func || go_overall_search;
				f(arg);
			}
		});
var LingshiDescParser = new Class({
	initialize : function(desc) {
		this.desc = desc;
		this.parse();
	},
	parse : function() {
		var added_attrs = [];
		var lines = this.desc.split('#r').map(function(x) {
			return x.trim()
		});
		lines = lines.filter(function(x) {
			return x != ''
		});
		for (var i = 0; i < lines.length; i++) {
			if (i <= 1) {
				continue;
			}
			var line = lines[i];
			if (line.slice(0, 2) == '#G') {
				added_attrs.push(line.replace(/#G|#c[0-9A-F]{6}/g, "").replace(
						/^#+|#+$/g, ''));
			}
		}
		this.added_attrs = added_attrs;
	},
	get_added_attr_by_index : function(i) {
		if (this.added_attrs.length > i) {
			return this.added_attrs[i];
		}
		return '';
	},
	get_all : function() {
		return this.added_attrs.join('<br />');
	}
});
function get_basic_attrs(equip) {
	var basic_attrs = [];
	var keys = [ [ 'damage', '伤害' ], [ 'defense', '防御' ],
			[ 'magic_damage', '法术伤害' ], [ 'magic_defense', '法术防御' ],
			[ 'fengyin', '封印命中等级' ], [ 'anti_fengyin', '抵抗封印等级' ],
			[ 'speed', '速度' ] ];
	for (var i = 0; i < keys.length; i++) {
		var key_item = keys[i];
		var value = equip[key_item[0]];
		if (value) {
			basic_attrs.push(key_item[1] + "&nbsp;+" + value);
		}
	}
	return basic_attrs.join("&nbsp;");
}