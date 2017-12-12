$(window).on('load', function() {
	getLocation();
    //加载数据
	loadKwType();
	
});

//截取url参数
function getUrlParam(name,cbgurl) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = cbgurl.substr(1).match(reg);
    if (r != null)
    	return unescape(r[2]); 
    return null;
}

function oneRole(){
	var cbgurl = $("#onerole").val();
	
	var serverid = getUrlParam("serverid",cbgurl);
	if(serverid == null){
		serverid = getUrlParam("server_id",cbgurl);
		if(serverid == null){
			bootbox.alert('无效的地址！');
			return;
		}
	}
	var ordersn = getUrlParam("ordersn",cbgurl);
	if(ordersn == null){
		bootbox.alert('无效的地址！');
		return;
	}
	
	var mhb = $("#mhb").val();
	$("#quotesframe").attr("src","servlet/roleDetailServlet?mhb="+mhb+"&serverid="+serverid+"&ordersn="+ordersn);
	$("#addGzTypeModal").modal('show');
	
	
}

//获取用户地理位置
function getLocation(){
	if (navigator.geolocation){
	  navigator.geolocation.getCurrentPosition(showPosition,showError);
	 
	}else{
		alert("Geolocation is not supported by this browser.");
	}
}
function showError(error){ 
    switch(error.code) { 
        case error.PERMISSION_DENIED: 
            //alert("定位失败,用户拒绝请求地理定位"); 
            break; 
        case error.POSITION_UNAVAILABLE: 
            //alert("定位失败,位置信息是不可用"); 
            break; 
        case error.TIMEOUT: 
            //alert("定位失败,请求获取用户位置超时"); 
            break; 
        case error.UNKNOWN_ERROR: 
            //alert("定位失败,定位系统失效"); 
            break; 
    } 
}
function showPosition(position){
	 $("#Latitude").val(position.coords.latitude);
	 $("#Longitude").val(position.coords.longitude);
}

function loadKeyword(){
	$("#kwTb").bootstrapTable("refresh");
}

