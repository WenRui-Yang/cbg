var DropSelectServer = new Class({
	initialize : function(area_el, server_el) {
		this.area_el = area_el;
		this.server_el = server_el;
		this.gen_area_box();
		this.gen_server_box();
		this.reg_event();
	},
	reset_value : function() {
		this.area_el.set('value', '');
		this.gen_server_box();
	},
	reg_event : function() {
		var __this = this;
		this.area_el.addEvent('change', function() {
			__this.gen_server_box();
		});
	},
	set_select_server : function(serverid) {
		serverid2areaid = {};
		for ( var areaid in server_data) {
			var server_list = server_data[areaid][1];
			for (server in server_list) {
				serverid2areaid[server_list[server][0]] = areaid;
			}
		}
		areaid = serverid2areaid[serverid];
		this.area_el.set('value', areaid);
		this.area_el.fireEvent('change');
		this.server_el.set('value', serverid);
	},
	gen_select_box : function(box_obj, box_data, selected_id) {
		box_obj.innerHTML = "";
		for (var i = 0; i < box_data.length; i++) {
			var item = box_data[i];
			var op = new Element("option", {
				"value" : item["value"],
				"text" : item["text"]
			});
			if (selected_id == item["value"]) {
				op.selected = true;
			}
			op.inject(box_obj);
		}
	},
	gen_area_box : function() {
		var area_list = [];
		for (areaid in server_data) {
			area_list.push({
				"id" : areaid,
				"name" : server_data[areaid][0][0],
				"pos" : server_data[areaid][0][1].toInt()
			})
		}
		area_list.sort(function(a, b) {
			return a["pos"] - b["pos"];
		});
		var box_data = [];
		box_data.push({
			'value' : '',
			'text' : '--��ѡ��--'
		});
		for (var i = 0; i < area_list.length; i++) {
			box_data.push({
				"value" : area_list[i]["id"],
				"text" : area_list[i]["name"]
			});
		}
		this.gen_select_box(this.area_el, box_data, "");
	},
	gen_server_box : function() {
		var area_id = this.area_el.value;
		if (!area_id) {
			var box_data = [];
			box_data.push({
				'value' : '',
				'text' : '--��ѡ��--'
			});
			this.gen_select_box(this.server_el, box_data, "");
			return;
		}
		var server_info = server_data[area_id][1];
		var server_list = [];
		for (var i = 0; i < server_info.length; i++) {
			var item = server_info[i];
			server_list.push({
				"id" : item[0],
				"name" : item[1],
				"pos" : item[2].toInt()
			});
		}
		server_list.sort(function(a, b) {
			return a["pos"] - b["pos"];
		});
		var box_data = [];
		for (var i = 0; i < server_list.length; i++) {
			box_data.push({
				"value" : server_list[i]["id"],
				"text" : server_list[i]["name"]
			});
		}
		this.gen_select_box(this.server_el, box_data, "");
	}
});