var CurSearchValue = {};
CurSearchValue.order_by = {
	key : null,
	sort : null
};
function overall_search(search_arg, page, order_by) {
	if (!page) {
		page = 1;
	}
	var arg = {
		"act" : OverallSearchAct,
		"page" : page
	}
	if (order_by.key) {
		arg['order_by'] = order_by.key + ' ' + order_by.sort;
	}
	for (p in search_arg) {
		arg[p] = search_arg[p];
	}
	var request = new Request.JSON({
		'url' : CgiRoot + '/xyq_overall_search.py',
		"noCache" : true,
		'onRequest' : function() {
			$('loading_img').setStyle('display', '');
			$('search_result').empty();
			$('pager').empty();
		},
		'onSuccess' : function(result) {
			$('loading_img').setStyle('display', 'none');
			if (result['status'] == 2) {
				show_captcha();
				return;
			} else if (result.status != 0) {
				alert(result.msg);
				return;
			}
			if (result.msg.length > 0) {
				var equips = result.msg;
				render_to_replace('search_result', 'search_result_templ', {
					'equips' : equips
				});
				reg_tips_event();
			} else {
				render_to_replace('search_result', 'search_empty_templ');
			}
			if (result.paging.num_end > 1) {
				render_to_replace("pager", "pager_templ", {
					"pager" : result.paging
				});
			}
		}
	}).get(arg);
}
function go_overall_search(arg) {
	CurSearchValue.arg = arg;
	overall_search(arg, null, CurSearchValue.order_by);
	update_overall_search_saved_query();
}
function gotopage(page_num) {
	if (CurSearchValue.arg) {
		overall_search(CurSearchValue.arg, page_num, CurSearchValue.order_by);
	}
}
function pager_keydown_handler(src, e) {
	var e = e || window.event;
	var keynum;
	try {
		keynum = e.keyCode
	} catch (e) {
		keynum = e.which
	}
	if (keynum == 13) {
		gotopage(src.value);
	}
}
function search_order_by(order_key) {
	if (CurSearchValue.order_by.key == order_key) {
		CurSearchValue.order_by.sort = CurSearchValue.order_by.sort == 'DESC' ? 'ASC'
				: 'DESC';
	} else {
		CurSearchValue.order_by.key = order_key;
		CurSearchValue.order_by.sort = 'DESC';
	}
	overall_search(CurSearchValue.arg, null, CurSearchValue.order_by);
}
function get_name_from_conf(id, conf) {
	for (var i = 0; i < conf.length; i++) {
		if (conf[i][0] == id) {
			return conf[i][1];
		}
	}
}
function get_names_by_value(value, conf) {
	return value.map(function(v) {
		return get_name_from_conf(v, conf)
	});
}
function get_name_from_dict(id, conf) {
	for ( var p in conf) {
		if (conf[p] == id) {
			return p;
		}
	}
}
var UserServerSelector = new Class(
		{
			initialize : function() {
				var self = this;
				$("btn_reset_user_server").addEvent("click", function() {
					Cookie.write("cross_server_serverid", "");
					Cookie.write("cross_server_areaname", "");
					Cookie.write("cross_server_servername", "");
					if ($("user_serverid")) {
						$("user_serverid").value = "";
					}
					self.no_server_selected();
					return false;
				});
			},
			no_server_selected : function() {
				render_to_replace("user_server_info_box",
						"no_server_select_templ", {});
				var self = this;
				$("btn_show_server_select_box").addEvent("click", function() {
					self.show_server_select_box();
					return false;
				});
			},
			chose_server : function(args) {
				Cookie.write("cross_server_serverid",
						decodeURIComponent(args["server_id"]));
				Cookie.write("cross_server_areaname",
						decodeURIComponent(args["area_name"]));
				Cookie.write("cross_server_servername",
						decodeURIComponent(args["server_name"]));
				this.close_popup_box();
				this.show_user_server_info();
			},
			close_popup_box : function() {
				this.dialog.hide();
			},
			show_server_select_box : function() {
				var tmpl = [ '<div class="blockCont">',
						'<div id="area_list_panel"></div>',
						'<div class="blank12"></div>',
						'<div id="server_list_panel"></div>', '</div>' ]
						.join('');
				this.dialog = new PopupDialog("选择服务器", tmpl);
				var self = this;
				var chose_server = function(args) {
					self.chose_server(args);
				};
				var obj = new SelectServer(chose_server);
				obj.show();
				this.dialog.show();
			},
			show_server : function(serverid, area_name, server_name) {
				var ctx = {
					"serverid" : serverid,
					"area_name" : area_name,
					"server_name" : server_name
				};
				render_to_replace("user_server_info_box",
						"user_server_info_templ", ctx);
				var self = this;
				$("btn_change_user_server").addEvent("click", function() {
					self.show_server_select_box();
				});
			},
			show_user_server_info : function() {
				var cross_serverid = Cookie.read("cross_server_serverid");
				if (!cross_serverid) {
					this.no_server_selected();
					return;
				}
				var cross_servername = decodeURIComponent(Cookie
						.read("cross_server_servername"));
				var cross_areaname = decodeURIComponent(Cookie
						.read("cross_server_areaname"));
				this.show_server(cross_serverid, cross_areaname,
						cross_servername);
			}
		});
