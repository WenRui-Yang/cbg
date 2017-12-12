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

import cbg.dao.BaseDAO;
import cbg.dao.CbgRoleDao;
import cbg.dao.UserinfoDao;
import cbg.entity.CbgEntity;
import cbg.entity.UserEntity;
import cbg.util.DataGrid;
import cbg.util.LocationUtil;
import cbg.util.SortDirection;
import cbg.util.StringUtil;
import cbg.util.SystemUtils;
import cbg.util.TagUtil;


public class CbgServlet extends HttpServlet{
	
	public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
		
		//收集用户信息
		String latitude = request.getParameter("queryparam[latitude]");
    	String longitude = request.getParameter("queryparam[longitude]");
		getuserinfo(request,latitude,longitude);
		
		response.setCharacterEncoding("utf-8");
		DataGrid dg = new DataGrid();
		Gson gson = new Gson();
		
		String field = request.getParameter("field");
		dg.setField(field);
		
		Map<String,	 Object> queryparam = new HashMap<>();
		String s = request.getParameter("queryparam");
		if(StringUtil.isNotEmpty(request.getParameter("queryparam[getTime]"))&&request.getParameter("queryparam[getTime]").split(",").length == 2){
			queryparam.put("getTime", request.getParameter("queryparam[getTime]"));
		}
		if(StringUtil.isNotEmpty(request.getParameter("queryparam[level]"))&&request.getParameter("queryparam[level]").split(",").length == 2){
			queryparam.put("level", request.getParameter("queryparam[level]"));
		}
		if(StringUtil.isNotEmpty(request.getParameter("queryparam[price]"))&&request.getParameter("queryparam[price]").split(",").length == 2){
			queryparam.put("price", request.getParameter("queryparam[price]"));
		}
		if(StringUtil.isNotEmpty(request.getParameter("queryparam[expt_total]"))&&request.getParameter("queryparam[expt_total]").split(",").length == 2 && StringUtil.isNotEmpty(request.getParameter("queryparam[expt_total]").split(",")[0])){
			queryparam.put("expt_total", request.getParameter("queryparam[expt_total]"));
		}
		if(StringUtil.isNotEmpty(request.getParameter("queryparam[bb_expt_total]"))&&request.getParameter("queryparam[bb_expt_total]").split(",").length == 2 && StringUtil.isNotEmpty(request.getParameter("queryparam[bb_expt_total]").split(",")[0]) ){
			queryparam.put("bb_expt_total", request.getParameter("queryparam[bb_expt_total]"));
		}
		if(StringUtil.isNotEmpty(request.getParameter("queryparam[school]")) && StringUtil.isNumeric(request.getParameter("queryparam[school]"))){
			queryparam.put("school", request.getParameter("queryparam[school]"));
		}
		if(StringUtil.isNotEmpty(request.getParameter("queryparam[zhuanzhi]")) &&StringUtil.isNumeric(request.getParameter("queryparam[zhuanzhi]"))){
			queryparam.put("zhuang_zhi", request.getParameter("queryparam[zhuanzhi]"));
		}
		
		String sort = request.getParameter("sort");
		String order = request.getParameter("order");
		if(StringUtil.isEmpty(sort)){
			dg.setSort("getTime");
			sort = "getTime";
			order = "desc";
		}else{
			dg.setSort(sort);
		}
		
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
			//level建立了索引 根据这个能快一些
			dg.setTotal(cbgdao.countByParam(queryparam,"level"));
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
    
    public void getuserinfo(HttpServletRequest request, String latitude, String longitude){
    	SystemUtils s = new SystemUtils();
    	
    	String ipAddr = s.getIpAddr(request);
    	UserEntity u = new UserEntity();
    	u.setLatitude(latitude);
    	u.setLongitude(longitude);
    	
    	
    	if(StringUtil.isNotEmpty(latitude) && StringUtil.isNotEmpty(longitude)){
			String location = LocationUtil.getLocation(longitude,latitude, LocationUtil.THE_WAY);
			u.setLocation(location);
    	}
    	u.setId(CbgRoleDao.getUUID());
    	u.setBrowser(request.getHeader("User-agent"));
    	u.setHostName(request.getRemoteHost());
    	u.setIpAddr(ipAddr);
    	u.setSystemInfo(s.getRequestSystemInfo(request));
    	
    	UserinfoDao userdao = new UserinfoDao();
    	try {
    		userdao.save(u);
    		userdao.closeConnection();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }
    
    public static void main(String[] args) {
	}
    

}	
