<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>藏宝阁数据分析系统</title>
<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700' rel='stylesheet' type='text/css'>
<link href="${pageContext.request.contextPath}/nifty/css/bootstrap.min.css" rel="stylesheet">
<link href="${pageContext.request.contextPath}/nifty/css/nifty.min.css" rel="stylesheet">
<link href="${pageContext.request.contextPath}/nifty/plugins/bootstrap-select/bootstrap-select.min.css" rel="stylesheet">
<link href="${pageContext.request.contextPath}/nifty/plugins/bootstrap-table/bootstrap-table.min.css" rel="stylesheet">
<link href="${pageContext.request.contextPath}/nifty/plugins/magic-check/css/magic-check.min.css" rel="stylesheet">
<link href="${pageContext.request.contextPath}/nifty/plugins/bootstrap-validator/bootstrapValidator.min.css" rel="stylesheet">
<link href="${pageContext.request.contextPath}/nifty/plugins/ionicons/css/ionicons.min.css" rel="stylesheet">
<link href="${pageContext.request.contextPath}/nifty/plugins/pace/pace.min.css" rel="stylesheet">
<script src="${pageContext.request.contextPath}/nifty/plugins/pace/pace.min.js"></script>
<script src="${pageContext.request.contextPath}/nifty/js/jquery-2.2.4.min.js"></script>
<script src="${pageContext.request.contextPath}/nifty/js/bootstrap.min.js"></script>
<script src="${pageContext.request.contextPath}/nifty/js/nifty.min.js"></script>
<script src="${pageContext.request.contextPath}/nifty/plugins/bootstrap-select/bootstrap-select.min.js"></script>
<script src="${pageContext.request.contextPath}/nifty/plugins/bootbox/bootbox.min.js"></script>
<script src="${pageContext.request.contextPath}/nifty/plugins/bootstrap-table/bootstrap-table.min.js"></script>
<script src="${pageContext.request.contextPath}/nifty/plugins/bootstrap-table/locale/bootstrap-table-zh-CN.min.js"></script>
<script src="${pageContext.request.contextPath}/nifty/plugins/bootstrap-validator/bootstrapValidator.min.js"></script>
<script src="${pageContext.request.contextPath}/nifty/plugins/masked-input/jquery.maskedinput.min.js"></script>

</head>
<body>
        <div class="modal-dialog">
            <div class="modal-content">
                <!--Modal body-->
                <form id="addGzTypeForm" method="post" class="form-horizontal">
                	<div class="modal-body">
						<div style="padding-top:5px;"></div>
						
						<div class="form-group">
		                    <label class="col-md-3 control-label">角色信息</label>
		                    <div class="col-md-9"><p class="form-control-static">${roleinfo}</p></div>
		                </div>
						<div class="form-group">
		                    <label class="col-md-3 control-label">当前比例</label>
		                    <div class="col-md-9"><p class="form-control-static">${mhb}W</p></div>
		                </div>
						<div class="form-group">
		                    <label class="col-md-3 control-label">人修花费</label>
		                    <div class="col-md-9"><p class="form-control-static">${expt}W   , ${exptR}元</p></div>
		                </div>
						<div class="form-group">
		                    <label class="col-md-3 control-label">宠修花费</label>
		                    <div class="col-md-9"><p class="form-control-static">${bbexpt}W   ,  ${bbexptR}元</p></div>
		                    <div class="text-thin">全吃修炼果，修炼果按照75w一个</div>
		                </div>
						<div class="form-group">
		                    <label class="col-md-3 control-label">师门技能花费</label>
		                    <div class="col-md-9"><p class="form-control-static">${skill}W   ,   ${skillR}元</p></div>
		                </div>
						<div class="form-group">
		                    <label class="col-md-3 control-label">生活技能花费</label>
		                    <div class="col-md-9"><p class="form-control-static">${shenghuo}W   ,   ${shenghuoR}元</p></div>
		                    <div class="text-thin">帮贡按照30元1000点</div>
		                </div>
		                <div class="form-group">
		                    <label class="col-md-3 control-label">总计花费</label>
		                    <div class="col-md-9"><p class="form-control-static">${shenghuo+expt+bbexpt+skill}W  ,   ${(shenghuoR+exptR+bbexptR+skillR)}元</p></div>
		                </div>
		                <div class="form-group">
		                    <label class="col-md-3 control-label">当前价格</label>
		                    <div class="col-md-9"><p class="form-control-static">${price}元</p></div>
		                </div>
	                </div>
				</form>
            </div>
         </div>
</body>
</html>



