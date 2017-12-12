var SuitEffects = [ [ 1, "����" ], [ 2, "������" ], [ 3, "��ջ���" ], [ 4, "����" ],
		[ 5, "���컨��" ], [ 6, "��������" ], [ 7, "�ն�����" ], [ 8, "����֮Ȫ" ],
		[ 50, "���Ǿ�" ], [ 51, "��ӿ" ], [ 9, "������֮���" ], [ 10, "������֮����" ],
		[ 11, "������֮��ʦ" ], [ 12, "������֮��������" ], [ 13, "������֮ܽ������" ],
		[ 14, "������֮Ѳ������" ], [ 15, "������֮��������" ], [ 16, "������֮����" ],
		[ 17, "������֮��" ], [ 18, "������֮��Ѫ��" ], [ 19, "������֮��ƿŮ�" ],
		[ 20, "������֮�ɷ�Ů�" ], [ 21, "������֮���Ů�" ], [ 22, "������֮����" ],
		[ 23, "������֮��ө����" ], [ 24, "������֮�������" ], [ 25, "������֮������" ],
		[ 26, "������֮���" ], [ 27, "������֮ҹ��ɲ" ], [ 28, "������֮��ħ��" ],
		[ 29, "������֮���컢" ], [ 30, "������̤֮����" ], [ 31, "������֮��������" ],
		[ 32, "������֮����" ], [ 33, "������֮������" ], [ 34, "������֮������" ],
		[ 35, "������֮����" ], [ 36, "������֮����" ], [ 37, "������֮��«����" ],
		[ 38, "������֮è�飨���ͣ�" ], [ 39, "������֮�񱪣����ͣ�" ], [ 40, "������֮Ы�Ӿ�" ],
		[ 41, "������֮������" ], [ 42, "������֮��ü���" ], [ 43, "������֮������Գ" ],
		[ 44, "������֮���޿��ܹ�" ], [ 45, "������֮���޿�����" ], [ 46, "������֮�����޺�" ],
		[ 47, "������֮��������" ], [ 48, "������֮����ɳ��" ], [ 49, "������֮������" ] ];
