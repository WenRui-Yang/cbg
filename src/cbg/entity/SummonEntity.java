package cbg.entity;

import java.util.List;
import java.util.Map;

/**
 * @author SEELE
 *宝宝实体类
 */
public class SummonEntity {

	private int ATK_MAX;//最大攻击资质
	private int DEF_MAX;//防御
	private int HP_MAX;//体
	private int MP_MAX;//法
	private int MS_MAX;//躲避
	private int SPD_MAX;//速度
	private int growthMax;//成长
	
	
	//宝宝技能
	private Map<String,Integer> all_skills;
	
	private int att;
	private int def;
	private int hp;
	private int mp;
	private int dod;
	private int spe;
	
	private int grow;//成长
	
	private int iAtt_all;//攻击
	private int iHp;//当前血量
	private int iHp_max;//最大血量
	private int iMp;//当前蓝量
	private int iMp_max;//最大蓝量
	private int iMagDef_all;//灵力
	
	
	private int iCor_all;//攻击
	private int iDef_All;//防御
	private int iDex_All;//速度
	private int iDod_All;//躲避
	
	
	private int iMag_all;//魔力点
	private int iRes_all;//耐力点
	private int iSpe_all;//敏捷点
	private int iStr_all;//力量点
	private int iPoint;//属性点数量
	
	
	
	private int qianjinlu;//千金露
	private int ruyidan;//如意丹
	private int yuanxiao;//元宵
	
	private int tmp_lingxing;//灵性?
	
	private int summon_equip4_type;//饰品类型
	private String summon_equip4_desc;//饰品描述
	
	
	
	//private jinjie;//进阶
	//private summon_core;//内丹
	
	private  EquipEntity summon_equip1;//宝宝装备1

	private  EquipEntity summon_equip2;//宝宝装备2
	private  EquipEntity summon_equip3;//宝宝装备3
	
	
	private int core_close;//染色？
	
	private int iBaobao;

	public int getATK_MAX() {
		return ATK_MAX;
	}

	public void setATK_MAX(int aTK_MAX) {
		ATK_MAX = aTK_MAX;
	}

	public int getDEF_MAX() {
		return DEF_MAX;
	}

	public void setDEF_MAX(int dEF_MAX) {
		DEF_MAX = dEF_MAX;
	}

	public int getHP_MAX() {
		return HP_MAX;
	}

	public void setHP_MAX(int hP_MAX) {
		HP_MAX = hP_MAX;
	}

	public int getMP_MAX() {
		return MP_MAX;
	}

	public void setMP_MAX(int mP_MAX) {
		MP_MAX = mP_MAX;
	}

	public int getMS_MAX() {
		return MS_MAX;
	}

	public void setMS_MAX(int mS_MAX) {
		MS_MAX = mS_MAX;
	}

	public int getSPD_MAX() {
		return SPD_MAX;
	}

	public void setSPD_MAX(int sPD_MAX) {
		SPD_MAX = sPD_MAX;
	}

	public int getGrowthMax() {
		return growthMax;
	}

	public void setGrowthMax(int growthMax) {
		this.growthMax = growthMax;
	}

	public Map<String, Integer> getAll_skills() {
		return all_skills;
	}

	public void setAll_skills(Map<String, Integer> all_skills) {
		this.all_skills = all_skills;
	}

	public int getAtt() {
		return att;
	}

	public void setAtt(int att) {
		this.att = att;
	}

	public int getDef() {
		return def;
	}

	public void setDef(int def) {
		this.def = def;
	}

	public int getHp() {
		return hp;
	}

	public void setHp(int hp) {
		this.hp = hp;
	}

	public int getMp() {
		return mp;
	}

	public void setMp(int mp) {
		this.mp = mp;
	}

	public int getDod() {
		return dod;
	}

	public void setDod(int dod) {
		this.dod = dod;
	}

	public int getSpe() {
		return spe;
	}

	public void setSpe(int spe) {
		this.spe = spe;
	}

	public int getGrow() {
		return grow;
	}

	public void setGrow(int grow) {
		this.grow = grow;
	}

	public int getiAtt_all() {
		return iAtt_all;
	}

	public void setiAtt_all(int iAtt_all) {
		this.iAtt_all = iAtt_all;
	}

