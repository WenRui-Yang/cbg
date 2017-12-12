function get_role_iconid(type_id) {
	var need_fix_range = [ [ 13, 24 ], [ 37, 48 ], [ 61, 72 ], [ 213, 224 ],
			[ 237, 248 ], [ 261, 272 ] ];
	for (var i = 0; i < need_fix_range.length; i++) {
		var range = need_fix_range[i];
		if (type_id >= range[0] && type_id <= range[1]) {
			type_id = type_id - 12
			break;
		}
	}
	return type_id;
}
function get_role_kind_name(icon) {
	var kindid = icon;
	if (icon > 200) {
		kindid = ((icon - 200 - 1) % 12 + 1) + 200;
	} else {
		kindid = ((icon - 1) % 12 + 1);
	}
	return RoleKindNameInfo[kindid];
}
var RACE_INFO = {
	0 : "",
	1 : "��",
	2 : "ħ",
	3 : "��"
};
var CHINESE_NUM_CONFIG = {
	1 : "һ",
	2 : "��",
	3 : "��",
	4 : "��",
	5 : "��",
	6 : "��",
	7 : "��",
	8 : "��",
	9 : "��",
	10 : "ʮ"
};
var ROLE_ZHUAN_ZHI_CONFIG = {
	0 : "δ����",
	1 : "����",
	2 : "�ɽ�"
};
(function(ctx, name, defination) {
	ctx[name] = defination();
})
		(
				window,
				'RoleInfoParser',
				function() {
					function each(obj, callback) {
						if (typeOf(obj) === 'array') {
							for (var i = 0, max = obj.length; i < max; i++) {
								callback.call(obj, obj[i], i);
							}
						} else {
							for ( var key in obj) {
								if (obj.hasOwnProperty(key)) {
									callback.call(obj, obj[key], key);
								}
							}
						}
					}
					function typeOf(obj) {
						return Object.prototype.toString.call(obj).split(' ')[1]
								.slice(0, -1).toLowerCase();
					}
					function toArray(obj) {
						return [].slice.call(obj, 0);
					}
					function trim(str) {
						if (str) {
							return str.trim ? str.trim() : str.toString()
									.replace(/^\s+|\s+$/g, '');
						}
						return '';
					}
					function extend(obj) {
						var args = toArray(arguments);
						var obj = args.shift();
						each(args, function(sour) {
							each(sour, function(val, key) {
								obj[key] = val;
							});
						});
						return obj;
					}
					function RoleInfoParser(roleInfo, options) {
						var ctx = this;
						var typeRoleInfo = typeOf(roleInfo);
						switch (typeRoleInfo) {
						case 'object':
							ctx.raw_info = roleInfo;
							break;
						case 'string':
							ctx.raw_info = js_eval(lpc_2_js(trim(roleInfo)));
							break;
						default:
							throw 'roleInfo should be Object or String.';
						}
						options = extend({
							conf : new RoleNameConf(),
							resUrl : window.ResUrl || '',
							serverId : '',
							equipRequestTime : window.EquipRequestTime || '',
							serverCurrentTime : window.ServerCurrentTime || ''
						}, options || {});
						ctx.conf = options.conf;
						ctx.resUrl = options.resUrl;
						ctx.serverId = options.serverId;
						ctx.equipRequestTime = options.equipRequestTime;
						ctx.serverCurrentTime = options.serverCurrentTime;
						ctx.result = {};
						ctx.parse_role();
					}
					RoleInfoParser.prototype = {
						get_basic_data : function() {
							return extend({}, this.result || {});
						},
						get_skill_data : function() {
							var school_skill_info = {};
							for (var i = 1; i < 8; i++) {
								school_skill_info["school_skill" + i + "_icon"] = EmptySkillImg;
								school_skill_info["school_skill" + i + "_grade"] = "";
								school_skill_info["school_skill" + i + "_name"] = "";
							}
							for (var i = 0; i < this.result["role_skill"]["school_skill"].length; i++) {
								var skill = this.result["role_skill"]["school_skill"][i];
								school_skill_info["school_skill"
										+ skill["skill_pos"] + "_icon"] = skill.skill_icon;
								school_skill_info["school_skill"
										+ skill["skill_pos"] + "_grade"] = skill.skill_grade;
								school_skill_info["school_skill"
										+ skill["skill_pos"] + "_name"] = skill.skill_name;
							}
							return extend(school_skill_info,
									this.result["role_skill"] || {});
						},
						get_equips_data : function() {
							return extend({}, this.result);
						},
						get_fabao_data : function() {
							var using_fabaos = {};
							var list = this.result["using_fabao"];
							for (var i = 0; i < list.length; i++) {
								var fabao = list[i];
								using_fabaos[fabao["pos"]] = fabao;
							}
							function parse_fabao(fabao_desc) {
								var cengshu = /��#G(\d+)#Y��/;
								cengshu = cengshu.exec(fabao_desc);
								cengshu = cengshu ? cengshu[1] : '';
								var wuxing = /����:#G(.{1,2})#Y/;
								wuxing = wuxing.exec(fabao_desc);
								wuxing = wuxing ? wuxing[1] : '';
								return [ cengshu, wuxing ];
							}
							;
							return extend({
								parse_fabao : parse_fabao,
								using_fabaos : using_fabaos
							}, this.result);
						},
						get_pet_data : function() {
							return extend({}, this.result);
						},
						get_rider_data : function() {
							return extend({}, this.result);
						},
						get_clothes_data : function() {
							return extend({}, this.result);
						},
						parse_role : function() {
							var ctx = this;
							ctx.parse_basic_role_info();
							ctx.parse_role_skill();
							ctx.parse_equip_info();
							ctx.parse_fabao_info();
							ctx.parse_role_xiulian();
							ctx.parse_pet_ctrl_skill();
							ctx.parse_pet_info();
							ctx.parse_rider_info();
							ctx.parse_clothes_info();
							ctx.parse_xiangrui_info();
							return ctx.result;
						},
						parse_basic_role_info : function() {
							var that = this;
							var ResUrl = this.resUrl;
							var EquipRequestTime = that.equipRequestTime;
							var ServerCurrentTime = that.serverCurrentTime;
							var get_role_icon = function(icon_id) {
								if (window.get_role_iconid) {
									var role_type = window.get_role_iconid
											&& get_role_iconid(icon_id);
									return ResUrl + "/images/bigface/"
											+ role_type + ".gif";
								}
								return '';
							};
							var school_name = SchoolNameInfo[this.raw_info["iSchool"]];
							if (!school_name) {
								school_name = "";
							}
							var marry_info = this
									.get_marry_info(this.raw_info["iMarry"]);
							var tongpao_info = this
									.get_tongpao_info(this.raw_info["iMarry2"]);
							var relation = "��";
							if (marry_info[0] === "δ֪"
									&& tongpao_info[0] === "δ֪") {
								relation = "δ֪";
							} else if (marry_info[0] === "��"
									&& tongpao_info[0] === "��") {
								relation = "��";
							} else {
								if (marry_info[0] === "��") {
									relation = "�ѻ�";
								} else if (tongpao_info[0] === "��") {
									relation = "ͬ��";
								}
							}
							var community_info = "";
							if (this.raw_info["commu_name"]
									&& this.raw_info["commu_gid"]) {
								community_info = this.raw_info["commu_name"]
										+ "&nbsp;" + this.raw_info["commu_gid"];
							} else if (this.raw_info["commu_name"] == undefined
									|| this.raw_info["commu_gid"] == undefined) {
								community_info = "δ֪";
							} else {
								community_info = "��";
							}
							var that = this;
							var get_goodness = function() {
								if (that.raw_info["iGoodness"] == null) {
									return that.raw_info["iBadness"];
								} else {
									return that.raw_info["iGoodness"];
								}
							};
							var sum_exp = "";
							if (this.raw_info["sum_exp"] === undefined) {
								sum_exp = "δ֪";
							} else if (this.raw_info["sum_exp"] == 0) {
								sum_exp = "<1��";
							} else {
								sum_exp = this.raw_info["sum_exp"] + "��";
							}
							var fly_status = "";
							if (this.raw_info["i3FlyLv"]
									&& this.raw_info["i3FlyLv"] > 0) {
								fly_status = "��ʥ"
										+ CHINESE_NUM_CONFIG[this.raw_info["i3FlyLv"]];
							} else {
								if (this.raw_info["iZhuanZhi"] >= 0) {
									fly_status = ROLE_ZHUAN_ZHI_CONFIG[this.raw_info["iZhuanZhi"]];
								}
							}
							this.result["allow_pet_count"] = this.raw_info['iSumAmount'];
							var role_info = {
								"sum_exp" : sum_exp,
								"icon" : get_role_icon(this.raw_info["iIcon"]),
								"role_kind_name" : this
										.parse_role_kind_name(this.raw_info["iIcon"]),
								"role_level" : this.raw_info["iGrade"],
								"nickname" : this.raw_info["cName"],
								"is_fei_sheng" : this.raw_info["iZhuanZhi"] >= 1 ? "��"
										: "��",
								"fly_status" : fly_status,
								"pride" : this.raw_info["iPride"],
								"org" : this.raw_info["cOrg"],
								"org_offer" : this.raw_info["iOrgOffer"],
								"school" : school_name,
								"school_offer" : this.raw_info["iSchOffer"],
								"hp_max" : this.raw_info["iHp_Max"],
								"mp_max" : this.raw_info["iMp_Max"],
								"att_all" : this.raw_info["iAtt_All"],
								"cor_all" : this.raw_info["iCor_All"],
								"damage_all" : this.raw_info["iDamage_All"],
								"mag_all" : this.raw_info["iMag_All"],
								"def_all" : this.raw_info["iDef_All"],
								"str_all" : this.raw_info["iStr_All"],
								"dex_all" : this.raw_info["iDex_All"],
								"res_all" : this.raw_info["iRes_All"],
								"dod_all" : this.raw_info["iDod_All"],
								"spe_all" : this.raw_info["iSpe_All"],
								"mag_def_all" : this.raw_info["iMagDef_All"],
								"point" : this.raw_info["iPoint"],
								"cash" : this.raw_info["iCash"],
								"saving" : this.raw_info["iSaving"],
								"learn_cash" : this.raw_info["iLearnCash"],
								"upexp" : this.get_real_upexp(),
								"badness" : get_goodness(),
								"goodness_sav" : this
										.safe_attr(this.raw_info["igoodness_sav"]),
								"qian_neng_guo" : this.raw_info["iNutsNum"],
								"is_married" : marry_info[0],
								"partner_id" : marry_info[1],
								"is_tongpao" : tongpao_info[0],
								"community_info" : community_info,
								"fangwu_info" : this.get_fangwu_info(relation,
										this.raw_info["rent_level"]),
								"tingyuan_info" : this.get_tingyuan_info(
										relation,
										this.raw_info["outdoor_level"]),
								"muchang_info" : this.get_muchang_info(
										relation, this.raw_info["farm_level"]),
								"qian_yuan_dan" : this.get_qian_yuan_dan(),
								"is_du_jie" : this.raw_info["iZhuanZhi"] == 2 ? "�����"
										: "δ���",
								"caiguo" : this.raw_info["iCGTotalAmount"],
								"body_caiguo" : this.raw_info["iCGBodyAmount"],
								"box_caiguo" : this.raw_info["iCGBoxAmount"],
								"chengjiu" : this
										.safe_attr(this.raw_info["AchPointTotal"]),
								"xianyu" : this
										.safe_attr(this.raw_info["xianyu"]),
								"energy" : this
										.safe_attr(this.raw_info["energy"]),
								"add_point" : this
										.safe_attr(this.raw_info["addPoint"]),
								"ji_yuan" : this
										.safe_attr(this.raw_info["jiyuan"]),
								"changesch" : this
										.get_change_school_list(this.raw_info["changesch"]),
								"propkept" : this.get_prop_kept(
										this.raw_info["propKept"],
										this.raw_info["iGrade"]),
								"hero_score" : this
										.safe_attr(this.raw_info["HeroScore"]),
								"sanjie_score" : this
										.safe_attr(this.raw_info["datang_feat"]),
								"sword_score" : this
										.safe_attr(this.raw_info["sword_score"]),
								"total_caiguo" : this
										.safe_attr(this.raw_info["iCGTotalAmount"]),
								"total_avatar" : this.raw_info["total_avatar"],
								"total_horse" : this.raw_info["total_horse"],
								"fa_shang" : this.raw_info["iTotalMagDam_all"],
								"fa_fang" : this.raw_info["iTotalMagDef_all"]
							};
							if (this.raw_info["more_attr"]
									&& this.raw_info["more_attr"]["attrs"]) {
								role_info['other_attr'] = {};
								for (var i = 0; i < this.raw_info["more_attr"]["attrs"].length; i++) {
									var item = this.raw_info["more_attr"]["attrs"][i];
									role_info['other_attr'][item.idx] = item.lv;
								}
							}
							role_info['is_gold_id'] = false;
							each(this.raw_info.idbid_desc || [], function(id) {
								if (id >= 5 && id <= 8)
									role_info['is_gold_id'] = true;
							});
							if (role_info['is_gold_id']) {
								role_info['is_niceid'] = '������';
							} else if (this.raw_info["bid"] == undefined) {
								role_info["is_niceid"] = "δ֪";
							} else {
								role_info["is_niceid"] = this.raw_info["bid"] ? "��"
										: "��";
							}
							if (this.raw_info["ori_race"] == undefined) {
								role_info["ori_race"] = this
										.get_race_by_school(this.raw_info["iSchool"]);
							} else {
								var race_name = RACE_INFO[this.raw_info["ori_race"]];
								if (this.raw_info["ori_race"] != this.raw_info["iRace"]) {
									race_name = '<span style="color:#FFCC00">'
											+ race_name + '</span>';
								}
								role_info["ori_race"] = race_name;
							}
							if (this.raw_info["iPcktPage"] == undefined) {
								var time1 = parseDatetime("2014-07-22 10:00:00");
								var time2 = parseDatetime("2014-07-29 10:00:00");
								var agent_time = parseDatetime(this.equipRequestTime);
								var cur_time = parseDatetime(this.serverCurrentTime);
								var server_id = this.serverId;
								if (server_id === "155" && agent_time > time1) {
									role_info["package_num"] = "δ֪";
								} else if ((server_id === "462" || server_id === "2")
										&& agent_time > time2) {
									role_info["package_num"] = "δ֪";
								} else {
									role_info["package_num"] = "��";
								}
							} else {
								package_num = parseInt(this.raw_info["iPcktPage"]);
								if (package_num > 0 && package_num <= 3) {
									role_info["package_num"] = package_num;
								} else if (package_num == 0) {
									role_info["package_num"] = "��";
								} else {
									role_info["package_num"] = "δ֪";
								}
							}
							this.result["basic_info"] = role_info;
						},
						parse_role_skill : function() {
							var ResUrl = this.resUrl;
							var life_skill = [];
							var school_skill = [];
							var ju_qing_skill = [];
							var conf = this.conf.skill;
							var that = this;
							var get_skill_icon = function(skill_id) {
								var skill_img = that.make_img_name(skill_id)
										+ ".gif";
								return ResUrl + "/images/role_skills/"
										+ skill_img;
							};
							var raw_skill_info = this.raw_info["all_skills"];
							this.result["yu_shou_shu"] = this.raw_info["all_skills"]["221"];
							for (skill in raw_skill_info) {
								var info = {
									"skill_id" : skill,
									"skill_grade" : raw_skill_info[skill],
									"skill_pos" : 0
								};
								info["skill_icon"] = get_skill_icon(skill);
								if (conf["life_skill"][skill]) {
									info["skill_name"] = conf["life_skill"][skill];
									life_skill.push(info);
								} else if (conf["school_skill"][skill]) {
									info["skill_name"] = conf["school_skill"][skill]["name"];
									info["skill_pos"] = conf["school_skill"][skill]["pos"]
									school_skill.push(info);
								} else if (conf["ju_qing_skill"][skill]) {
									info["skill_name"] = conf["ju_qing_skill"][skill];
									ju_qing_skill.push(info);
								}
							}
							var shuliandu = {
								"smith_skill" : this
										.safe_attr(this.raw_info["iSmithski"]),
								"sew_skill" : this
										.safe_attr(this.raw_info["iSewski"])
							}
							var result = {
								"life_skill" : life_skill,
								"school_skill" : school_skill,
								"ju_qing_skill" : ju_qing_skill,
								"left_skill_point" : this.raw_info["iSkiPoint"],
								"shuliandu" : shuliandu
							};
							this.result["role_skill"] = result;
						},
						parse_equip_info : function() {
							var ResUrl = this.resUrl;
							var all_equips = this.raw_info["AllEquip"];
							var get_equip_small_icon = function(itype) {
								return ResUrl + "/images/equip/small/" + itype
										+ ".gif";
							};
							var get_equip_big_icon = function(itype) {
								return ResUrl + "/images/big/" + itype + ".gif";
							};
							var using_equips = [];
							var not_using_equips = [];
							for ( var equip in all_equips) {
								var equip_info = this.conf
										.get_equip_info(all_equips[equip]["iType"]);
								var info = {
									"pos" : parseInt(equip),
									"type" : all_equips[equip]["iType"],
									"name" : equip_info["name"],
									"desc" : all_equips[equip]["cDesc"],
									"lock_type" : this
											.get_lock_types(all_equips[equip]),
									"static_desc" : htmlEncode(
											equip_info["desc"]).replace(/#R/g,
											"<br />"),
									"small_icon" : get_equip_small_icon(all_equips[equip]["iType"]),
									"big_icon" : get_equip_big_icon(all_equips[equip]["iType"])
								};
								var pos = parseInt(equip);
								if ((equip >= 1 && equip <= 6)
										|| [ 187, 188, 189, 190 ].contains(pos)) {
									using_equips.push(info);
								} else {
									not_using_equips.push(info);
								}
							}
							this.result["using_equips"] = using_equips;
							this.result["not_using_equips"] = not_using_equips;
						},
						parse_fabao_info : function() {
							var ResUrl = this.resUrl;
							var all_fabao = this.raw_info["fabao"];
							var get_fabao_icon = function(itype) {
								return ResUrl + "/images/fabao_new2/" + itype
										+ ".png";
							}
							var using_fabao = [];
							var nousing_fabao = [];
							for (pos in all_fabao) {
								var fabao_info = this.conf
										.get_fabao_info(all_fabao[pos]["iType"]);
								var info = {
									"pos" : parseInt(pos),
									"type" : all_fabao[pos]["iType"],
									"name" : fabao_info["name"],
									"desc" : all_fabao[pos]["cDesc"],
									"icon" : get_fabao_icon(all_fabao[pos]["iType"]),
									"static_desc" : fabao_info["desc"]
								};
								if (info.desc) {
									info.desc = info.desc.replace(/^0/, '');
								}
								if (pos >= 1 && pos <= 4) {
									using_fabao.push(info);
								} else {
									nousing_fabao.push(info);
								}
							}
							nousing_fabao.sort(function(a, b) {
								return a.pos - b.pos;
							});
							this.result["using_fabao"] = using_fabao;
							this.result["nousing_fabao"] = nousing_fabao;
						},
						parse_role_xiulian : function() {
							var result = [];
							result
									.push({
										"name" : "��������",
										"info" : this.raw_info["iExptSki1"]
												+ "/"
												+ this
														.safe_attr(this.raw_info["iMaxExpt1"])
									});
							result
									.push({
										"name" : "��������",
										"info" : this.raw_info["iExptSki2"]
												+ "/"
												+ this
														.safe_attr(this.raw_info["iMaxExpt2"])
									});
							result
									.push({
										"name" : "��������",
										"info" : this.raw_info["iExptSki3"]
												+ "/"
												+ this
														.safe_attr(this.raw_info["iMaxExpt3"])
									});
							result
									.push({
										"name" : "��������",
										"info" : this.raw_info["iExptSki4"]
												+ "/"
												+ this
														.safe_attr(this.raw_info["iMaxExpt4"])
									});
							result.push({
								"name" : "��������",
								"info" : this.raw_info["iExptSki5"]
							});
							this.result["role_xiulian"] = result;
						},
						parse_pet_ctrl_skill : function() {
							var result = [];
							result.push({
								"name" : "����������",
								"grade" : this.raw_info["iBeastSki1"]
							});
							result.push({
								"name" : "����������",
								"grade" : this.raw_info["iBeastSki2"]
							});
							result.push({
								"name" : "����������",
								"grade" : this.raw_info["iBeastSki3"]
							});
							result.push({
								"name" : "����������",
								"grade" : this.raw_info["iBeastSki4"]
							});
							this.result["pet_ctrl_skill"] = result;
						},
						parse_pet_info : function() {
							var ResUrl = this.resUrl;
							var all_pets = this.raw_info["AllSummon"];
							if (!all_pets) {
								all_pets = [];
							}
							var that = this;
							var get_pet_icon = function(itype) {
								return ResUrl + "/images/pets/small/" + itype
										+ ".gif";
							}
							var wuxing_info = {
								0 : "δ֪",
								1 : "��",
								2 : "ľ",
								4 : "��",
								8 : "ˮ",
								16 : "��"
							};
							var max_equip_num = 3;
							var get_pet_skill_icon = function(skill_id) {
								return ResUrl + "/images/pet_child_skill/"
										+ that.make_img_name(skill_id) + ".gif";
							};
							var get_pet_equip_icon = function(typeid) {
								return ResUrl + "/images/equip/small/" + typeid
										+ ".gif";
							};
							var get_pet_shipin_icon = function(typeid) {
								return ResUrl + "/images/pet_shipin/small/"
										+ typeid + ".png";
							};
							var get_child_icon = function(child_id) {
								return ResUrl + "/images/child_icon/"
										+ that.make_img_name(child_id) + ".gif";
							};
							var get_child_skill_icon = function(skill_id) {
								return ResUrl + "/images/pet_child_skill/"
										+ that.make_img_name(skill_id) + ".gif";
							};
							var get_pet_name = function(itype) {
								return that.conf.pet_info[itype];
							};
							var get_child_name = function(itype) {
								return that.conf.child_info[itype];
							};
							var get_neidan_icon = function(neidan_id) {
								return ResUrl + "/images/neidan/" + neidan_id
										+ '.jpg';
							};
							var _this = this;
							var get_yuanxiao = function(input_value) {
								if (!input_value) {
									return that.safe_attr(input_value);
								}
								var agent_time = parseDatetime(_this.equipRequestTime);
								var cur_time = parseDatetime(_this.serverCurrentTime);
								var fresh_time = new Date(cur_time
										.getFullYear(), 0, 1);
								if (agent_time > fresh_time) {
									return input_value;
								} else {
									return 0;
								}
							};
							var get_ruyidan = get_yuanxiao;
							var get_lianshou = function(input_value) {
								if (!input_value) {
									return that.safe_attr(input_value);
								}
								var agent_time = parseDatetime(_this.equipRequestTime);
								var cur_time = parseDatetime(_this.serverCurrentTime);
								var fresh_time = new Date(cur_time
										.getFullYear(), 8, 1);
								if (cur_time < fresh_time) {
									fresh_time.setFullYear(fresh_time
											.getFullYear() - 1);
								}
								if (agent_time > fresh_time) {
									return input_value;
								} else {
									return 0;
								}
							};
							var get_pet_info = function(pet, is_child) {
								var get_icon = get_pet_icon;
								var get_skill_icon = get_pet_skill_icon;
								var get_name = get_pet_name
								if (is_child) {
									get_icon = get_child_icon;
									get_skill_icon = get_child_skill_icon;
									get_name = get_child_name
								}
								var info = {}
								info["type_id"] = pet["iType"];
								info["pet_grade"] = pet["iGrade"];
								info["is_baobao"] = pet["iBaobao"] == 0 ? "��"
										: "��";
								info["icon"] = get_icon(pet["iType"]);
								info["pet_name"] = get_name(pet["iType"]);
								info["kind"] = get_name(pet["iType"]);
								info["blood"] = pet["iHp"];
								info["magic"] = pet["iMp"];
								info["blood_max"] = pet["iHp_max"];
								info["magic_max"] = pet["iMp_max"];
								info["attack"] = pet["iAtt_all"];
								info["defence"] = pet["iDef_All"];
								info["speed"] = pet["iDex_All"];
								info["ling_li"] = pet["iMagDef_all"];
								info["lifetime"] = pet["life"] >= 65432 ? "����"
										: pet["life"];
								info["ti_zhi"] = pet["iCor_all"];
								info["fa_li"] = pet["iMag_all"];
								info["li_liang"] = pet["iStr_all"];
								info["nai_li"] = pet["iRes_all"];
								info["min_jie"] = pet["iSpe_all"];
								info["qian_neng"] = pet["iPoint"];
								info["cheng_zhang"] = pet["grow"] / 1000;
								info["wu_xing"] = wuxing_info[pet["iAtt_F"]];
								info["gong_ji_zz"] = pet["att"];
								info["fang_yu_zz"] = pet["def"];
								info["ti_li_zz"] = pet["hp"];
								info["fa_li_zz"] = pet["mp"];
								info["su_du_zz"] = pet["spe"];
								info["duo_shan_zz"] = pet["dod"];
								info["used_yuanxiao"] = get_yuanxiao(pet["yuanxiao"]);
								info["used_ruyidan"] = get_ruyidan(pet["ruyidan"]);
								info["used_qianjinlu"] = that
										.safe_attr(pet["qianjinlu"]);
								info["used_lianshou"] = get_lianshou(pet["lianshou"]);
								info["child_sixwx"] = pet["child_sixwx"];
								info["is_child"] = is_child;
								info["color"] = pet["iColor"];
								info['summon_color'] = pet['summon_color'];
								info["genius"] = pet["iGenius"];
								if (info["genius"] != 0) {
									info["genius_skill"] = {
										"icon" : get_skill_icon(pet["iGenius"]),
										"skill_type" : pet["iGenius"]
									};
								} else {
									info["genius_skill"] = {};
								}
								info["skill_list"] = [];
								var all_skills = pet["all_skills"];
								if (all_skills) {
									var all_skill_str = [];
									for (typeid in all_skills) {
										all_skill_str.push('' + typeid);
										if (parseInt(typeid) == info["genius"]) {
											continue;
										}
										info["skill_list"].push({
											"icon" : get_skill_icon(typeid),
											"skill_type" : typeid,
											"level" : all_skills[typeid]
										});
									}
									info['all_skill'] = all_skill_str.join('|');
								} else
									info['all_skill'] = '';
								info["equip_list"] = [];
								for (var i = 0; i < max_equip_num; i++) {
									var item = pet["summon_equip" + (i + 1)];
									if (item) {
										var equip_name_info = that.conf
												.get_equip_info(item["iType"]);
										info["equip_list"]
												.push({
													"name" : equip_name_info["name"],
													"icon" : get_pet_equip_icon(item["iType"]),
													"type" : item["iType"],
													"desc" : item["cDesc"],
													"lock_type" : _this
															.get_lock_types(item),
													"static_desc" : equip_name_info["desc"]
															.replace(/#R/g,
																	"<br />")
												});
									} else {
										info["equip_list"].push(null);
									}
								}
								info["shipin_list"] = [];
								if (pet.summon_equip4_type) {
									info["shipin_list"]
											.push({
												"name" : that.conf.pet_shipin_info[pet.summon_equip4_type],
												"icon" : get_pet_shipin_icon(pet.summon_equip4_type),
												"type" : pet.summon_equip4_type,
												"desc" : pet.summon_equip4_desc
											});
								}
								info["empty_skill_img"] = ResUrl
										+ "/images/role_skills/empty_skill.gif";
								info["neidan"] = []
								if (pet["summon_core"] != undefined) {
									for ( var p in pet["summon_core"]) {
										var p_core = pet["summon_core"][p];
										info["neidan"]
												.push({
													"name" : this
															.safe_attr(PetNeidanInfo[p]),
													"icon" : get_neidan_icon(p),
													"level" : p_core[0]
												});
									}
								}
								info["jinjie"] = dict_get(pet, "jinjie", {});
								info["lock_type"] = _this.get_lock_types(pet);
								if (pet.csavezz) {
									get_pet_ext_zz(
											info,
											{
												attrs : 'gong_ji_ext,fang_yu_ext,su_du_ext,duo_shan_ext,ti_li_ext,fa_li_ext',
												total_attrs : 'gong_ji_zz,fang_yu_zz,su_du_zz,duo_shan_zz,ti_li_zz,fa_li_zz',
												csavezz : pet.csavezz,
												carrygradezz : pet.carrygradezz,
												pet_id : info.type_id
											});
								}
								return info;
							}
							var pet_info = [];
							for (var i = 0; i < all_pets.length; i++) {
								var info = get_pet_info(all_pets[i]);
								pet_info.push(info);
							}
							this.result["pet_info"] = pet_info;
							if (this.raw_info["child"]
									&& this.raw_info["child"]["iType"]) {
								this.result["child_info"] = [ get_pet_info(
										this.raw_info["child"], true) ];
							} else {
								this.result["child_info"] = [];
							}
							if (this.raw_info["child2"]
									&& this.raw_info["child2"]["iType"]) {
								this.result["child_info"].push(get_pet_info(
										this.raw_info["child2"], true));
							}
							this.result["special_pet_info"] = this.raw_info["pet"]
						},
						parse_rider_info : function() {
							var ResUrl = this.resUrl;
							var rider_name_info = this.conf.rider_info;
							var get_rider_icon = function(itype) {
								return ResUrl + "/images/riders/" + itype
										+ ".gif";
							}
							var that = this;
							var get_skill_icon = function(typeid) {
								return ResUrl + "/images/rider_skill/"
										+ that.make_img_name(typeid) + ".gif";
							};
							var all_rider = this.raw_info["AllRider"];
							if (!all_rider) {
								all_rider = {};
							}
							result = [];
							for (rider in all_rider) {
								var rider_info = this.raw_info["AllRider"][rider];
								var info = {
									"type" : rider_info["iType"],
									"grade" : rider_info["iGrade"],
									"grow" : rider_info["iGrow"] / 100,
									"exgrow" : rider_info["exgrow"] ? (rider_info["exgrow"] / 10000)
											.toFixed(4)
											: (rider_info["iGrow"] / 100),
									"ti_zhi" : rider_info["iCor"],
									"magic" : rider_info["iMag"],
									"li_liang" : rider_info["iStr"],
									"nai_li" : rider_info["iRes"],
									"min_jie" : rider_info["iSpe"],
									"qian_neng" : rider_info["iPoint"],
									"icon" : get_rider_icon(rider_info["iType"]),
									"type_name" : safe_attr(rider_name_info[rider_info["iType"]]),
									"mattrib" : rider_info["mattrib"] ? rider_info["mattrib"]
											: "δѡ��",
									"empty_skill_icon" : this
											.get_empty_skill_icon()
								};
								info["all_skills"] = [];
								var all_skills = rider_info["all_skills"];
								for (typeid in all_skills) {
									info["all_skills"].push({
										"type" : typeid,
										"icon" : get_skill_icon(typeid),
										"grade" : all_skills[typeid]
									});
								}
								result.push(info);
							}
							this.result["rider_info"] = result;
						},
						parse_clothes_info : function() {
							var ResUrl = this.resUrl;
							var all_clothes_info = this.conf.clothes_info;
							var get_clothes_icon = function(itype) {
								return ResUrl + "/images/clothes/" + itype
										+ "0000.gif";
							};
							var get_cloth_name_desc = function(itype) {
								if (all_clothes_info[itype]) {
									return all_clothes_info[itype];
								} else {
									return {
										"name" : "",
										"desc" : ""
									}
								}
							};
							var all_clothes = this.raw_info["ExAvt"];
							if (all_clothes == undefined) {
								return;
							}
							result = [];
							for ( var pos in all_clothes) {
								var clothes_info = all_clothes[pos];
								var clothe_name = clothes_info.cName
										|| safe_attr(all_clothes_info[clothes_info["iType"]]);
								var info = {
									"type" : clothes_info["iType"],
									"name" : clothe_name,
									"icon" : get_clothes_icon(clothes_info["iType"]),
									"order" : clothes_info["order"],
									"static_desc" : ""
								};
								result.push(info);
							}
							var sort_func = function(a, b) {
								if (a["order"] && b["order"]) {
									return a["order"] - b["order"];
								} else {
									return a["type"] - b["type"];
								}
							}
							this.result["clothes"] = result.sort(sort_func);
						},
						parse_xiangrui_info : function() {
							var ResUrl = this.resUrl;
							var all_xiangrui_info = this.conf.xiangrui_info;
							var all_skills = this.conf.xiangrui_skill;
							var nosale_xiangrui = this.conf.nosale_xiangrui;
							var get_xiangrui_icon = function(itype) {
								return ResUrl + "/images/xiangrui/" + itype
										+ ".gif";
							};
							var get_skill_icon = function() {
								return ResUrl + "/images/xiangrui_skills/1.gif";
							};
							var all_xiangrui = this.raw_info["HugeHorse"];
							if (all_xiangrui == undefined)
								return;
							result = [];
							nosale_result = [];
							for (pos in all_xiangrui) {
								var xiangrui_info = all_xiangrui[pos];
								var type = xiangrui_info["iType"];
								var info = {
									"type" : type,
									"name" : xiangrui_info.cName
											|| safe_attr(all_xiangrui_info[type]),
									"icon" : get_xiangrui_icon(type),
									"skill_name" : all_skills[xiangrui_info['iSkill']],
									"order" : xiangrui_info["order"]
								};
								if (xiangrui_info["iSkillLevel"] != undefined) {
									info["skill_level"] = xiangrui_info["iSkillLevel"]
											+ "��";
								} else {
									info["skill_level"] = "";
								}
								if (this.conf.nosale_to_sale_xiangrui[pos]) {
									var nosale = false;
								} else {
									var nosale = xiangrui_info["nosale"]
											&& xiangrui_info["nosale"] == 1;
									if (!nosale) {
										nosale = (nosale_xiangrui[pos] != undefined);
									}
								}
								if (nosale) {
									nosale_result.push(info);
								} else {
									result.push(info);
								}
							}
							var sort_func = function(a, b) {
								if (a["order"] && b["order"]) {
									return a["order"] - b["order"];
								} else {
									return a["type"] - b["type"];
								}
							}
							this.result["xiangrui"] = result.sort(sort_func);
							nosale_result.sort(sort_func);
							if (nosale_result.length > 22) {
								nosale_result.splice(22,
										nosale_result.length - 22);
							}
							this.result["nosale_xiangrui"] = nosale_result;
							if (this.raw_info["normal_horse"]) {
								this.result["normal_xiangrui_num"] = this.raw_info["normal_horse"];
							}
						},
						safe_attr : function(attr_value, default_value) {
							if (attr_value === undefined || attr_value === null) {
								return default_value !== undefined ? default_value
										: "δ֪";
							}
							return attr_value;
						},
						get_marry_info : function(marry, marry2) {
							if (marry == undefined) {
								return [ "δ֪", "δ֪" ];
							}
							if (marry != undefined && marry != 0) {
								return [ "��", marry ];
							} else {
								return [ "��", "������" ];
							}
						},
						get_tongpao_info : function(tongpao) {
							if (tongpao == undefined) {
								return [ "δ֪", "δ֪" ];
							}
							if (tongpao != undefined && tongpao != 0) {
								return [ "��", tongpao ];
							} else {
								return [ "��", "������" ];
							}
						},
						get_married_info : function(relation, grade, r_setting) {
							if (relation === "δ֪" || grade == undefined) {
								return "δ֪";
							}
							if (grade == 0) {
								return "��";
							}
							if (relation === "�ѻ�") {
								return "���޹���";
							} else if (relation === "ͬ��") {
								return "ͬ�۹���";
							} else {
								return r_setting[grade];
							}
						},
						get_fangwu_info : function(relation, fangwu_grade) {
							return this.get_married_info(relation,
									fangwu_grade, this.conf.fangwu_info);
						},
						get_tingyuan_info : function(relation, tingyuan_grade) {
							return this.get_married_info(relation,
									tingyuan_grade, this.conf.tingyuan_info);
						},
						get_muchang_info : function(relation, muchang_grade) {
							return this.get_married_info(relation,
									muchang_grade, this.conf.muchang_info);
						},
						get_real_upexp : function() {
							var exp_num = this.raw_info["iUpExp"];
							if (this.raw_info["ExpJw"] == undefined
									|| this.raw_info["ExpJwBase"] == undefined) {
								return exp_num;
							}
							exp_num += this.raw_info["ExpJw"]
									* this.raw_info["ExpJwBase"];
							return exp_num;
						},
						get_change_school_list : function(change_list) {
							if (change_list == undefined) {
								return "δ֪";
							}
							if (!change_list || change_list.length === 0) {
								return "��";
							}
							var school_list = [];
							for (var i = 0; i < change_list.length; i++) {
								var school_name = SchoolNameInfo[change_list[i]];
								if (!school_list.contains(school_name)) {
									school_list.push(school_name);
								}
							}
							return school_list.join(",");
						},
						parse_role_kind_name : function(icon_id) {
							var icon_id = get_role_iconid(icon_id);
							return get_role_kind_name(icon_id)
						},
						get_qian_yuan_dan : function() {
							var agent_time = parseDatetime(this.equipRequestTime);
							var check_time = parseDatetime("2015-03-24 08:00:00");
							var test_check_time = parseDatetime("2015-03-17 08:00:00");
							function judge_time() {
								if ([ 95, 155, 82, 104, 2, 669, 9, 459 ]
										.contains(parseInt(this.serverId))) {
									if (agent_time < test_check_time) {
										return true;
									}
								} else if (agent_time < check_time) {
									return true;
								}
								return false;
							}
							function check_undefined(v) {
								return v === undefined ? "δ֪" : v;
							}
							var attrs = {};
							if (judge_time()) {
								attrs.old_value = this.safe_attr(
										this.raw_info["TA_iAllPoint"], 0);
							} else {
								attrs.new_value = check_undefined(this.raw_info["TA_iAllNewPoint"]);
							}
							return attrs;
						},
						parse_pet_ctrl_skill : function() {
							var result = [];
							result.push({
								"name" : "����������",
								"grade" : this.raw_info["iBeastSki1"]
							});
							result.push({
								"name" : "����������",
								"grade" : this.raw_info["iBeastSki2"]
							});
							result.push({
								"name" : "����������",
								"grade" : this.raw_info["iBeastSki3"]
							});
							result.push({
								"name" : "����������",
								"grade" : this.raw_info["iBeastSki4"]
							});
							this.result["pet_ctrl_skill"] = result;
						},
						get_race_by_school : function(school) {
							if ([ 1, 2, 3, 4, 13 ].contains(school)) {
								return "��";
							} else if ([ 9, 10, 11, 12, 15 ].contains(school)) {
								return "ħ";
							} else if ([ 5, 6, 7, 8, 14 ].contains(school)) {
								return "��";
							} else {
								return "δ֪";
							}
						},
						parse_single_prop_kept : function(prop, grade) {
							if (!prop)
								return null;
							var _this = this;
							var attr_list = [];
							for ( var key in prop) {
								if (this.PROP_KEPT_KEYS[key])
									attr_list.push({
										key : key,
										value : prop[key]
									});
							}
							if (attr_list.length < 2)
								return null;
							attr_list.sort(function(x, y) {
								if (x.value != y.value)
									return y.value - x.value;
								else
									return _this.PROP_KEPT_KEYS_ORDER
											.indexOf(x.key)
											- _this.PROP_KEPT_KEYS_ORDER
													.indexOf(y.key);
							});
							var max = attr_list[0], sec = attr_list[1];
							if (max.value >= 5 * grade) {
								return this.PROP_KEPT_KEYS[max.key];
							} else {
								var key0 = max.key;
								var key1 = sec.key;
								if (this.PROP_KEPT_KEYS_ORDER.indexOf(key1) < this.PROP_KEPT_KEYS_ORDER
										.indexOf(key0)) {
									key0 = sec.key;
									key1 = max.key;
								}
								return this.PROP_KEPT_KEYS[key0].substr(0, 1)
										+ this.PROP_KEPT_KEYS[key1]
												.substr(0, 1);
							}
						},
						get_prop_kept : function(propKept, grade) {
							var res = [];
							if (propKept) {
								for (var i = 0; i < 4; ++i) {
									var s = this.parse_single_prop_kept(
											propKept[i], grade);
									s && res.push(s);
								}
							}
							return res.length > 0 ? res.join(',') : '��';
						},
						make_img_name : function(img_name) {
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
						},
						get_lock_types : function(equip) {
							var locks = [];
							if (equip["iLock"]) {
								locks.push(equip["iLock"]);
							}
							if (equip["iLockNew"]) {
								locks.push(equip["iLockNew"]);
							}
							return locks;
						},
						get_empty_skill_icon : function() {
							return this.resUrl
									+ "/images/role_skills/empty_skill.gif";
						},
						PROP_KEPT_KEYS : {
							iStr : "����",
							iMag : "ħ��",
							iSpe : "����",
							iCor : "����",
							iRes : "����"
						},
						PROP_KEPT_KEYS_ORDER : [ 'iStr', 'iMag', 'iSpe',
								'iCor', 'iRes' ]
					};
					return RoleInfoParser;
				});