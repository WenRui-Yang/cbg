package cbg.controller;

import java.io.IOException;
import java.net.MalformedURLException;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

import org.json.JSONException;

import com.gargoylesoftware.htmlunit.BrowserVersion;
import com.gargoylesoftware.htmlunit.FailingHttpStatusCodeException;
import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.html.DomElement;
import com.gargoylesoftware.htmlunit.html.HtmlDivision;
import com.gargoylesoftware.htmlunit.html.HtmlElement;
import com.gargoylesoftware.htmlunit.html.HtmlInput;
import com.gargoylesoftware.htmlunit.html.HtmlPage;
import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;

import cbg.HttpRequest;
import cbg.JSONParse;
import cbg.dao.CbgRoleDao;
import cbg.entity.AllInfoEntity;
import cbg.entity.CbgEntity;
import cbg.entity.EquipEntity;
import cbg.util.PriceUtil;
import cbg.util.SendMailUtil;
import cbg.util.StringUtil;

public class RoleServlet extends HttpServlet {
	public static int statck = 0;
	
	@Override
	public void init() throws ServletException {
		MyThread thread = new MyThread();
		// 使用另一个线程来执行该方法，会避免占用Tomcat的启动时间
		new Thread(thread).start();
	}

	public static void main(String[] args) {
		Calendar cal = Calendar.getInstance();
		// System.out.println(Calendar.DATE);//5
		cal.add(Calendar.DATE, -14);
		java.util.Date time = cal.getTime();
		System.out.println(new SimpleDateFormat("yyyy-MM-dd").format(time));
	}

}

class MyThread implements Runnable {

	int norole = 0;
	int norole2 = 0;
	int getonhundered = 0;
	int pageGlobal = 1;

	// 程序等待时间
	int threadsleep = 2000;

	// 表示栈的深度，无限递归调用会报错
	int statckdepth = 0;
	
	public static  WebClient webClient = new WebClient(BrowserVersion.FIREFOX_24);