	public int getiHp() {
		return iHp;
	}

	public void setiHp(int iHp) {
		this.iHp = iHp;
	}

	public int getiHp_max() {
		return iHp_max;
	}

	public void setiHp_max(int iHp_max) {
		this.iHp_max = iHp_max;
	}

	public int getiMp() {
		return iMp;
	}

	public void setiMp(int iMp) {
		this.iMp = iMp;
	}

	public int getiMp_max() {
		return iMp_max;
	}

	public void setiMp_max(int iMp_max) {
		this.iMp_max = iMp_max;
	}

	public int getiMagDef_all() {
		return iMagDef_all;
	}

	public void setiMagDef_all(int iMagDef_all) {
		this.iMagDef_all = iMagDef_all;
	}

	public int getiCor_all() {
		return iCor_all;
	}

	public void setiCor_all(int iCor_all) {
		this.iCor_all = iCor_all;
	}

	public int getiDef_All() {
		return iDef_All;
	}

	public void setiDef_All(int iDef_All) {
		this.iDef_All = iDef_All;
	}

	public int getiDex_All() {
		return iDex_All;
	}

	public void setiDex_All(int iDex_All) {
		this.iDex_All = iDex_All;
	}

	public int getiDod_All() {
		return iDod_All;
	}

	public void setiDod_All(int iDod_All) {
		this.iDod_All = iDod_All;
	}

	public int getiMag_all() {
		return iMag_all;
	}

	public void setiMag_all(int iMag_all) {
		this.iMag_all = iMag_all;
	}

	public int getiRes_all() {
		return iRes_all;
	}

	public void setiRes_all(int iRes_all) {
		this.iRes_all = iRes_all;
	}

	public int getiSpe_all() {
		return iSpe_all;
	}

	public void setiSpe_all(int iSpe_all) {
		this.iSpe_all = iSpe_all;
	}

	public int getiStr_all() {
		return iStr_all;
	}

	public void setiStr_all(int iStr_all) {
		this.iStr_all = iStr_all;
	}

	public int getiPoint() {
		return iPoint;
	}

	public void setiPoint(int iPoint) {
		this.iPoint = iPoint;
	}

	public int getQianjinlu() {
		return qianjinlu;
	}

	public void setQianjinlu(int qianjinlu) {
		this.qianjinlu = qianjinlu;
	}

	public int getRuyidan() {
		return ruyidan;
	}

	public void setRuyidan(int ruyidan) {
		this.ruyidan = ruyidan;
	}

	public int getYuanxiao() {
		return yuanxiao;
	}

	public void setYuanxiao(int yuanxiao) {
		this.yuanxiao = yuanxiao;
	}

	public int getTmp_lingxing() {
		return tmp_lingxing;
	}

	public void setTmp_lingxing(int tmp_lingxing) {
		this.tmp_lingxing = tmp_lingxing;
	}

	public EquipEntity getSummon_equip1() {
		return summon_equip1;
	}

	public void setSummon_equip1(EquipEntity summon_equip1) {
		this.summon_equip1 = summon_equip1;
	}

	public EquipEntity getSummon_equip2() {
		return summon_equip2;
	}

	public void setSummon_equip2(EquipEntity summon_equip2) {
		this.summon_equip2 = summon_equip2;
	}

	public EquipEntity getSummon_equip3() {
		return summon_equip3;
	}

	public void setSummon_equip3(EquipEntity summon_equip3) {
		this.summon_equip3 = summon_equip3;
	}

	public int getCore_close() {
		return core_close;
	}

	public void setCore_close(int core_close) {
		this.core_close = core_close;
	}

	public int getiBaobao() {
		return iBaobao;
	}

	public void setiBaobao(int iBaobao) {
		this.iBaobao = iBaobao;
	}
	
	public int getSummon_equip4_type() {
		return summon_equip4_type;
	}

	public void setSummon_equip4_type(int summon_equip4_type) {
		this.summon_equip4_type = summon_equip4_type;
	}

	public String getSummon_equip4_desc() {
		return summon_equip4_desc;
	}

	public void setSummon_equip4_desc(String summon_equip4_desc) {
		this.summon_equip4_desc = summon_equip4_desc;
	}
}
