<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>关注欢迎语</title>
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
							<label class="col-lg-3 control-label">公众帐号名称:</label>
							<div class="col-lg-7">
								<input type="text" class="form-control" name="accountname" id="accountname">
							</div>
						</div>
						<div class="form-group">
		                    <label class="col-md-3 control-label">1</label>
		                    <div class="col-md-9"><p class="form-control-static">${expt}W</p></div>
		                </div>
						<div class="form-group">
		                    <label class="col-md-3 control-label">2</label>
		                    <div class="col-md-9"><p class="form-control-static">${bbexpt}W</p></div>
		                </div>
						<div class="form-group">
		                    <label class="col-md-3 control-label">3</label>
		                    <div class="col-md-9"><p class="form-control-static">${skill}W</p></div>
		                </div>
	                </div>
				</form>
            </div>
         </div>
</body>
</html>