	// Tomcat启动结束后执行
	@Override
	public void run() {
		// 子线程需要做的事情
		try {
			for (;;) {
				getRole(pageGlobal);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void getRole(int page) {
		try {
			CbgRoleDao cbgdao = new CbgRoleDao();
			String getUrl = "http://xyq.cbg.163.com/cgi-bin/xyq_overall_search.py";
			String param = "level_min=69&level_max=175&act=overall_search_role&page="
					+ page;

			String s = HttpRequest.sendGet(getUrl, param);

			org.json.JSONObject cbgobj = JSONParse.getJSONObject(s);

			int status = 0;
			try {
				status = (int) cbgobj.get("status");
			} catch (JSONException e1) {
				e1.printStackTrace();
			}
			if (status == 2) {
				try {
					Thread.sleep(10000);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
				getRole(1);
			}

			// String pager = cbgobj.optString("pager");
			// org.json.JSONObject pagerobj = JSONParse.getJSONObject(pager);

			org.json.JSONArray rolelist = cbgobj.optJSONArray("equip_list");

			boolean isnext = true;

			if (null == rolelist) {
				return;
			}

			if (rolelist.length() < 15) {
				isnext = false;
			} else {
				// 超过100页 重新请求
				if (pageGlobal >= 100) {
					getonhundered++;
					pageGlobal = 1;
				}
				isnext = true;
			}

			

			List<CbgEntity> list = new ArrayList<>();
			Gson gson = new Gson();
			for (int i = 0; i < rolelist.length(); i++) {
				CbgEntity cbgEntity = null;
				try {
					cbgEntity = gson.fromJson(rolelist.getString(i),
							CbgEntity.class);

				} catch (JsonSyntaxException e) {
					e.printStackTrace();
				} catch (JSONException e) {
					e.printStackTrace();
				}
				if (cbgEntity != null) {

					// 设置获取时间
					Date date = new Date(new java.util.Date().getTime());
					// cbgEntity.setGetTime(getTimestamp(date));
					cbgEntity.setId(CbgRoleDao.getUUID());

					// 设置链接
					String cbgurl = "http://xyq.cbg.163.com/cgi-bin/equipquery.py";
					cbgurl += "?act=overall_search_show_detail&serverid="
							+ cbgEntity.getServerid();
					cbgurl += "&ordersn=" + cbgEntity.getGame_ordersn();
					cbgurl += "&equip_refer=1&from=singlemessage&isappinstalled=0#collect_panel";
					cbgEntity.setCbgurl(cbgurl);
					

					// 去判断是否是重复角色 同一个大区 同一个roleid则更新就好
					/*
					 * String sql =" select * from cbg_role where "; sql+=
					 * " roleid =  '" +cbgEntity.getRoleid()+"'"; sql+=
					 * " area_name =  '" +cbgEntity.getArea_name()+"'"; sql+=
					 * " server_name =  '" +cbgEntity.getServer_name()+"'";
					 */

					Map<String, Object> queryparam = new HashMap<>();
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

					// 重复 则更新
					if (null != localCbgEntity&& StringUtil.isNotEmpty(localCbgEntity.getRoleid())) {
						
						try {
							// 为了提升性能 可以做个判断 获取时间是否超过30分钟 超过了再去继续请求
							if(    date.getTime() - localCbgEntity.getGetTime().getTime() > 30*60*1000){
								cbgdao.deleteCbgEntity(localCbgEntity);
								
								cbgEntity = getxingjiabi(cbgEntity);
								cbgdao.save(cbgEntity);
							}
							
						} catch (Exception e) {
							e.printStackTrace();
						}
					} else {
						try {
							
							cbgEntity = getxingjiabi(cbgEntity);
							
							cbgdao.save(cbgEntity);
							
							//发邮件
							sendmail(cbgEntity);
						} catch (Exception e) {
							e.printStackTrace();
						}
						list.add(cbgEntity);
					}

				}
			}
			// commonService.batchSave(list);
			System.out.println("保存 " + list.size() + " 条信息,当前页:" + page);
			if (isnext) {
				pageGlobal++;
				// 当连续三次没有获取到新数据 从头获取
				if (list.size() == 0) {
					norole++;
					norole2++;
					if (norole > 3) {

						// 取过100页数据之后再生效
						if (getonhundered > 0 || norole2 > 10) {

							norole2 = 0;
							threadsleep = 8000;
							getonhundered = 1;
							pageGlobal = 1;

						}
						norole = 0;
					}
				} else {
					norole = 0;
					norole2 = 0;
				}
				// 过2秒再去请求
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

	private void sendmail(CbgEntity cbgEntity) {
		if (null != cbgEntity && cbgEntity.getLevel() == 109
				&& Double.valueOf(cbgEntity.getPrice()) < 1510
				&& cbgEntity.getXingjiabi() >= 2700
				&& Double.valueOf(cbgEntity.getPrice()) > 999
				&& cbgEntity.getSchool().equals(8)) {
			SendMailUtil se = new SendMailUtil();
			StringBuilder sb = new StringBuilder();

			sb.append(cbgEntity.getArea_name() + cbgEntity.getServer_name()
					+ "," + cbgEntity.getLevel() + ",价格:"
					+ cbgEntity.getPrice() + "元，性价比:"
					+ cbgEntity.getXingjiabi());
			sb.append("\n").append("人物总修：").append(cbgEntity.getExpt_total());
			sb.append("\n").append("宠物总修：")
					.append(cbgEntity.getBb_expt_total());
			// sb.append("\n").append("藏宝阁链接：").append(cbgEntity.getCbgurl());

			sb.append("\n").append(
					"<a href='" + cbgEntity.getCbgurl()
							+ "' target='_blank'>链接</a>");

			try {
				se.sendmail(String.valueOf(sb), "420693083@qq.com");
				se.sendmail(String.valueOf(sb), "1217007411@qq.com");
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}

	}

	/**
	 * 获取装备 宝宝等信息
	 * @param url
	 * @throws Exception
	 */
	public static AllInfoEntity getExtendInfo(String getUrl) {
		/*String getUrl = "http://xyq.cbg.163.com/cgi-bin/equipquery.py?act=overall_search_show_detail&serverid=681&ordersn=1217_1499823433_1218545911&equip_refer=1&from=singlemessage&isappinstalled=0#collect_panel";
		getUrl = "http://xyq.cbg.163.com/equip?s=40&eid=201704272300113-40-VCYV9UCVNLSIB&o&equip_refer=65";*/
		// 使用FireFox读取网页
		
		// htmlunit 对css和javascript的支持不好，所以请关闭之
		webClient.getOptions().setJavaScriptEnabled(false);
		webClient.getOptions().setCssEnabled(false);
		/*
		 * webClient.getOptions().setJavaScriptEnabled(true); //需要解析js
		 * webClient.getOptions().setThrowExceptionOnScriptError(false);
		 * //解析js出错时不抛异常
		 */

		HtmlPage pageContent = null;
		// webClient.waitForBackgroundJavaScript(20000); //等侍js脚本执行完成
		try {
			pageContent = webClient.getPage(getUrl);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		HtmlElement dom = (HtmlElement) pageContent
				.getElementById("equip_desc_value");// 全部信息
		//System.out.println(dom.asText());
		String allinfo = dom.asText();

		String infoobjstr = allinfo.trim().replace("([", "{")
				.replace(",])", "}").replace("])", "}").replace("({", "[")
				.replace(",})", "]").replace("})", "]");
		
		// 将正整数替换成字符串 对key为整形的数据进行处理
/*		Pattern pattern = Pattern.compile("[1-9]\\d*:");
		Matcher matcher = pattern.matcher(infoobjstr);
		while (matcher.find()) {
			infoobjstr = infoobjstr.replaceFirst(matcher.group(), "\""
					+ matcher.group().replace(":", "") + "\":");
		}*/

		//System.out.println(infoobjstr);

		Gson gson = new Gson();
		AllInfoEntity allInfoEntity = gson.fromJson(infoobjstr,AllInfoEntity.class);
		
		return allInfoEntity;
		

	}
	
	public CbgEntity getxingjiabi(CbgEntity cbgEntity){
		//获取装备宝宝的信息
		AllInfoEntity allInfoEntity = getExtendInfo(cbgEntity.getCbgurl());
		
		//记录装备宝宝的性价比
		int extendxingjiabi = 0;
		if(null != allInfoEntity){
			//先获取装备 包含道具栏物品
			Map<String, EquipEntity> allequip =  allInfoEntity.getAllEquip();
			
			int equiprmb = 0;
			for (Map.Entry<String, EquipEntity> entry : allequip.entrySet()) {  
				EquipEntity tmpEquipEntity = entry.getValue();
				RoleEquipPriceServlet roleEquipPriceServlet = new RoleEquipPriceServlet();
				equiprmb += roleEquipPriceServlet.getPriceUtil(tmpEquipEntity);
			}  
			
			extendxingjiabi = equiprmb / 1200;
		}
		
		PriceUtil priceUtil = new PriceUtil();
		
		// 估算空号的性价比
		int xingjiabi = priceUtil.value(cbgEntity) * 100
				/ (Double.valueOf(cbgEntity.getPrice()).intValue());
		
		cbgEntity.setXingjiabi(xingjiabi + extendxingjiabi);
		
		return cbgEntity;
	}
	

	public static void main(String[] args) {
		String s = "#r等级 60  #r魔法 +60 防御 +98#r耐久度 593#r锻炼等级 6  镶嵌宝石 月亮石#Y#r#c4DBAF4套装效果：变身术之混沌兽#Y#Y#r#G开运孔数：2孔/2孔#G#r符石: 体质 +1 灵力 +1.5#n#G#r符石: 魔力 +1 魔法 +6#n#r#cEE82EE符石组合: 望穿秋水#r门派条件：无#r部位条件：无#r提升自身3点灵力#Y";
		
		int begin = s.indexOf("防御 +");
		int end = s.indexOf("#",begin);
		System.out.println(s.substring(begin+4, end));
		
		begin = s.indexOf("锻炼等级 ");
		System.out.println(s.substring(begin+5, begin+7).trim());
		
		begin = s.indexOf("镶嵌宝石 ");
		end = s.indexOf("#",begin);
		System.out.println(s.substring(begin+5, end));
		
		begin = s.indexOf("套装效果：");
		end = s.indexOf("#",begin);
		System.out.println(s.substring(begin+5, end));
		
		begin = s.indexOf("特技：");
		end = s.indexOf("#",begin);
		System.out.println(s.substring(begin+3, end));
		
		begin = s.indexOf("特效：");
		end = s.indexOf("#",begin);
		System.out.println(s.substring(begin+3, end));
		
		begin = s.indexOf("开运孔数：");
		end = s.indexOf("#",begin);
		System.out.println(s.substring(begin+5, end));
	}
}
