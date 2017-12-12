var OverallSearchAct = 'overall_search_pet';
var PetSkills = [ [ 571, '力劈华山' ], [ 554, '善恶有报' ], [ 552, '死亡召唤' ],
		[ 661, '须弥真言' ], [ 595, '壁垒击破' ], [ 579, '法术防御' ], [ 639, '灵能激发' ],
		[ 638, '法力陷阱' ], [ 597, '剑荡四方' ], [ 599, '移花接木' ], [ 553, '上古灵符' ],
		[ 671, '无畏布施' ], [ 673, '灵山禅语' ], [ 505, '迟钝' ], [ 596, '嗜血追击' ],
		[ 404, '高级吸血' ], [ 416, '高级必杀' ], [ 425, '高级偷袭' ], [ 405, '高级连击' ],
		[ 407, '高级隐身' ], [ 422, '高级敏捷' ], [ 411, '高级神佑复生' ], [ 412, '高级鬼魂术' ],
		[ 424, '高级魔之心' ], [ 573, '高级法术连击' ], [ 577, '高级法术暴击' ],
		[ 578, '高级法术波动' ], [ 434, '高级强力' ], [ 413, '高级驱鬼' ], [ 435, '高级防御' ],
		[ 414, '高级毒' ], [ 406, '高级飞行' ], [ 410, '高级冥思' ], [ 415, '高级慧根' ],
		[ 627, '高级法术抵抗' ], [ 430, '高级雷属性吸收' ], [ 431, '高级土属性吸收' ],
		[ 432, '高级水属性吸收' ], [ 433, '高级火属性吸收' ], [ 401, '高级夜战' ],
		[ 408, '高级感知' ], [ 641, '高级合纵' ], [ 629, '高级盾气' ], [ 403, '高级反震' ],
		[ 417, '高级幸运' ], [ 418, '高级精神集中' ], [ 419, '高级神迹' ], [ 426, '奔雷咒' ],
		[ 427, '泰山压顶' ], [ 428, '水漫金山' ], [ 429, '地狱烈火' ], [ 301, '夜战' ],
		[ 308, '感知' ], [ 640, '合纵' ], [ 628, '盾气' ], [ 303, '反震' ],
		[ 317, '幸运' ], [ 318, '精神集中' ], [ 319, '神迹' ], [ 326, '雷击' ],
		[ 327, '落岩' ], [ 328, '水攻' ], [ 329, '烈火' ], [ 304, '吸血' ],
		[ 316, '必杀' ], [ 325, '偷袭' ], [ 305, '连击' ], [ 307, '隐身' ],
		[ 322, '敏捷' ], [ 311, '神佑复生' ], [ 312, '鬼魂术' ], [ 324, '魔之心' ],
		[ 510, '法术连击' ], [ 575, '法术暴击' ], [ 576, '法术波动' ], [ 334, '强力' ],
		[ 313, '驱鬼' ], [ 335, '防御' ], [ 314, '毒' ], [ 306, '飞行' ],
		[ 310, '冥思' ], [ 315, '慧根' ], [ 626, '法术抵抗' ], [ 330, '雷属性吸收' ],
		[ 331, '土属性吸收' ], [ 332, '水属性吸收' ], [ 333, '火属性吸收' ], [ 402, '高级反击' ],
		[ 420, '高级招架' ], [ 421, '高级永恒' ], [ 409, '高级再生' ], [ 423, '高级否定信仰' ],
		[ 593, '八凶法阵' ], [ 624, '龙魂' ], [ 572, '夜舞倾城' ], [ 551, '惊心一剑' ],
		[ 302, '反击' ], [ 320, '招架' ], [ 321, '永恒' ], [ 309, '再生' ],
		[ 323, '否定信仰' ], [ 650, '苍鸾怒击' ], [ 663, '天降灵葫' ], [ 667, '大快朵颐' ],
		[ 669, '月光' ], [ '1', '群法', 'qunfa' ], [ '2', '单法', 'xiaofa' ] ];