var SchoolSkills = {
	'���ƹٸ�' : [ 'ʮ���޵�', '��˫һ��', '�������', '�������', 'Ϊ��֮��', '��ޱ֮��', '���粽' ],
	'������' : [ '��շ�ħ', 'С�˷�', '�о�', '�������', '��ȴ�', '᪻�֮��', '������' ],
	'Ů����' : [ '����', '������', '��������', '�����߻�', '��Ʈ����', '���ʱ���', '�������' ],
	'����ɽ' : [ '������', '��ͥ��', '������', '��֮��', '��Ԫ�ķ�', '�������', 'б�²�' ],
	'ʨ����' : [ '������', 'ѵ�޾�', 'ħ����', '����������', '���޾�', '����չ��', 'ħ�޷���' ],
	'���ܵظ�' : [ '�����ֻ�', '��ڤ��', '�л��', '��ͨ��', '��������', 'ʬ����', '�޳���' ],
	'ħ��կ' : [ '�����', 'ţ����', '������', '��ţ��', 'ţʭ��', '�����', '��ʯ��' ],
	'��˿��' : [ '�ﲨ����', '����ħ��', '��˿��', '�����', '��˿��', '���λ�Ӱ', '�������' ],
	'����' : [ '���˾�', '������', '���绽��', '����', '����', '������', '����' ],
	'�칬' : [ '������', '�����', '��������', '������', 'Ǭ����', '������', '������' ],
	'����ɽ' : [ '�������', '��վ�', '������', '����', '����ѧ˵', '����Ťת', '��������' ],
	'��ׯ��' : [ '��������', 'Ǭ����', '������', '����ѧ', '��Ԫ����', '��������', '���Ƕ�' ],
	'��ľ��' : [ '˲Ϣ���', '��������', '����', '������ת', '���˱ӻ�', '��ľ����', 'Ԧ����' ],
	'�貨��' : [ '����޼�', '��ת����', '������ʥ', 'Х��', '����ɽ��', '��ħ', '�������' ],
	'�޵׶�' : [ '�ݹ��ķ�', '�������', '�������', 'ȼ���鱦', '��ڤ�', '��Ԫ��', '��Ӱ����' ]
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
						"text" : "����",
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
											'<h5>����', (index + 1) + '���ձ�</h5>',
											'<dl>' ];
									for ( var school in SchoolSkills) {
										content
												.push('<dt>' + school
														+ '��</dt>');
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
				"msg" : item[1] + "��д��������������"
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
OVERALL_SEARCH_ROLE_ARGS_CONFIG = [ [ 'school', '����', 'sub_list', {
	belong : '����',
	sub_type : 'list',
	elem : '#school_list li',
	rank : 1
} ], [ 'school_change_list', '��ʷ����', 'sub_list', {
	belong : '��ʷ����',
	sub_type : 'list',
	elem : '#school_change_list li',
	rank : 2
} ], [ 'race', '��ɫ', 'sub_list', {
	belong : '��ɫ',
	sub_type : 'list',
	elem : '#race_list li',
	rank : 3
} ], [ 'level', '�ȼ�', 'sub_list', {
	belong : '�ȼ�',
	sub_type : 'range',
	rank : 4
} ], [ 'price', '�۸�', 'sub_list', {
	belong : '�۸�',
	sub_type : 'range',
	rank : 5,
	elem : 'txt_price'
} ], [ 'sum_exp', '��ɫ�ܾ���', 'sub_list', {
	belong : '��ɫ�ܾ���',
	sub_type : 'range',
	rank : 6
} ], [ 'zhuang_zhi', '����/�ɽ�/��ʥ', 'sub_list', {
	belong : '����/�ɽ�/��ʥ',
	sub_type : 'radio-select',
	rank : 7,
	elem : '.zhuang_zhi'
} ], [ 'shang_hai', '�˺�', 'sub_list', {
	belong : '��������',
	sub_type : 'input',
	rank : 8
} ], [ 'ming_zhong', '����', 'sub_list', {
	belong : '��������',
	sub_type : 'input',
	rank : 8
} ], [ 'ling_li', '����', 'sub_list', {
	belong : '��������',
	sub_type : 'input',
	rank : 8
} ], [ 'fang_yu', '����', 'sub_list', {
	belong : '��������',
	sub_type : 'input',
	rank : 8
} ], [ 'hp', '��Ѫ', 'sub_list', {
	belong : '��������',
	sub_type : 'input',
	rank : 8
} ], [ 'speed', '�ٶ�', 'sub_list', {
	belong : '��������',
	sub_type : 'input',
	rank : 8
} ], [ 'fa_shang', '����', 'sub_list', {
	belong : '��������',
	sub_type : 'input',
	rank : 8
} ], [ 'fa_fang', '����', 'sub_list', {
	belong : '��������',
	sub_type : 'input',
	rank : 8
} ], [ 'qian_neng_guo', 'Ǳ�ܹ�', 'sub_list', {
	belong : '��������',
	sub_type : 'input',
	rank : 8,
	elem : '#qian_neng_guo',
	rank : 8
} ], [ 'jiyuan_and_addpoint', '�����ܺ�(��Ե����+�±�����)', 'sub_list', {
	belong : '��������',
	sub_type : 'input',
	elem : '#jiyuan_and_addpoint',
	rank : 8
} ], [ 'ji_yuan_point', '�����ܺ�(��Ե����)', 'sub_list', {
	belong : '��������',
	sub_type : 'input',
	elem : '#ji_yuan_point',
	rank : 8
} ], [ 'addon_point', '�����ܺ�(�±�����)', 'sub_list', {
	belong : '��������',
	sub_type : 'input',
	elem : '#addon_point',
	rank : 8
} ], [ 'attr_point_strategy', '����', 'sub_list', {
	belong : '���Ե㱣�淽��',
	sub_type : 'select',
	rank : 9
} ], [ 'expt_gongji', '��������', 'sub_list', {
	belong : '��ɫ��������',
	sub_type : 'input',
	rank : 10
} ], [ 'expt_fangyu', '��������', 'sub_list', {
	belong : '��ɫ��������',
	sub_type : 'input',
	rank : 10
} ], [ 'expt_fashu', '��������', 'sub_list', {
	belong : '��ɫ��������',
	sub_type : 'input',
	rank : 10
} ], [ 'expt_kangfa', '��������', 'sub_list', {
	belong : '��ɫ��������',
	sub_type : 'input',
	rank : 10
} ], [ 'max_expt_gongji', '��������', 'sub_list', {
	belong : '��ɫ��������',
	sub_type : 'input',
	rank : 10
} ], [ 'max_expt_fangyu', '��������', 'sub_list', {
	belong : '��ɫ��������',
	sub_type : 'input',
	rank : 10
} ], [ 'max_expt_fashu', '��������', 'sub_list', {
	belong : '��ɫ��������',
	sub_type : 'input',
	rank : 10
} ], [ 'max_expt_kangfa', '��������', 'sub_list', {
	belong : '��ɫ��������',
	sub_type : 'input',
	rank : 10
} ], [ 'expt_lieshu', '��������', 'sub_list', {
	belong : '��ɫ��������',
	sub_type : 'input',
	rank : 11
} ], [ 'expt_total', '�����ܺ�', 'sub_list', {
	belong : '��ɫ��������',
	sub_type : 'input',
	rank : 11
} ], [ 'bb_expt_gongji', '��������', 'sub_list', {
	belong : '�ٻ��޿�������',
	sub_type : 'input',
	rank : 11
} ], [ 'bb_expt_fangyu', '��������', 'sub_list', {
	belong : '�ٻ��޿�������',
	sub_type : 'input',
	rank : 11
} ], [ 'bb_expt_fashu', '��������', 'sub_list', {
	belong : '�ٻ��޿�������',
	sub_type : 'input',
	rank : 11
} ], [ 'bb_expt_kangfa', '��������', 'sub_list', {
	belong : '�ٻ��޿�������',
	sub_type : 'input',
	rank : 11
} ], [ 'bb_expt_total', '�����ܺ�', 'sub_list', {
	belong : '�ٻ��޿�������',
	sub_type : 'input',
	rank : 11
} ], [ 'skill_drive_pet', '������', 'sub_list', {
	belong : '�ٻ��޿�������',
	sub_type : 'input',
	rank : 11
} ], [ 'school_skill_level', 'ʦ�ż��ܵȼ�', 'sub_list', {
	belong : 'ʦ�ż���',
	sub_type : 'input',
	elem : '#school_skill_level',
	rank : 12
} ], [ 'school_skill_num', 'ʦ�ż�����', 'sub_list', {
	belong : 'ʦ�ż���',
	sub_type : 'select',
	elem : '#school_skill_num',
	rank : 12
} ], [ 'lin_shi_fu', '��ʱ������', 'sub_list', {
	belong : 'ʦ�ż���',
	sub_type : 'input',
	rank : 12
} ], [ 'qian_yuan_dan', 'ǬԪ������', 'sub_list', {
	belong : 'ʦ�ż���',
	sub_type : 'input',
	rank : 12
} ], [ 'smith_skill', '����������', 'sub_list', {
	belong : 'ʦ�ż���',
	sub_type : 'input',
	rank : 12
} ], [ 'sew_skill', '�÷�������', 'sub_list', {
	belong : 'ʦ�ż���',
	sub_type : 'input',
	rank : 12
} ], [ 'skill_qiang_shen', 'ǿ��', 'sub_list', {
	belong : '�����',
	sub_type : 'input',
	rank : 13
} ], [ 'skill_shensu', '����', 'sub_list', {
	belong : '�����',
	sub_type : 'input',
	rank : 13
} ], [ 'skill_qiang_zhuang', 'ǿ��', 'sub_list', {
	belong : '�����',
	sub_type : 'input',
	rank : 13
} ], [ 'skill_ming_xiang', 'ڤ��', 'sub_list', {
	belong : '�����',
	sub_type : 'input',
	rank : 13
} ], [ 'skill_dazao', '���켼��', 'sub_list', {
	belong : '�����',
	sub_type : 'input',
	rank : 13
} ], [ 'skill_pengren', '��⿼���', 'sub_list', {
	belong : '�����',
	sub_type : 'input',
	rank : 13
} ], [ 'skill_caifeng', '�÷켼��', 'sub_list', {
	belong : '�����',
	sub_type : 'input',
	rank : 13
} ], [ 'skill_zhongyao', '��ҩҽ��', 'sub_list', {
	belong : '�����',
	sub_type : 'input',
	rank : 13
} ], [ 'skill_qiaojiang', '�ɽ�֮��', 'sub_list', {
	belong : '�����',
	sub_type : 'input',
	rank : 13
} ], [ 'skill_lingshi', '��ʯ����', 'sub_list', {
	belong : '�����',
	sub_type : 'input',
	rank : 13
} ], [ 'skill_lianjin', '������', 'sub_list', {
	belong : '�����',
	sub_type : 'input',
	rank : 13
} ], [ 'skill_jianshen', '������', 'sub_list', {
	belong : '�����',
	sub_type : 'input',
	rank : 13
} ], [ 'skill_yangsheng', '����֮��', 'sub_list', {
	belong : '�����',
	sub_type : 'input',
	rank : 13
} ], [ 'skill_anqi', '��������', 'sub_list', {
	belong : '�����',
	sub_type : 'input',
	rank : 13
} ], [ 'skill_taoli', '���뼼��', 'sub_list', {
	belong : '�����',
	sub_type : 'input',
	rank : 13
} ], [ 'skill_zhuibu', '׷������', 'sub_list', {
	belong : '�����',
	sub_type : 'input',
	rank : 13
} ], [ 'skill_ronglian', '��������', 'sub_list', {
	belong : '�����',
	sub_type : 'input',
	rank : 13
} ], [ 'skill_cuiling', '����֮��', 'sub_list', {
	belong : '�����',
	sub_type : 'input',
	rank : 13
} ], [ 'skill_danyuan', '��Ԫ�û�', 'sub_list', {
	belong : '���鼼��',
	sub_type : 'input',
	rank : 14
} ], [ 'skill_miaoshou', '���ֿտ�', 'sub_list', {
	belong : '���鼼��',
	sub_type : 'input',
	rank : 14
} ], [ 'skill_baoshi', '��ʯ����', 'sub_list', {
	belong : '���鼼��',
	sub_type : 'input',
	rank : 14
} ], [ 'skill_qimen', '���Ŷݼ�', 'sub_list', {
	belong : '���鼼��',
	sub_type : 'input',
	rank : 14
} ], [ 'skill_gudong', '�Ŷ�����', 'sub_list', {
	belong : '���鼼��',
	sub_type : 'input',
	rank : 14
} ], [ "skill_tiaoxi", "��Ϣ", 'sub_list', {
	belong : '���鼼��',
	sub_type : 'input',
	rank : 14
} ], [ "skill_dazuo", "����", 'sub_list', {
	belong : '���鼼��',
	sub_type : 'input',
	rank : 14
} ], [ 'skill_xianling', '�������', 'sub_list', {
	belong : '���鼼��',
	sub_type : 'input',
	rank : 14
} ], [ 'skill_jianzhu', '����֮��', 'sub_list', {
	belong : '���鼼��',
	sub_type : 'input',
	rank : 14
} ], [ 'skill_bianhua', '�仯֮��', 'sub_list', {
	belong : '���鼼��',
	sub_type : 'input',
	rank : 14
} ], [ 'skill_huoyan', '���۽�', 'sub_list', {
	belong : '���鼼��',
	sub_type : 'input',
	rank : 14
} ], [ 'max_weapon_shang_hai', 'Я����������', 'sub_list', {
	belong : '����װ��',
	sub_type : 'input',
	rank : 15
} ], [ "max_weapon_damage", "Я�������˺�", 'sub_list', {
	belong : '����װ��',
	sub_type : 'input',
	rank : 15
} ], [ "max_weapon_init_damage", "Я���������ˣ������У�", 'sub_list', {
	belong : '����װ��',
	sub_type : 'input',
	rank : 15
} ], [ "max_weapon_init_damage_raw", "Я���������ˣ��������У�", 'sub_list', {
	belong : '����װ��',
	sub_type : 'input',
	rank : 15
} ], [ "max_necklace_ling_li", "Я����������", 'sub_list', {
	belong : '����װ��',
	sub_type : 'input',
	rank : 15
} ], [ "max_necklace_init_wakan", "Я����������", 'sub_list', {
	belong : '����װ��',
	sub_type : 'input',
	rank : 15
} ], [ 'equip_level', 'װ���ȼ�', 'sub_list', {
	belong : '����װ��',
	sub_type : 'range',
	rank : 15,
	typeName : 'װ���ȼ�'
} ], [ 'taozhuang_num', '��װ����', 'sub_list', {
	belong : '����װ��',
	sub_type : 'select',
	rank : 15,
	elem : '#taozhuang_num'
} ], [ 'taozhuang_type', '��װ����', 'sub_list', {
	belong : '����װ��',
	sub_type : 'select',
	rank : 15,
	elem : '#taozhuang_type'
} ], [ 'teji_list', '�ؼ�', 'sub_list', {
	belong : '����װ��',
	sub_type : 'list',
	rank : 15,
	elem : '#equip_teji li',
	typeName : '�ؼ�'
} ], [ 'teji_match_all', '����ȫ���ؼ�', 'sub_list', {
	belong : '����װ��',
	sub_type : 'radio',
	rank : 15,
	elem : 'input[name=teji_match_all]'
} ], [ 'texiao_list', '��Ч', 'sub_list', {
	belong : '����װ��',
	sub_type : 'list',
	rank : 15,
	elem : '#equip_texiao li',
	typeName : '��Ч'
} ], [ 'texiao_match_all', '����ȫ����Ч', 'sub_list', {
	belong : '����װ��',
	sub_type : 'radio',
	rank : 15,
	elem : '#texiao_match_all'
} ], [ 'lingshi_attr_2', '�����˺�', 'sub_list', {
	belong : '��������',
	sub_type : 'input',
	rank : 16
} ], [ 'lingshi_attr_3', '�����ٶ�', 'sub_list', {
	belong : '��������',
	sub_type : 'input',
	rank : 16
} ], [ 'lingshi_attr_8', '���η�ӡ', 'sub_list', {
	belong : '��������',
	sub_type : 'input',
	rank : 16
} ], [ 'lingshi_attr_11', '��������', 'sub_list', {
	belong : '��������',
	sub_type : 'input',
	rank : 16
} ], [ 'lingshi_attr_7', '���η���', 'sub_list', {
	belong : '��������',
	sub_type : 'input',
	rank : 16
} ], [ 'lingshi_attr_4', '���η���', 'sub_list', {
	belong : '��������',
	sub_type : 'input',
	rank : 16
} ], [ 'lingshi_attr_9', '���η��˽��', 'sub_list', {
	belong : '��������',
	sub_type : 'input',
	rank : 16
} ], [ 'lingshi_attr_1', '���ι���', 'sub_list', {
	belong : '��������',
	sub_type : 'input',
	rank : 16
} ], [ 'lingshi_attr_6', '�����ﱬ', 'sub_list', {
	belong : '��������',
	sub_type : 'input',
	rank : 16
} ], [ 'lingshi_attr_12', '������Ѫ', 'sub_list', {
	belong : '��������',
	sub_type : 'input',
	rank : 16
} ], [ 'lingshi_attr_13', '���η���', 'sub_list', {
	belong : '��������',
	sub_type : 'input',
	rank : 16
} ], [ 'lingshi_attr_14', '���η���', 'sub_list', {
	belong : '��������',
	sub_type : 'input',
	rank : 16
} ], [ 'lingshi_attr_17', '���ο���', 'sub_list', {
	belong : '��������',
	sub_type : 'input',
	rank : 16
} ], [ 'lingshi_attr_18', '���θ�', 'sub_list', {
	belong : '��������',
	sub_type : 'input',
	rank : 16
} ], [ 'lingshi_attr_16', '���ο�����', 'sub_list', {
	belong : '��������',
	sub_type : 'input',
	rank : 16
} ], [ 'lingshi_attr_15', '���ο��ﱬ', 'sub_list', {
	belong : '��������',
	sub_type : 'input',
	rank : 16
} ], [ 'lingshi_min_level', '���εȼ�', 'sub_list', {
	belong : '��������',
	sub_type : 'range',
	rank : 16,
	typeName : '���εȼ�'
} ], [ 'lingshi_min_duanzao_level', '���ζ���', 'sub_list', {
	belong : '��������',
	sub_type : 'range',
	rank : 16,
	typeName : '����ȼ�'
} ], [ 'lingshi_attr_match_all', '����������', 'sub_list', {
	belong : '��������',
	sub_type : 'radio',
	rank : 16,
	elem : '#lingshi_attr_match_all'
} ], [ 'pet_type_list', '�ٻ���', 'sub_list', {
	belong : '�����ٻ���',
	sub_type : 'list',
	rank : 17,
	elem : '#pet_box li'
} ], [ 'growup_pet_num', '��Ʒ�ٻ�������', 'sub_list', {
	belong : '�����ٻ���',
	sub_type : 'input',
	rank : 17,
	elem : '#growup_pet_num'
} ], [ 'pet_match_all', '����ȫ���ٻ���', 'sub_list', {
	belong : '�����ٻ���',
	sub_type : 'radio',
	rank : 17,
	elem : '#pet_match_all'
} ], [ 'xiangrui_list', '����', 'sub_list', {
	belong : '��������',
	sub_type : 'list',
	rank : 18,
	elem : '#xiangrui_box li'
} ], [ 'xiangrui_num', '��������', 'sub_list', {
	belong : '��������',
	sub_type : 'input',
	rank : 18,
	elem : '#xiangrui_num'
} ], [ 'xiangrui_match_all', '����ȫ������', 'sub_list', {
	belong : '��������',
	sub_type : 'radio',
	rank : 18,
	elem : '#xiangrui_match_all'
} ], [ 'limit_clothes', '��������', 'sub_list', {
	belong : '��������',
	sub_type : 'list',
	rank : 19,
	elem : '#limit_clothes_panel li'
} ], [ 'limit_clothes_logic', '�Ƿ�����ȫ��', 'sub_list', {
	belong : '��������',
	sub_type : 'radio',
	rank : 19,
	elem : 'input[name=limit_clothes_logic]'
} ], [ 'pet_skill_num', '��������' ], [ 'pet_advance_skill_num', '�߼���������' ],
		[ 'xian_yu', '����', 'sub_list', {
			belong : '��ɫ״̬',
			rank : 20
		} ], [ 'cash', '�ֽ�', 'sub_list', {
			belong : '��ɫ״̬',
			rank : 20
		} ], [ 'upexp', '��ǰ����', 'sub_list', {
			belong : '��ɫ״̬',
			rank : 20
		} ], [ 'badness', '�ƶ�', 'sub_list', {
			belong : '��ɫ״̬',
			rank : 20
		} ], [ 'school_offer', '�Ź�', 'sub_list', {
			belong : '��ɫ״̬',
			rank : 20
		} ], [ 'org_offer', '�ﹱ', 'sub_list', {
			belong : '��ɫ״̬',
			rank : 20
		} ], [ 'cheng_jiu', '�ɾ�', 'sub_list', {
			belong : '��ɫ״̬',
			rank : 20
		} ], [ 'body_caiguo', 'Ⱦɫ�ۺϲ�Ч����', 'sub_list', {
			belong : '��ɫ״̬',
			rank : 20
		} ], [ 'all_caiguo', '����Ⱦɫ����ʹ���', 'sub_list', {
			belong : '��ɫ״̬',
			rank : 20
		} ], [ 'box_caiguo', '����Ⱦɫ������', 'sub_list', {
			belong : '��ɫ״̬',
			rank : 20
		} ], [ 'clothes_num', '��������', 'sub_list', {
			belong : '��ɫ״̬',
			rank : 20
		} ], [ 'energy', '����', 'sub_list', {
			belong : '��ɫ״̬',
			rank : 20
		} ], [ 'pride', '����', 'sub_list', {
			belong : '��ɫ״̬',
			rank : 20
		} ], [ 'learn_cash', '������', 'sub_list', {
			belong : '��ɫ״̬',
			rank : 20
		} ], [ 'pet_extend_num', '�ٻ�������չ����', 'sub_list', {
			belong : '��ɫ״̬',
			rank : 20
		} ], [ 'baggage_extend_num', '������չ����', 'sub_list', {
			belong : '��ɫ״̬',
			rank : 20
		} ], [ 'sword_score', '�������', 'sub_list', {
			belong : '��ɫ״̬',
			rank : 20
		} ], [ 'hero_score', '�������', 'sub_list', {
			belong : '��ɫ״̬',
			rank : 20
		} ], [ 'sheng_yu_ling_you', 'ʣ�����Ӵ���', 'sub_list', {
			belong : '��ɫ״̬',
			rank : 20
		} ], [ 'rider_exgrow_full_num', '���ɳ�������������ɳ�1.0��', 'sub_list', {
			belong : '��ɫ״̬',
			rank : 20
		} ], [ 'is_niceid_new', '�Ƿ�����', 'sub_list', {
			belong : '��ɫ״̬',
			sub_type : 'select',
			elem : '#is_niceid_new',
			rank : 20
		} ], [ 'has_community', '����', 'sub_list', {
			belong : '��������',
			sub_type : 'select',
			elem : '#has_community',
			rank : 20
		} ], [ 'fangwu_level', '����', 'sub_list', {
			belong : '��������',
			sub_type : 'select',
			elem : '#fangwu_level',
			rank : 20
		} ], [ 'tingyuan_level', 'ͥԺ', 'sub_list', {
			belong : '��������',
			sub_type : 'select',
			elem : '#tingyuan_level',
			rank : 20
		} ], [ 'muchang_level', '����', 'sub_list', {
			belong : '��������',
			sub_type : 'select',
			elem : '#muchang_level',
			rank : 20
		} ], [ 'is_married', '���', 'sub_list', {
			belong : '��������',
			sub_type : 'select',
			elem : '#is_married',
			rank : 20
		} ], [ 'is_tongpao', 'ͬ��', 'sub_list', {
			belong : '��������',
			sub_type : 'select',
			elem : '#is_tongpao',
			rank : 20
		} ], [ 'switchto_serverid', 'ת����', {
			rank : 21
		} ], [ 'server_type', '����ʱ��', 'sub_list', {
			belong : '����ʱ��',
			sub_type : 'list',
			elem : '#server_type li',
			rank : 22
		} ] ];
function submit_query_form() {
	var args_config = [ [ "level_min", "��ɫ��͵ȼ�" ], [ "level_max", "��ɫ��ߵȼ�" ],
			[ "shang_hai", "�˺�" ], [ "ming_zhong", "����" ], [ "ling_li", "����" ],
			[ "fang_yu", "����" ], [ "hp", "��Ѫ" ], [ "speed", "�ٶ�" ],
			[ "fa_shang", "����" ], [ "fa_fang", "����" ],
			[ "qian_neng_guo", "Ǳ�ܹ�" ], [ "expt_gongji", "��������" ],
			[ "expt_fangyu", "��������" ], [ "expt_fashu", "��������" ],
			[ "expt_kangfa", "��������" ], [ "max_expt_gongji", "��������" ],
			[ "max_expt_fangyu", "��������" ], [ "max_expt_fashu", "��������" ],
			[ "max_expt_kangfa", "��������" ], [ "expt_lieshu", "��������" ],
			[ "expt_total", "�����ܺ�" ], [ "bb_expt_gongji", "��������" ],
			[ "bb_expt_fangyu", "��������" ], [ "bb_expt_fashu", "��������" ],
			[ "bb_expt_kangfa", "��������" ], [ "bb_expt_total", "�����ܺ�" ],
			[ "skill_qiang_shen", "ǿ��" ], [ "skill_shensu", "����" ],
			[ "skill_qiang_zhuang", "ǿ��" ], [ "skill_ming_xiang", "ڤ��" ],
			[ "skill_dazao", "���켼��" ], [ "skill_pengren", "��⿼���" ],
			[ "skill_caifeng", "�÷켼��" ], [ "skill_zhongyao", "��ҩҽ��" ],
			[ "skill_qiaojiang", "�ɽ�֮��" ], [ "skill_lingshi", "��ʯ����" ],
			[ "skill_lianjin", "������" ], [ "skill_jianshen", "������" ],
			[ "skill_yangsheng", "����֮��" ], [ "skill_anqi", "��������" ],
			[ "skill_taoli", "���뼼��" ], [ "skill_zhuibu", "׷������" ],
			[ "skill_ronglian", "��������" ], [ "skill_danyuan", "��Ԫ�û�" ],
			[ "skill_miaoshou", "���ֿտ�" ], [ "skill_baoshi", "��ʯ����" ],
			[ "skill_qimen", "���Ŷݼ�" ], [ "skill_gudong", "�Ŷ�����" ],
			[ "skill_xianling", "�������" ], [ "skill_tiaoxi", "��Ϣ" ],
			[ "skill_dazuo", "����" ], [ "skill_jianzhu", "����֮��" ],
			[ "skill_bianhua", "�仯֮��" ], [ "skill_cuiling", "����֮��" ],
			[ "skill_huoyan", "���۽�" ], [ "max_weapon_shang_hai", "Я����������" ],
			[ "max_weapon_damage", "Я�������˺�" ],
			[ "max_weapon_init_damage", "Я���������ˣ������У�" ],
			[ "max_weapon_init_damage_raw", "Я���������ˣ��������У�" ],
			[ "max_necklace_ling_li", "Я����������" ],
			[ "max_necklace_init_wakan", "Я����������" ],
			[ "pet_skill_num", "��������" ], [ "pet_advance_skill_num", "�߼���������" ],
			[ "xian_yu", "����" ], [ "cash", "�ֽ�" ], [ "upexp", "��ǰ����" ],
			[ "badness", "�ƶ�" ], [ "school_offer", "�Ź�" ],
			[ "org_offer", "�ﹱ" ], [ "cheng_jiu", "�ɾ�" ],
			[ "body_caiguo", "Ⱦɫ�ۺϲ�Ч����" ], [ "all_caiguo", "����Ⱦɫ����ʹ���" ],
			[ "box_caiguo", "����Ⱦɫ������" ], [ "clothes_num", "��������" ],
			[ "school_skill_num", "ʦ�ż�����" ], [ "equip_level_min", "װ����͵ȼ�" ],
			[ "equip_level_max", "װ����ߵȼ�" ], [ "taozhuang_num", "��װ����" ],
			[ "taozhuang_type", "��װ����" ], [ "has_community", "����" ],
			[ "fangwu_level", "����" ], [ "tingyuan_level", "ͥԺ" ],
			[ "muchang_level", "����" ], [ "switchto_serverid", "ת����" ],
			[ "school_skill_level", "ʦ�ż��ܵȼ�" ], [ 'sum_exp_min', '��ɫ�ܾ���' ],
			[ 'sum_exp_max', '��ɫ�ܾ���' ], [ 'lin_shi_fu', '��ʱ������' ],
			[ 'qian_yuan_dan', 'ǬԪ������' ], [ 'smith_skill', '����������' ],
			[ 'sew_skill', '�÷�������' ], [ 'skill_drive_pet', 'Ԧ����' ],
			[ 'lingshi_min_level', '������͵ȼ�' ],
			[ 'lingshi_max_level', '������ߵȼ�' ],
			[ 'lingshi_min_duanzao_level', '������Ͷ���' ],
			[ 'lingshi_max_duanzao_level', '������߶���' ],
			[ 'lingshi_attr_2', '�����˺�' ], [ 'lingshi_attr_3', '�����ٶ�' ],
			[ 'lingshi_attr_8', '���η�ӡ' ], [ 'lingshi_attr_11', '��������' ],
			[ 'lingshi_attr_7', '���η���' ], [ 'lingshi_attr_4', '���η���' ],
			[ 'lingshi_attr_9', '���η��˽��' ], [ 'lingshi_attr_1', '���ι���' ],
			[ 'lingshi_attr_6', '�����ﱬ' ], [ 'lingshi_attr_12', '������Ѫ' ],
			[ 'lingshi_attr_13', '���η���' ], [ 'lingshi_attr_14', '���η���' ],
			[ 'lingshi_attr_17', '���ο���' ], [ 'lingshi_attr_18', '���θ�' ],
			[ 'lingshi_attr_16', '���ο�����' ], [ 'lingshi_attr_15', '���ο��ﱬ' ],
			[ 'growup_pet_num', '��Ʒ�ٻ�������' ], [ 'energy', '����' ],
			[ 'pride', '����' ], [ 'xiangrui_num', '��������' ],
			[ 'learn_cash', '������' ], [ 'pet_extend_num', '�ٻ�������չ����' ],
			[ 'baggage_extend_num', '������չ����' ],
			[ 'sheng_yu_ling_you', 'ʣ�����Ӵ���' ],
			[ 'rider_exgrow_full_num', '���ɳ�������������ɳ�1.0��' ],
			[ 'sword_score', '�������' ], [ 'hero_score', '�������' ] ];
	var input_check = check_int_args(args_config);
	if (!input_check["result"]) {
		alert(input_check["msg"]);
		return;
	}
	var args = input_check["args"];
	if (args["level_min"] != undefined && args["level_max"] != undefined) {
		if (args["level_max"] < args["level_min"]) {
			alert("�����ȼ���Χ��д����");
			return false;
		}
	}
	if (args["level_min"] != undefined && args["level_max"] == undefined) {
		args["level_max"] = 200;
	}
	if ($("txt_price_min").value.trim().length > 0) {
		var price_min_value = parseFloat($("txt_price_min").value);
		if (!price_min_value || price_min_value <= 0) {
			alert("���������ͼ۸��д���");
			return false;
		}
		args["price_min"] = parseInt(price_min_value * 100);
	}
	if ($("txt_price_max").value.trim().length > 0) {
		var price_max_value = parseFloat($("txt_price_max").value);
		if (!price_max_value || price_max_value <= 0) {
			alert("���������߼۸��д���");
			return false;
		}
		args["price_max"] = parseInt(price_max_value * 100);
	}
	if (args["price_min"] != undefined && args["price_max"] != undefined) {
		if (args["price_max"] < args["price_min"]) {
			alert("�����۸�Χ��д����");
			return false;
		}
	}
	if (args["lingshi_min_level"] != undefined
			&& args["lingshi_max_level"] != undefined) {
		if (args["lingshi_max_level"] < args["lingshi_min_level"]) {
			alert("���εȼ���Сֵ���ܴ������ֵ");
			return false;
		}
	}
	if (args["lingshi_min_duanzao_level"] != undefined
			&& args["lingshi_max_duanzao_level"] != undefined) {
		if (args["lingshi_max_duanzao_level"] < args["lingshi_min_duanzao_level"]) {
			alert("����ȼ���Сֵ���ܴ������ֵ");
			return false;
		}
	}
	if (args['sum_exp_min'] && args['sum_exp_max']
			&& args['sum_exp_min'] > args['sum_exp_max']) {
		alert('��ɫ�ܾ�����Сֵ���ܴ������ֵ');
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
			alert("��ѡ��װ���ȼ�");
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
		alert("��ѡ��Ĳ�ѯ�������٣���ѡ������ѯ����");
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
	alert("ϵͳ��æ�����Ժ�����");
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