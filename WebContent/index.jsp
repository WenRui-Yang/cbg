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
			<div id="searchDiv" style="padding: 10px 0 0 10px;">
				等级:<input type="text" style="padding-bottom:6px;" id="levelmin" />至
					<input type="text" style="padding-bottom:6px;" id="levelmax" />
				价格:<input type="text" style="padding-bottom:6px;" id="pricemin" />至
					<input type="text" style="padding-bottom:6px;" id="pricemax" />
				人修总和:<input type="text" style="padding-bottom:6px;" id="expt" />
				宠修总和:<input type="text" style="padding-bottom:6px;" id="bbexpt" />
				<button class="btn btn-mint" onclick="loadKeyword();"><i class="ion-search"></i> 查询</button>
			</div>
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
	
	<!--addGzTypeModal-->
    <div class="modal fade" id="addGzTypeModal" role="dialog" tabindex="-1" aria-labelledby="addDicModal" aria-hidden="true">
    	<input id="optype" name="optype" type="hidden" >
        <div class="modal-dialog">
            <div class="modal-content">
                <!--Modal header-->
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><i class="pci-cross pci-circle"></i></button>
                    <h4 class="modal-title">详情</h4>
                </div>
                <!--Modal body-->
                <form id="addGzTypeForm" method="post" class="form-horizontal">
                	<div class="modal-body">
                		<div class="form-group">
							<!-- <label class="col-lg-3 control-label">关键字：</label>
							<div class="col-lg-7">
								<textarea rows="15" cols="80" class="form-control" name="rescontent" id="rescontent"></textarea>
							</div> -->
							<div style="overflow:hidden;clear:both;">
								<div style="float:left;width:100%;">
									<iframe name="quotesframe"  id="quotesframe" src="" marginwidth="0" marginheight="0" onLoad="iFrameHeight()";style="overflow: scroll !important; border: none; ">
				        			</iframe>
								</div>
							</div>
						</div>
	                </div>
	                <!--Modal footer-->
	                <div class="modal-footer">
	                    <button data-dismiss="modal" class="btn btn-default" type="button">确定</button>
	                    <!-- <button class="btn btn-primary">确定</button> -->
	                </div>
				</form>
            </div>
        </div>
    </div>
    <!--addDicTypeModal-->
    
    
    <style>
	.loadEffect{
    width: 100px;
    height: 100px;
    position: relative;
    margin: 0 auto;
    margin-top:100px;
 }
 .loadEffect span{
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: lightgreen;
    position: absolute;
    -webkit-animation: load 1.04s ease infinite;
 }
 @-webkit-keyframes load{
    0%{
       opacity: 1;
    }
    100%{
       opacity: 0.2;
    }
 }
 .loadEffect span:nth-child(1){
    left: 0;
    top: 50%;
    margin-top:-8px;
    -webkit-animation-delay:0.13s;
 }
 .loadEffect span:nth-child(2){
    left: 14px;
    top: 14px;
    -webkit-animation-delay:0.26s;
 }
 .loadEffect span:nth-child(3){
    left: 50%;
    top: 0;
    margin-left: -8px;
    -webkit-animation-delay:0.39s;
 }
 .loadEffect span:nth-child(4){
    top: 14px;
    right:14px;
    -webkit-animation-delay:0.52s;
 }
 .loadEffect span:nth-child(5){
    right: 0;
    top: 50%;
    margin-top:-8px;
    -webkit-animation-delay:0.65s;
 }
 .loadEffect span:nth-child(6){
    right: 14px;
    bottom:14px;
    -webkit-animation-delay:0.78s;
 }
 .loadEffect span:nth-child(7){
    bottom: 0;
    left: 50%;
    margin-left: -8px;
    -webkit-animation-delay:0.91s;
 }
 .loadEffect span:nth-child(8){
    bottom: 14px;
    left: 14px;
    -webkit-animation-delay:1.04s;
 }
</style>
    <div class="modal fade" id="loadEffect" role="dialog" tabindex="-1" aria-labelledby="loadEffect" aria-hidden="true">
        <div class="modal-dialog">
            	<div class="loadEffect" >
	  				 <span></span>
	 				 <span></span>
	 				 <span></span>
			  		 <span></span>
		    		 <span></span>
		     		 <span></span>
		    		 <span></span>
		     		 <span></span>
				</div>
            </div>
    </div>
</body>
</html>



