package cbg.entity;

import java.util.List;
import java.util.Map;

public class AllInfoEntity {
	
	
	private Map<String,EquipEntity> AllEquip;//装备  1头盔  2衣服 3鞋子 4项链 5腰带 6武器  包含道具栏物品
	
	private List<SummonEntity> AllSummon;//宝宝
	
	private Map<String,RiderEntity> AllRider;//坐骑
	
	private Map<String,FabaoEntity> fabao;//法宝
	
	private  Map<String,JinyiXiangruiEntity> ExAvt;//锦衣
	
	private  Map<String,JinyiXiangruiEntity> HugeHorse;//祥瑞
	
	//private child;//孩子
	
	//private pet;//特殊宠物
	

	public Map<String, EquipEntity> getAllEquip() {
		return AllEquip;
	}

	public void setAllEquip(Map<String, EquipEntity> allEquip) {
		AllEquip = allEquip;
	}


	public Map<String, RiderEntity> getAllRider() {
		return AllRider;
	}

	public void setAllRider(Map<String, RiderEntity> allRider) {
		AllRider = allRider;
	}


	public Map<String,FabaoEntity> getFabao() {
		return fabao;
	}

	public void setFabao(Map<String,FabaoEntity> fabao) {
		this.fabao = fabao;
	}

	public List<SummonEntity> getAllSummon() {
		return AllSummon;
	}

	public void setAllSummon(List<SummonEntity> allSummon) {
		AllSummon = allSummon;
	}

	public Map<String, JinyiXiangruiEntity> getExAvt() {
		return ExAvt;
	}

	public void setExAvt(Map<String, JinyiXiangruiEntity> exAvt) {
		ExAvt = exAvt;
	}

	public Map<String, JinyiXiangruiEntity> getHugeHorse() {
		return HugeHorse;
	}

	public void setHugeHorse(Map<String, JinyiXiangruiEntity> hugeHorse) {
		HugeHorse = hugeHorse;
	}
	
	
	
}
