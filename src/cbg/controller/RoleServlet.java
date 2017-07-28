package cbg.controller;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

import org.json.JSONException;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;

import cbg.HttpRequest;
import cbg.JSONParse;
import cbg.dao.CbgRoleDao;
import cbg.entity.CbgEntity;
import cbg.util.PriceUtil;
import cbg.util.StringUtil;


public class RoleServlet extends HttpServlet{
	public static int statck = 0;
	@Override
	public void init() throws ServletException {
		MyThread thread = new MyThread();
		// 使用另一个线程来执行该方法，会避免占用Tomcat的启动时间
	    new Thread(thread).start();
	}
	
	 public static void main(String[] args) {
		 	Calendar cal=Calendar.getInstance();
	        //System.out.println(Calendar.DATE);//5
	        cal.add(Calendar.DATE,-14);
	        java.util.Date time=cal.getTime();
	        System.out.println(new SimpleDateFormat("yyyy-MM-dd").format(time));
	  }

}
class MyThread implements Runnable {
	
	int norole = 0;
	int norole2 = 0;
	int getonhundered = 0; 
	int pageGlobal = 1;
	
	//程序等待时间
	int threadsleep = 2000;
	
	//表示栈的深度，无限递归调用会报错
	int statckdepth = 0;
	
	// Tomcat启动结束后执行
	@Override
	public void run() {
	    // 子线程需要做的事情
		try {
			for(;;){
				getRole(pageGlobal);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	 }
  
  
  public void getRole(int page){
	  try {
		  	CbgRoleDao cbgdao = new CbgRoleDao();
			String getUrl = "http://xyq.cbg.163.com/cgi-bin/xyq_overall_search.py";
			String param = "level_min=69&level_max=175&act=overall_search_role&page="+page;
			
			String s = HttpRequest.sendGet(getUrl, param);
			
			org.json.JSONObject cbgobj = JSONParse.getJSONObject(s);
			
			int status = 0;
			try {
				status = (int) cbgobj.get("status");
			} catch (JSONException e1) {
				e1.printStackTrace();
			}
			if(status == 2){
				try {
					Thread.sleep(10000);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
				getRole(1);
			}
			
			String pager = cbgobj.optString("pager");
			org.json.JSONObject pagerobj = JSONParse.getJSONObject(pager);
			
			org.json.JSONArray rolelist = cbgobj.optJSONArray("equip_list");
			
			
			boolean isnext = true;
			
			if(rolelist.length()<15){
				isnext = false;
			}else{
				//超过100页 重新请求
				if(pageGlobal >= 100){
					getonhundered++;
					pageGlobal =1;
				}
				isnext = true;
			}
			
			PriceUtil priceUtil = new PriceUtil();
			
			List<CbgEntity> list = new ArrayList<>();
			Gson gson = new Gson();
			for(int i = 0 ;i < rolelist.length();i++){
				CbgEntity cbgEntity = null;
				try {
					cbgEntity = gson.fromJson(rolelist.getString(i), CbgEntity.class);
					
				} catch (JsonSyntaxException e) {
					e.printStackTrace();
				} catch (JSONException e) {
					e.printStackTrace();
				}
				if(cbgEntity!=null){
					
					//设置获取时间
					Date date = new Date(new java.util.Date().getTime());
					//cbgEntity.setGetTime(getTimestamp(date));
					cbgEntity.setId(CbgRoleDao.getUUID());
					
					//设置链接
					String cbgurl = "http://xyq.cbg.163.com/cgi-bin/equipquery.py";
					cbgurl += "?act=overall_search_show_detail&serverid="+cbgEntity.getServerid();
					cbgurl += "&ordersn="+cbgEntity.getGame_ordersn();
					cbgurl += "&equip_refer=1&from=singlemessage&isappinstalled=0#collect_panel";
					cbgEntity.setCbgurl(cbgurl);
					
					//估算
					int xingjiabi = priceUtil.value(cbgEntity)/(Double.valueOf(cbgEntity.getPrice()).intValue());
					cbgEntity.setXingjiabi(xingjiabi);
					
					//去判断是否是重复角色  同一个大区 同一个roleid则更新就好
					/*String sql =" select * from cbg_role where ";
					sql+= " roleid =  '" +cbgEntity.getRoleid()+"'";
					sql+= " area_name =  '" +cbgEntity.getArea_name()+"'";
					sql+= " server_name =  '" +cbgEntity.getServer_name()+"'";*/
					
					Map<String,	 Object> queryparam = new HashMap<>();
					queryparam.put("roleid", cbgEntity.getRoleid());
					queryparam.put("area_name", cbgEntity.getArea_name());
					queryparam.put("server_name", cbgEntity.getServer_name());
					CbgEntity localCbgEntity = null;
					try {
						localCbgEntity = cbgdao.findByParam(queryparam);
					} catch (Exception e1) {
						// TODO Auto-generated catch block
						e1.printStackTrace();
					}
					
					//重复 则更新
					if(null != localCbgEntity && StringUtil.isNotEmpty(localCbgEntity.getRoleid())){
						//为了提升性能 可以做个判断 获取时间是否超过30分钟 超过了再去继续请求
						try {
							cbgdao.deleteCbgEntity(localCbgEntity);;
							cbgdao.save(cbgEntity);
						} catch (Exception e) {
							e.printStackTrace();
						}
					}else{
						try {
							cbgdao.save(cbgEntity);
						} catch (Exception e) {
							e.printStackTrace();
						}
						list.add(cbgEntity);
					}
					
				}
			}
			//commonService.batchSave(list);
			System.out.println("保存 "+list.size()+" 条信息,当前页:"+page);
			if(isnext){
				pageGlobal++;
				//当连续三次没有获取到新数据 从头获取
				if(list.size()==0){
					norole++;
					norole2++;
					if(norole >3 ){
						
						//取过100页数据之后再生效
						if(getonhundered>0 || norole2 >10){
							
							norole2 = 0;
							threadsleep = 8000;
							getonhundered=1;
							pageGlobal = 1;
							
						}
						norole = 0;
					}
				}else{
					norole = 0;
					norole2 = 0;
				}
				//过2秒再去请求
				try {
					Thread.sleep(threadsleep);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
				cbgdao.closeConnection();
			}
			
	  } catch (Exception e) {
			e.printStackTrace();
			try {
				Thread.sleep(20000);
			} catch (InterruptedException e1) {
				e1.printStackTrace();
			}
	  }
	}
}
	
