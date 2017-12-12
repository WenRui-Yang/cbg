var AreaRowNum = 9;
var ServerRowNum = 2;
var TableColNum = 7;
var SelectServer = new Class({
	initialize : function(select_server_func, hook_display_server_el) {
		this.last_area_el = null;
		this.last_server_el = null;
		this.default_serverid = null;
		this.default_areaid = null;
		this.select_server_func = select_server_func;
		this.hook_display_server_el = hook_display_server_el;
	},
	init_default_select : function() {
		if (getPara("area_id")) {
			this.default_areaid = getPara("area_id");
		} else if (Cookie.read("area_id")) {
			this.default_areaid = Cookie.read("area_id");
		} else {
			for ( var areaid in server_data) {
				this.default_areaid = areaid;
				break;
			}
		}
		if (getPara("server_id")) {
			this.default_serverid = getPara("server_id");
		} else if (Cookie.read("last_server_id")) {
			this.default_serverid = Cookie.read("last_server_id");
		} else {
			this.default_serverid = server_data[this.default_areaid][0][0];
		}
		var area_info = this.get_server_info(this.default_serverid);
		if (area_info && area_info["areaid"] != this.default_areaid) {
			this.default_serverid = server_data[this.default_areaid][0][0];
		}
	},
	get_server_info : function(serverid) {
		for ( var areaid in server_data) {
			var server_list = server_data[areaid][1];
			var info = null;
			for (var i = 0; i < server_list.length; i++) {
				if (server_list[i][0] == serverid) {
					info = {
						"serverid" : serverid,
						"server_name" : server_list[i][1]
					};
					break;
				}
			}
			if (info) {
				info["areaid"] = areaid;
				info["area_name"] = server_data[areaid][0][0];
				return info;
			}
		}
	},
	show_area_list : function() {
		render_to_replace("area_list_panel", "area_list_templ", {});
		var that = this;
		var show_server_list = function() {
			var td_box = $(this).getParent();
			if (that.last_area_el) {
				that.last_area_el.removeClass("on");
			}
			td_box.addClass("on");
			that.last_area_el = td_box;
			var area_id = $(this).getAttribute("data_areaid");
			that.show_server_list(area_id);
			return false;
		};
		for (area_id in server_data) {
			var area_name = server_data[area_id][0][0];
			var position = server_data[area_id][0][1].split("_");
			var el_id = parseInt((position[1] - 1) * TableColNum)
					+ parseInt(position[0]);
			var el = $("area_pos_" + el_id);
			var a_el = $("area_pos_" + el_id + "_a");
			a_el.innerHTML = area_name;
			a_el.setAttribute("data_areaid", area_id);
			if (this.default_areaid == area_id) {
				el.addClass("on");
				this.last_area_el = el;
			}
		}
		var el_list = $$("#area_list_panel a");
		for (var i = 0; i < el_list.length; i++) {
			var el = el_list[i];
			if (!el.getAttribute("data_areaid")) {
				el.getParent().innerHTML = "&nbsp;";
			} else {
				el.addEvent("click", show_server_list);
			}
		}
	},
	show_server_list : function(area_id) {
		render_to_replace("server_list_panel", "server_list_templ", {});
		var that = this;
		var select_server = function() {
			var el = $(this);
			if (that.select_server_func) {
				var arg = {
					"area_id" : el.getAttribute("data_areaid"),
					"area_name" : el.getAttribute("data_area_name"),
					"server_id" : el.getAttribute("data_serverid"),
					"server_name" : el.getAttribute("data_server_name")
				}
				that.select_server_func(arg);
				return false;
			} else {
				var area_info = that.get_server_info(el
						.getAttribute("data_serverid"));
				var arg = {
					"act" : "show_login",
					"area_id" : el.getAttribute("data_areaid"),
					"area_name" : el.getAttribute("data_area_name"),
					"server_id" : el.getAttribute("data_serverid"),
					"server_name" : el.getAttribute("data_server_name")
				}
				Cookie.write("area_id", area_id, {
					"duration" : 30
				})
				var url = HttpsCgiRootUrl + "/show_login.py?"
						+ Object.toQueryString(arg);
				window.location.href = url;
				return false;
			}
		};
		var server_list = server_data[area_id][1];
		for (var i = 0; i < server_list.length; i++) {
			var server = server_list[i];
			var el = $("server_pos_" + (i + 1));
			var a_el = $("server_pos_" + (i + 1) + "_a");
			a_el.innerHTML = server[1];
			a_el.setAttribute("data_serverid", server[0]);
			a_el.setAttribute("data_server_name", server[1]);
			a_el.setAttribute("data_area_name", server_data[area_id][0][0]);
			a_el.setAttribute("data_areaid", area_id);
			if (this.default_serverid == server[0]) {
				el.addClass("on");
				this.last_server_el = el;
			}
			if (this.hook_display_server_el) {
				this.hook_display_server_el(a_el, server[0]);
			}
		}
		var el_list = $$("#server_list_panel a");
		for (var i = 0; i < el_list.length; i++) {
			var el = el_list[i];
			if (!el.getAttribute("data_serverid")) {
				el.getParent().innerHTML = "&nbsp;";
			} else {
				el.addEvent("click", select_server);
			}
		}
	},
	show : function() {
		this.init_default_select();
		this.show_area_list();
		this.show_server_list(this.default_areaid);
	}
});