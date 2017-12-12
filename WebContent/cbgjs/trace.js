var cbg_tracer = {};
cbg_tracer.init = function() {
	cbg_tracer.fingerprint = new Fingerprint();
	Cookie.write('fingerprint', cbg_tracer.fingerprint.get(), {
		'duration' : 1,
		'domain' : '.' + location.hostname
	})
	var click_event_log_handler = function(e) {
		var target = e.target;
		var tid = target.get('tid');
		if (!tid) {
			var target = target.getParent('*[tid]');
			if (!target) {
				return;
			}
		}
		var config = cbg_tracer.get_common_trace_info();
		config.push([ 'kind', 'S_#kind_tree_panel ul .on:not(.off)' ]);
		var attrs = cbg_tracer.get_attrs(config);
		var text = target.getAttribute('data_trace_text') || target.get('text');
		if (!text) {
			text = target.get('value');
		}
		if (!text) {
			text = '-';
		}
		text = text.trim();
		attrs.push([ 'tid', target.get('tid') ]);
		attrs.push([ 'text', text ]);
		cbg_tracer.send_log('click_event', attrs, function() {
		});
	};
	if (document.addEventListener) {
		document.addEventListener('click', click_event_log_handler, true);
	} else {
		document.addEvent('mouseup', click_event_log_handler);
	}
	if (window.trace_log_name == undefined) {
		return;
	}
	if (typeOf(trace_log_name) === 'string') {
		cbg_tracer['trace_' + trace_log_name]();
	} else if (typeOf(trace_log_name) === 'array') {
		for (var i = 0; i < trace_log_name.length; i++) {
			cbg_tracer['trace_' + trace_log_name[i]]();
		}
	}
	cbg_tracer.trace_special_equip_lists();
}
cbg_tracer.get_special = function(key) {
	if (key == 'Fingerprint') {
		return cbg_tracer.fingerprint.get();
	}
}
cbg_tracer.open_link = function(href) {
	var referLink = document.createElement('a');
	referLink.href = href;
	document.body.appendChild(referLink);
	referLink.click();
}
cbg_tracer.get_attrs = function(config) {
	var attrs = [];
	for (var i = 0; i < config.length; i++) {
		if (!config[i]) {
			continue;
		}
		var name = config[i][0]
		var conf = config[i][1];
		var type = conf.substr(0, 1);
		var key = conf.substr(2);
		var v = '';
		try {
			switch (type) {
			case 'A':
				elem = config[i][2];
				prop = config[i][3];
				if (key) {
					v = elem.getElement(key).getProperty(prop);
				} else {
					v = elem.getProperty(prop);
				}
				if (!v) {
					prop = config[i][4];
					if (prop)
						v = elem.getElement(key).getProperty(prop);
					if (!v)
						v = '-';
				}
				break;
			case 'L':
				elem = config[i][2];
				prop = config[i][3];
				v = elem.getElements(key).getProperty(prop);
				if (!v) {
					v = '-';
				}
				v = JSON.encode(v);
				break;
			case 'F':
				v = cbg_tracer.get_special(key);
				break;
			case 'S':
				var res = $$(key).get('text');
				if (res.length > 0) {
					v = res.toString();
				} else {
					v = '-';
				}
				break;
			case 'V':
				v = trace_log_used_info[key];
				break;
			case 'E':
				try {
					v = eval(key);
				} catch (e) {
					v = '-';
				}
				break;
			case 'C':
				v = key;
				break;
			default:
				v = 'ERR_TYPE(' + conf + ')';
			}
			if (v == null || v == undefined) {
				v = '-';
			}
		} catch (e) {
			v = 'ERROR';
		}
		attrs.push([ name, v ]);
	}
	return attrs;
}
cbg_tracer.send_log = function(log_name, attrs, callback) {
	if (!window.Tracker) {
		return;
	}
	var img = new Image();
	var params = {};
	(attrs || []).each(function(list) {
		params[list[0]] = list[1];
	});
	params = Object.toQueryString(params);
	var wrapped_callback = null;
	var doing = false;
	if (callback) {
		var wrapped_callback = function() {
			if (doing) {
				return;
			}
			doing = true;
			callback();
		}
		img.onload = img.onerror = wrapped_callback;
	}
	var src = Tracker.url + '/1.gif?v=' + Math.random();
	src += '&log=' + log_name + '&' + params;
	img.src = src;
	img.style.display = 'none';
	document.body.appendChild(img);
	if (wrapped_callback) {
		setTimeout(wrapped_callback, 500);
	}
}
cbg_tracer.trace_select_role = function() {
	var old_login = window.login;
	window.login = function() {
		var roleid = LastRoleId;
		if (!roleid) {
			roleid = $("select_roleid").value;
		}
		var role = RoleList[roleid];
		var config = [ [ 'ver', 'C_1' ], [ 'ip', 'S_#client_ip' ],
				[ 'fingerprint', 'F_Fingerprint' ], [ 'urs', 'S_#user_urs' ],
				[ 'serverid', 'V_serverid' ], [ 'serversn', 'V_serversn' ],
				[ 'roleid', 'C_' + roleid ],
				[ 'nickname', 'C_' + role['nickname'] ],
				[ 'icon', 'C_' + role['icon'] ],
				[ 'race', 'C_' + role['racename'] ] ];
		var attrs = cbg_tracer.get_attrs(config);
		Cookie.write('fingerprint', cbg_tracer.fingerprint.get(), {
			'duration' : 1
		});
		cbg_tracer.send_log('select_role', attrs, function() {
			old_login();
		});
	};
}
cbg_tracer.get_common_trace_info = function() {
	var is_login = Cookie.read('is_user_login') == 1 ? true : false;
	var user_level = '-';
	var roleid = '-';
	var nickname = '-';
	var icon = '-';
	var urs = '-';
	var school = '-';
	if (is_login) {
		var user_level = Cookie.read('login_user_level');
		var roleid = Cookie.read('login_user_roleid');
		var nickname = Cookie.read('login_user_nickname');
		var icon = Cookie.read('login_user_icon');
		var urs = Cookie.read('login_user_urs');
		var school = Cookie.read('login_user_school');
	}
	var config = [ [ 'client_type', 'C_web' ],
			[ 'fingerprint', 'F_Fingerprint' ], [ 'urs', 'C_' + urs ],
			[ 'roleid', 'C_' + roleid ], [ 'nickname', 'C_' + nickname ],
			[ 'icon', 'C_' + icon ], [ 'grade', 'C_' + user_level ],
			[ 'school', 'C_' + school ], [ 'nav', 'S_.nav ul li.on' ],
			[ 'sub_nav', 'S_.subNav a.on' ],
			[ 'is_user_login', 'C_' + is_login ] ];
	if (window.LoginInfo) {
		config.extend([ [ 'serverid', 'E_LoginInfo.serverid' ],
				[ 'serversn', 'E_LoginInfo.serversn' ] ]);
	} else {
		config.extend([ [ 'serverid', 'E_ServerInfo.server_id' ],
				[ 'serversn', 'E_ServerInfo.server_sn' ] ]);
	}
	return config;
}
cbg_tracer.get_list_pos = function(e) {
	if (e.getProperty('pos')) {
		return e.getProperty('pos');
	}
	var siblings = e.getParent().getChildren();
	var i = 0;
	for (; i < siblings.length; i++) {
		if (e == siblings[i]) {
			break;
		}
	}
	return i + 1;
}
cbg_tracer.get_search_conds = function() {
	var search_conds = {};
	if (CommonVar.query_order) {
		search_conds['query_order'] = CommonVar.query_order;
	}
	for ( var k in QueryVar) {
		if (!QueryVar[k]) {
			continue;
		}
		search_conds[k] = QueryVar[k];
	}
	return search_conds;
}
cbg_tracer.trace_search = function() {
	var config = cbg_tracer.get_common_trace_info()
	config.extend([ [ 'ver', 'C_1' ],
			[ 'kind', 'S_#kind_tree_panel ul .on:not(.off)' ] ]);
	if (window.CommonVar == undefined || window.QueryVar == undefined) {
		return;
	}
	var search_conds = cbg_tracer.get_search_conds();
	search_conds = JSON.encode(search_conds);
	config.push([ 'search_conds', 'C_' + search_conds ]);
	var attrs = cbg_tracer.get_attrs(config);
	cbg_tracer.send_log('search', attrs);
}
cbg_tracer.trace_overall_search = function() {
	if (window.overall_search) {
		var old_overall_search = window.overall_search;
		window.overall_search = function() {
			old_overall_search.apply(this, arguments);
			cbg_tracer.do_trace_overall_search();
		}
	}
	if (window.change_query_order && !window.do_query) {
		var old_change_query_order = window.change_query_order;
		window.change_query_order = function() {
			old_change_query_order.apply(this, arguments);
			cbg_tracer.do_trace_overall_search();
		}
	}
	if (window.do_query) {
		var old_do_query = window.do_query;
		window.do_query = function() {
			old_do_query.apply(this, arguments);
			cbg_tracer.do_trace_overall_search();
		}
	}
	if (window.QueryArgs) {
		cbg_tracer.do_trace_overall_search();
	}
}
cbg_tracer.get_overall_search_conds = function() {
	var search_conds = {};
	if (window.QueryArgs) {
		for ( var k in QueryArgs) {
			if (!QueryArgs[k]) {
				continue;
			}
			search_conds[k] = QueryArgs[k];
		}
		if (search_conds['act']) {
			delete search_conds['act']
		}
		if (search_conds['order_by']) {
			search_conds['query_order'] = search_conds['order_by'];
			delete search_conds['order_by'];
		}
	} else {
		if (window.CurSearchValue == undefined) {
			return;
		}
		if (CurSearchValue.order_by && CurSearchValue.order_by['key'] != null) {
			search_conds['query_order'] = CurSearchValue.order_by['key'] + ' '
					+ CurSearchValue.order_by['sort'];
		}
		if (CurSearchValue.arg) {
			for ( var k in CurSearchValue.arg) {
				if (!CurSearchValue.arg[k]) {
					continue;
				}
				search_conds[k] = CurSearchValue.arg[k];
			}
		}
		if ($$('.pages>a.on')[0]) {
			search_conds['page'] = $$('.pages>a.on')[0].get('text');
		}
	}
	return search_conds;
}
cbg_tracer.do_trace_overall_search = function() {
	var config = cbg_tracer.get_common_trace_info()
	config.extend([ [ 'ver', 'C_1' ], [ 'kind', 'C_-' ] ]);
	var search_conds = cbg_tracer.get_overall_search_conds();
	search_conds = JSON.encode(search_conds);
	config.push([ 'search_conds', 'C_' + search_conds ]);
	var attrs = cbg_tracer.get_attrs(config);
	cbg_tracer.send_log('search', attrs);
}
cbg_tracer.trace_show_equip_detail = function() {
	var $root = $$('body');
	if ($root.length > 0) {
		var keyInit = 'trace_solid_img_init';
		$root
				.each(function($r) {
					if ($r.get(keyInit)) {
						return;
					}
					$r.set(keyInit, 1);
					$r
							.addEvent(
									'click:relay(#soldList a.soldImg,#soldList a.jsStat,.jsStatEquips a.soldImg,.jsStatEquips a.jsStat)',
									function(e) {
										var res = cbg_tracer
												.do_trace_show_equip_detail($(
														this).getParent('tr'));
										if (res === false) {
											e.stop();
										}
									});
					$r
							.addEvent(
									'mouseenter:relay(#soldList a.soldImg,.jsStatEquips a.soldImg)',
									function() {
										$(this).setProperty('mouse_over_begin',
												new Date());
									});
					$r
							.addEvent(
									'mouseleave:relay(#soldList a.soldImg,.jsStatEquips a.soldImg)',
									function() {
										var begin = $(this).getProperty(
												'mouse_over_begin');
										begin = new Date(begin);
										var end = new Date();
										var delta = end - begin;
										cbg_tracer.do_trace_show_tips_box($(
												this).getParent('tr'), delta);
									});
				});
	} else {
		setTimeout(cbg_tracer.trace_show_equip_detail, 1000);
	}
}
cbg_tracer.trace_special_equip_lists = function() {
	$$('#msg_detail .j_equip_icon a.soldImg').addEvents(
			{
				mouseenter : function() {
					$(this).setProperty('mouse_over_begin', new Date());
				},
				mouseleave : function() {
					var begin = $(this).getProperty('mouse_over_begin');
					begin = new Date(begin);
					var end = new Date();
					var delta = end - begin;
					cbg_tracer.do_trace_show_tips_box($(this).getParent(
							'.j_equip_icon'), delta);
				},
				click : function() {
					return cbg_tracer.do_trace_show_equip_detail($(this)
							.getParent('.j_equip_icon'));
				}
			});
	var panels = $$('#recent_list_panel, #latest_trades_list');
	if (panels.length == 0)
		return;
	panels.addEvent('click', function(e) {
		var img = e.target;
		if (!img || img.tagName.toLowerCase() != 'img')
			return;
		return cbg_tracer.do_trace_show_equip_detail(img.getParent('li'));
	});
	$$('#latest_trades_list li').addEvents({
		mouseenter : function() {
			$(this).setProperty('mouse_over_begin', new Date());
		},
		mouseleave : function() {
			var begin = $(this).getProperty('mouse_over_begin');
			begin = new Date(begin);
			var end = new Date();
			var delta = end - begin;
			cbg_tracer.do_trace_show_tips_box(this, delta);
		}
	});
	$$('.j_link_order_detail_to_equip').addEvent('click', function(e) {
		return cbg_tracer.do_trace_show_equip_detail_on_link(this, 'order_in');
	});
};
cbg_tracer.get_common_info_for_equip_in_list = function(e) {
	var config = cbg_tracer.get_common_trace_info();
	try {
		var value = e.getElement('td>textarea').value;
		var extra = JSON.decode(value);
		var search_conds = JSON.encode(cbg_tracer.get_search_conds());
		config.extend([ [ 'equip_serverid', 'E_ServerInfo.server_id' ] ]);
		config.extend([ [ 'equip_serversn', 'E_ServerInfo.server_sn' ] ]);
	} catch (exp) {
		try {
			var extra = JSON.decode(e.getElement('a>textarea').value);
			var search_conds = JSON.encode(cbg_tracer
					.get_overall_search_conds());
			config
					.extend([ [ 'equip_serverid', 'A_a img', e, 'data_serverid' ] ]);
			config
					.extend([ [ 'equip_serversn', 'A_a img', e, 'data_serversn' ] ]);
		} catch (exp2) {
			extra = {};
			var search_conds = '-';
			config
					.extend([ [ 'equip_serverid', 'A_a img', e, 'data_serverid' ] ]);
			config
					.extend([ [ 'equip_serversn', 'A_a img', e, 'data_serversn' ] ]);
		}
	}
	if (!extra) {
		extra = {};
	}
	var pos = cbg_tracer.get_list_pos(e);
	var view_loc = e.getElement('a img').getProperty('data_view_loc');
	if (!view_loc || view_loc.startWith('<!--')) {
		view_loc = window.equip_refer_loc || 'no_refer';
		if (view_loc.startWith('<!--')) {
			view_loc = 'no_refer';
		}
	}
	config.extend([
			[ 'ver', 'C_1' ],
			[ 'view_loc', 'C_' + view_loc ],
			[ 'kind', 'S_#kind_tree_panel ul .on:not(.off)' ],
			[ 'search_conds', 'C_' + search_conds ],
			[ 'ordersn', 'A_a img', e, 'data_ordersn' ],
			[ 'equip_type', 'A_a img', e, 'data_equip_type' ],
			[ 'equip_level', 'A_a img', e, 'data_equip_level' ],
			[ 'selling_time', 'A_a img', e, 'data_selling_time' ],
			[ 'create_time', 'A_a img', e, 'data_equip_create_time',
					'data_create_time' ],
			[ 'kindid', 'A_a img', e, 'data_kindid' ],
			[ 'price', 'A_a img', e, 'data_equip_price', 'data_price' ],
			[ 'highlight', 'C_' + (extra.highlight ? extra.highlight : '-') ],
			[ 'status', 'A_a img', e, 'data_equip_status', 'data_status' ],
			[ 'pos', 'C_' + pos ] ]);
	if (!extra.seller_roleid) {
		config.extend([ [ 'seller_roleid', 'A_a img', e, 'data_seller_roleid',
				'data_owner_roleid' ] ]);
	} else {
		config.extend([ [ 'seller_roleid',
				'C_' + (extra.seller_roleid ? extra.seller_roleid : '-') ] ]);
	}
	var attrs = cbg_tracer.get_attrs(config);
	for (var i = 0; i < attrs.length; i++) {
		var key = attrs[i][0];
		var val = attrs[i][1];
		if (key !== 'selling_time' && key !== 'create_time') {
			continue;
		} else if (val.contains(':') || val === '-') {
			continue;
		}
		val = parseInt(val) * 1000;
		d = new Date(val);
		attrs[i][1] = d.getFullYear() + '-' + (d.getMonth() + 1) + '-'
				+ d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':'
				+ d.getSeconds()
	}
	return attrs;
}
cbg_tracer.do_trace_show_equip_detail_on_link = function(e, view_loc) {
	var config = cbg_tracer.get_common_trace_info();
	config.extend([
			[ 'equip_serverid', 'E_ServerInfo.server_id' ],
			[ 'equip_serversn', 'E_ServerInfo.server_sn' ],
			[ 'ver', 'C_1' ],
			[ 'view_loc', 'C_' + view_loc ],
			[ 'kind', 'C_-' ],
			[ 'search_conds', 'C_-' ],
			[ 'ordersn', 'A', e, 'data_ordersn' ],
			[ 'equip_type', 'A', e, 'data_equip_type' ],
			[ 'equip_level', 'A', e, 'data_equip_level' ],
			[ 'selling_time', 'A', e, 'data_selling_time' ],
			[ 'create_time', 'A', e, 'data_equip_create_time',
					'data_create_time' ],
			[ 'kindid', 'A', e, 'data_kindid' ],
			[ 'price', 'A', e, 'data_equip_price', 'data_price' ],
			[ 'highlight', 'C_-' ],
			[ 'status', 'A', e, 'data_equip_status', 'data_status' ],
			[ 'pos', 'C_-' ],
			[ 'seller_roleid', 'A', e, 'data_seller_roleid',
					'data_owner_roleid' ] ]);
	var attrs = cbg_tracer.get_attrs(config);
	for (var i = 0; i < attrs.length; i++) {
		var key = attrs[i][0];
		var val = attrs[i][1];
		if (key !== 'selling_time' && key !== 'create_time') {
			continue;
		} else if (val.contains(':') || val === '-') {
			continue;
		}
		val = parseInt(val) * 1000;
		d = new Date(val);
		attrs[i][1] = d.getFullYear() + '-' + (d.getMonth() + 1) + '-'
				+ d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':'
				+ d.getSeconds()
	}
	var log_name = 'show_equip_detail';
	if (e.getProperty('target') != '_blank') {
		cbg_tracer.send_log(log_name, attrs, function() {
			cbg_tracer.open_link(e.href);
		});
		return false;
	} else {
		cbg_tracer.send_log(log_name, attrs);
		return true;
	}
};
cbg_tracer.do_trace_show_equip_detail = function(e) {
	var a_elem = e.getElement('a.soldImg')
			|| e.getElement('a img').getParent('a');
	var attrs = cbg_tracer.get_common_info_for_equip_in_list(e);
	if (!attrs)
		return;
	var log_name = 'show_equip_detail';
	var recommd_tag = e.getElement('a img').getProperty('data_recommd_tag');
	if (recommd_tag && !recommd_tag.startWith('<!--')) {
		attrs.push([ 'tag', recommd_tag ]);
	}
	if (a_elem.getProperty('target') != '_blank') {
		cbg_tracer.send_log(log_name, attrs, function() {
			cbg_tracer.open_link(a_elem.href);
		});
		return false;
	} else {
		cbg_tracer.send_log(log_name, attrs);
		return true;
	}
}
cbg_tracer.do_trace_show_tips_box = function(e, delta) {
	var $img = e.getElement('a img');
	var storage_type = $img.getProperty('data_storage_type');
	if (delta < 500 || storage_type == StorageStype['money']
			|| storage_type == StorageStype['role']) {
		return;
	}
	var view_loc = $img.getProperty('data_view_loc');
	if (!view_loc || view_loc.startWith('<!--')) {
		view_loc = window.equip_refer_loc || 'no_refer';
	}
	if (view_loc == 'no_refer' || view_loc.startWith('<!--')) {
		return;
	}
	var attrs = cbg_tracer.get_common_info_for_equip_in_list(e);
	if (!attrs)
		return;
	attrs.push([ 'duration', delta ]);
	var log_name = 'show_tips_box';
	var recommd_tag = e.getElement('a img').getProperty('data_recommd_tag');
	if (recommd_tag && !recommd_tag.startWith('<!--')) {
		attrs.push([ 'tag', recommd_tag ]);
	}
	cbg_tracer.send_log(log_name, attrs);
}
cbg_tracer.trace_pay_cross_server_order = function() {
	if (window.goto_pay_orders) {
		var old_goto_pay_orders = window.goto_pay_orders;
		window.goto_pay_orders = function() {
			var config = cbg_tracer.get_common_trace_info();
			var e = $$('#soldList')[0];
			config.extend([ [ 'ver', 'C_1' ],
					[ 'type', 'C_' + trace_log_name ],
					[ 'price', 'A_a img', e, 'data_equip_price' ],
					[ 'equip_serverid', 'E_equip_info.serverid' ],
					[ 'equipid', 'A_a img', e, 'data_equipid' ] ]);
			var attrs = cbg_tracer.get_attrs(config);
			cbg_tracer.send_log('goto_epay', attrs);
			return old_goto_pay_orders.apply(this, arguments);
		}
	}
}
cbg_tracer.trace_merge_pay = function() {
	if (window.do_pay) {
		var old_do_pay = window.do_pay;
		window.do_pay = function() {
			var config = cbg_tracer.get_common_trace_info();
			var e = $$('#soldList')[0];
			config.extend([ [ 'ver', 'C_1' ],
					[ 'type', 'C_' + trace_log_name ],
					[ 'price', 'L_a img', e, 'data_equip_price' ],
					[ 'equip_serverid', 'E_ServerInfo.server_id' ],
					[ 'equipid', 'L_a img', e, 'data_equipid' ] ]);
			var attrs = cbg_tracer.get_attrs(config);
			cbg_tracer.send_log('goto_epay', attrs);
			return old_do_pay.apply(this, arguments);
		}
	}
}
cbg_tracer.trace_pay_in_order_list = function() {
	if (window.go_pay) {
		var old_go_pay = window.go_pay;
		window.go_pay = function(orderid) {
			var config = cbg_tracer.get_common_trace_info();
			var e = $$('#soldList')[0];
			config
					.extend([
							[ 'ver', 'C_1' ],
							[ 'type', 'C_' + trace_log_name ],
							[ 'price', 'A_#equip_img_' + orderid, e,
									'data_equip_price' ],
							[ 'equip_serverid', 'E_ServerInfo.server_id' ],
							[ 'equipid', 'A_#equip_img_' + orderid, e,
									'data_realequipid' ] ]);
			var attrs = cbg_tracer.get_attrs(config);
			cbg_tracer.send_log('goto_epay', attrs);
			return old_go_pay.apply(this, arguments);
		}
	}
}
cbg_tracer.trace_pay_in_detail_page = function() {
	if (window.go_pay) {
		var old_go_pay = window.go_pay;
		window.go_pay = function() {
			var config = cbg_tracer.get_common_trace_info();
			var e = $$('#soldList')[0];
			config.extend([ [ 'ver', 'C_1' ],
					[ 'type', 'C_' + trace_log_name ], [ 'price', 'V_price' ],
					[ 'equip_serverid', 'E_ServerInfo.server_id' ],
					[ 'equipid', 'E_document.equip_info.equipid.value' ] ]);
			var attrs = cbg_tracer.get_attrs(config);
			cbg_tracer.send_log('goto_epay', attrs);
			return old_go_pay.apply(this, arguments);
		}
	}
}
cbg_tracer.trace_in_equip_detail_page = function() {
	var prefix = document.location.protocol + '//' + document.location.host;
	var referrer = document.referrer;
	if (location.search.match(/equip_refer=56|_web_log=1/)) {
	} else if (/\/login\.py.*act=do_anon_auth/.test(referrer)) {
		referrer = '';
	} else if (referrer.startWith(prefix)) {
		return;
	}
	var view_loc = 'link_external';
	if (window.equip_refer_loc) {
		view_loc = equip_refer_loc;
	} else if (referrer === '') {
		view_loc = 'link_external';
	}
	var config = cbg_tracer.get_common_trace_info();
	config.extend([
			[
					'highlight',
					'C_'
							+ (equip.highlights ? JSON.encode(equip.highlights)
									: '-') ], [ 'ver', 'C_1' ],
			[ 'view_loc', 'C_' + view_loc ],
			[ 'ordersn', 'E_equip.game_ordersn' ],
			[ 'equip_type', 'E_equip.equip_type' ],
			[ 'selling_time', 'E_equip.selling_time' ],
			[ 'create_time', 'E_equip.create_time' ],
			[ 'kindid', 'E_equip.kindid' ],
			[ 'seller_roleid', 'E_equip.owner_roleid' ],
			[ 'price', 'E_equip.price' ],
			[ 'equip_serversn', 'E_equip.serversn' ],
			[ 'equip_level', 'E_equip.equip_level' ],
			[ 'status', 'E_equip.status' ] ]);
	var attrs = cbg_tracer.get_attrs(config);
	cbg_tracer.send_log('show_equip_detail', attrs);
}
cbg_tracer.trace_recommd_in_equip_detail_page = function($root) {
	if ($root) {
		if ($root.getAttribute('trace_init')) {
			return;
		}
		$list = $root.getElements('.guessList a');
	} else {
		$root = $$('.guess.goodsInfo');
		if ($root.length <= 0) {
			return;
		}
		$root.each(function($r) {
			cbg_tracer.trace_recommd_in_equip_detail_page($r);
		});
		return;
	}
	if ($list.length > 0) {
		$root.setAttribute('trace_init', 1);
		$list.addEvent('click', function() {
			cbg_tracer.do_trace_recommd_in_equip_detail_page($(this).getParent(
					'li'));
			return true;
		});
		$list.addEvent('mouseover', function() {
			$(this).setProperty('mouse_over_begin', new Date());
		});
		$list.addEvent('mouseout', function() {
			var begin = $(this).getProperty('mouse_over_begin');
			if (!begin) {
				return;
			}
			begin = new Date(begin);
			var end = new Date();
			var delta = end - begin;
			cbg_tracer.do_trace_show_tips_box_in_equip_detail_page($(this)
					.getParent('li'), delta);
		});
	} else {
		var times = +($root.getAttribute('times_retry') || '0');
		if (times < 5) {
			$root.setAttribute('times_retry', times + 1);
			setTimeout(function() {
				cbg_tracer.trace_recommd_in_equip_detail_page($root);
			}, 3000);
		}
	}
}
cbg_tracer.do_trace_recommd_in_equip_detail_page = function(e) {
	var config = cbg_tracer.get_common_trace_info();
	config.extend([ [ 'highlight', 'A_a img', e, 'data_highlights' ],
			[ 'ver', 'C_1' ],
			[ 'kind', 'S_#kind_tree_panel ul .on:not(.off)' ],
			[ 'tag', 'A_a img', e, 'data_recommd_tag' ],
			[ 'type', 'C_from_detail_page' ],
			[ 'view_loc', 'A_a img', e, 'data_view_loc' ],
			[ 'ordersn', 'A_a img', e, 'data_ordersn' ],
			[ 'equip_type', 'A_a img', e, 'data_equip_type' ],
			[ 'equip_level', 'A_a img', e, 'data_equip_level' ],
			[ 'selling_time', 'A_a img', e, 'data_selling_time' ],
			[ 'create_time', 'A_a img', e, 'data_create_time' ],
			[ 'kindid', 'A_a img', e, 'data_kindid' ],
			[ 'seller_roleid', 'A_a img', e, 'data_owner_roleid' ],
			[ 'price', 'A_a img', e, 'data_price' ],
			[ 'equip_serversn', 'A_a img', e, 'data_serversn' ],
			[ 'status', 'A_a img', e, 'data_status' ],
			[ 'ref_equip_serversn', 'E_equip.serversn' ],
			[ 'ref_ordersn', 'E_equip.game_ordersn' ],
			[ 'pos', 'C_' + cbg_tracer.get_list_pos(e) ] ]);
	var attrs = cbg_tracer.get_attrs(config);
	cbg_tracer.send_log('show_equip_detail', attrs);
}
cbg_tracer.do_trace_show_tips_box_in_equip_detail_page = function(e, delta) {
	var storage_type = e.getElement('a img').getProperty('data_storage_type');
	if (delta < 500 || storage_type == StorageStype['money']
			|| storage_type == StorageStype['role']) {
		return;
	}
	var config = cbg_tracer.get_common_trace_info();
	config.extend([ [ 'highlight', 'A_a img', e, 'data_highlights' ],
			[ 'ver', 'C_1' ],
			[ 'kind', 'S_#kind_tree_panel ul .on:not(.off)' ],
			[ 'tag', 'A_a img', e, 'data_recommd_tag' ],
			[ 'type', 'C_from_detail_page' ],
			[ 'view_loc', 'A_a img', e, 'data_view_loc' ],
			[ 'ordersn', 'A_a img', e, 'data_ordersn' ],
			[ 'equip_type', 'A_a img', e, 'data_equip_type' ],
			[ 'equip_level', 'A_a img', e, 'data_equip_level' ],
			[ 'selling_time', 'A_a img', e, 'data_selling_time' ],
			[ 'create_time', 'A_a img', e, 'data_create_time' ],
			[ 'kindid', 'A_a img', e, 'data_kindid' ],
			[ 'seller_roleid', 'A_a img', e, 'data_owner_roleid' ],
			[ 'price', 'A_a img', e, 'data_price' ],
			[ 'equip_serversn', 'A_a img', e, 'data_serversn' ],
			[ 'status', 'A_a img', e, 'data_status' ],
			[ 'duration', 'C_' + delta ],
			[ 'ref_equip_serversn', 'E_equip.serversn' ],
			[ 'ref_ordersn', 'E_equip.game_ordersn' ],
			[ 'pos', 'C_' + cbg_tracer.get_list_pos(e) ] ]);
	var attrs = cbg_tracer.get_attrs(config);
	cbg_tracer.send_log('show_tips_box', attrs);
};
(function(name, context, definition) {
	if (typeof module !== 'undefined' && module.exports) {
		module.exports = definition();
	} else if (typeof define === 'function' && define.amd) {
		define(definition);
	} else {
		context[name] = definition();
	}
})
		(
				'Fingerprint',
				this,
				function() {
					'use strict';
					var Fingerprint = function(options) {
						var nativeForEach, nativeMap;
						nativeForEach = Array.prototype.forEach;
						nativeMap = Array.prototype.map;
						this.each = function(obj, iterator, context) {
							if (obj === null) {
								return;
							}
							if (nativeForEach && obj.forEach === nativeForEach) {
								obj.forEach(iterator, context);
							} else if (obj.length === +obj.length) {
								for (var i = 0, l = obj.length; i < l; i++) {
									if (iterator.call(context, obj[i], i, obj) === {})
										return;
								}
							} else {
								for ( var key in obj) {
									if (obj.hasOwnProperty(key)) {
										if (iterator.call(context, obj[key],
												key, obj) === {})
											return;
									}
								}
							}
						};
						this.map = function(obj, iterator, context) {
							var results = [];
							if (obj == null)
								return results;
							if (nativeMap && obj.map === nativeMap)
								return obj.map(iterator, context);
							this.each(obj, function(value, index, list) {
								results[results.length] = iterator.call(
										context, value, index, list);
							});
							return results;
						};
						if (typeof options == 'object') {
							this.hasher = options.hasher;
							this.screen_resolution = options.screen_resolution;
							this.screen_orientation = options.screen_orientation;
							this.canvas = options.canvas;
							this.ie_activex = options.ie_activex;
						} else if (typeof options == 'function') {
							this.hasher = options;
						}
					};
					Fingerprint.prototype = {
						get : function() {
							var keys = [];
							keys.push(navigator.userAgent);
							keys.push(navigator.language);
							keys.push(screen.colorDepth);
							if (this.screen_resolution) {
								var resolution = this.getScreenResolution();
								if (typeof resolution !== 'undefined') {
									keys.push(resolution.join('x'));
								}
							}
							keys.push(new Date().getTimezoneOffset());
							keys.push(this.hasSessionStorage());
							keys.push(this.hasLocalStorage());
							keys.push(!!window.indexedDB);
							if (document.body) {
								keys.push(typeof (document.body.addBehavior));
							} else {
								keys.push(typeof undefined);
							}
							keys.push(typeof (window.openDatabase));
							keys.push(navigator.cpuClass);
							keys.push(navigator.platform);
							keys.push(navigator.doNotTrack);
							keys.push(this.getPluginsString());
							if (this.canvas && this.isCanvasSupported()) {
								keys.push(this.getCanvasFingerprint());
							}
							if (this.hasher) {
								return this.hasher(keys.join('###'), 31);
							} else {
								return this.murmurhash3_32_gc(keys.join('###'),
										31);
							}
						},
						murmurhash3_32_gc : function(key, seed) {
							var remainder, bytes, h1, h1b, c1, c2, k1, i;
							remainder = key.length & 3;
							bytes = key.length - remainder;
							h1 = seed;
							c1 = 0xcc9e2d51;
							c2 = 0x1b873593;
							i = 0;
							while (i < bytes) {
								k1 = ((key.charCodeAt(i) & 0xff))
										| ((key.charCodeAt(++i) & 0xff) << 8)
										| ((key.charCodeAt(++i) & 0xff) << 16)
										| ((key.charCodeAt(++i) & 0xff) << 24);
								++i;
								k1 = ((((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16))) & 0xffffffff;
								k1 = (k1 << 15) | (k1 >>> 17);
								k1 = ((((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16))) & 0xffffffff;
								h1 ^= k1;
								h1 = (h1 << 13) | (h1 >>> 19);
								h1b = ((((h1 & 0xffff) * 5) + ((((h1 >>> 16) * 5) & 0xffff) << 16))) & 0xffffffff;
								h1 = (((h1b & 0xffff) + 0x6b64) + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16));
							}
							k1 = 0;
							switch (remainder) {
							case 3:
								k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
							case 2:
								k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
							case 1:
								k1 ^= (key.charCodeAt(i) & 0xff);
								k1 = (((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
								k1 = (k1 << 15) | (k1 >>> 17);
								k1 = (((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff;
								h1 ^= k1;
							}
							h1 ^= key.length;
							h1 ^= h1 >>> 16;
							h1 = (((h1 & 0xffff) * 0x85ebca6b) + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff;
							h1 ^= h1 >>> 13;
							h1 = ((((h1 & 0xffff) * 0xc2b2ae35) + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16))) & 0xffffffff;
							h1 ^= h1 >>> 16;
							return h1 >>> 0;
						},
						hasLocalStorage : function() {
							try {
								return !!window.localStorage;
							} catch (e) {
								return true;
							}
						},
						hasSessionStorage : function() {
							try {
								return !!window.sessionStorage;
							} catch (e) {
								return true;
							}
						},
						isCanvasSupported : function() {
							var elem = document.createElement('canvas');
							return !!(elem.getContext && elem.getContext('2d'));
						},
						isIE : function() {
							if (navigator.appName === 'Microsoft Internet Explorer') {
								return true;
							} else if (navigator.appName === 'Netscape'
									&& /Trident/.test(navigator.userAgent)) {
								return true;
							}
							return false;
						},
						getPluginsString : function() {
							if (this.isIE() && this.ie_activex) {
								return this.getIEPluginsString();
							} else {
								return this.getRegularPluginsString();
							}
						},
						getRegularPluginsString : function() {
							return this.map(
									navigator.plugins,
									function(p) {
										var mimeTypes = this.map(
												p,
												function(mt) {
													return [ mt.type,
															mt.suffixes ]
															.join('~');
												}).join(',');
										return [ p.name, p.description,
												mimeTypes ].join('::');
									}, this).join(';');
						},
						getIEPluginsString : function() {
							if (window.ActiveXObject) {
								var names = [
										'ShockwaveFlash.ShockwaveFlash',
										'AcroPDF.PDF',
										'PDF.PdfCtrl',
										'QuickTime.QuickTime',
										'rmocx.RealPlayer G2 Control',
										'rmocx.RealPlayer G2 Control.1',
										'RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)',
										'RealVideo.RealVideo(tm) ActiveX Control (32-bit)',
										'RealPlayer', 'SWCtl.SWCtl',
										'WMPlayer.OCX', 'AgControl.AgControl',
										'Skype.Detection' ];
								return this.map(names, function(name) {
									try {
										new ActiveXObject(name);
										return name;
									} catch (e) {
										return null;
									}
								}).join(';');
							} else {
								return "";
							}
						},
						getScreenResolution : function() {
							var resolution;
							if (this.screen_orientation) {
								resolution = (screen.height > screen.width) ? [
										screen.height, screen.width ] : [
										screen.width, screen.height ];
							} else {
								resolution = [ screen.height, screen.width ];
							}
							return resolution;
						},
						getCanvasFingerprint : function() {
							var canvas = document.createElement('canvas');
							var ctx = canvas.getContext('2d');
							var txt = 'http://valve.github.io';
							ctx.textBaseline = "top";
							ctx.font = "14px 'Arial'";
							ctx.textBaseline = "alphabetic";
							ctx.fillStyle = "#f60";
							ctx.fillRect(125, 1, 62, 20);
							ctx.fillStyle = "#069";
							ctx.fillText(txt, 2, 15);
							ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
							ctx.fillText(txt, 4, 17);
							return canvas.toDataURL();
						}
					};
					return Fingerprint;
				});
window.addEvent('domready', cbg_tracer.init);