function get_cross_buy_addon_args() {
	var cross_serverid = Cookie.read("cross_server_serverid");
	if (!cross_serverid) {
		return "";
	}
	var arg = {
		"cross_buy_serverid" : cross_serverid,
		"cross_buy_server_name" : decodeURIComponent(Cookie
				.read("cross_server_servername")),
		"cross_buy_area_name" : decodeURIComponent(Cookie
				.read("cross_server_areaname"))
	}
	return Object.toQueryString(arg);
}
var CrossServerBuyOperator = new Class(
		{
			initialize : function() {
				var btn = $("btn_buy");
				var self = this;
				if (!equip["is_selling"]) {
					btn.setStyle("display", "none");
					return;
				}
				if (!AllowCrossBuy || CrossBuyServerids.length <= 1
						|| !CrossBuyKindids.contains(EquipInfo["kindid"])) {
					btn.addEvent("click", function() {
						try_login_to_buy(EquipInfo["equipid"],
								EquipInfo["server_id"],
								EquipInfo["server_name"], EquipInfo["area_id"],
								EquipInfo["area_name"]);
					});
					btn.set("value", '登录"' + EquipInfo["server_name"] + '"购买');
				} else if (this.check_if_can_add_order_directly()) {
					if (!EquipInfo["is_pass_fair_show"]
							&& $("fairshow_buy_info")) {
						$("fairshow_buy_info").setStyle("display", "");
					}
					if (EquipInfo && EquipInfo.status == 8)
						$("cross_auction_buy_tips").setStyle("display", "");
					else
						$("buy_equip_tips").setStyle("display", "");
					btn
							.addEvent(
									"click",
									function() {
										if (!EquipInfo['is_pass_fair_show']
												&& !$('agree_fair_show_pay').checked) {
											alert('同意公示期预定收费规则后，才能预定');
											return false;
										}
										if (EquipInfo["server_id"] != LoginInfo["serverid"]
												&& (test_server_list
														.contains(parseInt(EquipInfo["server_id"])) || test_server_list
														.contains(LoginInfo["serverid"]))) {
											var ret = confirm('您的角色所在服务器和该商品所在服务器属于不同的测试服版本，完成购买后商品暂时无法取出（藏宝阁有未取出商品时无法转服），每周二测试服更换后才能尝试取出，您确定要下单购买吗？');
											if (ret !== true) {
												return;
											}
										}
										window.location.href = self
												.get_add_order_url();
									});
					if (EquipInfo["is_pass_fair_show"]) {
						btn.set("value", "下单购买");
					} else {
						btn.set("value", "预订");
					}
					if (EquipInfo["server_id"] != LoginInfo["serverid"]) {
						this.display_cross_buy_poundage();
					}
				} else if (this.if_go_login_buy_step()) {
					btn.addEvent("click", function() {
						window.location.href = self.get_login_buy_url();
					});
					btn.set("value", "登录购买");
				} else {
					btn.addEvent("click", function() {
						self.show_popup_select_server_box();
					});
					btn.set("value", "登录购买");
				}
			},
			is_login : function() {
				return LoginInfo && LoginInfo["login"];
			},
			get_add_order_url : function() {
				var arg = {
					"obj_serverid" : EquipInfo["server_id"],
					"obj_equipid" : EquipInfo["equipid"],
					"device_id" : get_fingerprint(),
					"equip_refer" : getPara("equip_refer"),
					"act" : "cross_server_buy_add_order",
					"safe_code" : SafeCode
				};
				return CgiRootUrl + "/usertrade.py?"
						+ Object.toQueryString(arg);
			},
			display_cross_buy_poundage : function() {
				var url = CgiRootUrl + "/userinfo.py";
				var args = {
					"obj_serverid" : EquipInfo["server_id"],
					"obj_equipid" : EquipInfo["equipid"],
					"act" : "get_cross_buy_poundage"
				}
				var display_poundage = function(data, txt) {
					if (data["status"] != 1) {
						return;
					}
					var el = $("equip_price_addon_info");
					if (el) {
						el.innerHTML = "+&nbsp;￥" + data["poundage"]
								+ "（元）(跨服交易费)";
					}
				};
				var Ajax = new Request.JSON({
					"url" : url,
					"onSuccess" : display_poundage,
					"noCache" : true
				});
				Ajax.get(args);
			},
			get_login_buy_url : function() {
				var arg = {
					"obj_serverid" : EquipInfo["server_id"],
					"obj_equipid" : EquipInfo["equipid"],
					"equip_refer" : getPara("equip_refer"),
					"act" : "show_cross_server_buy_detail"
				};
				var equip_detail_url = CgiRootUrl + "/usertrade.py?"
						+ Object.toQueryString(arg);
				if (EquipInfo && EquipInfo.status == EQUIP_AUCTION) {
					var arg = {
						"serverid" : EquipInfo["server_id"],
						"equip_id" : EquipInfo["equipid"],
						"act" : "overall_search_show_detail"
					};
					equip_detail_url = CgiRootUrl + '/equipquery.py?'
							+ Object.toQueryString(arg);
				}
				var login_arg = {
					"server_id" : getPara("cross_buy_serverid"),
					"server_name" : decodeURIComponent(getPara("cross_buy_server_name")),
					"area_name" : decodeURIComponent(getPara("cross_buy_area_name")),
					"return_url" : equip_detail_url,
					"act" : "show_login"
				};
				return HttpsCgiRootUrl + "/show_login.py?"
						+ Object.toQueryString(login_arg);
			},
			check_if_can_add_order_directly : function() {
				if (!LoginInfo || !LoginInfo["login"]) {
					return false;
				}
				if (CrossBuyServerids.contains(LoginInfo["serverid"])) {
					return true;
				} else {
					return false;
				}
			},
			if_go_login_buy_step : function() {
				var buy_serverid = getPara("cross_buy_serverid");
				var buy_server_name = getPara("cross_buy_server_name");
				var buy_area_name = getPara("cross_buy_area_name");
				if (!buy_serverid || !buy_server_name || !buy_area_name) {
					return false;
				}
				if (!CrossBuyServerids.contains(parseInt(buy_serverid))) {
					return false;
				}
				return true;
			},
			chose_server : function(args, is_show_all_servers) {
				if (is_show_all_servers || EquipInfo.status == EQUIP_AUCTION) {
					var arg = {
						"serverid" : EquipInfo["server_id"],
						"equip_id" : EquipInfo["equipid"],
						"act" : "overall_search_show_detail"
					};
					var cgi_script_name = "equipquery.py";
				} else {
					var arg = {
						"obj_serverid" : EquipInfo["server_id"],
						"obj_equipid" : EquipInfo["equipid"],
						"equip_refer" : getPara("equip_refer"),
						"act" : "show_cross_server_buy_detail"
					};
					var cgi_script_name = "usertrade.py";
				}
				var equip_detail_url = CgiRootUrl + "/" + cgi_script_name + "?"
						+ Object.toQueryString(arg);
				var login_arg = {
					"server_id" : args["server_id"],
					"server_name" : args["server_name"],
					"area_id" : args["area_id"],
					"area_name" : args["area_name"],
					"return_url" : equip_detail_url,
					"act" : "show_login"
				};
				var url = HttpsCgiRootUrl + "/show_login.py?"
						+ Object.toQueryString(login_arg);
				window.location.href = url;
			},
			show_popup_select_server_box : function(is_show_all_servers) {
				var tmpl = [
						'<div class="blockCont">',
						'<div id="area_list_panel"></div>',
						'<div class="blank12"></div>',
						'<div id="server_list_panel"></div>',
						'<div class="serverTips" style="display:none" id="not_allow_buy_tips">',
						'您所选择的服务器暂不可购买此商品。建议您返回选择服务器，以便筛选到可交易的商品。', '</div>',
						'</div>' ].join('');
				this.dialog = new PopupDialog("选择服务器", tmpl);
				var self = this;
				var chose_server = function(args) {
					if (!is_show_all_servers
							&& !CrossBuyServerids
									.contains(parseInt(args["server_id"]))) {
						$("not_allow_buy_tips").setStyle("display", "");
						return;
					}
					self.chose_server(args, is_show_all_servers);
				};
				var disable_server = function(a_el, serverid) {
					if (!is_show_all_servers
							&& !CrossBuyServerids.contains(parseInt(serverid))) {
						a_el.getParent().addClass("disabled");
						a_el.setStyle("cursor", "pointer");
					}
				};
				$("not_allow_buy_tips").setStyle("display", "none");
				var obj = new SelectServer(chose_server, disable_server);
				obj.show();
				this.dialog.show();
			}
		});
