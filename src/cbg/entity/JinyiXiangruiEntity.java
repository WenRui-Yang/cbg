package cbg.entity;

/**
 * @author SEELE
 *锦衣//祥瑞//实体类
 */
public class JinyiXiangruiEntity {

	private String cName;//名字
	
	private int iSkill;
	private int iSkillLevel;
	private int iType;
	private int nosale;//是否限量 1是 0不是
	private int order;
	
	
	public String getcName() {
		return cName;
	}
	public void setcName(String cName) {
		this.cName = cName;
	}
	public int getiSkill() {
		return iSkill;
	}
	public void setiSkill(int iSkill) {
		this.iSkill = iSkill;
	}
	public int getiSkillLevel() {
		return iSkillLevel;
	}
	public void setiSkillLevel(int iSkillLevel) {
		this.iSkillLevel = iSkillLevel;
	}
	public int getiType() {
		return iType;
	}
	public void setiType(int iType) {
		this.iType = iType;
	}
	public int getNosale() {
		return nosale;
	}
	public void setNosale(int nosale) {
		this.nosale = nosale;
	}
	public int getOrder() {
		return order;
	}
	public void setOrder(int order) {
		this.order = order;
	}
	
	
	
	
	
}
