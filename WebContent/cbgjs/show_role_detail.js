var RoleInfoShow = new Class(
		{
			initialize : function(role_desc) {
				this.role_parser = new RoleInfoParser(
						$("equip_desc_value").value.trim(), {
							resUrl : window.ResUrl,
							serverId : window.ServerInfo.server_id,
							equipRequestTime : window.EquipRequestTime || '',
							serverCurrentTime : window.ServerCurrentTime || ''
						});
				this.last_tab = null;
				this.last_sub_tab = null;
				this.reg_tab_ev();
			},
			adjust_frame_height : function() {
				if (window.self != window.top) {
					window.reset_iframe && reset_iframe();
				}
			},
			reg_tab_ev : function() {
				var self_obj = this;
				$("role_basic").addEvent("click", function() {
					self_obj.show_basic();
					self_obj.adjust_frame_height();
				});
				$("role_skill").addEvent("click", function() {
					self_obj.show_skill();
					self_obj.adjust_frame_height();
				});
				$("role_equips").addEvent("click", function() {
					self_obj.show_equips();
					self_obj.adjust_frame_height();
				});
				$("role_pets").addEvent("click", function() {
					self_obj.show_pets();
					self_obj.adjust_frame_height();
				});
				$("role_riders").addEvent("click", function() {
					self_obj.show_riders();
					self_obj.adjust_frame_height();
				});
				$("role_clothes").addEvent("click", function() {
					self_obj.show_clothes();
					self_obj.adjust_frame_height();
				});
			},
			switch_tab : function(el) {
				if (this.last_tab) {
					this.last_tab.removeClass("on");
				}
				this.last_tab = el;
				el.addClass("on");
				$("RoleEquipTipsBox").setStyle("display", "none");
			},
			switch_sub_tab : function(el) {
				if (this.last_sub_tab) {
					this.last_sub_tab.removeClass("on");
				}
				el.addClass("on");
				this.last_sub_tab = el;
			},
			show_basic : function() {
				this.switch_tab($("role_basic"));
				var basic_data = this.role_parser.get_basic_data();
				render_to_replace("role_info_box", "role_basic_templ",
						basic_data);
				$("role_icon").src = basic_data["basic_info"]["icon"];
			},
			show_skill : function() {
				this.switch_tab($("role_skill"));
				render_to_replace("role_info_box", "role_skill_templ",
						this.role_parser.get_skill_data());
			},
			reg_equip_tips_ev : function(el_list) {
				var _this = this;
				var show_tips_box = function() {
					var el = $(this);
					var ctx = {
						"name" : el.getAttribute("data_equip_name"),
						"desc" : el.getAttribute("data_equip_desc"),
						"type_desc" : el.getAttribute("data_equip_type_desc")
					}
					if (!ctx.desc)
						return;
					render_to_replace("RoleEquipTipsBox",
							"role_equip_tips_templ", ctx);
					adjust_tips_position(el, $("RoleEquipTipsBox"));
					var lock_types = el.getAttribute("lock_types");
					if (lock_types) {
						_this.show_lock($("RoleEquipTipsBox").children[0],
								typeOf(lock_types) == 'string' ? lock_types
										.split(",") : lock_types, true);
					}
				};
				var hidden_tips_box = function() {
					$("RoleEquipTipsBox").setStyle("display", "none");
				};
				for (var i = 0; i < el_list.length; i++) {
					var el = el_list[i];
					el.addEvent("mouseover", show_tips_box);
					el.addEvent("mouseout", hidden_tips_box);
				}
			},
			show_lock : function(el, _lock_types, is_tips) {
				if (_lock_types == null || _lock_types.length < 1) {
					return;
				}
				var lock_types = [];
				for (var i = 0; i < _lock_types.length; i++) {
					var lock_type = _lock_types[i];
					if (lock_type == 8 || lock_type == 9) {
						lock_types.push(lock_type);
					}
				}
				if (lock_types.length < 1) {
					return;
				}
				if (!is_tips) {
					lock_types.sort();
					lock_types = [ lock_types[lock_types.length - 1] ];
				}
				var size = "14px";
				var padding = "0px";
				if (is_tips) {
					size = "28px";
					padding = "10px";
				}
				var div = document.createElement("div");
				div.style.position = "absolute";
				div.style.height = size;
				div.style.right = padding;
				div.style.top = padding;
				for (var i = 0; i < lock_types.length; i++) {
					var lock_type = lock_types[i];
					var e = document.createElement("img");
					e.src = "/images/time_lock_" + lock_type + ".png";
					e.style.height = "14px";
					e.style.width = "14px";
					div.appendChild(e);
				}
				var parentNode = el.parentNode;
				parentNode.appendChild(div);
				try {
					var currentStyle = window.getComputedStyle(parentNode)
				} catch (ex) {
					var currentStyle = parentNode.currentStyle;
				}
				if (currentStyle != undefined
						&& currentStyle.position !== "absolute") {
					parentNode.style.position = "relative";
				}
			},
			show_equips : function() {
				this.switch_tab($("role_equips"));
				var equips_data = this.role_parser.get_equips_data();
				render_to_replace("role_info_box", "role_equips_templ",
						equips_data);
				var using_equips = {};
				for (var i = 0; i < equips_data["using_equips"].length; i++) {
					var equip = equips_data["using_equips"][i];
					using_equips[equip["pos"]] = equip;
				}
				var using_pos_list = [ 1, 2, 3, 4, 5, 6, 187, 188, 189, 190 ];
				for (var i = 0; i < using_pos_list.length; i++) {
					var pos = using_pos_list[i];
					var el = $("role_using_equip_" + pos);
					var equip = using_equips[pos];
					if (equip) {
						el.setAttribute("data_equip_name", equip["name"]);
						el.setAttribute("data_equip_type", equip["type"]);
						el.setAttribute("data_equip_desc", equip["desc"]);
						el.setAttribute("data_equip_type_desc",
								equip["static_desc"]);
						el.src = equip["small_icon"];
						el.setAttribute("lock_types", equip["lock_type"]);
						this.show_lock(el, equip["lock_type"]);
					} else {
						el.destroy();
					}
				}
				for (var i = 0; i < equips_data["not_using_equips"].length; i++) {
					var equip = equips_data["not_using_equips"][i];
					var el = $("store_equip_tips" + (i + 1));
					el.setAttribute("lock_types", equip["lock_type"]);
					this.show_lock(el, equip["lock_type"]);
				}
				var fabao_data = this.role_parser.get_fabao_data();
				var using_fabao = fabao_data.using_fabaos;
				var el_using_fabao = $$("#RoleUsingFabao td");
				var show_index = 0;
				for (var i = 1; i <= 4; i++) {
					if (using_fabao[i]) {
						new Element(
								"img",
								{
									"styles" : {
										"width" : 50,
										"height" : 50
									},
									"align" : "middle",
									"data_equip_name" : using_fabao[i]["name"],
									"data_equip_type" : using_fabao[i]["type"],
									"data_equip_desc" : using_fabao[i]["desc"],
									"data_equip_type_desc" : using_fabao[i]["static_desc"],
									"src" : using_fabao[i]["icon"]
								}).inject(el_using_fabao[show_index++]);
					}
					el_using_fabao[i - 1].setStyle("background", "#c0b9dd");
				}
				this.reg_equip_tips_ev($$("#RoleUsingEquips img"));
				this.reg_equip_tips_ev($$("#RoleStoreEquips img"));
				this.reg_equip_tips_ev($$("#RoleUsingFabao img"));
				this.reg_equip_tips_ev($$("#RoleStoreFabao td"));
			},
			show_pet_detail : function(el, pet) {
				this.switch_sub_tab(el);
				render_to_replace("pet_detail_panel", "pet_detail_templ", {
					"pet" : pet
				});
				var el_list = $$("#RolePetEquips img, #RolePetShipin img");
				this.reg_equip_tips_ev(el_list);
				for (var i = 0; i < el_list.length; i++) {
					var el = el_list[i];
					this.show_lock(el, el.getAttribute("lock_types"));
				}
			},
			show_pets : function() {
				this.switch_tab($("role_pets"));
				var pet_data = this.role_parser.get_pet_data();
				render_to_replace("role_info_box", "role_pet_templ", pet_data);
				var that = this;
				var show_pet_detal = function() {
					var el = $(this);
					var idx = el.getAttribute("data_idx");
					that.show_pet_detail(el, pet_data["pet_info"][idx]);
				};
				var el_list = $$("#RolePets img");
				for (var i = 0; i < el_list.length; i++) {
					el_list[i].addEvent("click", show_pet_detal);
					var idx = el_list[i].getAttribute("data_idx");
					var pet = pet_data["pet_info"][idx];
					this.show_lock(el_list[i], pet["lock_type"]);
				}
				var show_child_detal = function() {
					var el = $(this);
					var idx = el.getAttribute("data_idx");
					that.show_pet_detail(el, pet_data["child_info"][idx]);
				};
				var el_list = $$("#RoleChilds img");
				for (var i = 0; i < el_list.length; i++) {
					el_list[i].addEvent("click", show_child_detal);
				}
				if (pet_data["pet_info"].length != 0) {
					$$("#RolePets img")[0].fireEvent("click");
				} else if (pet_data["child_info"].length != 0) {
					$$("#RoleChilds img")[0].fireEvent("click");
				}
			},
			show_rider_detail : function(el, rider) {
				this.switch_sub_tab(el);
				render_to_replace("rider_detail_panel", "rider_detail_templ", {
					"rider" : rider
				});
			},
			show_xiangrui_detail : function(el, xiangrui) {
				this.switch_sub_tab(el);
				render_to_replace("xiangrui_detail_panel",
						"xiangrui_detail_templ", {
							"xiangrui" : xiangrui
						});
			},
			show_riders : function() {
				this.switch_tab($("role_riders"));
				var rider_data = this.role_parser.get_rider_data();
				render_to_replace("role_info_box", "role_riders_templ",
						rider_data);
				var that = this;
				var show_rider_detail = function() {
					var el = $(this);
					var idx = el.getAttribute("data_idx");
					that.show_rider_detail(el, rider_data["rider_info"][idx]);
				};
				var el_list = $$("#RoleRiders img");
				for (var i = 0; i < el_list.length; i++) {
					el_list[i].addEvent("click", show_rider_detail);
				}
				if (rider_data["rider_info"].length > 0) {
					$$("#RoleRiders img")[0].fireEvent("click");
				}
			},
			show_clothes : function() {
				this.switch_tab($("role_clothes"));
				render_to_replace("role_info_box", "role_clothes_templ",
						this.role_parser.get_clothes_data());
			}
		});
function display_equip_tips(equip_info_id) {
	$(equip_info_id + "_panel").style.display = "block";
	if ($(equip_info_id + "_panel").displayed) {
		return;
	} else {
		$(equip_info_id + "_panel").displayed = true;
	}
	var content_height = $(equip_info_id + "_info").offsetHeight;
	if (content_height < 130) {
		content_height = 130;
	}
	$(equip_info_id + "_equip_layer1").style.height = content_height + 16
			+ "px";
	$(equip_info_id + "_equip_layer2").style.height = content_height + 10
			+ "px";
}
function hidden_equip_tips(equip_info_id) {
	$(equip_info_id + "_panel").style.display = "none";
}
function gen_skill_html(templ_id, skill_info) {
	var templ = new Template();
	var empty_skill_img = ResUrl + "/images/role_skills/empty_skill.gif";
	return templ.render(templ_id, {
		"skills" : skill_info,
		"empty_img" : empty_skill_img
	});
}
function get_summon_color_desc(value) {
	if (value == undefined) {
		return '未知';
	} else if (value == 1) {
		return '是';
	} else {
		return '否';
	}
}