var ServerTypes = [ [ 3, '3年以上服' ], [ 2, '1到3年服' ], [ 1, '1年内服' ] ];
var FairShowStatus = [ [ 1, '已上架' ], [ 0, '公示期' ] ];
var FrontStatus = [ [ 'pass_fair_show', '已上架' ], [ 'fair_show', '公示期' ],
		[ 'bidding', '拍卖中' ], [ 'open_buy', '抢付中' ] ]
var HighNeidans = [ [ 935, '生死决' ], [ 924, '舍身击' ], [ 927, '双星爆' ],
		[ 928, '催心浪' ], [ 916, '玄武躯' ], [ 919, '碎甲刃' ], [ 930, '隐匿击' ],
		[ 934, '血债偿' ], [ 914, '神机步' ], [ 917, '龙胄铠' ], [ 915, '腾挪劲' ],
		[ 918, '玉砥柱' ], [ 920, '阴阳护' ], [ 921, '凛冽气' ], [ 925, '电魂闪' ],
		[ 926, '通灵法' ], [ 937, '朱雀甲' ] ];
var LowNeidans = [ [ 901, '迅敏' ], [ 902, '狂怒' ], [ 904, '静岳' ], [ 907, '矫健' ],
		[ 932, '连环' ], [ 903, '阴伤' ], [ 906, '灵身' ], [ 905, '擅咒' ],
		[ 908, '深思' ], [ 909, '钢化' ], [ 910, '坚甲' ], [ 913, '撞击' ],
		[ 922, '无畏' ], [ 923, '愤恨' ], [ 929, '淬毒' ], [ 931, '狙刺' ],
		[ 933, '圣洁' ], [ 936, '灵光' ], [ 912, '慧心' ] ];
var Colors = [ [ 1, '&nbsp;1&nbsp;' ], [ 2, '&nbsp;2&nbsp;' ] ];
var TexingTypes = [ [ 701, "识药" ], [ 702, "御风" ], [ 703, "巧劲" ], [ 704, "抗法" ],
		[ 705, "抗物" ], [ 706, "力破" ], [ 707, "争锋" ], [ 708, "吮魔" ],
		[ 709, "弑神" ], [ 710, "复仇" ], [ 711, "暗劲" ], [ 712, "顺势" ],
		[ 713, "阳护" ], [ 714, "怒吼" ], [ 715, "护佑" ], [ 716, "瞬击" ],
		[ 717, "瞬法" ], [ 718, "灵刃" ], [ 719, "灵法" ], [ 720, "灵断" ],
		[ 721, "逆境" ], [ 722, "预知" ], [ 723, "洞察" ], [ 724, "灵动" ],
		[ 725, "识物" ], [ 726, "乖巧" ], [ 727, "自恋" ] ];
var TexingPositiveEffectTypes = [ [ 5, "顶尖" ], [ 4, "优秀" ], [ 3, "良好" ],
		[ 2, "普通" ], [ 1, "较差" ] ];
var TexingNegativeEffectTypes = [ [ 5, "顶尖" ], [ 4, "优秀" ], [ 3, "良好" ],
		[ 2, "普通" ], [ 1, "较差" ] ];
var FightLevels = [ [ 65, "参战45-65" ], [ 66, "参战75-105" ], [ 67, "参战125-145" ],
		[ 68, "飞升120-155" ], [ 69, "渡劫155-175" ], [ 75, "化圣175" ],
		[ 70, "个性宠" ], [ 71, "神兽" ] ];
