var SuitEffects = [ [ 1, "变身" ], [ 2, "定心术" ], [ 3, "金刚护法" ], [ 4, "逆鳞" ],
		[ 5, "满天花雨" ], [ 6, "炼气化神" ], [ 7, "普渡众生" ], [ 8, "生命之泉" ],
		[ 50, "碎星诀" ], [ 51, "浪涌" ], [ 9, "变身术之凤凰" ], [ 10, "变身术之蛟龙" ],
		[ 11, "变身术之雨师" ], [ 12, "变身术之如意仙子" ], [ 13, "变身术之芙蓉仙子" ],
		[ 14, "变身术之巡游天神" ], [ 15, "变身术之星灵仙子" ], [ 16, "变身术之幽灵" ],
		[ 17, "变身术之鬼将" ], [ 18, "变身术之吸血鬼" ], [ 19, "变身术之净瓶女娲" ],
		[ 20, "变身术之律法女娲" ], [ 21, "变身术之灵符女娲" ], [ 22, "变身术之画魂" ],
		[ 23, "变身术之幽萤娃娃" ], [ 24, "变身术之大力金刚" ], [ 25, "变身术之雾中仙" ],
		[ 26, "变身术之灵鹤" ], [ 27, "变身术之夜罗刹" ], [ 28, "变身术之炎魔神" ],
		[ 29, "变身术之噬天虎" ], [ 30, "变身术之踏云兽" ], [ 31, "变身术之红萼仙子" ],
		[ 32, "变身术之龙龟" ], [ 33, "变身术之机关兽" ], [ 34, "变身术之机关鸟" ],
		[ 35, "变身术之连弩车" ], [ 36, "变身术之巴蛇" ], [ 37, "变身术之葫芦宝贝" ],
		[ 38, "变身术之猫灵（人型）" ], [ 39, "变身术之狂豹（人型）" ], [ 40, "变身术之蝎子精" ],
		[ 41, "变身术之混沌兽" ], [ 42, "变身术之长眉灵猴" ], [ 43, "变身术之巨力神猿" ],
		[ 44, "变身术之修罗傀儡鬼" ], [ 45, "变身术之修罗傀儡妖" ], [ 46, "变身术之金身罗汉" ],
		[ 47, "变身术之藤蔓妖花" ], [ 48, "变身术之曼珠沙华" ], [ 49, "变身术之蜃气妖" ] ];
