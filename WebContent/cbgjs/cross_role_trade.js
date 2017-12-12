var CrossRoleTradeOperator = new Class({
	initialize : function(options) {
		options = Object.merge({
			btnId : 'btn_buy',
			buyText : '下单购买',
			loginText : '登录购买'
		}, options || {});
		var btn = $(options.btnId);
		var self = this;
		if (!equip["is_selling"]) {
			btn.setStyle("display", "none");
			return;
		}
		if (LoginInfo && LoginInfo.login) {
			btn.addEvent("click", function() {
				var buy_hook = btn.getAttribute("data_buy_hook");
				if (buy_hook) {
					if (!eval(buy_hook + "()")) {
						return false;
					}
				}
				var serverid = LoginInfo["server_id"];
				if (!serverid) {
					serverid = LoginInfo["serverid"];
				}
				window.location.href = self.get_add_order_url(serverid);
				return false;
			});
			this.set_button_txt(btn, options.buyText);
		} else {
			btn.addEvent("click", function() {
				self.show_popup_select_server_box();
				return false;
			});
			this.set_button_txt(btn, options.loginText);
		}
	},
	set_button_txt : function(btn, btn_txt) {
		btn.set("value", btn_txt);
	},
	get_add_order_url : function(login_serverid) {
		var equip_refer = getPara('equip_refer')
		if (login_serverid == equip["server_id"]) {
			return CgiRootUrl + "/usertrade.py?act=buy&equipid="
					+ equip["equipid"] + "&safe_code=" + SafeCode
					+ "&device_id=" + get_fingerprint() + "&equip_refer="
					+ equip_refer;
		} else {
			var arg = {
				"obj_serverid" : equip["server_id"],
				"obj_equipid" : equip["equipid"],
				"device_id" : get_fingerprint(),
				"equip_refer" : equip_refer,
				"act" : "add_cross_buy_role_order"
			};
			return CgiRootUrl + "/usertrade.py?" + Object.toQueryString(arg);
		}
	},
	chose_server : function(args) {
		var equip_refer = getPara('equip_refer')
		if (args["server_id"] == equip["server_id"]) {
			var arg = {
				"serverid" : equip["server_id"],
				"ordersn" : equip["game_ordersn"],
				"equip_refer" : equip_refer,
				"act" : "buy_show_by_ordersn"
			};
		} else {
			var arg = {
				"serverid" : equip["server_id"],
				"equip_id" : equip["equipid"],
				"equip_refer" : equip_refer,
				"act" : "overall_search_show_detail"
			};
		}
		var equip_detail_url = CgiRootUrl + "/equipquery.py?"
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
	show_popup_select_server_box : function() {
		var tmpl = [ '<div class="blockCont">',
				'<div id="area_list_panel"></div>',
				'<div class="blank12"></div>',
				'<div id="server_list_panel"></div>',
				'<div class="serverTips" id="not_allow_buy_tips">',
				'请选择任意有角色的服务器登录购买', '</div>', '</div>' ].join('');
		this.dialog = new PopupDialog("选择服务器", tmpl);
		var self = this;
		var chose_server = function(args) {
			self.chose_server(args);
		};
		var obj = new SelectServer(chose_server, null);
		obj.show();
		this.dialog.show();
	}
});