function get_saved_query_title(args_config, query, showCount) {
	var count = showCount || 3;
	var title = '';
	var is_omitted = false;
	var sub_obj = {};
	var titleObj = {};
	for (var i = 0; count > 0 && i < args_config.length; i++) {
		var config = args_config[i];
		var key = config[0];
		var id = key;
		if (config.length == 2) {
			var type = 'int';
		} else {
			var type = config[2];
		}
		var passArr = [ 'price', 'level', 'sum_exp', 'equip_level',
				'lingshi_max_level', 'lingshi_min_level',
				'lingshi_min_duanzao_level', 'lingshi_max_duanzao_level' ]
		if (passArr.indexOf(key) > -1) {
			var min_key = key + '_min';
			var max_key = key + '_max';
			if (min_key in query && max_key in query) {
				type = 'sub_list'
			}
		} else if (!(key in query)) {
			continue;
		}
		if (key === 'switchto_serverid' || key === 'cross_buy_serverid') {
			for ( var areaid in server_data) {
				var server_list = server_data[areaid][1];
				for (server in server_list) {
					if (server_list[server][0] == query[key]) {
						title += config[1] + ':' + server_list[server][1] + ' ';
						titleObj[config[1]] = server_list[server][1];
						count--;
						break;
					}
				}
			}
			continue;
		}
		switch (type) {
		case 'int':
			if ($(id).getChildren('option').length > 0) {
				title += config[1]
						+ ':'
						+ $(id).getChildren(
								'option[value="' + query[key] + '"]')[0]
								.get('text') + ' ';
				titleObj[config[1]] = ''
						+ $(id).getChildren(
								'option[value="' + query[key] + '"]')[0]
								.get('text') + ' ';
			} else {
				title += config[1] + ':' + query[key] + ' ';
				titleObj[config[1]] = query[key];
			}
			count--;
			break;
		case 'func':
			if (OverallSearchType != 'lingshi') {
				title += config[1] + ':' + config[3](query[key]) + ' ';
				titleObj[config[1]] = config[3](query[key]);
				count--;
			}
			break;
		case 'autocomplete':
			var value = query[key];
			if (value in config[4]) {
				title += config[1] + ':' + config[4][value];
				titleObj[config[1]] = config[4][value];
			}
			break;
		case 'sub_list':
			var belong = config[3].belong;
			sub_obj = solve_sub_list(sub_obj, config, query, key, count,
					showCount);
			break;
		}
	}
	for ( var k in sub_obj) {
		if (k && k !== '') {
			var len = sub_obj[k].length;
			var text = sub_obj[k].join(',') + ' ';
			title += k + ':' + text;
			titleObj[k] = text;
		}
	}
	if ((query['cross_buy_serverid'] || query['server_type'])
			&& OverallSearchType !== 'role') {
		var text = $$('#user_server_info_box .f14px')[0];
		if (/修改服务器/g.test(text)) {
			text = text.get('text').split('：')[1].split('修改服务器')[0];
			titleObj['所在服务器'] = text;
		}
	}
	if (!showCount) {
		if (title.length > 30 || is_omitted) {
			title = title.substr(0, 10) + '...';
		}
	}
	return {
		title : title,
		titleObj : titleObj
	}
};
function solve_sub_list(sub_obj, config, query, key, count, showCount) {
	var belong = config[3].belong, subType = config[3].sub_type || 'input', mark = config[3].mark
			|| '≥', listTypeName = config[3].typeName || '', typeName = config[1]
			|| '', value = query[key] || '', elem = config[3].elem || '', text = '';
	if (key == 'growth') {
		value = value / 1000;
	}
	switch (subType) {
	case 'select':
		text = typeName + ':'
				+ $$('#' + key + ' option[value=' + value + ']')[0].innerHTML;
		break;
	case 'checkbox':
		if (value == 1) {
			text = typeName;
		}
		break;
	case 'list':
		var item_list = $$(elem);
		var value_list = value.split(',');
		var v_map = {};
		var name = [];
		var title = ''
		for (var n = 0; n < value_list.length; n++) {
			v_map[value_list[n]] = true;
		}
		for (var n = 0; n < item_list.length; n++) {
			var item = item_list[n];
			var dataValue = item.getAttribute('data_value');
			if (!dataValue) {
				dataValue = item.retrieve('value');
			}
			if (dataValue in v_map) {
				var item_name = item.get('text');
				if (!item_name) {
					item_name = item.getElement('*[title][alt]').get('title');
				}
				name.push(item_name);
				if (name.length >= count) {
					break;
				}
			}
		}
		if (showCount) {
			var text = name.join('/');
			if (listTypeName != '') {
				title += listTypeName + ':' + text;
			} else {
				title += text;
			}
		} else {
			title += name.join(',');
		}
		text = title;
		break;
	case 'radio':
		if (value == 'or' || value == 'and') {
			text = value == 'or' ? '满足一种' : '都满足';
		} else if (value == 1 || value == 0) {
			text = value == 1 ? '都满足' : '满足一种';
		} else if (value == 'detail') {
			text = '详细属性 ';
		}
		break;
	case 'radio-select':
		if (OverallSearchType == 'role') {
			if (value == 1 || value == 2) {
				text = $$(elem + '[value=' + value + ']').getParent()[0]
						.get('text');
			} else if (value.length > 2 || value > 2) {
				var hsType = $$('option[value=' + value + ']')[0].innerHTML;
				text = '已化圣/' + hsType;
			}
		}
		break;
	case 'range':
	case 'slider':
		var min_key = key + '_min';
		var max_key = key + '_max';
		if (/min/g.test(key)) {
			min_key = key;
			max_key = key.replace('min', 'max');
		}
		if (min_key in query && max_key in query) {
			var minValue = query[min_key] || '不限';
			var maxValue = query[max_key] || '不限';
			if (key === 'price') {
				text = minValue / 100 + '-' + maxValue / 100;
			} else if (listTypeName != '') {
				text = listTypeName + ':' + minValue + '-' + maxValue;
			} else {
				text = minValue + '-' + maxValue;
			}
		}
		break;
	case 'button':
		if (OverallSearchType == 'lingshi') {
			if (key in query) {
				var num = Number(key.split('.')[1]);
				num = num >= 12 ? num -= 12 : num - 1;
				text = $$(elem)[num].get('text');
			}
		} else if (OverallSearchType == 'pet_equip') {
			text = $$(elem + '[data_value=' + key + ']').get('text');
		}
		break;
	case 'func':
		text = config[3].funObj.getValueFn(query[key]);
		break;
	case 'input':
		text = typeName + mark + value;
		break;
	}
	if (text != ''
			&& ((key in query) || (key + '_min' in query || key + '_max' in query))) {
		if (sub_obj[belong]) {
			sub_obj[belong].push(text);
		} else {
			sub_obj[belong] = [ text ];
		}
	}
	return sub_obj;
}
function fix_args_config(args_config) {
	var new_args_config = [];
	for (var i = 0; i < args_config.length; i++) {
		var config = args_config[i];
		var key = config[0];
		if (config.length == 2) {
			var type = 'int';
		} else {
			var type = config[2];
		}
		if (type === 'range') {
			new_args_config.push([ key + '_max', config[1] + '上限' ]);
			new_args_config.push([ key + '_min', config[1] + '下限' ]);
		} else if (type === 'slider') {
			new_args_config.push([ key + '_max', config[1] + '上限', type ]);
			new_args_config.push([ key + '_min', config[1] + '下限', type ]);
		} else {
			new_args_config.push(config);
		}
	}
	return new_args_config;
};
function restore_query_form(args_config, saved_query) {
	var args_config = fix_args_config(args_config);
	$("reset_all").fireEvent("click");
	for (var i = 0; i < args_config.length; i++) {
		var config = args_config[i];
		var key = config[0];
		var id = key;
		if (config.length == 2) {
			var type = 'int';
		} else {
			var type = config[2];
		}
		var fixed_list_value = [];
		var passArr = [ 'price', 'level', 'sum_exp', 'equip_level',
				'lingshi_max_level', 'lingshi_min_level',
				'lingshi_min_duanzao_level' ]
		if (passArr.indexOf(key) > -1) {
			var min_key = key + '_min';
			var max_key = key + '_max';
			if (min_key in saved_query && max_key in saved_query) {
				type = 'sub_list'
			}
		} else if (!(key in saved_query)) {
			continue;
		}
		switch (type) {
		case 'int':
			$(id).set('value', saved_query[key]);
			break;
		case 'radio':
			if (config.length == 4) {
				$$(config[3]).each(function(el, i) {
					if (el.value === saved_query[key]) {
						el.fireEvent('click');
						el.checked = true;
					}
				});
			}
			break;
		case 'func':
			config[4](saved_query[key]);
			break;
		case 'autocomplete':
			var value = saved_query[key];
			if (value in config[4]) {
				$(config[3]).set('value', config[4][value]);
			}
			break;
		case 'sub_list':
			var subType = config[3].sub_type;
			var elem = config[3].elem;
			restore_query_form_sub_list(config, key, saved_query);
			break;
		}
	}
	if ('switchto_serverid' in saved_query) {
		$('sel_area').select_server
				.set_select_server(saved_query['switchto_serverid']);
	}
	return;
}
function restore_query_form_sub_list(config, key, saved_query) {
	var subType = config[3].sub_type || 'input';
	var elem = config[3].elem || '';
	if (key in saved_query
			|| (key + '_min' in saved_query && key + '_max' in saved_query)) {
		switch (subType) {
		case 'radio':
			var value = saved_query[key];
			if (elem.indexOf('input') >= 0) {
				$$(elem + '[value=' + value + ']').set('checked', true);
			} else {
				$$(elem).set('checked', true);
			}
			break;
		case 'radio-select':
			if (OverallSearchType == 'role') {
				var value = saved_query[key];
				if (value.length > 2 || value > 2) {
					$('zhuang_zhi_hua_sheng').set({
						'checked' : true,
						'value' : value
					});
					$('zhuang_zhi_hua_sheng_select').set('value', value);
				} else {
					$$('.zhuang_zhi[value=' + value + ']').set('checked', true);
				}
			}
			break;
		case 'list':
			var item_list = $$(elem);
			var value_list = saved_query[key].split(',');
			var parent_el = item_list.getParent()[0];
			if (parent_el && parent_el.btn_checker) {
				parent_el.btn_checker.restore(value_list);
				return false;
			}
			var v_map = {};
			for (var n = 0; n < value_list.length; n++) {
				v_map[value_list[n]] = true;
			}
			for (var n = 0; n < item_list.length; n++) {
				var item = item_list[n];
				var value = item.getAttribute('data_value');
				if (!value) {
					value = item.retrieve('value');
				}
				if (value in v_map) {
					item.addClass('on');
				} else {
					item.removeClass('on');
				}
			}
			break;
		case 'select':
			$(key).set('value', saved_query[key]);
		case 'checkbox':
			if (saved_query[key] == 1) {
				$$(elem).set('checked', true);
			}
			break;
		case 'slider':
			var min = key + '_min';
			var max = key + '_max';
			var minValue = saved_query[min];
			var maxValue = saved_query[max];
			$(key + '_slider').slider.set_value([ minValue, maxValue ]);
			break;
		case 'func':
			config[3].funObj.setValueFn(saved_query[key]);
			break;
		case 'range':
			var min = key + '_min';
			var max = key + '_max';
			if (/min/g.test(key)) {
				min = key;
				max = key.replace('min', 'max');
			}
			var minValue = saved_query[min] || '不限';
			var maxValue = saved_query[max] || '不限';
			if (key == 'price') {
				$(elem + '_min').set('value', minValue / 100);
				$(elem + '_max').set('value', maxValue / 100);
			} else {
				if (elem != '') {
					min = elem + '_min';
					max = elem + '_max';
				}
				$(min).set('value', minValue);
				$(max).set('value', maxValue);
			}
			break;
		case 'button':
			if ('added_attr_logic' in saved_query) {
				var value = Number(key.split('.')[1]);
				var num = value >= 12 ? value -= 12 : value - 1;
				$$(elem)[num].addClass('on');
				var value_list = [];
				for ( var k in saved_query) {
					var m = k.match(/^added_attr.(\d{1,2})$/);
					if (m && m.length >= 2) {
						value_list.push(m[1]);
					}
				}
				var item_list = $$(elem);
				var parent_el = item_list.getParent()[0];
				if (parent_el && parent_el.btn_checker) {
					parent_el.btn_checker.restore(value_list);
					return false;
				}
			} else {
				$$(elem + '[data_value=' + key + ']').addClass('on');
			}
			break;
		case 'input':
			if (key == 'ji_yuan_point' || key == 'addon_point') {
				$(key).addClass('on');
				$('jiyuan_and_addpoint').set('value', saved_query[key]);
			} else if (key == 'jiyuan_and_addpoint') {
				$('jiyuan_and_addpoint').set('value', saved_query[key]);
				$('ji_yuan_point').addClass('on');
				$('addon_point').addClass('on');
			} else if (key == 'growth') {
				$$(elem).set('value', saved_query[key] / 1000);
				return;
			} else if (elem != '') {
				$$(elem).set('value', saved_query[key]);
			} else {
				$(key).set('value', saved_query[key]);
			}
			break;
		}
	}
}
function get_overall_search_action_desc(equip) {
	var auction_status = equip.auction_status;
	if (auction_status == AUCTION_BIDDING)
		return '去竞拍';
	else if (auction_status == AUCTION_OPEN_BUY)
		return '去抢付';
	else
		return '查看详情';
}
function save_args_in_cookie(args, search_type) {
	var save_ck_name = getPara("save_ck_name");
	if (save_ck_name) {
		save_ck_name = save_ck_name.replace("#", "");
		var save_data = {};
		Object.merge(save_data, args, {
			"search_type" : search_type
		});
		var ck_str = JSON.encode(save_data);
		Cookie.write(save_ck_name, ck_str, {
			"domain" : "163.com"
		});
	}
}