//获取表格数据
function loadKwType(){
	
	 $("#kwTb").bootstrapTable({
    	method: "post",  //使用get请求到服务器获取数据  
    	contentType : "application/x-www-form-urlencoded",
        url: "servlet/cbgServlet?field=id,nickname,price,xingjiabi,cbgurl,time_left,expt_total,bb_expt_total,full_life_skill_num,level,getTime,all_caiguo,area_name,server_name,cheng_jiu,qian_neng_guo,qian_yuan_dan,school,zhuang_zhi,bb_expt_fangyu,bb_expt_fashu,bb_expt_gongji,bb_expt_kangfa,expt_fangyu,expt_fashu,expt_gongji,expt_kangfa,expt_lieshu", //获取数据的Servlet地址   
        striped: true,  //表格显示条纹  
        queryParams: function queryParams(params) {   //设置查询参数
        	var queryparam = new Object();
        	queryparam.latitude = $("#Latitude").val();
        	queryparam.longitude = $("#Longitude").val();
        	queryparam.level = $("#levelmin").val()+","+$("#levelmax").val();
        	queryparam.price= $("#pricemin").val()+","+$("#pricemax").val();
        	queryparam.getTime= $("#starttime").val()+","+$("#endtime").val();
        	queryparam.expt_total= $("#expt").val()+",150";
        	queryparam. bb_expt_total= $("#bbexpt").val()+",100";
        	queryparam.school = $("#school").val();
        	queryparam.zhuanzhi = $("#zhuanzhi").val();
            var param = {
        		page: params.offset/params.limit+1,
        		rows: params.limit,
        		sort: params.sort,
                order:params.order,
                queryparam:queryparam,
            };
            return param;
        },
        pagination: true, //启动分页  
        pageSize: 10,  //每页显示的记录数  
        pageNumber:1, //当前第几页  
        pageList: [10, 20, 50, 100],  //记录数可选列表  
        search: false,  //是否启用查询  
        sortable: true,                     //是否启用排序
        showColumns: true,  //显示下拉框勾选要显示的列  
        showRefresh: true,  //显示刷新按钮  
        sidePagination: "server", //表示服务端请求  
		locale:'zh-CN',
        clickToSelect: true,    //是否启用点击选中行
        columns: [{
        	checkbox: true
        }, {
        	field:'id',
        	visible: false,
        },{
        	field: 'price',
        	title: '价格',
        	sortable : true,
        },  {
            field: 'xingjiabi',
            title: '性价比',
            sortable : true,
        },  {
            field: 'level',
            title: '等级',
            sortable : true,
        },  {
            field: 'school',
            title: '门派',
            sortable : true,
            formatter:schoolformat
        },{
        	field: 'zhuang_zhi',
        	title: '转职',
        	formatter: zhuanzhiformat,
        }/*,  {
            field: 'cheng_jiu',
            title: '成就',
            sortable : true,
        },  {
            field: 'qian_neng_guo',          row.bb_expt_gongji +","+row.bb_expt_fangyu +","+row.bb_expt_fashu +","+row.bb_expt_kangfa+","+row.bb_expt_total;
            title: '潜能果',
            sortable : true,
        }*/,  {
        	field: 'expt_gongji',
        	title: '攻修',
        	sortable : true,
        },  {
        	field: 'expt_fangyu',
        	title: '防修',
        	sortable : true,
        },  {
        	field: 'expt_fashu',
        	title: '法修',
        	sortable : true,
        },  {
        	field: 'expt_kangfa',
        	title: '抗法',
        	sortable : true,
        },  {
        	field: 'bb_expt_gongji',
        	title: '攻',
        	sortable : true,
        },  {
            field: 'bb_expt_fangyu',
            title: '防',
            sortable : true,
        },  {
            field: 'bb_expt_fashu',
            title: '法',
            sortable : true,
        },  {
            field: 'bb_expt_kangfa',
            title: '抗法',
            sortable : true,
        },  {
            field: 'expt_total',
            title: '总人修',
           // formatter: exptformatter,
            sortable : true,
        },  {
            field: 'bb_expt_total',
            title: '总宠修',
           // formatter: bbexptformatter,
            sortable : true,
        }, {
            field: 'full_life_skill_num',
            title: '生活技能满',
            sortable : true,
            visible: false,
        },{
            field: 'cbgurl',
            title: '链接',
            formatter: urlformat,
        },{
        	field: 'nickname',
        	title: '昵称',
        	align: 'center',
        	sortable : true,
        },{
        	field: 'server_name',
        	title: '区服',
        	formatter: serverformat,
        },{
        	field: 'getTime',
        	title: '获取时间',
        	sortable : true,
        },{
        	title: '操作',
        	formatter: operateFormatter,
        }],
        toolbar:"#dicToolbar",
        responseHandler: function(res) {
            return {
                "total": res.total,//总页数
                "rows": res.rows   //数据
             };
        },
        onSort:function(name,order){
        	$("#loadEffect").modal('show');
        },
        onLoadSuccess:function(data){
        	$("#loadEffect").modal('hide');
        },
    });
	 function operateFormatter(value, row) {
		 var id = row.id;
		 var div =  "<button onclick=\"getRoleInfo('"+id+"\');\" class=\"btn btn-danger\">详情</button>";
		 return div;
	 };
	 function urlformat(value, row) {
		 var div = "<a href='"+row.cbgurl+"' target='_blank' style='color:blue'>链接</a>";
		 return div;
	 };
	 function schoolformat(value, row){
		 var SchoolNameInfo={1:"大唐官府",2:"化生寺",3:"女儿村",4:"方寸山",5:"天宫",6:"普陀山",7:"龙宫",8:"五庄观",9:"狮驼岭",10:"魔王寨",11:"阴曹地府",12:"盘丝洞",13:"神木林",14:"凌波城",15:"无底洞"};
		 return SchoolNameInfo[row.school];
	 }
	 function serverformat(value, row){
		 return row.area_name +" "+row.server_name;
	 }
	 function zhuanzhiformat(value, row){
		 var ZhuanzhiInfo={0:"未飞升",1:"已飞升",2:"已渡劫"};
		 if(row.zhuang_zhi >=10){
			 return "化圣"+row.zhuang_zhi/10;
		 }else{
			 return ZhuanzhiInfo[row.zhuang_zhi];
		 }
	 }
	 function bbexptformatter(value, row){
		 return row.bb_expt_gongji +","+row.bb_expt_fangyu +","+row.bb_expt_fashu +","+row.bb_expt_kangfa+","+row.bb_expt_total;
	 }
	 function exptformatter(value, row){
		 return row.expt_gongji +","+row.expt_fangyu +","+row.expt_fashu +","+row.expt_kangfa+",猎"+row.expt_lieshu +","+row.expt_total;
	 }
	 
}


function getRoleInfo(id){
	var mhb = $("#mhb").val();
	$("#quotesframe").attr("src","servlet/roleDetailServlet?id="+id+"&mhb="+mhb);
	$("#addGzTypeModal").modal('show');
}

function iFrameHeight(){
	
	
    var ifm= document.getElementById("quotesframe"); 
    ifm.height=document.documentElement.clientHeight*0.5;
    ifm.width=document.documentElement.clientWidth;
}

function dashang(){
	$("#dashangTypeModal").modal('show');
}

