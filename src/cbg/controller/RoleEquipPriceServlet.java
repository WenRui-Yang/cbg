package cbg.controller;

import cbg.entity.EquipEntity;

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
	
	
	public static int getPriceUtil(EquipEntity equipEntity){
		
		
		return 0 ;
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
	public static int getTouKuiPrice(String cDesc){
		
		return 0;
		
	}
	
	
	
}
