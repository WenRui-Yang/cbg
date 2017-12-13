package cbg.controller;

import java.util.Map;

import org.json.JSONArray;
import org.json.JSONException;

import cbg.HttpRequest;
import cbg.JSONParse;
import cbg.entity.CbgEntity;
import cbg.entity.EquipEntity;
import cbg.util.StringUtil;

/**
 * 人物装备的价格计算
 * 这里只能调用全服的查找接口
 * 若查出来的数据全是最低价格300，
 * 
 * (以后完善)
 * 暂时考虑找一个具有代表性的服务器再去查询一次 得到一个平均价格
 * 
 * 
 * @author SEELE
 *
 */
public class RoleEquipPriceServlet {
	
	
	//分为三种 分别是 人物装备 灵饰 宝宝装备
	public static int getPriceUtil(EquipEntity equipEntity){
		Map<String,String> map = ParamUtil.getEquipType(equipEntity.getiType());
		int price = 0;
		String type = map.get("type");
		if(type.equals("人物装备")){
			price = getrolezhuangbei(equipEntity,map.get("kind"));
		}else if(type.equals("宝宝装备")){
			
		}else if(type.equals("灵饰")){
			
		}
		
		return price ;
	}
	
	public static int getrolezhuangbei(EquipEntity equipEntity,String kind){
		
		String getUrl = "http://xyq-ios2.cbg.163.com/app2-cgi-bin//app_search.py";

		StringBuffer param = new StringBuffer("act=super_query&search_type=overall_equip_search");
		param.append("&serverid=527&page=1&app_type=xyq");
		param.append("&kindid=").append(kind);
		param.append("&order_by=").append("price%20DESC");//按价格从低到高排序
		
		//一些公共属性
		String cDesc  = equipEntity.getcDesc();
				
		int begin = cDesc.indexOf("等级 ");
		int end = cDesc.indexOf("  ",begin);
		String level = cDesc.substring(begin+2, end).trim();
		if(Integer.valueOf(level) >= 60){
			param.append("&level=").append(cDesc.substring(begin+2, end).trim());
			param.append("&level_min=").append(level);
			param.append("&level_max=").append(level);
		}
		
		begin = cDesc.indexOf("锻炼等级 ");
		if(begin != -1){
			param.append("&gem_level=").append(cDesc.substring(begin+5, begin+7).trim());
		}
		
		begin = cDesc.indexOf("镶嵌宝石 ");
		end = cDesc.indexOf("#",begin);
		if(begin != -1){
			String tmpstr = cDesc.substring(begin+5, end);
			param.append("&gem_value=").append(ParamUtil.getbaoshiNumber(tmpstr));
		}
		
		begin = cDesc.indexOf("特技：#c4DBAF4");
		end = cDesc.indexOf("#",begin);
		if(begin != -1){
			String tmpstr = cDesc.substring(begin+3, end);
			param.append("&special_skill=").append(ParamUtil.gettejiNumber(tmpstr));
		}
		
		begin = cDesc.indexOf("特效：");
		end = cDesc.indexOf("#",begin);
		if(begin != -1){
			String tmpstr = cDesc.substring(begin+3, end);
			param.append("&special_effect=").append(ParamUtil.gettexiaoNumber(tmpstr));
		}
		
		begin = cDesc.indexOf("开运孔数：");
		end = cDesc.indexOf("孔",begin);
		
		if(begin != -1){
			String tmpstr = cDesc.substring(begin+5, end);
			param.append("&hole_num=").append(tmpstr);
		}
		
		begin = cDesc.indexOf("修理失败 ");
		end = cDesc.indexOf("#",begin);
		
		if(begin != -1){
			String tmpstr = cDesc.substring(begin+5, end-1);
			try {
				param.append("&repair_fail=").append(Integer.valueOf(tmpstr));
			} catch (Exception e) {
				System.out.println("修理次数获取失败！");
			}
		}
		
		begin = cDesc.indexOf("套装效果：");
		end = cDesc.indexOf("#",begin);
		if(begin != -1){
			String tmpstr = cDesc.substring(begin+5, end);
			//根据套装效果名称找到对应的类型
			param.append("&special_skill=").append(ParamUtil.gettaozhuangNumber(tmpstr));
		}
		
		
		
		
		switch (kind) {
		//熔炼效果呢？
		case "17":
		case "58":
			begin = cDesc.indexOf("防御 +");
			end = cDesc.indexOf(" ",begin);
			param.append("&init_defense=").append(cDesc.substring(begin+4, end));
			break;
		case "18":
		case "59":
			
			begin = cDesc.indexOf("防御 +");
			end = cDesc.indexOf(" ",begin);
			param.append("&init_defense=").append(cDesc.substring(begin+4, end));
			
			//双加计算
			param = attrjisuan(cDesc,param);
			
			break;
		case "19":
			begin = cDesc.indexOf("敏捷 +");
			end = cDesc.indexOf(" ",begin);
			param.append("&init_dex=").append(cDesc.substring(begin+4, end));
			begin = cDesc.indexOf("防御 +");
			end = cDesc.indexOf(" ",begin);
			param.append("&init_defense=").append(cDesc.substring(begin+4, end));
			break;
		case "21":
			begin = cDesc.indexOf("灵力 +");
			end = cDesc.indexOf(" ",begin);
			param.append("&init_wakan=").append(cDesc.substring(begin+4, end));
			break;
		case "20":
			begin = cDesc.indexOf("气血 +");
			end = cDesc.indexOf(" ",begin);
			param.append("&init_hp=").append(cDesc.substring(begin+4, end));
			begin = cDesc.indexOf("防御 +");
			end = cDesc.indexOf(" ",begin);
			param.append("&init_defense=").append(cDesc.substring(begin+4, end));
			break;
		case "4":
		case "5":
		case "6":
		case "7":
		case "8":
		case "9":
		case "10":
		case "11":
		case "12":
		case "13":
		case "14":
		case "15":
		case "52":
		case "53":
		case "54":
		case "72":
		case "73":
		case "74":
			//双加计算
			param = attrjisuan(cDesc,param);
			
			begin = cDesc.indexOf("伤害 +");
			end = cDesc.indexOf(" 命中",begin);
			if(end == -1){
				end = cDesc.indexOf("#",begin);
			}
			int shanghai = Integer.valueOf(cDesc.substring(begin+4, end));
			begin = cDesc.indexOf("命中 +");
			end = cDesc.indexOf("#",begin);
			if(end == -1){
				end = cDesc.indexOf(" 伤害",begin);
			}
			int mingzhong = Integer.valueOf(cDesc.substring(begin+4, end));
			param.append("&all_damage=").append(shanghai+(mingzhong/3));
			break;
		default:
			return 0;
		}
		
		String reqstr = HttpRequest.sendGet(getUrl, String.valueOf(param));
		
		org.json.JSONObject equipobj = JSONParse.getJSONObject(reqstr);
		JSONArray equip_list = equipobj.optJSONArray("equip_list");
		
		if(equip_list.length() == 0){
			return 0;
		}
		
		int sumprice = 0;
		for (int i = 0; i < equip_list.length(); i++) {
			int tmpprice = 0;
			try {
				tmpprice = Integer.valueOf(String.valueOf(equip_list.getJSONObject(i).get("price")));
				sumprice += tmpprice;
			} catch (NumberFormatException e) {
				e.printStackTrace();
			} catch (JSONException e) {
				e.printStackTrace();
			}
		}
		
		return sumprice/equip_list.length()/100;
	}
	
	
	/**  
	* @Title: attrjisuan  
	* @Description: TODO  属性点计算
	* @param @return
	* @author yangwr  
	* @date 2017年12月13日  
	* @return StringBuffer
	* @throws  
	*/  
	public static StringBuffer attrjisuan(String cDesc,StringBuffer param){
		
		//属性点
		int kaikongbegin = cDesc.indexOf("开运孔数：");
		String outkaikongstr = cDesc;
		if(kaikongbegin != -1){
			outkaikongstr = outkaikongstr.substring(0, kaikongbegin);
		}
		
		int sum_attr_value = 0;
		String sum_attr_type = "";
		
		int begin = outkaikongstr.indexOf("体质 ");
		int end = outkaikongstr.indexOf("#",begin);
		if(begin != -1){
			String tmpattr = outkaikongstr.substring(begin+3, end);
			if(StringUtil.isNotEmpty(sum_attr_type)){
				sum_attr_type += ",";
			}
			sum_attr_type += "physique";
			if(tmpattr.indexOf("+") != -1){
				sum_attr_value += Integer.valueOf(tmpattr.replace("+", "").trim());
			}else if(tmpattr.indexOf("-") != -1){
				sum_attr_value -= Integer.valueOf(tmpattr.replace("-", "").trim());
			}
		}
		
		begin = outkaikongstr.indexOf("耐力 ");
		end = outkaikongstr.indexOf("#",begin);
		if(begin != -1){
			String tmpattr = outkaikongstr.substring(begin+3, end);
			if(StringUtil.isNotEmpty(sum_attr_type)){
				sum_attr_type += ",";
			}
			sum_attr_type += "endurance";
			if(tmpattr.indexOf("+") != -1){
				sum_attr_value += Integer.valueOf(tmpattr.replace("+", "").trim());
			}else if(tmpattr.indexOf("-") != -1){
				sum_attr_value -= Integer.valueOf(tmpattr.replace("-", "").trim());
			}
		}
		
		begin = outkaikongstr.indexOf("敏捷 ");
		end = outkaikongstr.indexOf("#",begin);
		if(begin != -1){
			String tmpattr = outkaikongstr.substring(begin+3, end);
			if(StringUtil.isNotEmpty(sum_attr_type)){
				sum_attr_type += ",";
			}
			sum_attr_type += "dex";
			if(tmpattr.indexOf("+") != -1){
				sum_attr_value += Integer.valueOf(tmpattr.replace("+", "").trim());
			}else if(tmpattr.indexOf("-") != -1){
				sum_attr_value -= Integer.valueOf(tmpattr.replace("-", "").trim());
			}
		}
		
		begin = outkaikongstr.indexOf("魔力 ");
		end = outkaikongstr.indexOf("#",begin);
		if(begin != -1){
			String tmpattr = outkaikongstr.substring(begin+3, end);
			if(StringUtil.isNotEmpty(sum_attr_type)){
				sum_attr_type += ",";
			}
			sum_attr_type += "magic";
			if(tmpattr.indexOf("+") != -1){
				sum_attr_value += Integer.valueOf(tmpattr.replace("+", "").trim());
			}else if(tmpattr.indexOf("-") != -1){
				sum_attr_value -= Integer.valueOf(tmpattr.replace("-", "").trim());
			}
		}
		
		begin = outkaikongstr.indexOf("力量 ");
		end = outkaikongstr.indexOf("#",begin);
		if(begin != -1){
			String tmpattr = outkaikongstr.substring(begin+3, end);
			if(StringUtil.isNotEmpty(sum_attr_type)){
				sum_attr_type += ",";
			}
			sum_attr_type += "power";
			if(tmpattr.indexOf("+") != -1){
				sum_attr_value += Integer.valueOf(tmpattr.replace("+", "").trim());
			}else if(tmpattr.indexOf("-") != -1){
				sum_attr_value -= Integer.valueOf(tmpattr.replace("-", "").trim());
			}
		}
		
		if(StringUtil.isNotEmpty(sum_attr_type)){
			param.append("&sum_attr_type=").append(sum_attr_type);
		}
		if(sum_attr_value > 0 ){
			param.append("&sum_attr_value=").append(sum_attr_value);
		}
		return param;
	}
	
	/**
	 * 估算一个武器的价格
	 * @return 返回武器对应的游戏币价格
	 * 
	 * 就先去cbg找一摸一样的武器  武器查找初总伤的就行了
	 */
	public int getWuQiPrice(){
		
		return 0;
	}
	
	/**
	 * 估算头盔的价格
	 * @return
	 */
	public static StringBuffer getTouKuiPrice(String cDesc,StringBuffer param){
		int begin = cDesc.indexOf("防御 +");
		int end = cDesc.indexOf(" ",begin);
		
		param.append("&init_defense=").append(cDesc.substring(begin+4, end));
		
		
		
		
		return param;
		
	}
	
	
	
}
