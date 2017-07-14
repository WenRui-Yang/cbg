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


public class RoleDetailServlet extends HttpServlet{
	
	public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
		response.setCharacterEncoding("utf-8");
		String id = request.getParameter("id");
		if(StringUtil.isNotEmpty(id)){
			CbgRoleDao cbgdao = new CbgRoleDao();
			try {
				CbgEntity c = cbgdao.findById(id);
				if(c != null){
					PriceUtil priceUtil = new PriceUtil();
					if(StringUtil.isNotEmpty(request.getParameter("mhb"))){
						priceUtil.mhb = Integer.valueOf(request.getParameter("mhb"));
					}
					int expt = 0;
					expt += (priceUtil.getxiulian(c.getExpt_fangyu()));
					expt += (priceUtil.getxiulian(c.getExpt_kangfa()));
					
					expt += (priceUtil.getxiulian(c.getExpt_gongji()))*1.5;
					expt += (priceUtil.getxiulian(c.getExpt_fashu()))*1.5;
					expt += (priceUtil.getxiulian(c.getExpt_lieshu()))*1.5;
					int bbexpt = 0;
					bbexpt += priceUtil.getbbxiulian(c.getBb_expt_fangyu());
					bbexpt += priceUtil.getbbxiulian(c.getBb_expt_kangfa());
					bbexpt += priceUtil.getbbxiulian(c.getBb_expt_gongji());
					bbexpt += priceUtil.getbbxiulian(c.getBb_expt_fashu());
					int skill = 0;
					skill += priceUtil.getSkilla(c.getSchool_skill_1());
					skill += priceUtil.getSkilla(c.getSchool_skill_2());
					skill += priceUtil.getSkilla(c.getSchool_skill_3());
					skill += priceUtil.getSkilla(c.getSchool_skill_4());
					skill += priceUtil.getSkilla(c.getSchool_skill_5());
					skill += priceUtil.getSkilla(c.getSchool_skill_6());
					skill += priceUtil.getSkilla(c.getSchool_skill_7());
					
					int shenghuo = 0;
					
					shenghuo += priceUtil.getshenghuo(c.getSkill_qiang_shen());
					shenghuo += priceUtil.getshenghuo(c.getSkill_anqi());
					shenghuo += priceUtil.getshenghuo(c.getSkill_caifeng());
					shenghuo += priceUtil.getshenghuo(c.getSkill_cuiling());
					shenghuo += priceUtil.getshenghuo(c.getSkill_dazao());
					shenghuo += priceUtil.getshenghuo(c.getSkill_jianshen());
					shenghuo += priceUtil.getshenghuo(c.getSkill_lianjin());
					shenghuo += priceUtil.getshenghuo(c.getSkill_ming_xiang());
					shenghuo += priceUtil.getshenghuo(c.getSkill_pengren());
					shenghuo += priceUtil.getshenghuo(c.getSkill_qiaojiang());
					shenghuo += priceUtil.getshenghuo(c.getSkill_ronglian());
					shenghuo += priceUtil.getshenghuo(c.getSkill_taoli());
					shenghuo += priceUtil.getshenghuo(c.getSkill_yangsheng());
					shenghuo += priceUtil.getshenghuo(c.getSkill_zhongyao());
					shenghuo += priceUtil.getshenghuo(c.getSkill_zhuibu());
					shenghuo += priceUtil.getshenghuo(c.getSew_skill());
					shenghuo += priceUtil.getshenghuo(c.getSkill_lingshi());
					
					request.setAttribute("expt", expt);
					request.setAttribute("bbexpt", bbexpt);
					request.setAttribute("skill", skill);
					request.setAttribute("shenghuo", shenghuo);
				}
				
			} catch (Exception e) {
				e.printStackTrace();
			}
			
			cbgdao.closeConnection();
		}
		
		request.getRequestDispatcher("/roledetail.jsp").forward(request, response);
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }
    
}	
