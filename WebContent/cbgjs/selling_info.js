function create_selling_html() {
	return render("templ_selling_info", {
		"equip" : equip
	});
}
function reg_bargin_btn_event() {
	if (!equip["can_bargin"]) {
		return;
	}
	$("bargain_button").setProperty("tid", "web_share_2");
	if (IsLogin) {
		$("bargain_button").addEvent("click", function() {
			BargainPanel.show(null, 'equip_detail')
		});
	} else {
		$("bargain_button").addEvent("click", alert_login);
	}
}
function fix_roleid(roleid) {
	if (/^\-/.test(roleid)) {
		return roleid.split("-")[1];
	} else {
		return roleid;
	}
}