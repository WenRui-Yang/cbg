$(window).on('load', function() {
    //加载数据
	loadKwType();
});

function loadKeyword(){
	$("#kwTb").bootstrapTable("refresh");
}

//获取表格数据
function loadKwType(){
	
	 $("#kwTb").bootstrapTable({
    	method: "post",  //使用get请求到服务器获取数据  
    	contentType : "application/x-www-form-urlencoded",
        url: "servlet/cbgServlet?field=id,nickname,price,xingjiabi,cbgurl,server_name,time_left,expt_total,bb_expt_total,full_life_skill_num,level,getTime", //获取数据的Servlet地址   
        striped: true,  //表格显示条纹  
        queryParams: function queryParams(params) {   //设置查询参数
            var param = {
        		page: params.offset/params.limit+1,
        		rows: params.limit,
        		sort: params.sort,
                order:params.order,
            };
            return param;
        },
        pagination: true, //启动分页  
        pageSize: 10,  //每页显示的记录数  
        pageNumber:1, //当前第几页  
        pageList: [5, 10, 15, 20, 25],  //记录数可选列表  
        search: true,  //是否启用查询  
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
            field: 'expt_total',
            title: '人修总和',
            sortable : true,
        },  {
            field: 'bb_expt_total',
            title: '宝宝修总和',
            sortable : true,
        }, {
            field: 'full_life_skill_num',
            title: '生活技能满个数',
            sortable : true,
        }, {
            field: 'bb_expt_total',
            title: '宝宝修总和',
            sortable : true,
        },{
            field: 'cbgurl',
            title: '链接',
            formatter: urlformat,
        },{
        	field: 'nickname',
        	title: '昵称',
        	align: 'center',
        	sortable : true,
        }],
        toolbar:"#dicToolbar",
        responseHandler: function(res) {
            return {
                "total": res.total,//总页数
                "rows": res.rows   //数据
             };
        },
    });
	 function operateFormatter(value, row) {
		 var id = row.id;
		 var div =  "<button onclick=\"delKeyword('"+id+"\');\" class=\"btn btn-danger\">删除</button>";
		 div +=  "&nbsp;<button onclick=\"responseMessage('"+id+"\');\" class=\"btn btn-mint\">快捷回复</button>";
		 return div;
	 };
	 function urlformat(value, row) {
		 var div = "<a href='"+row.cbgurl+"' target='_blank' >链接</a>";
		 return div;
	 };
	 
}