var SchoolSkills = {
	'大唐官府' : [ '十方无敌', '无双一击', '神兵鉴赏', '文韬武略', '为官之道', '紫薇之术', '疾风步' ],
	'化生寺' : [ '金刚伏魔', '小乘佛法', '诵经', '佛光普照', '大慈大悲', '岐黄之术', '渡世步' ],
	'女儿村' : [ '毒经', '倾国倾城', '沉鱼落雁', '闭月羞花', '香飘兰麝', '玉质冰肌', '清歌妙舞' ],
	'方寸山' : [ '磬龙灭法', '黄庭经', '霹雳咒', '符之术', '归元心法', '神道无念', '斜月步' ],
	'狮驼岭' : [ '生死搏', '训兽诀', '魔兽神功', '阴阳二气诀', '狂兽诀', '大鹏展翅', '魔兽反噬' ],
	'阴曹地府' : [ '六道轮回', '幽冥术', '拘魂诀', '灵通术', '九幽阴魂', '尸腐恶', '无常步' ],
	'魔王寨' : [ '震天诀', '牛逼神功', '火云术', '火牛阵', '牛虱阵', '回身击', '裂石步' ],
	'盘丝洞' : [ '秋波暗送', '天外魔音', '蛛丝阵法', '迷情大法', '盘丝大法', '移形换影', '姊妹相随' ],
	'龙宫' : [ '破浪诀', '九龙诀', '呼风唤雨', '龙腾', '逆鳞', '游龙术', '龙附' ],
	'天宫' : [ '傲世诀', '天罡气', '清明自在', '宁气诀', '乾坤塔', '混天术', '云霄步' ],
	'普陀山' : [ '护法金刚', '金刚经', '观音咒', '灵性', '五行学说', '五行扭转', '莲花宝座' ],
	'五庄观' : [ '潇湘仙雨', '乾坤袖', '修仙术', '周易学', '混元道果', '明性修身', '七星遁' ],
	'神木林' : [ '瞬息万变', '万灵诸念', '巫咒', '万物轮转', '天人庇护', '神木恩泽', '驭灵咒' ],
	'凌波城' : [ '天地无极', '九转玄功', '武神显圣', '啸傲', '气吞山河', '诛魔', '法天象地' ],
	'无底洞' : [ '枯骨心法', '阴风绝章', '鬼蛊灵蕴', '燃灯灵宝', '地冥妙法', '混元神功', '秘影迷踪' ]
};
var RoleSearchFormInit = new Class(
		{
			initialize : function() {
				this.init_role_level();
				this.gen_equip_levels();
				this.init_taozhuang();
				this.reg_advance_search_fold_ev();
				this.reg_item_selected_ev();
				this.reg_reset_ev();
				this.init_school_skill_tips();
				this.select_server = new DropSelectServer($('sel_area'),
						$('switchto_serverid'));
				$('sel_area').select_server = this.select_server;
				$("btn_do_query").addEvent("click", function() {
					submit_query_form();
				});
			},
			init_role_level : function() {
				$$("#role_level li[data-level]").addEvent('click', function() {
					var level = $(this).get('data-level');
					$('level_min').value = level;
					$('level_max').value = level;
					update_level_btns();
				});
				$$('#level_min, #level_max').addEvent('keyup',
						update_level_btns);
				function update_level_btns() {
					var level_min = $('level_min').value, level_max = $('level_max').value;
					$$("#role_level li[data-level]").each(
							function(el) {
								var data_level = el.get('data-level');
								if (data_level == level_min
										&& data_level == level_max) {
									el.addClass('on');
								} else {
									el.removeClass('on');
								}
							});
				}
			},
			init_taozhuang : function() {
				var con = $('taozhuang_type');
				for (var i = 0; i < SuitEffects.length; i++) {
					var item = SuitEffects[i];
					var option = new Element('option', {
						'value' : item[0],
						'html' : item[1]
					});
					con.grab(option);
				}
			},
			gen_equip_levels : function() {
				var el_list = [ $("equip_level_min"), $("equip_level_max") ];
				for (var i = 0; i < el_list.length; i++) {
					var el = el_list[i];
					var op = new Element("option", {
						"text" : "不限",
						"value" : ""
					});
					op.inject(el);
					var j = 10;
					while (j <= 160) {
						var op = new Element("option", {
							"text" : j,
							"value" : j
						});
						op.inject(el);
						j = j + 10;
					}
				}
			},
			reg_advance_search_fold_ev : function() {
				$("btn_advance_search_fold")
						.addEvent(
								"click",
								function() {
									if ($("advance_search_box").getStyle(
											"display") == "block") {
										$("advance_search_box").setStyle(
												"display", "none");
									} else {
										$("advance_search_box").setStyle(
												"display", "block");
									}
								});
			},
			reg_item_selected_ev : function() {
				var item_list = $$("#school_list li");
				item_list.extend($$("#race_list li"));
				item_list.extend($$("#equip_teji li"));
				item_list.extend($$("#equip_texiao li"));
				item_list.extend($$("#pet_box li"));
				item_list.extend($$("#xiangrui_box li"));
				item_list.extend($$("#server_type li"));
				item_list.extend($$("#school_change_list li"));
				item_list.extend($$("#jiyuan_and_addpoint_panel li"));
				item_list.extend($$('#limit_clothes_panel li'));
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
			empty_input_box : function(item_list) {
				for (var i = 0; i < item_list.length; i++) {
					if (item_list[i].type != 'radio') {
						$(item_list[i]).value = "";
					}
				}
			},
			reg_reset_ev : function() {
				var self = this;
				$("reset_role_basic")
						.addEvent(
								"click",
								function() {
									self
											.empty_input_box($$("#role_basic_panel input[type=text]"));
									$$("#role_basic_panel li.on").removeClass(
											"on");
									$$('#role_basic_panel input[type=radio]')
											.set('checked', false);
									$('zhuang_zhi_hua_sheng').value = $('zhuang_zhi_hua_sheng_select').options[0].value;
									$('zhuang_zhi_hua_sheng_select').selectedIndex = 0;
									return false;
								});
				$("reset_role_attr").addEvent("click", function() {
					self.empty_input_box($$("#role_attr_panel input"));
					$$("#role_attr_panel li.on").removeClass("on");
					$('attr_point_strategy').value = '';
					return false;
				});
				$("reset_role_expt").addEvent("click", function() {
					self.empty_input_box($$("#role_expt_panel input"));
					return false;
				});
				$("reset_role_skills").addEvent("click", function() {
					self.empty_input_box($$("#role_skills_panel input"));
					self.empty_input_box($$("#role_skills_panel select"));
					return false;
				});
				$("reset_role_carry").addEvent("click", function() {
					self.empty_input_box($$("#role_carry_panel input"));
					self.empty_input_box($$("#role_carry_panel select"));
					$$("#role_carry_panel li.on").removeClass("on");
					$("teji_match_signle").checked = true;
					$("teji_match_all").checked = false;
					$("texiao_match_single").checked = true;
					$("texiao_match_all").checked = false;
					$("lingshi_attr_match_single").checked = true;
					$("lingshi_attr_match_all").checked = false;
					$("pet_match_signle").checked = true;
					$("pet_match_all").checked = false;
					$("xiangrui_match_signle").checked = true;
					$("xiangrui_match_all").checked = false;
					return false;
				});
				$("reset_role_other").addEvent("click", function() {
					self.empty_input_box($$("#role_other_box input"));
					self.empty_input_box($$("#role_other_box select"));
					return false;
				});
				$("reset_server_selected").addEvent("click", function() {
					self.select_server.reset_value();
					self.empty_input_box($$("#server_info_box input"));
					$$("#server_info_box li.on").removeClass("on");
					return false;
				});
				$("reset_all").addEvent("click", function() {
					$("reset_role_basic").fireEvent("click");
					$("reset_role_attr").fireEvent("click");
					$("reset_role_expt").fireEvent("click");
					$("reset_role_skills").fireEvent("click");
					$("reset_role_carry").fireEvent("click");
					$("reset_role_other").fireEvent("click");
					$("reset_server_selected").fireEvent("click");
					return false;
				});
			},
			init_school_skill_tips : function() {
				$$("#role_school_skills label")
						.each(
								function(el, index) {
									var content = [
											'<div class="tipsContent clearfix">',
											'<h5>技能', (index + 1) + '对照表</h5>',
											'<dl>' ];
									for ( var school in SchoolSkills) {
										content
												.push('<dt>' + school
														+ '：</dt>');
										content.push('<dd>'
												+ SchoolSkills[school][index]
												+ '</dd>');
									}
									content.push('</dl>');
									content.push('</div>');
									init_popover({
										target : el,
										content : content.join(''),
										class_name : 'tipsBlack popArrowUp schoolSkillTips'
									});
								});
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
		if (!re.test(item_value) || item_value.length > 10) {
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
	return value_list.join(",");
}
OVERALL_SEARCH_ROLE_ARGS_CONFIG = [ [ 'school', '门派', 'sub_list', {
	belong : '门派',
	sub_type : 'list',
	elem : '#school_list li',
	rank : 1
} ], [ 'school_change_list', '历史门派', 'sub_list', {
	belong : '历史门派',
	sub_type : 'list',
	elem : '#school_change_list li',
	rank : 2
} ], [ 'race', '角色', 'sub_list', {
	belong : '角色',
	sub_type : 'list',
	elem : '#race_list li',
	rank : 3
} ], [ 'level', '等级', 'sub_list', {
	belong : '等级',
	sub_type : 'range',
	rank : 4
} ], [ 'price', '价格', 'sub_list', {
	belong : '价格',
	sub_type : 'range',
	rank : 5,
	elem : 'txt_price'
} ], [ 'sum_exp', '角色总经验', 'sub_list', {
	belong : '角色总经验',
	sub_type : 'range',
	rank : 6
} ], [ 'zhuang_zhi', '飞升/渡劫/化圣', 'sub_list', {
	belong : '飞升/渡劫/化圣',
	sub_type : 'radio-select',
	rank : 7,
	elem : '.zhuang_zhi'
} ], [ 'shang_hai', '伤害', 'sub_list', {
	belong : '基础属性',
	sub_type : 'input',
	rank : 8
} ], [ 'ming_zhong', '命中', 'sub_list', {
	belong : '基础属性',
	sub_type : 'input',
	rank : 8
} ], [ 'ling_li', '灵力', 'sub_list', {
	belong : '基础属性',
	sub_type : 'input',
	rank : 8
} ], [ 'fang_yu', '防御', 'sub_list', {
	belong : '基础属性',
	sub_type : 'input',
	rank : 8
} ], [ 'hp', '气血', 'sub_list', {
	belong : '基础属性',
	sub_type : 'input',
	rank : 8
} ], [ 'speed', '速度', 'sub_list', {
	belong : '基础属性',
	sub_type : 'input',
	rank : 8
} ], [ 'fa_shang', '法伤', 'sub_list', {
	belong : '基础属性',
	sub_type : 'input',
	rank : 8
} ], [ 'fa_fang', '法防', 'sub_list', {
	belong : '基础属性',
	sub_type : 'input',
	rank : 8
} ], [ 'qian_neng_guo', '潜能果', 'sub_list', {
	belong : '额外属性',
	sub_type : 'input',
	rank : 8,
	elem : '#qian_neng_guo',
	rank : 8
} ], [ 'jiyuan_and_addpoint', '属性总和(机缘属性+月饼粽子)', 'sub_list', {
	belong : '额外属性',
	sub_type : 'input',
	elem : '#jiyuan_and_addpoint',
	rank : 8
} ], [ 'ji_yuan_point', '属性总和(机缘属性)', 'sub_list', {
	belong : '额外属性',
	sub_type : 'input',
	elem : '#ji_yuan_point',
	rank : 8
} ], [ 'addon_point', '属性总和(月饼粽子)', 'sub_list', {
	belong : '额外属性',
	sub_type : 'input',
	elem : '#addon_point',
	rank : 8
} ], [ 'attr_point_strategy', '方案', 'sub_list', {
	belong : '属性点保存方案',
	sub_type : 'select',
	rank : 9
} ], [ 'expt_gongji', '攻击修炼', 'sub_list', {
	belong : '角色自身修炼',
	sub_type : 'input',
	rank : 10
} ], [ 'expt_fangyu', '防御修炼', 'sub_list', {
	belong : '角色自身修炼',
	sub_type : 'input',
	rank : 10
} ], [ 'expt_fashu', '法术修炼', 'sub_list', {
	belong : '角色自身修炼',
	sub_type : 'input',
	rank : 10
} ], [ 'expt_kangfa', '抗法修炼', 'sub_list', {
	belong : '角色自身修炼',
	sub_type : 'input',
	rank : 10
} ], [ 'max_expt_gongji', '攻击上限', 'sub_list', {
	belong : '角色自身修炼',
	sub_type : 'input',
	rank : 10
} ], [ 'max_expt_fangyu', '防御上限', 'sub_list', {
	belong : '角色自身修炼',
	sub_type : 'input',
	rank : 10
} ], [ 'max_expt_fashu', '法术上限', 'sub_list', {
	belong : '角色自身修炼',
	sub_type : 'input',
	rank : 10
} ], [ 'max_expt_kangfa', '抗法上限', 'sub_list', {
	belong : '角色自身修炼',
	sub_type : 'input',
	rank : 10
} ], [ 'expt_lieshu', '猎术修炼', 'sub_list', {
	belong : '角色自身修炼',
	sub_type : 'input',
	rank : 11
} ], [ 'expt_total', '修炼总和', 'sub_list', {
	belong : '角色自身修炼',
	sub_type : 'input',
	rank : 11
} ], [ 'bb_expt_gongji', '攻击控制', 'sub_list', {
	belong : '召唤兽控制修炼',
	sub_type : 'input',
	rank : 11
} ], [ 'bb_expt_fangyu', '防御控制', 'sub_list', {
	belong : '召唤兽控制修炼',
	sub_type : 'input',
	rank : 11
} ], [ 'bb_expt_fashu', '法术控制', 'sub_list', {
	belong : '召唤兽控制修炼',
	sub_type : 'input',
	rank : 11
} ], [ 'bb_expt_kangfa', '抗法控制', 'sub_list', {
	belong : '召唤兽控制修炼',
	sub_type : 'input',
	rank : 11
} ], [ 'bb_expt_total', '宠修总和', 'sub_list', {
	belong : '召唤兽控制修炼',
	sub_type : 'input',
	rank : 11
} ], [ 'skill_drive_pet', '育兽术', 'sub_list', {
	belong : '召唤兽控制修炼',
	sub_type : 'input',
	rank : 11
} ], [ 'school_skill_level', '师门技能等级', 'sub_list', {
	belong : '师门技能',
	sub_type : 'input',
	elem : '#school_skill_level',
	rank : 12
} ], [ 'school_skill_num', '师门技能数', 'sub_list', {
	belong : '师门技能',
	sub_type : 'select',
	elem : '#school_skill_num',
	rank : 12
} ], [ 'lin_shi_fu', '临时符技能', 'sub_list', {
	belong : '师门技能',
	sub_type : 'input',
	rank : 12
} ], [ 'qian_yuan_dan', '乾元丹个数', 'sub_list', {
	belong : '师门技能',
	sub_type : 'input',
	rank : 12
} ], [ 'smith_skill', '打造熟练度', 'sub_list', {
	belong : '师门技能',
	sub_type : 'input',
	rank : 12
} ], [ 'sew_skill', '裁缝熟练度', 'sub_list', {
	belong : '师门技能',
	sub_type : 'input',
	rank : 12
} ], [ 'skill_qiang_shen', '强身', 'sub_list', {
	belong : '生活技能',
	sub_type : 'input',
	rank : 13
} ], [ 'skill_shensu', '神速', 'sub_list', {
	belong : '生活技能',
	sub_type : 'input',
	rank : 13
} ], [ 'skill_qiang_zhuang', '强健', 'sub_list', {
	belong : '生活技能',
	sub_type : 'input',
	rank : 13
} ], [ 'skill_ming_xiang', '冥想', 'sub_list', {
	belong : '生活技能',
	sub_type : 'input',
	rank : 13
} ], [ 'skill_dazao', '打造技巧', 'sub_list', {
	belong : '生活技能',
	sub_type : 'input',
	rank : 13
} ], [ 'skill_pengren', '烹饪技巧', 'sub_list', {
	belong : '生活技能',
	sub_type : 'input',
	rank : 13
} ], [ 'skill_caifeng', '裁缝技巧', 'sub_list', {
	belong : '生活技能',
	sub_type : 'input',
	rank : 13
} ], [ 'skill_zhongyao', '中药医疗', 'sub_list', {
	belong : '生活技能',
	sub_type : 'input',
	rank : 13
} ], [ 'skill_qiaojiang', '巧匠之术', 'sub_list', {
	belong : '生活技能',
	sub_type : 'input',
	rank : 13
} ], [ 'skill_lingshi', '灵石技巧', 'sub_list', {
	belong : '生活技能',
	sub_type : 'input',
	rank : 13
} ], [ 'skill_lianjin', '炼金术', 'sub_list', {
	belong : '生活技能',
	sub_type : 'input',
	rank : 13
} ], [ 'skill_jianshen', '健身术', 'sub_list', {
	belong : '生活技能',
	sub_type : 'input',
	rank : 13
} ], [ 'skill_yangsheng', '养生之道', 'sub_list', {
	belong : '生活技能',
	sub_type : 'input',
	rank : 13
} ], [ 'skill_anqi', '暗器技巧', 'sub_list', {
	belong : '生活技能',
	sub_type : 'input',
	rank : 13
} ], [ 'skill_taoli', '逃离技巧', 'sub_list', {
	belong : '生活技能',
	sub_type : 'input',
	rank : 13
} ], [ 'skill_zhuibu', '追捕技巧', 'sub_list', {
	belong : '生活技能',
	sub_type : 'input',
	rank : 13
} ], [ 'skill_ronglian', '熔炼技巧', 'sub_list', {
	belong : '生活技能',
	sub_type : 'input',
	rank : 13
} ], [ 'skill_cuiling', '淬灵之术', 'sub_list', {
	belong : '生活技能',
	sub_type : 'input',
	rank : 13
} ], [ 'skill_danyuan', '丹元济会', 'sub_list', {
	belong : '剧情技能',
	sub_type : 'input',
	rank : 14
} ], [ 'skill_miaoshou', '妙手空空', 'sub_list', {
	belong : '剧情技能',
	sub_type : 'input',
	rank : 14
} ], [ 'skill_baoshi', '宝石工艺', 'sub_list', {
	belong : '剧情技能',
	sub_type : 'input',
	rank : 14
} ], [ 'skill_qimen', '奇门遁甲', 'sub_list', {
	belong : '剧情技能',
	sub_type : 'input',
	rank : 14
} ], [ 'skill_gudong', '古董评估', 'sub_list', {
	belong : '剧情技能',
	sub_type : 'input',
	rank : 14
} ], [ "skill_tiaoxi", "调息", 'sub_list', {
	belong : '剧情技能',
	sub_type : 'input',
	rank : 14
} ], [ "skill_dazuo", "打坐", 'sub_list', {
	belong : '剧情技能',
	sub_type : 'input',
	rank : 14
} ], [ 'skill_xianling', '仙灵店铺', 'sub_list', {
	belong : '剧情技能',
	sub_type : 'input',
	rank : 14
} ], [ 'skill_jianzhu', '建筑之术', 'sub_list', {
	belong : '剧情技能',
	sub_type : 'input',
	rank : 14
} ], [ 'skill_bianhua', '变化之术', 'sub_list', {
	belong : '剧情技能',
	sub_type : 'input',
	rank : 14
} ], [ 'skill_huoyan', '火眼金睛', 'sub_list', {
	belong : '剧情技能',
	sub_type : 'input',
	rank : 14
} ], [ 'max_weapon_shang_hai', '携带武器总伤', 'sub_list', {
	belong : '身上装备',
	sub_type : 'input',
	rank : 15
} ], [ "max_weapon_damage", "携带武器伤害", 'sub_list', {
	belong : '身上装备',
	sub_type : 'input',
	rank : 15
} ], [ "max_weapon_init_damage", "携带武器初伤（含命中）", 'sub_list', {
	belong : '身上装备',
	sub_type : 'input',
	rank : 15
} ], [ "max_weapon_init_damage_raw", "携带武器初伤（不含命中）", 'sub_list', {
	belong : '身上装备',
	sub_type : 'input',
	rank : 15
} ], [ "max_necklace_ling_li", "携带项链灵力", 'sub_list', {
	belong : '身上装备',
	sub_type : 'input',
	rank : 15
} ], [ "max_necklace_init_wakan", "携带项链初灵", 'sub_list', {
	belong : '身上装备',
	sub_type : 'input',
	rank : 15
} ], [ 'equip_level', '装备等级', 'sub_list', {
	belong : '身上装备',
	sub_type : 'range',
	rank : 15,
	typeName : '装备等级'
} ], [ 'taozhuang_num', '套装数量', 'sub_list', {
	belong : '身上装备',
	sub_type : 'select',
	rank : 15,
	elem : '#taozhuang_num'
} ], [ 'taozhuang_type', '套装类型', 'sub_list', {
	belong : '身上装备',
	sub_type : 'select',
	rank : 15,
	elem : '#taozhuang_type'
} ], [ 'teji_list', '特技', 'sub_list', {
	belong : '身上装备',
	sub_type : 'list',
	rank : 15,
	elem : '#equip_teji li',
	typeName : '特技'
} ], [ 'teji_match_all', '满足全部特技', 'sub_list', {
	belong : '身上装备',
	sub_type : 'radio',
	rank : 15,
	elem : 'input[name=teji_match_all]'
} ], [ 'texiao_list', '特效', 'sub_list', {
	belong : '身上装备',
	sub_type : 'list',
	rank : 15,
	elem : '#equip_texiao li',
	typeName : '特效'
} ], [ 'texiao_match_all', '满足全部特效', 'sub_list', {
	belong : '身上装备',
	sub_type : 'radio',
	rank : 15,
	elem : '#texiao_match_all'
} ], [ 'lingshi_attr_2', '灵饰伤害', 'sub_list', {
	belong : '身上灵饰',
	sub_type : 'input',
	rank : 16
} ], [ 'lingshi_attr_3', '灵饰速度', 'sub_list', {
	belong : '身上灵饰',
	sub_type : 'input',
	rank : 16
} ], [ 'lingshi_attr_8', '灵饰封印', 'sub_list', {
	belong : '身上灵饰',
	sub_type : 'input',
	rank : 16
} ], [ 'lingshi_attr_11', '灵饰治疗', 'sub_list', {
	belong : '身上灵饰',
	sub_type : 'input',
	rank : 16
} ], [ 'lingshi_attr_7', '灵饰法爆', 'sub_list', {
	belong : '身上灵饰',
	sub_type : 'input',
	rank : 16
} ], [ 'lingshi_attr_4', '灵饰法伤', 'sub_list', {
	belong : '身上灵饰',
	sub_type : 'input',
	rank : 16
} ], [ 'lingshi_attr_9', '灵饰法伤结果', 'sub_list', {
	belong : '身上灵饰',
	sub_type : 'input',
	rank : 16
} ], [ 'lingshi_attr_1', '灵饰固伤', 'sub_list', {
	belong : '身上灵饰',
	sub_type : 'input',
	rank : 16
} ], [ 'lingshi_attr_6', '灵饰物爆', 'sub_list', {
	belong : '身上灵饰',
	sub_type : 'input',
	rank : 16
} ], [ 'lingshi_attr_12', '灵饰气血', 'sub_list', {
	belong : '身上灵饰',
	sub_type : 'input',
	rank : 16
} ], [ 'lingshi_attr_13', '灵饰防御', 'sub_list', {
	belong : '身上灵饰',
	sub_type : 'input',
	rank : 16
} ], [ 'lingshi_attr_14', '灵饰法防', 'sub_list', {
	belong : '身上灵饰',
	sub_type : 'input',
	rank : 16
} ], [ 'lingshi_attr_17', '灵饰抗封', 'sub_list', {
	belong : '身上灵饰',
	sub_type : 'input',
	rank : 16
} ], [ 'lingshi_attr_18', '灵饰格挡', 'sub_list', {
	belong : '身上灵饰',
	sub_type : 'input',
	rank : 16
} ], [ 'lingshi_attr_16', '灵饰抗法爆', 'sub_list', {
	belong : '身上灵饰',
	sub_type : 'input',
	rank : 16
} ], [ 'lingshi_attr_15', '灵饰抗物爆', 'sub_list', {
	belong : '身上灵饰',
	sub_type : 'input',
	rank : 16
} ], [ 'lingshi_min_level', '灵饰等级', 'sub_list', {
	belong : '身上灵饰',
	sub_type : 'range',
	rank : 16,
	typeName : '灵饰等级'
} ], [ 'lingshi_min_duanzao_level', '灵饰锻造', 'sub_list', {
	belong : '身上灵饰',
	sub_type : 'range',
	rank : 16,
	typeName : '锻造等级'
} ], [ 'lingshi_attr_match_all', '属性总条数', 'sub_list', {
	belong : '身上灵饰',
	sub_type : 'radio',
	rank : 16,
	elem : '#lingshi_attr_match_all'
} ], [ 'pet_type_list', '召唤兽', 'sub_list', {
	belong : '身上召唤兽',
	sub_type : 'list',
	rank : 17,
	elem : '#pet_box li'
} ], [ 'growup_pet_num', '成品召唤兽数量', 'sub_list', {
	belong : '身上召唤兽',
	sub_type : 'input',
	rank : 17,
	elem : '#growup_pet_num'
} ], [ 'pet_match_all', '满足全部召唤兽', 'sub_list', {
	belong : '身上召唤兽',
	sub_type : 'radio',
	rank : 17,
	elem : '#pet_match_all'
} ], [ 'xiangrui_list', '祥瑞', 'sub_list', {
	belong : '身上祥瑞',
	sub_type : 'list',
	rank : 18,
	elem : '#xiangrui_box li'
} ], [ 'xiangrui_num', '祥瑞数量', 'sub_list', {
	belong : '身上祥瑞',
	sub_type : 'input',
	rank : 18,
	elem : '#xiangrui_num'
} ], [ 'xiangrui_match_all', '满足全部祥瑞', 'sub_list', {
	belong : '身上祥瑞',
	sub_type : 'radio',
	rank : 18,
	elem : '#xiangrui_match_all'
} ], [ 'limit_clothes', '限量锦衣', 'sub_list', {
	belong : '限量锦衣',
	sub_type : 'list',
	rank : 19,
	elem : '#limit_clothes_panel li'
} ], [ 'limit_clothes_logic', '是否满足全部', 'sub_list', {
	belong : '限量锦衣',
	sub_type : 'radio',
	rank : 19,
	elem : 'input[name=limit_clothes_logic]'
} ], [ 'pet_skill_num', '技能数量' ], [ 'pet_advance_skill_num', '高级技能数量' ],
		[ 'xian_yu', '仙玉', 'sub_list', {
			belong : '角色状态',
			rank : 20
		} ], [ 'cash', '现金', 'sub_list', {
			belong : '角色状态',
			rank : 20
		} ], [ 'upexp', '当前经验', 'sub_list', {
			belong : '角色状态',
			rank : 20
		} ], [ 'badness', '善恶', 'sub_list', {
			belong : '角色状态',
			rank : 20
		} ], [ 'school_offer', '门贡', 'sub_list', {
			belong : '角色状态',
			rank : 20
		} ], [ 'org_offer', '帮贡', 'sub_list', {
			belong : '角色状态',
			rank : 20
		} ], [ 'cheng_jiu', '成就', 'sub_list', {
			belong : '角色状态',
			rank : 20
		} ], [ 'body_caiguo', '染色折合彩效果数', 'sub_list', {
			belong : '角色状态',
			rank : 20
		} ], [ 'all_caiguo', '所有染色折算彩果数', 'sub_list', {
			belong : '角色状态',
			rank : 20
		} ], [ 'box_caiguo', '保存染色方案数', 'sub_list', {
			belong : '角色状态',
			rank : 20
		} ], [ 'clothes_num', '锦衣数量', 'sub_list', {
			belong : '角色状态',
			rank : 20
		} ], [ 'energy', '精力', 'sub_list', {
			belong : '角色状态',
			rank : 20
		} ], [ 'pride', '人气', 'sub_list', {
			belong : '角色状态',
			rank : 20
		} ], [ 'learn_cash', '储备金', 'sub_list', {
			belong : '角色状态',
			rank : 20
		} ], [ 'pet_extend_num', '召唤兽栏扩展个数', 'sub_list', {
			belong : '角色状态',
			rank : 20
		} ], [ 'baggage_extend_num', '行囊扩展个数', 'sub_list', {
			belong : '角色状态',
			rank : 20
		} ], [ 'sword_score', '剑会积分', 'sub_list', {
			belong : '角色状态',
			rank : 20
		} ], [ 'hero_score', '比武积分', 'sub_list', {
			belong : '角色状态',
			rank : 20
		} ], [ 'sheng_yu_ling_you', '剩余灵佑次数', 'sub_list', {
			belong : '角色状态',
			rank : 20
		} ], [ 'rider_exgrow_full_num', '满成长坐骑数（后天成长1.0）', 'sub_list', {
			belong : '角色状态',
			rank : 20
		} ], [ 'is_niceid_new', '是否靓号', 'sub_list', {
			belong : '角色状态',
			sub_type : 'select',
			elem : '#is_niceid_new',
			rank : 20
		} ], [ 'has_community', '社区', 'sub_list', {
			belong : '婚姻房屋',
			sub_type : 'select',
			elem : '#has_community',
			rank : 20
		} ], [ 'fangwu_level', '房屋', 'sub_list', {
			belong : '婚姻房屋',
			sub_type : 'select',
			elem : '#fangwu_level',
			rank : 20
		} ], [ 'tingyuan_level', '庭院', 'sub_list', {
			belong : '婚姻房屋',
			sub_type : 'select',
			elem : '#tingyuan_level',
			rank : 20
		} ], [ 'muchang_level', '牧场', 'sub_list', {
			belong : '婚姻房屋',
			sub_type : 'select',
			elem : '#muchang_level',
			rank : 20
		} ], [ 'is_married', '婚否', 'sub_list', {
			belong : '婚姻房屋',
			sub_type : 'select',
			elem : '#is_married',
			rank : 20
		} ], [ 'is_tongpao', '同袍', 'sub_list', {
			belong : '婚姻房屋',
			sub_type : 'select',
			elem : '#is_tongpao',
			rank : 20
		} ], [ 'switchto_serverid', '转服至', {
			rank : 21
		} ], [ 'server_type', '开服时间', 'sub_list', {
			belong : '开服时间',
			sub_type : 'list',
			elem : '#server_type li',
			rank : 22
		} ] ];
function submit_query_form() {
	var args_config = [ [ "level_min", "角色最低等级" ], [ "level_max", "角色最高等级" ],
			[ "shang_hai", "伤害" ], [ "ming_zhong", "命中" ], [ "ling_li", "灵力" ],
			[ "fang_yu", "防御" ], [ "hp", "气血" ], [ "speed", "速度" ],
			[ "fa_shang", "法伤" ], [ "fa_fang", "法防" ],
			[ "qian_neng_guo", "潜能果" ], [ "expt_gongji", "攻击修炼" ],
			[ "expt_fangyu", "防御修炼" ], [ "expt_fashu", "法术修炼" ],
			[ "expt_kangfa", "抗法修炼" ], [ "max_expt_gongji", "攻击上限" ],
			[ "max_expt_fangyu", "防御上限" ], [ "max_expt_fashu", "法术上限" ],
			[ "max_expt_kangfa", "抗法上限" ], [ "expt_lieshu", "猎术修炼" ],
			[ "expt_total", "修炼总和" ], [ "bb_expt_gongji", "攻击控制" ],
			[ "bb_expt_fangyu", "防御控制" ], [ "bb_expt_fashu", "法术控制" ],
			[ "bb_expt_kangfa", "抗法控制" ], [ "bb_expt_total", "宠修总和" ],
			[ "skill_qiang_shen", "强身" ], [ "skill_shensu", "神速" ],
			[ "skill_qiang_zhuang", "强健" ], [ "skill_ming_xiang", "冥想" ],
			[ "skill_dazao", "打造技巧" ], [ "skill_pengren", "烹饪技巧" ],
			[ "skill_caifeng", "裁缝技巧" ], [ "skill_zhongyao", "中药医疗" ],
			[ "skill_qiaojiang", "巧匠之术" ], [ "skill_lingshi", "灵石技巧" ],
			[ "skill_lianjin", "炼金术" ], [ "skill_jianshen", "健身术" ],
			[ "skill_yangsheng", "养生之道" ], [ "skill_anqi", "暗器技巧" ],
			[ "skill_taoli", "逃离技巧" ], [ "skill_zhuibu", "追捕技巧" ],
			[ "skill_ronglian", "熔炼技巧" ], [ "skill_danyuan", "丹元济会" ],
			[ "skill_miaoshou", "妙手空空" ], [ "skill_baoshi", "宝石工艺" ],
			[ "skill_qimen", "奇门遁甲" ], [ "skill_gudong", "古董评估" ],
			[ "skill_xianling", "仙灵店铺" ], [ "skill_tiaoxi", "调息" ],
			[ "skill_dazuo", "打坐" ], [ "skill_jianzhu", "建筑之术" ],
			[ "skill_bianhua", "变化之术" ], [ "skill_cuiling", "淬灵之术" ],
			[ "skill_huoyan", "火眼金睛" ], [ "max_weapon_shang_hai", "携带武器总伤" ],
			[ "max_weapon_damage", "携带武器伤害" ],
			[ "max_weapon_init_damage", "携带武器初伤（含命中）" ],
			[ "max_weapon_init_damage_raw", "携带武器初伤（不含命中）" ],
			[ "max_necklace_ling_li", "携带项链灵力" ],
			[ "max_necklace_init_wakan", "携带项链初灵" ],
			[ "pet_skill_num", "技能数量" ], [ "pet_advance_skill_num", "高级技能数量" ],
			[ "xian_yu", "仙玉" ], [ "cash", "现金" ], [ "upexp", "当前经验" ],
			[ "badness", "善恶" ], [ "school_offer", "门贡" ],
			[ "org_offer", "帮贡" ], [ "cheng_jiu", "成就" ],
			[ "body_caiguo", "染色折合彩效果数" ], [ "all_caiguo", "所有染色折算彩果数" ],
			[ "box_caiguo", "保存染色方案数" ], [ "clothes_num", "锦衣数量" ],
			[ "school_skill_num", "师门技能数" ], [ "equip_level_min", "装备最低等级" ],
			[ "equip_level_max", "装备最高等级" ], [ "taozhuang_num", "套装数量" ],
			[ "taozhuang_type", "套装类型" ], [ "has_community", "社区" ],
			[ "fangwu_level", "房屋" ], [ "tingyuan_level", "庭院" ],
			[ "muchang_level", "牧场" ], [ "switchto_serverid", "转服至" ],
			[ "school_skill_level", "师门技能等级" ], [ 'sum_exp_min', '角色总经验' ],
			[ 'sum_exp_max', '角色总经验' ], [ 'lin_shi_fu', '临时符技能' ],
			[ 'qian_yuan_dan', '乾元丹个数' ], [ 'smith_skill', '打造熟练度' ],
			[ 'sew_skill', '裁缝熟练度' ], [ 'skill_drive_pet', '驭兽术' ],
			[ 'lingshi_min_level', '灵饰最低等级' ],
			[ 'lingshi_max_level', '灵饰最高等级' ],
			[ 'lingshi_min_duanzao_level', '灵饰最低锻造' ],
			[ 'lingshi_max_duanzao_level', '灵饰最高锻造' ],
			[ 'lingshi_attr_2', '灵饰伤害' ], [ 'lingshi_attr_3', '灵饰速度' ],
			[ 'lingshi_attr_8', '灵饰封印' ], [ 'lingshi_attr_11', '灵饰治疗' ],
			[ 'lingshi_attr_7', '灵饰法爆' ], [ 'lingshi_attr_4', '灵饰法伤' ],
			[ 'lingshi_attr_9', '灵饰法伤结果' ], [ 'lingshi_attr_1', '灵饰固伤' ],
			[ 'lingshi_attr_6', '灵饰物爆' ], [ 'lingshi_attr_12', '灵饰气血' ],
			[ 'lingshi_attr_13', '灵饰防御' ], [ 'lingshi_attr_14', '灵饰法防' ],
			[ 'lingshi_attr_17', '灵饰抗封' ], [ 'lingshi_attr_18', '灵饰格挡' ],
			[ 'lingshi_attr_16', '灵饰抗法爆' ], [ 'lingshi_attr_15', '灵饰抗物爆' ],
			[ 'growup_pet_num', '成品召唤兽数量' ], [ 'energy', '精力' ],
			[ 'pride', '人气' ], [ 'xiangrui_num', '祥瑞数量' ],
			[ 'learn_cash', '储备金' ], [ 'pet_extend_num', '召唤兽栏扩展个数' ],
			[ 'baggage_extend_num', '行囊扩展个数' ],
			[ 'sheng_yu_ling_you', '剩余灵佑次数' ],
			[ 'rider_exgrow_full_num', '满成长坐骑数（后天成长1.0）' ],
			[ 'sword_score', '剑会积分' ], [ 'hero_score', '比武积分' ] ];
	var input_check = check_int_args(args_config);
	if (!input_check["result"]) {
		alert(input_check["msg"]);
		return;
	}
	var args = input_check["args"];
	if (args["level_min"] != undefined && args["level_max"] != undefined) {
		if (args["level_max"] < args["level_min"]) {
			alert("搜索等级范围填写错误");
			return false;
		}
	}
	if (args["level_min"] != undefined && args["level_max"] == undefined) {
		args["level_max"] = 200;
	}
	if ($("txt_price_min").value.trim().length > 0) {
		var price_min_value = parseFloat($("txt_price_min").value);
		if (!price_min_value || price_min_value <= 0) {
			alert("您输入的最低价格有错误");
			return false;
		}
		args["price_min"] = parseInt(price_min_value * 100);
	}
	if ($("txt_price_max").value.trim().length > 0) {
		var price_max_value = parseFloat($("txt_price_max").value);
		if (!price_max_value || price_max_value <= 0) {
			alert("您输入的最高价格有错误");
			return false;
		}
		args["price_max"] = parseInt(price_max_value * 100);
	}
	if (args["price_min"] != undefined && args["price_max"] != undefined) {
		if (args["price_max"] < args["price_min"]) {
			alert("搜索价格范围填写错误");
			return false;
		}
	}
	if (args["lingshi_min_level"] != undefined
			&& args["lingshi_max_level"] != undefined) {
		if (args["lingshi_max_level"] < args["lingshi_min_level"]) {
			alert("灵饰等级最小值不能大于最大值");
			return false;
		}
	}
	if (args["lingshi_min_duanzao_level"] != undefined
			&& args["lingshi_max_duanzao_level"] != undefined) {
		if (args["lingshi_max_duanzao_level"] < args["lingshi_min_duanzao_level"]) {
			alert("锻造等级最小值不能大于最大值");
			return false;
		}
	}
	if (args['sum_exp_min'] && args['sum_exp_max']
			&& args['sum_exp_min'] > args['sum_exp_max']) {
		alert('角色总经验最小值不能大于最大值');
		return false;
	}
	var school = get_item_selected($$("#school_list li"));
	if (school.length > 0) {
		args["school"] = school;
	}
	var school_change_list = get_item_selected($$("#school_change_list li"));
	if (school_change_list.length > 0) {
		args["school_change_list"] = school_change_list;
	}
	var race = get_item_selected($$("#race_list li"));
	if (race.length > 0) {
		args["race"] = race;
	}
	var teji_list = get_item_selected($$("#equip_teji li"));
	var texiao_list = get_item_selected($$("#equip_texiao li"));
	if (teji_list.length + texiao_list.length > 0) {
		if ($("equip_level_min").value.length == 0
				&& $("equip_level_max").value.length == 0) {
			alert("请选择装备等级");
			return false;
		}
		if (teji_list.length)
			args["teji_list"] = teji_list;
		if (texiao_list.length)
			args["texiao_list"] = texiao_list;
	}
	var pet_type_list = get_item_selected($$("#pet_box li"));
	if (pet_type_list.length > 0) {
		args["pet_type_list"] = pet_type_list;
	}
	var xiangrui_list = get_item_selected($$("#xiangrui_box li"));
	if (xiangrui_list.length > 0) {
		args["xiangrui_list"] = xiangrui_list;
	}
	var server_type = get_item_selected($$("#server_type li"));
	if (server_type.length > 0) {
		args["server_type"] = server_type;
	}
	var is_married = $("is_married").value;
	if (is_married.length > 0) {
		args["is_married"] = is_married;
	}
	var is_tongpao = $("is_tongpao").value;
	if (is_tongpao.length > 0) {
		args["is_tongpao"] = is_tongpao;
	}
	var attr_point_strategy = $('attr_point_strategy').value;
	if (attr_point_strategy) {
		args['attr_point_strategy'] = attr_point_strategy;
	}
	var jiyuan_and_addpoint_value = parseInt($('jiyuan_and_addpoint').value);
	if (jiyuan_and_addpoint_value) {
		var selected = $$('#jiyuan_and_addpoint_panel .on');
		if (selected.length > 0) {
			var key;
			if (selected.length == 2)
				key = 'jiyuan_and_addpoint';
			else
				key = selected[0].getAttribute('data_value');
			args[key] = jiyuan_and_addpoint_value;
		}
	}
	if ($('is_niceid_new').value)
		args['is_niceid_new'] = $('is_niceid_new').value;
	var limit_clothes = get_item_selected($$("#limit_clothes_panel li"));
	if (limit_clothes.length > 0) {
		args["limit_clothes"] = limit_clothes;
	}
	if (Object.getLength(args) == 0) {
		alert("您选择的查询条件过少，请选择更多查询条件");
		return false;
	}
	$$('input[name=zhuang_zhi]').each(function(el) {
		if ($(el).checked) {
			args['zhuang_zhi'] = $(el).value;
		}
	});
	if ($("teji_match_all").checked) {
		args["teji_match_all"] = 1;
	}
	if ($("texiao_match_all").checked) {
		args["texiao_match_all"] = 1;
	}
	if ($("pet_match_all").checked) {
		args["pet_match_all"] = 1;
	}
	if ($("xiangrui_match_all").checked) {
		args["xiangrui_match_all"] = 1;
	}
	if ($("lingshi_attr_match_all").checked) {
		args["lingshi_attr_match_all"] = 1;
	}
	$$('input[name=limit_clothes_logic]').each(function(el) {
		if (el.checked) {
			args['limit_clothes_logic'] = el.value;
		}
	});
	$("query_args").value = JSON.encode(args);
	save_args_in_cookie(args, "overall_role_search");
	update_overall_search_saved_query();
	document.query_form.submit();
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
function show_loading() {
	show_layer_center($("LoadingCover"), $("LoadingImg"));
}
function loading_finish() {
	$("LoadingCover").setStyle("display", "none");
	$("LoadingImg").setStyle("display", "none");
}
var NextProc = null;
function show_query_result(result, txt) {
	loading_finish();
	if (result["status"] == QueryStatus["need_captcha"]) {
		show_captcha_layer();
		return;
	}
	NextProc = null;
	if (result["status"] != 0) {
		alert(result["msg"]);
		return;
	}
	if (!result.equip_list && result.msg) {
		result.equip_list = result.msg;
	}
	if (!result.pager && result.paging) {
		result.pager = result.paging;
	}
	if (result["equip_list"].length == 0) {
		render_to_replace("query_result", "no_result", {});
		return;
	}
	for (var i = 0; i < result["equip_list"].length; i++) {
		var equip = result["equip_list"][i]
		equip["iIcon"] = equip["icon"];
		equip["icon"] = ResUrl + '/images/role_icon/small/'
				+ get_role_iconid(equip["icon"]) + '.gif'
	}
	var ctx = {
		"role_list" : result["equip_list"],
		"pager" : result["pager"]
	}
	QueryResult = result["equip_list"];
	render_to_replace("query_result", "role_list_templ", ctx);
	add_orderby_ev();
	render_to_replace("pager_bar", "pager_templ", {
		"pager" : result["pager"]
	});
	var el_list = $$("#soldList a.soldImg");
	for (var i = 0; i < el_list.length; i++) {
		var el = el_list[i];
		el.addEvent("mouseover", function() {
			show_role_tips_box($(this));
		});
		el.addEvent("mouseout", hidden_tips_box);
	}
	window.fireEvent('renderFinish');
}
function show_error() {
	loading_finish();
	alert("系统繁忙，请稍后再试");
}
var OrderInfo = {
	"field_name" : "",
	"order" : ""
};
var QueryResult = null;
function change_query_order(el) {
	var attr_name = el.getAttribute("data_attr_name");
	var new_order = "DESC"
	var orderby = attr_name + " " + new_order;
	if (OrderInfo["field_name"] == attr_name) {
		var new_order = OrderInfo["order"] == "ASC" ? "DESC" : "ASC";
		orderby = attr_name + " " + new_order;
	}
	OrderInfo["field_name"] = attr_name;
	OrderInfo["order"] = new_order;
	QueryArgs["order_by"] = orderby;
	do_query(1);
}
function do_query(page_num) {
	NextProc = "do_query(" + page_num + ")";
	var query_url = CgiRootUrl + "/xyq_overall_search.py";
	QueryArgs["act"] = SearchAct;
	QueryArgs["page"] = page_num;
	var Ajax = new Request.JSON({
		"url" : query_url,
		"onSuccess" : show_query_result,
		"onException" : show_error,
		"onError" : show_error,
		"noCache" : true,
		"onFailure" : show_error
	});
	show_loading();
	Ajax.get(QueryArgs);
}
function gotopage(page_num) {
	do_query(page_num);
}
function make_img_name(img_name) {
	var img_id = parseInt(img_name)
	var addon = "";
	if (img_id < 10) {
		addon = "000";
	} else if (img_id >= 10 && img_id < 100) {
		addon = "00";
	} else if (img_id >= 100 && img_id < 1000) {
		addon = "0";
	}
	return addon + img_name;
}
function get_skill_icon(skillid) {
	var img_name = make_img_name(skillid) + ".gif";
	return ResUrl + "/images/role_skills/" + img_name;
}
var Config = new RoleNameConf();
function show_role_tips_box(el) {
	var game_ordersn = el.getAttribute("data_game_ordersn");
	var other_info = JSON.decode($("other_info_" + game_ordersn).value);
	var $box = $("TipsBox");
	$box.addClass('tip-for-role');
	if (other_info['iMaxExpt1'] != undefined
			|| other_info['all_skills'] != undefined) {
		show_role_tips_box_common(el, other_info);
		return;
	}
	var role = null;
	for (var i = 0; i < QueryResult.length; i++) {
		if (QueryResult[i]["game_ordersn"] == game_ordersn) {
			role = QueryResult[i];
			break;
		}
	}
	if (!role) {
		return;
	}
	var school_skills = JSON.decode(role["school_skills"]);
	var school_skill_info = {};
	for (var i = 1; i < 8; i++) {
		school_skill_info["school_skill" + i + "_icon"] = EmptySkillImg;
		school_skill_info["school_skill" + i + "_grade"] = "";
		school_skill_info["school_skill" + i + "_name"] = "";
	}
	for (var i = 0; i < school_skills.length; i++) {
		var skill_id = school_skills[i]["id"];
		if (!Config.skill.school_skill[skill_id])
			continue;
		var level = school_skills[i]["level"];
		var pos = Config.skill["school_skill"][skill_id]["pos"];
		var name = Config.skill["school_skill"][skill_id]["name"];
		school_skill_info["school_skill" + pos + "_icon"] = get_skill_icon(skill_id);
		school_skill_info["school_skill" + pos + "_grade"] = level;
		school_skill_info["school_skill" + pos + "_name"] = name;
	}
	role["icon"] = ResUrl + '/images/bigface/' + get_role_iconid(role["iIcon"])
			+ ".gif";
	var ctx = {
		"role" : role,
		"school_skill" : school_skill_info
	};
	render_to_replace("TipsBox", "role_tips_template", ctx);
	adjust_tips_position(el, $box);
}