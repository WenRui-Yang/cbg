package cbg.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSONObject;
import com.google.gson.Gson;

import cbg.dao.CbgRoleDao;
import cbg.entity.CbgEntity;
import cbg.util.DataGrid;
import cbg.util.SortDirection;
import cbg.util.StringUtil;
import cbg.util.TagUtil;


public class CbgServlet extends HttpServlet{
	
	public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
		
		response.setCharacterEncoding("utf-8");
		DataGrid dg = new DataGrid();
		Gson gson = new Gson();
		
		String field = request.getParameter("field");
		dg.setField(field);
		
		Map<String,	 Object> queryparam = new HashMap<>();
		String s = request.getParameter("queryparam");
		if(request.getParameter("queryparam[level]").split(",").length == 2){
			queryparam.put("level", request.getParameter("queryparam[level]"));
		}
		if(request.getParameter("queryparam[price]").split(",").length == 2){
			queryparam.put("price", request.getParameter("queryparam[price]"));
		}
		if(request.getParameter("queryparam[expt_total]").split(",").length == 2 && StringUtil.isNotEmpty(request.getParameter("queryparam[expt_total]").split(",")[0])){
			queryparam.put("expt_total", request.getParameter("queryparam[expt_total]"));
		}
		if(request.getParameter("queryparam[bb_expt_total]").split(",").length == 2 && StringUtil.isNotEmpty(request.getParameter("queryparam[bb_expt_total]").split(",")[0]) ){
			queryparam.put("bb_expt_total", request.getParameter("queryparam[bb_expt_total]"));
		}
		
		String sort = request.getParameter("sort");
		dg.setSort(sort);
		String order = request.getParameter("order");
		if(StringUtil.isNotEmpty(order)){
			if(order.equals("asc")){
				dg.setOrder(SortDirection.asc);
			}else if(order.equals("desc")){
				dg.setOrder(SortDirection.desc);
			}
		}else{
			order ="asc";
		}
		
		int page = Integer.valueOf(request.getParameter("page"));
		dg.setPage(page);
		int rows = Integer.valueOf(request.getParameter("rows"));
		dg.setRows(rows);
		
		CbgRoleDao cbgdao = new CbgRoleDao();
		List<CbgEntity> list = new ArrayList<>();
		try {
			list = cbgdao.findListByParam(queryparam,sort,order,page,rows);
			dg.setResults(list);
			dg.setTotal(cbgdao.countByParam(queryparam));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		JSONObject object = TagUtil.getJson(dg);
		try {
			PrintWriter pw=response.getWriter();
			pw.write(URLDecoder.decode(object.toString(), "utf-8"));
			pw.flush();
		} catch (IOException e) {
			e.printStackTrace();
		}
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }
    
    public static void main(String[] args) {
	}
    

}	
