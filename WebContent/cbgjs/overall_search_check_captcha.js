var QueryStatus = {
	"success" : 0,
	"param_error" : 1,
	"need_captcha" : 2,
	"failed" : 3,
	"error" : 4
};
function update_ck_img() {
	var img = $("validate_img");
	img.src = CgiRootUrl
			+ "/create_validate_image.py?act=search_captcha&stamp="
			+ Math.random();
}
function hidden_layer() {
	$("pageCover").setStyle("display", "none");
	$("popupWin").setStyle("display", "none");
}
var is_ajax_check_captcha = false;
function check_captcha() {
	if (is_ajax_check_captcha) {
		alert("������֤���������֤�룬���Ժ�");
		return;
	}
	var captcha_value = $("captcha_value").value.trim();
	if (captcha_value.length == 0) {
		alert("��������ȷ����֤��");
		return;
	}
	var deal_result = function(result, txt) {
		is_ajax_check_captcha = false;
		if (result["status"] == QueryStatus["success"]) {
			hidden_layer();
			if (window.NextProc) {
				eval(window.NextProc);
			}
			return;
		} else {
			alert(result["msg"]);
			update_ck_img();
			return;
		}
	};
	var url = CgiRootUrl + '/equipquery.py';
	var Ajax = new Request.JSON({
		"url" : url,
		"onSuccess" : deal_result,
		"onFailure" : function() {
			is_ajax_check_captcha = false;
			alert("ϵͳ��æ�����Ժ�����");
			return;
		}
	});
	is_ajax_check_captcha = true;
	Ajax.post({
		"act" : "check_search_cpatcha",
		"captacha" : captcha_value
	});
}
function show_captcha_layer() {
	is_ajax_check_captcha = false;
	show_layer_center($("pageCover"), $("popupWin"));
	update_ck_img();
}