var OVERALL_SEARCH_PET_ARGS_CONFIG = [ [ 'level', '等级', 'sub_list', {
	belong : '等级',
	sub_type : 'range',
	rank : 1,
	elem : 'txt_level'
} ], [ 'kindid', '参战等级', 'sub_list', {
	belong : '参战等级',
	sub_type : 'list',
	rank : 2,
	elem : '#fight_level_panel li'
} ], [ 'skill', '技能', 'sub_list', {
	belong : '技能',
	sub_type : 'list',
	rank : 3,
	elem : '#pet_skill_panel li'
} ], [ 'suit_as_any_skill', '默认套装为任意选中技能', 'sub_list', {
	belong : '技能',
	sub_type : 'checkbox',
	rank : 3,
	elem : '#chk_suit_as_any_skill'
} ], [ 'skill_with_suit', '含套装技能', 'sub_list', {
	belong : '技能',
	sub_type : 'checkbox',
	rank : 3,
	elem : '#chk_skill_with_suit'
} ], [ 'skill_including_advanced', '默认以下技能等同对应高级技能', 'sub_list', {
	belong : '技能',
	sub_type : 'checkbox',
	rank : 3,
	elem : '#chk_skill_including_advanced'
} ], [ 'low_skill', '技能下面的对应', 'sub_list', {
	belong : '技能',
	sub_type : 'list',
	rank : 3,
	elem : '#pet_equal_advanced_skill_panel li'
} ], [ 'skill_num', '技能数量', 'sub_list', {
	belong : '概况',
	sub_type : 'input',
	rank : 4,
	elem : '#txt_skill_num'
} ], [ 'growth', '成长', 'sub_list', {
	belong : '概况',
	sub_type : 'input',
	rank : 4,
	elem : '#txt_growth'
} ], [ 'used_lianshou_max', '已使用炼兽珍经数量', 'sub_list', {
	belong : '概况',
	sub_type : 'input',
	rank : 4,
	elem : '#txt_used_lianshou_max',
	mark : '≤'
} ], [ 'used_yuanxiao_max', '已使用元宵数量', 'sub_list', {
	belong : '概况',
	sub_type : 'input',
	rank : 4,
	elem : '#txt_used_yuanxiao_max',
	mark : '≤'
} ], [ 'attack_aptitude', '攻击资质', 'sub_list', {
	belong : '资质',
	sub_type : 'input',
	rank : 5,
	elem : '#txt_attack_aptitude'
} ], [ 'defence_aptitude', '防御资质', 'sub_list', {
	belong : '资质',
	sub_type : 'input',
	rank : 5,
	elem : '#txt_defence_aptitude'
} ], [ 'physical_aptitude', '体力资质', 'sub_list', {
	belong : '资质',
	sub_type : 'input',
	rank : 5,
	elem : '#txt_physical_aptitude'
} ], [ 'magic_aptitude', '法力资质', 'sub_list', {
	belong : '资质',
	sub_type : 'input',
	rank : 5,
	elem : '#txt_magic_aptitude'
} ], [ 'speed_aptitude_min', '速度资质', 'sub_list', {
	belong : '资质',
	sub_type : 'input',
	rank : 5,
	elem : '#txt_speed_aptitude_min',
	mark : '≥'
} ], [ 'speed_aptitude_max', '速度资质', 'sub_list', {
	belong : '资质',
	sub_type : 'input',
	rank : 5,
	elem : '#txt_speed_aptitude_max',
	mark : '≤'
} ], [ 'price', '价格', 'sub_list', {
	belong : '价格',
	sub_type : 'range',
	rank : 6,
	elem : 'txt_price'
} ], [ 'front_status', '出售状态', 'sub_list', {
	belong : '出售状态',
	sub_type : 'list',
	rank : 7,
	elem : '#fair_show_panel li'
} ], [ 'max_blood', '气血', 'sub_list', {
	belong : '属性',
	sub_type : 'input',
	rank : 8,
	elem : '#txt_max_blood'
} ], [ 'attack', '攻击', 'sub_list', {
	belong : '属性',
	sub_type : 'input',
	rank : 8,
	elem : '#txt_attack'
} ], [ 'defence', '防御', 'sub_list', {
	belong : '属性',
	sub_type : 'input',
	rank : 8,
	elem : '#txt_defence'
} ], [ 'speed_max', '速度', 'sub_list', {
	belong : '属性',
	sub_type : 'input',
	rank : 8,
	elem : '#txt_speed_max',
	mark : '≤'
} ], [ 'speed_min', '速度', 'sub_list', {
	belong : '属性',
	sub_type : 'input',
	rank : 8,
	elem : '#txt_speed_min',
	mark : '≥'
} ], [ 'wakan', '灵力', 'sub_list', {
	belong : '属性',
	sub_type : 'input',
	rank : 8,
	elem : '#txt_wakan'
} ], [ 'high_neidan', '高级内丹', 'sub_list', {
	belong : '内丹',
	sub_type : 'list',
	rank : 9,
	elem : '#high_neidan_panel li',
	typeName : '高级内丹'
} ], [ 'high_neidan_level', '高级内丹层数', 'sub_list', {
	belong : '内丹',
	sub_type : 'input',
	rank : 9,
	elem : '#txt_high_neidan_level'
} ], [ 'low_neidan', '低级内丹', 'sub_list', {
	belong : '内丹',
	sub_type : 'list',
	rank : 9,
	elem : '#low_neidan_panel li',
	typeName : '低级内丹'
} ], [ 'low_neidan_level', '低级内丹层数', 'sub_list', {
	belong : '内丹',
	sub_type : 'input',
	rank : 9,
	elem : '#txt_low_neidan_level'
} ], [ 'summon_color', '染色', 'sub_list', {
	belong : '染色',
	sub_type : 'checkbox',
	rank : 10,
	elem : '#chk_summon_color'
} ], [ 'is_baobao', '宝宝', 'sub_list', {
	belong : '宝宝',
	sub_type : 'checkbox',
	rank : 11,
	elem : '#chk_is_baobao'
} ], [ 'color', '变异类型', 'sub_list', {
	belong : '变异类型',
	sub_type : 'list',
	rank : 12,
	elem : '#color_panel li'
} ], [ 'texing', '特性', 'sub_list', {
	belong : '特性',
	sub_type : 'list',
	rank : 13,
	elem : '#texing_panel li'
} ], [ 'positive_effect', '正面效果', 'sub_list', {
	belong : '特性',
	sub_type : 'list',
	rank : 13,
	elem : '#positive_effect_panel li',
	typeName : '正面效果'
} ], [ 'negative_effect', '负面效果', 'sub_list', {
	belong : '特性',
	sub_type : 'list',
	rank : 13,
	elem : '#negative_effect_panel li',
	typeName : '负面效果'
} ], [ 'lingxing', '灵性', 'sub_list', {
	belong : '灵性值',
	sub_type : 'input',
	rank : 14,
	elem : '#txt_lingxing'
} ], [ 'server_type', '开服时间', 'sub_list', {
	belong : '开服时间',
	sub_type : 'list',
	rank : 15,
	elem : '#server_type_panel li'
} ], [ 'type', '类型', 'autocomplete', 'pet_select_box', SaleablePetNameInfo ] ];
var OverallPetSearcher = new Class(
		{
			initialize : function() {
				this.skill_checker = new PetSkillButtonChecker(PetSkills.slice(
						0, 42), $('pet_skill_panel'));
				this
						.init_equal_advanced_skill_panel($('pet_equal_advanced_skill_panel'));
				this.server_type_checker = new ButtonChecker(ServerTypes,
						$('server_type_panel'));
				this.front_status_checker = new ButtonChecker(FrontStatus,
						$('fair_show_panel'));
				this.high_neidan_checker = new ButtonChecker(HighNeidans,
						$('high_neidan_panel'));
				this.low_neidan_checker = new ButtonChecker(LowNeidans,
						$('low_neidan_panel'));
				this.color_checker = new ButtonChecker(Colors, $('color_panel'));
				this.select_server = new DropSelectServer($('sel_area'),
						$('sel_server'));
				this.init_pet_select_box();
				this.reg_event();
				this.init_search_btn();
				this.init_role_search_event();
				this.init_reset_btn();
				this.texing_checker = new ButtonChecker(TexingTypes,
						$('texing_panel'));
				this.positive_effect_checker = new ButtonChecker(
						TexingPositiveEffectTypes, $('positive_effect_panel'));
				this.negative_effect_checker = new ButtonChecker(
						TexingNegativeEffectTypes, $('negative_effect_panel'));
				this.fight_level_checker = new ButtonChecker(FightLevels,
						$('fight_level_panel'));
			},
			init_equal_advanced_skill_panel : function(panel) {
				var skills = '夜战 感知 吸血 必杀 连击 偷袭 法术连击 法术暴击 法术波动 魔之心 幸运 反震 强力 驱鬼 防御 敏捷 毒'
						.split(' ');
				var skill_to_id = {};
				PetSkills.each(function(item) {
					skill_to_id[item[1]] = item[0];
				});
				var skills_button_config = [];
				for (var i = 0; i < skills.length; i++) {
					skills_button_config.push([ skill_to_id[skills[i]],
							skills[i] ]);
				}
				this.skill_checker2 = new PetSkillButtonChecker(
						skills_button_config, panel);
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
				var checkers = [ this.skill_checker, this.front_status_checker,
						this.fight_level_checker, this.skill_checker2 ];
				var txt_inputs = [ $('txt_level_min'), $('txt_level_max'),
						$('pet_select_box'), $('txt_skill_num'),
						$('txt_growth'), $('txt_used_lianshou_max'),
						$('txt_used_yuanxiao_max'), $('txt_attack_aptitude'),
						$('txt_defence_aptitude'), $('txt_physical_aptitude'),
						$('txt_magic_aptitude'), $('txt_speed_aptitude_min'),
						$('txt_speed_aptitude_max'), $('txt_price_min'),
						$('txt_price_max') ];
				var chkbox_inputs = [ $('chk_skill_with_suit'),
						$('chk_suit_as_any_skill'),
						$('chk_skill_including_advanced') ];
				this.reset(checkers, txt_inputs, chkbox_inputs);
			},
			reset_detail : function() {
				var checkers = [ this.high_neidan_checker,
						this.low_neidan_checker, this.color_checker,
						this.texing_checker, this.positive_effect_checker,
						this.negative_effect_checker ];
				var txt_inputs = [ $('txt_max_blood'), $('txt_attack'),
						$('txt_defence'), $('txt_speed_min'),
						$('txt_speed_max'), $('txt_wakan'), $('txt_lingxing'),
						$('txt_high_neidan_level'), $('txt_low_neidan_level') ];
				var chkbox_inputs = [ $('chk_is_baobao'), $('chk_summon_color') ];
				this.reset(checkers, txt_inputs, chkbox_inputs);
			},
			reset_server_info : function() {
				var checkers = [ this.server_type_checker, this.select_server ];
				this.reset(checkers, []);
			},
			reset : function(checkers, txt_inputs, chkbox_inputs) {
				for (var i = 0; i < checkers.length; i++) {
					checkers[i].reset_value();
				}
				for (var i = 0; i < txt_inputs.length; i++) {
					txt_inputs[i].set('value', '');
				}
				if (chkbox_inputs) {
					for (var i = 0; i < chkbox_inputs.length; i++)
						chkbox_inputs[i].checked = false;
				}
			},
			init_pet_select_box : function() {
				var handle_pet_search = function(keyword) {
					var result = new Array();
					for ( var pet_type in SaleablePetNameInfo) {
						if (SaleablePetNameInfo[pet_type].indexOf(keyword) != -1) {
							var type_name = SaleablePetNameInfo[pet_type];
							if (result.indexOf(type_name) == -1) {
								result.push(type_name);
							}
						}
					}
					return result;
				};
				new AutoComplete($('pet_select_box'), {
					"startPoint" : 1,
					"promptNum" : 20,
					"handle_func" : handle_pet_search,
					"callback" : function() {
					}
				});
			},
			get_pet_type_value : function() {
				var result = [];
				var pet_name = $('pet_select_box').value;
				if (!pet_name) {
					return null;
				}
				for ( var pet_type in SaleablePetNameInfo) {
					if (SaleablePetNameInfo[pet_type].indexOf(pet_name) != -1) {
						result.push(pet_type);
					}
				}
				return result.join(',');
			},
			reg_event : function() {
				var __this = this;
				$('btn_all_skill').addEvent('click', function() {
					if ($(this).retrieve('spread')) {
						return;
					}
					__this.skill_checker.extend(PetSkills.slice(42));
					$(this).store('spread', true);
					$(this).setStyle('display', 'none');
				});
				var chka = $('chk_skill_with_suit');
				var chkb = $('chk_suit_as_any_skill');
				var clearb = function() {
					if (chka.checked)
						chkb.checked = false;
				}
				var cleara = function() {
					if (chkb.checked)
						chka.checked = false;
				}
				chka.addEvent('change', clearb);
				chkb.addEvent('change', cleara);
				chka.getParent('label').addEvent('click', clearb);
				chkb.getParent('label').addEvent('click', cleara);
			},
			init_search_btn : function() {
				var __this = this;
				$('btn_pet_search').addEvent('click', function() {
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
												document.query_form.search_act.value = "overall_search_role_by_pet";
												$('query_args').value = JSON
														.encode(args);
												document.query_form.submit();
											});
								});
			},
			search : function(func) {
				var arg = {};
				if ($('pet_select_box').value) {
					var pet_type = this.get_pet_type_value();
					if (!pet_type) {
						alert('不存在你要搜的召唤兽名称');
						return false;
					}
					arg['type'] = pet_type;
				}
				var check_items = [
						[ 'skill', this.skill_checker, false ],
						[ 'low_skill', this.skill_checker2, false ],
						[ 'front_status', this.front_status_checker, true ],
						[ 'server_type', this.server_type_checker, true ],
						[ 'color', this.color_checker, false ],
						[ 'texing', this.texing_checker, false ],
						[ 'positive_effect', this.positive_effect_checker,
								false ],
						[ 'negative_effect', this.negative_effect_checker,
								false ],
						[ 'kindid', this.fight_level_checker, true ] ];
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
				var high_neidan_values = this.high_neidan_checker.get_value();
				var low_neidan_values = this.low_neidan_checker.get_value();
				if (high_neidan_values.length)
					arg['high_neidan'] = high_neidan_values;
				if (low_neidan_values.length)
					arg['low_neidan'] = low_neidan_values;
				if ($('chk_skill_with_suit').checked) {
					arg['skill_with_suit'] = 1;
				}
				if ($('chk_suit_as_any_skill').checked) {
					arg['suit_as_any_skill'] = 1;
				}
				if ($('chk_skill_including_advanced').checked) {
					arg['skill_including_advanced'] = 1;
				}
				if ($('chk_is_baobao').checked) {
					arg['is_baobao'] = 1;
				}
				if ($('chk_summon_color').checked) {
					arg['summon_color'] = 1;
				}
				var txt_int_items = [ [ 'level_min', 0, 180, '等级' ],
						[ 'level_max', 0, 180, '等级' ],
						[ 'skill_num', 0, 10000, '技能数量' ],
						[ 'attack_aptitude', 0, 10000, '攻击资质' ],
						[ 'defence_aptitude', 0, 10000, '防御资质' ],
						[ 'physical_aptitude', 0, 10000, '体力资质' ],
						[ 'magic_aptitude', 0, 10000, '法力资质' ],
						[ 'speed_aptitude_min', 0, 10000, '速度资质' ],
						[ 'speed_aptitude_max', 0, 10000, '速度资质' ],
						[ 'price_min', 0, MaxTradeYuan, '价格' ],
						[ 'price_max', 0, MaxTradeYuan, '价格' ],
						[ 'max_blood', 0, 20000, '气血' ],
						[ 'attack', 0, 4000, '攻击' ],
						[ 'defence', 0, 4000, '防御' ],
						[ 'speed_min', 0, 2000, '速度' ],
						[ 'speed_max', 0, 2000, '速度' ],
						[ 'wakan', 0, 2000, '灵力' ],
						[ 'lingxing', 0, 10000, '灵性' ],
						[ 'used_lianshou_max', 0, Infinity, '已使用炼兽珍经数量' ],
						[ 'used_yuanxiao_max', 0, Infinity, '已使用元宵数量' ],
						[ 'high_neidan_level', 0, Infinity, '高级内丹层数' ],
						[ 'low_neidan_level', 0, Infinity, '低级内丹层数' ] ];
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
				var growth = $('txt_growth').value;
				if (growth) {
					if (!/^\d\.\d{1,3}$/.test(growth)) {
						alert('成长值错误, 最多3位小数');
						return false;
					} else {
						arg['growth'] = parseInt(parseFloat(growth) * 1000);
					}
				}
				if ($("user_serverid") && $("user_serverid").value) {
					arg['cross_buy_serverid'] = $("user_serverid").value;
				}
				save_args_in_cookie(arg, "overall_pet_search");
				var f = func || go_overall_search;
				f(arg);
			}
		});