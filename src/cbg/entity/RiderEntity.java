package cbg.entity;

import java.util.Map;

/**
 * @author SEELE
 *坐骑实体类
 */
public class RiderEntity {

	private int ExtraGrow;
	
	//主属性
	private String mattrib;
	
	private int iType;
	private int iGrade;
	private int exgrow;
	
	//坐骑技能
	private Map<String,Integer> all_skills;

	public int getExtraGrow() {
		return ExtraGrow;
	}

	public void setExtraGrow(int extraGrow) {
		ExtraGrow = extraGrow;
	}

	public String getMattrib() {
		return mattrib;
	}

	public void setMattrib(String mattrib) {
		this.mattrib = mattrib;
	}

	public int getiType() {
		return iType;
	}

	public void setiType(int iType) {
		this.iType = iType;
	}

	public int getiGrade() {
		return iGrade;
	}

	public void setiGrade(int iGrade) {
		this.iGrade = iGrade;
	}

	public int getExgrow() {
		return exgrow;
	}

	public void setExgrow(int exgrow) {
		this.exgrow = exgrow;
	}

	public Map<String, Integer> getAll_skills() {
		return all_skills;
	}

	public void setAll_skills(Map<String, Integer> all_skills) {
		this.all_skills = all_skills;
	}
	
	
	
	
	
	
}
