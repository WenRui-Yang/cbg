package cbg.controller;

import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.swing.text.StyledEditorKit.ForegroundAction;

import org.json.JSONException;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;

import cbg.HttpRequest;
import cbg.JSONParse;
import cbg.dao.CbgRoleDao;
import cbg.entity.CbgEntity;
import cbg.test.CbgDaoTest;
import cbg.util.PriceUtil;
import cbg.util.StringUtil;

/**
 * cbg核心控制器
 * @author yangwr
 *
 *获取逻辑  默认等待时间2秒
 *先去获取100页数据,取完100页之后再从第一页开始获取，当连续三次没有取到新数据，将程序的等待时间加一倍，再从第一页开始获取，
 *等待时间不超过30秒
 */
public class CbgController  {
	static int norole = 0;
	static int threadtime = 2000;
	//有没有获取100页
	static int getonhundered = 0;
	//设置程序暂停时间的加减状态
	boolean pausestatus = true;
	static CbgRoleDao cbgdao = new CbgRoleDao();
	
	
	/*public static void main(String[] args) {
		
		try {
			
			//getRole(1);
			cbgdao.closeConnection();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}*/
	
	public static void getRole(int page) throws Exception{
		
		String getUrl = "http://xyq.cbg.163.com/cgi-bin/xyq_overall_search.py";
		String param = "level_min=171&level_max=175&act=overall_search_role&page="+page;
		
		String s = HttpRequest.sendGet(getUrl, param);
		
		org.json.JSONObject cbgobj = JSONParse.getJSONObject(s);
		
		int status = (int) cbgobj.get("status");
		if(status == 2){
			System.out.println(cbgobj.get("msg"));
			return;
		}
		
		String pager = cbgobj.optString("pager");
		org.json.JSONObject pagerobj = JSONParse.getJSONObject(pager);
		
		/*num_begin = (int) pagerobj.get("num_begin");
		num_end =  (int) pagerobj.get("num_end");*/
		
		org.json.JSONArray rolelist = cbgobj.optJSONArray("equip_list");
		
		
		boolean isnext = true;
		
		
		
		if(rolelist.length()<15){
			isnext = false;
		}else{
			//超过100页 重新请求
			if(page >= 100){
				getonhundered++;
				page =1;
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
				CbgEntity localCbgEntity = cbgdao.findByParam(queryparam);
				
				//重复 则更新
				if(null != localCbgEntity && StringUtil.isNotEmpty(localCbgEntity.getRoleid())){
					//为了提升性能 可以做个判断 获取时间是否超过30分钟 超过了再去继续请求
					try {
						cbgdao.deleteCbgEntity(localCbgEntity);;
						cbgdao.save(cbgEntity);
					} catch (Exception e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}else{
					cbgdao.save(cbgEntity);
					list.add(cbgEntity);
				}
				
			}
		}
		//commonService.batchSave(list);
		
		System.out.println("保存 "+list.size()+" 条信息");
		
		if(isnext){
			page++;
			
			//当连续三次没有获取到新数据 从头获取
			if(list.size()==0){
				norole++;
				if(norole >3 ){
					norole = 0;
					//取过100页数据之后再生效
					if(getonhundered>0){
						/*if(threadtime>30000){
							threadtime= threadtime-2000;
						}else{
							threadtime = threadtime+2000;
						}*/
						page = 1;
					}
				}
			}
			
			//过10秒再去请求
			try {
				Thread.sleep(threadtime);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			getRole(page);
		}
		
	}
	
	public static void runOnce(int page,int rows) throws Exception{
		List<CbgEntity> localCbgRole = cbgdao.findListByParam(null, "", "", page, rows);
		PriceUtil priceUtil = new PriceUtil();
		int i = 0;
		for (CbgEntity cbgEntity : localCbgRole) {
				//if(cbgEntity.getXingjiabi() == 0){
				int xingjiabi = priceUtil.value(cbgEntity)/(Double.valueOf(cbgEntity.getPrice()).intValue());
				
				cbgdao.deleteCbgEntity(cbgEntity);;
				cbgEntity.setXingjiabi(xingjiabi);
				cbgdao.save(cbgEntity);
				System.out.println(page+"性价比计算"+(i++));
			//}
			
		}
		System.out.println("完成");
	}
	
	public static java.sql.Timestamp getTimestamp(Date date) {
    	return new java.sql.Timestamp(date.getTime());
    }
	
	static class MyThread implements Runnable {
		
		public int page = 1;
		public int rows = 1000;
		
		
		@Override
		public void run() {
		    // 子线程需要做的事情
			try {
				runOnce(page,rows);
			} catch (Exception e) {
				e.printStackTrace();
			}
		 }
		
		public static void main(String[] args) {
			
			for(int page =1;page <24;page++){
				MyThread my = new MyThread();
				my.page =page;
				my.rows =1000;
				new Thread(my).start();
			}
		}
	}
}
