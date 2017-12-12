function show_recommd_equips() {
	if (QueryVar['recommend_type'] == 2 && CommonVar.page != 1) {
		show_recommd_equips_in_list();
		return true;
	}
	return false;
}
function show_recommd_equips_in_list() {
	try {
		var recommd_info = JSON.decode(RecommdInfo);
		var collect_equips = recommd_info['collect_equips'];
	} catch (e) {
		return;
	}
	if (!collect_equips) {
		return;
	}
	var arg = {
		'equips' : JSON.encode(collect_equips),
		'count' : 4,
		'serverid' : ServerInfo.server_id
	};
	var is_timeout = false;
	var show_equip_list = function() {
		$$('#soldList tbody').setStyle('display', '');
		is_timeout = true;
	}
	var callback = function(result, txt) {
		if (is_timeout || result.status !== 1) {
			show_equip_list();
			return;
		}
		var html = render('recommd_result_templ', {
			'equips' : result.equips
		});
		var tbody = $$('#soldList tbody')[0];
		tbody.innerHTML = html + tbody.innerHTML;
		tbody.setStyle('display', '');
		reg_tips_event();
	}
	var Ajax = new Request.JSONP({
		"url" : Recommd.url,
		"onSuccess" : callback,
		"onFailure" : show_equip_list
	});
	Ajax.send({
		'data' : arg
	});
	setTimeout(show_equip_list, 1000);
}
function get_equip_ico_url(equip) {
	var url = '';
	if (window.StorageStype && window.ResUrl && equip) {
		if (equip.storage_type != StorageStype["role"]) {
			var url = ResUrl + "/images/small/" + equip.equip_face_img;
		} else {
			var role_info = js_eval(lpc_2_js(equip.other_info.trim()));
			var icon = get_role_iconid(role_info["iIcon"]);
			var url = ResUrl + "/images/role_icon/small/" + icon + ".gif";
		}
	}
	return url;
}
function get_equip_ico_cls(equip) {
	var cls = {
		2 : 'guessItemSell',
		8 : 'guessItemAuction'
	};
	return equip ? (cls[equip.status] || '') : '';
}
function get_equip_detail_url(equip, equip_refer) {
	var detail_url = CgiRootUrl;
	if (equip && window.ServerInfo) {
		if (equip.server_id == parseInt(ServerInfo.server_id)) {
			detail_url += "/equipquery.py?act=buy_show_by_ordersn&ordersn="
					+ equip.game_ordersn + "&server_id=" + equip.server_id;
		} else if (is_user_login()) {
			detail_url += "/usertrade.py?act=show_cross_server_buy_detail&obj_equipid="
					+ equip.equipid + "&obj_serverid=" + equip.server_id;
		} else {
			detail_url += "/equipquery.py?act=overall_search_show_detail&serverid="
					+ equip.server_id + "&equip_id=" + equip.equipid;
		}
		if (equip_refer) {
			detail_url += '&equip_refer=' + equip_refer;
		}
	}
	return detail_url;
}
var RECOMMDS_FN_ID = new Date / 1;
function build_recommands(options) {
	options = Object.merge({
		title : '猜你喜欢',
		needShow : false,
		params : null,
		selector : null
	}, options || {});
	if (options.callback) {
		var fn = '_recommds_fn_' + RECOMMDS_FN_ID++;
		window[fn] = options.callback;
		options.callback = fn;
	}
	var html = [
			'<div ',
			'data_title="' + options.title + '" ',
			options.per ? 'data_per="' + options.per + '" ' : '',
			options.count ? 'data_count="' + options.count + '" ' : '',
			options.refer ? 'equip_refer="' + options.refer + '" ' : '',
			options.view_loc ? 'view_loc="' + options.view_loc + '" ' : '',
			options.new_request ? 'data_new_req="1" ' : '',
			options.cls ? 'class="recommandWrp ' + options.cls + '" '
					: 'class="recommandWrp" ',
			options.callback ? 'data_callback="' + options.callback + '" ' : '',
			'>',
			'<textarea style="display: none" class="params hidden">',
			options.params ? JSON.encode(options.params)
					: '{"act": "recommd_by_collects", "count": 12}',
			'</textarea>', options.needShow ? '<div class="show"></div>' : '',
			'</div>' ].join('');
	if (options.selector) {
		$$(options.selector).set('html', html);
	} else {
		document.write(html);
	}
	init_recommands();
}
var DOM_HAD_READY = false;
function init_recommands() {
	if (!DOM_HAD_READY) {
		return;
	}
	var $list = $$('.recommandWrp');
	if ($list.length < 1) {
		return;
	}
	$list.each(function($pt) {
		if ($pt.getAttribute('had_init')) {
			return;
		}
		requestAndInit($pt);
		$pt.setAttribute('had_init', 1);
	});
	function requestAndInit($pt) {
		if ($pt.getAttribute('loading')) {
			return;
		}
		var url = $pt.getAttribute('data_url') || window.Recommd && Recommd.url;
		if (!url) {
			return;
		}
		var count = +($pt.getAttribute('data_count') || 12);
		var page = +($pt.getAttribute('data_page') || 1);
		var params = ($pt.getElement('.params') || {
			value : $pt.getAttribute('data_params') || ''
		}).value.trim();
		try {
			params = JSON.decode(params);
		} catch (e) {
			params = {};
		}
		if (!$pt.getAttribute('data_params')) {
			$pt.setAttribute('data_params', JSON.encode(params));
		}
		var viewLoc = $pt.getAttribute('view_loc');
		if (viewLoc) {
			params.view_loc = viewLoc;
		}
		var callback = window[$pt.getAttribute('data_callback')] || function() {
		};
		$pt.setAttribute('loading', 1);
		new Request.JSONP({
			url : url,
			onSuccess : function(result) {
				$pt.erase('loading');
				$pt.setAttribute('data_page', page + 1);
				if (result.status !== 1
						|| (result.equips && result.equips.length <= 0)) {
					$pt.setAttribute('data_page', 1);
					callback(false, $pt, result);
					if (page > 1) {
						alert('没有更多的相似物品了');
					}
					return;
				}
				render($pt, result);
				callback(true, $pt, result);
			},
			onError : function() {
				$pt.erase('loading');
				callback(false, $pt);
			}
		})
				.send({
					data : Object
							.merge(
									{
										serverid : window.LoginInfo
												&& LoginInfo.serverid ? LoginInfo.serverid
												: window.ServerInfo
														&& ServerInfo.server_id ? ServerInfo.server_id
														: window.EquipInfo
																&& EquipInfo.server_id ? EquipInfo.server_id
																: -1,
										cross_server : 1,
										count : count,
										page : page
									}, params)
				});
	}
	function render($pt, result) {
		var $cnt = $pt.getElement('.show') || $pt;
		var template = new Template('recommands_list_template');
		$cnt.set('html', template.render({
			equips : result.equips,
			title : $pt.getAttribute('data_title'),
			per_page : +($pt.getAttribute('data_per') || 6),
			more_url : $pt.getAttribute('data_more'),
			more_url_text : $pt.getAttribute('data_more_text'),
			view_loc : $pt.getAttribute('view_loc'),
			equip_refer : $pt.getAttribute('equip_refer')
		}));
		$pt.setStyle('display', 'block');
		bindEvent($pt);
		$pt.removeAttribute('trace_init');
		window.cbg_tracer && cbg_tracer.trace_recommd_in_equip_detail_page($pt);
	}
	function bindEvent($pt) {
		var isNewRequest = !!$pt.getAttribute('data_new_req');
		var $cnt = $pt.getElement('.show') || $pt;
		var $list = $cnt.getElements('.guessList');
		var $change = $cnt.getElement('.change');
		var length = $list.length;
		if (isNewRequest) {
			$change.addEvent('click', function(e) {
				e.stop();
				requestAndInit($pt);
			});
		} else if (length > 1) {
			var index = 1;
			$change.addEvent('click', function(e) {
				e.stop();
				index++;
				if (index > length) {
					index = 1;
				}
				$list.setStyle('display', 'none');
				$list[index - 1].setStyle('display', 'block');
			});
		} else {
			$change.setStyle('display', 'none');
		}
		if (window.show_tips_box && window.hidden_tips_box) {
			$cnt.getElements('img').addEvent('mouseenter', show_tips_box)
					.addEvent('mouseleave', hidden_tips_box);
		}
	}
}
window.addEvent('load', function() {
	DOM_HAD_READY = true;
	init_recommands();
});