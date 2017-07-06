<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>关注欢迎语</title>
<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700' rel='stylesheet' type='text/css'>
<link href="nifty/css/bootstrap.min.css" rel="stylesheet">
<link href="nifty/css/nifty.min.css" rel="stylesheet">
<link href="nifty/plugins/bootstrap-select/bootstrap-select.min.css" rel="stylesheet">
<link href="nifty/plugins/bootstrap-table/bootstrap-table.min.css" rel="stylesheet">
<link href="nifty/plugins/magic-check/css/magic-check.min.css" rel="stylesheet">
<link href="nifty/plugins/bootstrap-validator/bootstrapValidator.min.css" rel="stylesheet">
<link href="nifty/plugins/ionicons/css/ionicons.min.css" rel="stylesheet">
<link href="nifty/plugins/pace/pace.min.css" rel="stylesheet">
<script src="nifty/plugins/pace/pace.min.js"></script>
<script src="nifty/js/jquery-2.2.4.min.js"></script>
<script src="nifty/js/bootstrap.min.js"></script>
<script src="nifty/js/nifty.min.js"></script>
<script src="nifty/plugins/bootstrap-select/bootstrap-select.min.js"></script>
<script src="nifty/plugins/bootbox/bootbox.min.js"></script>
<script src="nifty/plugins/bootstrap-table/bootstrap-table.min.js"></script>
<script src="nifty/plugins/bootstrap-table/locale/bootstrap-table-zh-CN.min.js"></script>
<script src="nifty/plugins/bootstrap-validator/bootstrapValidator.min.js"></script>
<script src="nifty/plugins/masked-input/jquery.maskedinput.min.js"></script>
<script src="js/cbg.js"></script> 

</head>
<body>
	<!--Page Title-->
	<div id="page-title">
		<h1 class="page-header text-overflow">关注欢迎语</h1>
	</div>
	<!--End page title-->

	<!--Breadcrumb-->
	<ol class="breadcrumb">
		<li><a href="#">首页</a></li>
		<li>基础设置</li>
		<li class="active">未识别回复语</li>
	</ol>
	<!--End breadcrumb-->

	<!--Page content-->
	<div id="page-content">
			
		<div class="panel">
			<div id="dicToolbar" class="table-toolbar-left">
				<div style="float:left;margin-left:10px;">
					<button onclick="searchReset();" class="btn btn-mint"><i class="ion-loop"></i> 重置</button>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				</div>
			</div>
			<div class="panel-body">
				<table class="demo-add-niftycheck" id="kwTb">
				</table>
			</div>
		</div>
	</div>
	<!--End page content-->
</body>
</html>



