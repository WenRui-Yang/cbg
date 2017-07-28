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
import cbg.util.PriceUtil;
import cbg.util.SortDirection;
import cbg.util.StringUtil;
import cbg.util.TagUtil;


public class PayServlet extends HttpServlet{
	
	public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
		response.setCharacterEncoding("utf-8");
		//判断用户扫码方式
		String userimformation = request.getHeader("user-agent");
		if(userimformation.contains("MicroMessenger")){
			response.sendRedirect("wxp://f2f09lwto_V1LUT8Ae9RzArJPSBuArd0vBls");
		}else if(userimformation.contains("AlipayClient")){
			response.sendRedirect("HTTPS://QR.ALIPAY.COM/FKX01732FPVZTJKYTYRB9F");
		}else{
			PrintWriter out = response.getWriter();
			out.print("Do not support the way！");
	        out.flush();
		}
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }
    
}	
