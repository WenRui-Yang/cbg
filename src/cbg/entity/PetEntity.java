package cbg.entity;

import java.sql.Timestamp;
import java.util.Date;

/**
 * @author Administrator
 * 宝宝
 */
public class PetEntity{
	
	private String id;

	
	//获取时间
	private Timestamp getTime;
	
	//CBGurl
	private String cbgurl;
	
	private int xingjiabi;
	//月饼粽子
	private Integer addon_point;
    //所有染色折算彩果数
	private Integer all_caiguo;
    //指定买家id
	private String  appointed_roleid;
   //服务器
	private  String area_name;
    //善恶
	private String badness;
    //行囊扩展个数
	private Integer  baggage_extend_num;
   //防御控制
	private Integer   bb_expt_fangyu;
    //f法术控制
	private Integer bb_expt_fashu;
    //攻击控制
	private Integer bb_expt_gongji;
    //抗法控制
	private Integer bb_expt_kangfa;
    //宠修总和
	private Integer bb_expt_total;
    //染色折合彩效果数
	private Integer body_caiguo;
    //保存染色方案数
	private Integer  box_caiguo;
    //裁缝熟练度
	private Integer caifeng_score;
    //
	private Integer can_bargain;
    //现金
	private  Integer cash;
    //
	private   Integer changesch;
    //成就
	private Integer cheng_jiu;
    //锦衣数量
	private Integer clothes_num;
    //
	private Integer  collect_num;
    //
	private Long create_time;
    //打造熟练度
	private Integer dazao_score;
    //精力
	private Integer energy;
    //装备数量
	private  Integer equip_count;
    //
	private  String equip_name;
    //
	private  Integer equip_type;
    //
	private  Integer eval_price;
   //
	private   Long expire_time;
    //防御修炼
	private   Integer expt_fangyu;
    //法术修炼
	private    Integer expt_fashu;
    //攻击修炼
	private    Integer  expt_gongji;
    //抗法修炼
	private     Integer expt_kangfa;
    // 猎术修炼
	private    Integer expt_lieshu;
    //修炼总和
	private    Integer  expt_total;
    //法防
	private    Integer fa_fang;
    //法伤
	private    Integer fa_shang;
    //公示结束时间
	private   Integer fair_show_end_time;
    //防御
	private    Integer fang_yu;
    //房屋
	private    Integer fangwu_level;
    //生活技能满个数
	private    Integer full_life_skill_num;
    //
	private   String game_ordersn;
     //
	private  String game_serverid;
    //成品召唤兽数量
	private Integer  growup_pet_num;
    //社区
	private  Integer  has_community;
    //比武积分
	private  Integer hero_score;
    //气血
	private  Integer hp;
    //
	private Integer icon;
    //
	private  Integer id2;
    //
	private  Integer is_gold_id;
    //
	private  Integer is_item_exist;
    //婚否
	private  Integer is_married;
    //是否靓号
	private   Integer is_niceid;
    //是否同袍
	private  Integer  is_tongpao;
    //机缘数量
	private  Integer ji_yuan_point;
    //属性总和(机缘属性+月饼粽子)
	private  Integer jiyuan_and_addpoint;
    //
	private Integer  kindid;
    //储备金
	private  Integer  learn_cash;
    //等级
	private   Integer  level;
    //限量锦衣
	//private  Integer limit_clothes;
    //临时符技能
	private Integer  lin_shi_fu;
    //灵力
	private Integer  ling_li;
    //
	//private   Map lingshi_attr_value;
    //灵饰最高锻造
	private   Integer  lingshi_max_duanzao_level;
   
	//灵饰最高等级
	private   Integer lingshi_max_level;
    //灵饰最低锻造
	private   Integer  lingshi_min_duanzao_level;
    //灵饰最低等级
	private   Integer  lingshi_min_level;
    //
	private  Integer  max_equip_duan_zao;
    //防御上限
	private  Integer   max_expt_fangyu;
    //法术上限
	private  Integer  max_expt_fashu;
    //攻击上限
	private Integer  max_expt_gongji;
    //抗法上限
	private Integer  max_expt_kangfa;
    //携带项链初灵
	private Integer  max_necklace_init_wakan;
    //携带项链灵力
	private Integer  max_necklace_ling_li;
    //携带武器伤害
	private  Integer  max_weapon_damage;
    //携带武器初伤（含命中）
	private Integer  max_weapon_init_damage;
    //携带武器初伤（不含命中）
	private  Integer max_weapon_init_damage_raw;
    //携带武器总伤
	private Integer  max_weapon_shang_hai;
    //命中
	private Integer  ming_zhong;
    //牧场
	private Integer muchang_level;
    //名字
	private String nickname;
    //
	private Integer nosale_xr_num;
    //帮贡
	private Integer org_offer;
    //
	//private  String other_info;
    //
	private  Integer  pass_fair_show;
    //
	private Integer pet_ex_num;
    //召唤兽栏扩展个数
	private  Integer  pet_extend_num;
    //
	//private  Map pet_info;
    //价格
	private  String  price;
    //人气
	private Integer  pride;
    //潜能果
	private Integer  qian_neng_guo;
    //乾元丹
	private Integer  qian_yuan_dan;
    //角色
	private  Integer race;
    //满成长坐骑数（后天成长1.0）
	private Integer rider_exgrow_full_num;
    //
	private String roleid;
    //门派
	private Integer school;
    //门贡
	private Integer  school_offer;
    //师门技能等级
	private  Integer  school_skill_1;
    //师门技能等级
	private Integer  school_skill_2;
    //师门技能等级
	private  Integer  school_skill_3;
    //师门技能等级
	private Integer  school_skill_4;
    //师门技能等级
	private Integer  school_skill_5;
    //师门技能等级
	private  Integer   school_skill_6;
    //师门技能等级
	private  Integer   school_skill_7;
    //师门技能等级
	private  Integer   school_skill_idx1;
    //师门技能等级
	private  Integer  school_skill_idx2;
    //师门技能等级
	private  Integer  school_skill_idx3;
    //师门技能等级
	private  Integer  school_skill_idx4;
    //师门技能等级
	private Integer  school_skill_idx5;
    //师门技能等级
	private  Integer  school_skill_idx6;
    //师门技能等级
	private  Integer   school_skill_idx7;
    //师门技能等级
	//private    Map school_skills;
    //
	private   Integer  score;
    //
	private  Integer   selling_time;
    //服务器
	private String server_name;
    //
	private Integer  serverid;
    //裁缝熟练度
	private Integer   sew_skill;
    //伤害
	private  Integer  shang_hai;
    //剩余灵佑次数
	private  Integer  sheng_yu_ling_you;
    //暗器技巧
	private Integer  skill_anqi;
    //宝石技巧
	private Integer  skill_baoshi;
    //变化之术
	private Integer  skill_bianhua;
    //裁缝技巧
	private  Integer  skill_caifeng;
    //淬灵之术
	private  Integer   skill_cuiling;
    //丹元济会
	private  Integer  skill_danyuan;
    //打造之术
	private Integer skill_dazao;
    //打坐
	private Integer  skill_dazuo;
    //育兽术
	private  Integer  skill_drive_pet;
    //古董评估
	private  Integer  skill_gudong;
    //火眼金睛
	private Integer  skill_huoyan;
    //健身术
	private Integer  skill_jianshen;
    //建筑之术
	private Integer  skill_jianzhu;
    //炼金术
	private Integer  skill_lianjin;
    //灵石技巧
	private Integer  skill_lingshi;
    //妙手空空
	private Integer  skill_miaoshou;
    //冥想之术
	private Integer skill_ming_xiang;
    //烹饪技巧
	private Integer  skill_pengren;
    //强身术
	private  Integer  skill_qiang_shen;
    //强壮
	private  Integer skill_qiang_zhuang;
    //巧匠之术
	private  Integer skill_qiaojiang;
    //奇门遁甲
	private Integer  skill_qimen;
    //熔炼技巧
	private Integer skill_ronglian;
    //神速
	private Integer  skill_shensu;
    //逃离技巧
	private Integer  skill_taoli;
    //调息
	private  Integer  skill_tiaoxi;
    //仙灵
	private   Integer  skill_xianling;
    //养生之道
	private   Integer skill_yangsheng;
    //中药医疗
	private  Integer  skill_zhongyao;
    //追捕之术
	private   Integer  skill_zhuibu;
     //打造熟练度
	private  Integer smith_skill;
    //速度
	private  Integer  speed;
    //
	private   Integer  status;
    //角色总经验
	private   Integer   sum_exp;
    //剑会积分
	private   Integer   sword_score;
    //套装数量
	//private   Integer   taozhuang;
    //
	private    String time_left;
    //庭院
	private   Integer  tingyuan_level;
    //当前经验
	private  Long  upexp;
    //仙玉
	private  Integer  xian_yu;
    //祥瑞数量
	private Integer  xiangrui_num;
    //'飞升/渡劫/化圣
	private  Integer  zhuang_zhi;
	
	
	 public Integer getAddon_point() {
			return addon_point;
		}
		public void setAddon_point(Integer addon_point) {
			this.addon_point = addon_point;
		}
		public Integer getAll_caiguo() {
			return all_caiguo;
		}
		public void setAll_caiguo(Integer all_caiguo) {
			this.all_caiguo = all_caiguo;
		}
		public String getAppointed_roleid() {
			return appointed_roleid;
		}
		public void setAppointed_roleid(String appointed_roleid) {
			this.appointed_roleid = appointed_roleid;
		}
		public String getArea_name() {
			return area_name;
		}
		public void setArea_name(String area_name) {
			this.area_name = area_name;
		}
		public String getBadness() {
			return badness;
		}
		public void setBadness(String badness) {
			this.badness = badness;
		}
		public Integer getBaggage_extend_num() {
			return baggage_extend_num;
		}
		public void setBaggage_extend_num(Integer baggage_extend_num) {
			this.baggage_extend_num = baggage_extend_num;
		}
		public Integer getBb_expt_fangyu() {
			return bb_expt_fangyu;
		}
		public void setBb_expt_fangyu(Integer bb_expt_fangyu) {
			this.bb_expt_fangyu = bb_expt_fangyu;
		}
		public Integer getBb_expt_fashu() {
			return bb_expt_fashu;
		}
		public void setBb_expt_fashu(Integer bb_expt_fashu) {
			this.bb_expt_fashu = bb_expt_fashu;
		}
		public Integer getBb_expt_gongji() {
			return bb_expt_gongji;
		}
		public void setBb_expt_gongji(Integer bb_expt_gongji) {
			this.bb_expt_gongji = bb_expt_gongji;
		}
		public Integer getBb_expt_kangfa() {
			return bb_expt_kangfa;
		}
		public void setBb_expt_kangfa(Integer bb_expt_kangfa) {
			this.bb_expt_kangfa = bb_expt_kangfa;
		}
		public Integer getBb_expt_total() {
			return bb_expt_total;
		}
		public void setBb_expt_total(Integer bb_expt_total) {
			this.bb_expt_total = bb_expt_total;
		}
		public Integer getBody_caiguo() {
			return body_caiguo;
		}
		public void setBody_caiguo(Integer body_caiguo) {
			this.body_caiguo = body_caiguo;
		}
		public Integer getBox_caiguo() {
			return box_caiguo;
		}
		public void setBox_caiguo(Integer box_caiguo) {
			this.box_caiguo = box_caiguo;
		}
		public Integer getCaifeng_score() {
			return caifeng_score;
		}
		public void setCaifeng_score(Integer caifeng_score) {
			this.caifeng_score = caifeng_score;
		}
		public Integer getCan_bargain() {
			return can_bargain;
		}
		public void setCan_bargain(Integer can_bargain) {
			this.can_bargain = can_bargain;
		}
		public Integer getCash() {
			return cash;
		}
		public void setCash(Integer cash) {
			this.cash = cash;
		}
		public Integer getChangesch() {
			return changesch;
		}
		public void setChangesch(Integer changesch) {
			this.changesch = changesch;
		}
		public Integer getCheng_jiu() {
			return cheng_jiu;
		}
		public void setCheng_jiu(Integer cheng_jiu) {
			this.cheng_jiu = cheng_jiu;
		}
		public Integer getClothes_num() {
			return clothes_num;
		}
		public void setClothes_num(Integer clothes_num) {
			this.clothes_num = clothes_num;
		}
		public Integer getCollect_num() {
			return collect_num;
		}
		public void setCollect_num(Integer collect_num) {
			this.collect_num = collect_num;
		}
		public Long getCreate_time() {
			return create_time;
		}
		public void setCreate_time(Long create_time) {
			this.create_time = create_time;
		}
		public Integer getDazao_score() {
			return dazao_score;
		}
		public void setDazao_score(Integer dazao_score) {
			this.dazao_score = dazao_score;
		}
		public Integer getEnergy() {
			return energy;
		}
		public void setEnergy(Integer energy) {
			this.energy = energy;
		}
		public Integer getEquip_count() {
			return equip_count;
		}
		public void setEquip_count(Integer equip_count) {
			this.equip_count = equip_count;
		}
		public String getEquip_name() {
			return equip_name;
		}
		public void setEquip_name(String equip_name) {
			this.equip_name = equip_name;
		}
		public Integer getEquip_type() {
			return equip_type;
		}
		public void setEquip_type(Integer equip_type) {
			this.equip_type = equip_type;
		}
		public Integer getEval_price() {
			return eval_price;
		}
		public void setEval_price(Integer eval_price) {
			this.eval_price = eval_price;
		}
		public Long getExpire_time() {
			return expire_time;
		}
		public void setExpire_time(Long expire_time) {
			this.expire_time = expire_time;
		}
		public Integer getExpt_fangyu() {
			return expt_fangyu;
		}
		public void setExpt_fangyu(Integer expt_fangyu) {
			this.expt_fangyu = expt_fangyu;
		}
		public Integer getExpt_fashu() {
			return expt_fashu;
		}
		public void setExpt_fashu(Integer expt_fashu) {
			this.expt_fashu = expt_fashu;
		}
		public Integer getExpt_gongji() {
			return expt_gongji;
		}
		public void setExpt_gongji(Integer expt_gongji) {
			this.expt_gongji = expt_gongji;
		}
		public Integer getExpt_kangfa() {
			return expt_kangfa;
		}
		public void setExpt_kangfa(Integer expt_kangfa) {
			this.expt_kangfa = expt_kangfa;
		}
		public Integer getExpt_lieshu() {
			return expt_lieshu;
		}
		public void setExpt_lieshu(Integer expt_lieshu) {
			this.expt_lieshu = expt_lieshu;
		}
		public Integer getExpt_total() {
			return expt_total;
		}
		public void setExpt_total(Integer expt_total) {
			this.expt_total = expt_total;
		}
		public Integer getFa_fang() {
			return fa_fang;
		}
		public void setFa_fang(Integer fa_fang) {
			this.fa_fang = fa_fang;
		}
		public Integer getFa_shang() {
			return fa_shang;
		}
		public void setFa_shang(Integer fa_shang) {
			this.fa_shang = fa_shang;
		}
		public Integer getFair_show_end_time() {
			return fair_show_end_time;
		}
		public void setFair_show_end_time(Integer fair_show_end_time) {
			this.fair_show_end_time = fair_show_end_time;
		}
		public Integer getFang_yu() {
			return fang_yu;
		}
		public void setFang_yu(Integer fang_yu) {
			this.fang_yu = fang_yu;
		}
		public Integer getFangwu_level() {
			return fangwu_level;
		}
		public void setFangwu_level(Integer fangwu_level) {
			this.fangwu_level = fangwu_level;
		}
		public Integer getFull_life_skill_num() {
			return full_life_skill_num;
		}
		public void setFull_life_skill_num(Integer full_life_skill_num) {
			this.full_life_skill_num = full_life_skill_num;
		}
		public String getGame_ordersn() {
			return game_ordersn;
		}
		public void setGame_ordersn(String game_ordersn) {
			this.game_ordersn = game_ordersn;
		}
		public String getGame_serverid() {
			return game_serverid;
		}
		public void setGame_serverid(String game_serverid) {
			this.game_serverid = game_serverid;
		}
		public Integer getGrowup_pet_num() {
			return growup_pet_num;
		}
		public void setGrowup_pet_num(Integer growup_pet_num) {
			this.growup_pet_num = growup_pet_num;
		}
		public Integer getHas_community() {
			return has_community;
		}
		public void setHas_community(Integer has_community) {
			this.has_community = has_community;
		}
		public Integer getHero_score() {
			return hero_score;
		}
		public void setHero_score(Integer hero_score) {
			this.hero_score = hero_score;
		}
		public Integer getHp() {
			return hp;
		}
		public void setHp(Integer hp) {
			this.hp = hp;
		}
		public Integer getIcon() {
			return icon;
		}
		public void setIcon(Integer icon) {
			this.icon = icon;
		}
		public Integer getId2() {
			return id2;
		}
		public void setId2(Integer id2) {
			this.id2 = id2;
		}
		public Integer getIs_gold_id() {
			return is_gold_id;
		}
		public void setIs_gold_id(Integer is_gold_id) {
			this.is_gold_id = is_gold_id;
		}
		public Integer getIs_item_exist() {
			return is_item_exist;
		}
		public void setIs_item_exist(Integer is_item_exist) {
			this.is_item_exist = is_item_exist;
		}
		public Integer getIs_married() {
			return is_married;
		}
		public void setIs_married(Integer is_married) {
			this.is_married = is_married;
		}
		public Integer getIs_niceid() {
			return is_niceid;
		}
		public void setIs_niceid(Integer is_niceid) {
			this.is_niceid = is_niceid;
		}
		public Integer getIs_tongpao() {
			return is_tongpao;
		}
		public void setIs_tongpao(Integer is_tongpao) {
			this.is_tongpao = is_tongpao;
		}
		public Integer getJi_yuan_point() {
			return ji_yuan_point;
		}
		public void setJi_yuan_point(Integer ji_yuan_point) {
			this.ji_yuan_point = ji_yuan_point;
		}
		public Integer getJiyuan_and_addpoint() {
			return jiyuan_and_addpoint;
		}
		public void setJiyuan_and_addpoint(Integer jiyuan_and_addpoint) {
			this.jiyuan_and_addpoint = jiyuan_and_addpoint;
		}
		public Integer getKindid() {
			return kindid;
		}
		public void setKindid(Integer kindid) {
			this.kindid = kindid;
		}
		public Integer getLearn_cash() {
			return learn_cash;
		}
		public void setLearn_cash(Integer learn_cash) {
			this.learn_cash = learn_cash;
		}
		public Integer getLevel() {
			return level;
		}
		public void setLevel(Integer level) {
			this.level = level;
		}
		/*public Integer getLimit_clothes() {
			return limit_clothes;
		}
		public void setLimit_clothes(Integer limit_clothes) {
			this.limit_clothes = limit_clothes;
		}*/
		public Integer getLin_shi_fu() {
			return lin_shi_fu;
		}
		public void setLin_shi_fu(Integer lin_shi_fu) {
			this.lin_shi_fu = lin_shi_fu;
		}
		public Integer getLing_li() {
			return ling_li;
		}
		public void setLing_li(Integer ling_li) {
			this.ling_li = ling_li;
		}
		public Integer getLingshi_max_duanzao_level() {
			return lingshi_max_duanzao_level;
		}
		public void setLingshi_max_duanzao_level(Integer lingshi_max_duanzao_level) {
			this.lingshi_max_duanzao_level = lingshi_max_duanzao_level;
		}
		public Integer getLingshi_max_level() {
			return lingshi_max_level;
		}
		public void setLingshi_max_level(Integer lingshi_max_level) {
			this.lingshi_max_level = lingshi_max_level;
		}
		public Integer getLingshi_min_duanzao_level() {
			return lingshi_min_duanzao_level;
		}
		public void setLingshi_min_duanzao_level(Integer lingshi_min_duanzao_level) {
			this.lingshi_min_duanzao_level = lingshi_min_duanzao_level;
		}
		public Integer getLingshi_min_level() {
			return lingshi_min_level;
		}
		public void setLingshi_min_level(Integer lingshi_min_level) {
			this.lingshi_min_level = lingshi_min_level;
		}
		public Integer getMax_equip_duan_zao() {
			return max_equip_duan_zao;
		}
		public void setMax_equip_duan_zao(Integer max_equip_duan_zao) {
			this.max_equip_duan_zao = max_equip_duan_zao;
		}
		public Integer getMax_expt_fangyu() {
			return max_expt_fangyu;
		}
		public void setMax_expt_fangyu(Integer max_expt_fangyu) {
			this.max_expt_fangyu = max_expt_fangyu;
		}
		public Integer getMax_expt_fashu() {
			return max_expt_fashu;
		}
		public void setMax_expt_fashu(Integer max_expt_fashu) {
			this.max_expt_fashu = max_expt_fashu;
		}
		public Integer getMax_expt_gongji() {
			return max_expt_gongji;
		}
		public void setMax_expt_gongji(Integer max_expt_gongji) {
			this.max_expt_gongji = max_expt_gongji;
		}
		public Integer getMax_expt_kangfa() {
			return max_expt_kangfa;
		}
		public void setMax_expt_kangfa(Integer max_expt_kangfa) {
			this.max_expt_kangfa = max_expt_kangfa;
		}
		public Integer getMax_necklace_init_wakan() {
			return max_necklace_init_wakan;
		}
		public void setMax_necklace_init_wakan(Integer max_necklace_init_wakan) {
			this.max_necklace_init_wakan = max_necklace_init_wakan;
		}
		public Integer getMax_necklace_ling_li() {
			return max_necklace_ling_li;
		}
		public void setMax_necklace_ling_li(Integer max_necklace_ling_li) {
			this.max_necklace_ling_li = max_necklace_ling_li;
		}
		public Integer getMax_weapon_damage() {
			return max_weapon_damage;
		}
		public void setMax_weapon_damage(Integer max_weapon_damage) {
			this.max_weapon_damage = max_weapon_damage;
		}
		public Integer getMax_weapon_init_damage() {
			return max_weapon_init_damage;
		}
		public void setMax_weapon_init_damage(Integer max_weapon_init_damage) {
			this.max_weapon_init_damage = max_weapon_init_damage;
		}
		public Integer getMax_weapon_init_damage_raw() {
			return max_weapon_init_damage_raw;
		}
		public void setMax_weapon_init_damage_raw(Integer max_weapon_init_damage_raw) {
			this.max_weapon_init_damage_raw = max_weapon_init_damage_raw;
		}
		public Integer getMax_weapon_shang_hai() {
			return max_weapon_shang_hai;
		}
		public void setMax_weapon_shang_hai(Integer max_weapon_shang_hai) {
			this.max_weapon_shang_hai = max_weapon_shang_hai;
		}
		public Integer getMing_zhong() {
			return ming_zhong;
		}
		public void setMing_zhong(Integer ming_zhong) {
			this.ming_zhong = ming_zhong;
		}
		public Integer getMuchang_level() {
			return muchang_level;
		}
		public void setMuchang_level(Integer muchang_level) {
			this.muchang_level = muchang_level;
		}
		public String getNickname() {
			return nickname;
		}
		public void setNickname(String nickname) {
			this.nickname = nickname;
		}
		public Integer getNosale_xr_num() {
			return nosale_xr_num;
		}
		public void setNosale_xr_num(Integer nosale_xr_num) {
			this.nosale_xr_num = nosale_xr_num;
		}
		public Integer getOrg_offer() {
			return org_offer;
		}
		public void setOrg_offer(Integer org_offer) {
			this.org_offer = org_offer;
		}
		/*public Integer getOther_info() {
			return other_info;
		}
		public void setOther_info(Integer other_info) {
			this.other_info = other_info;
		}*/
		public Integer getPass_fair_show() {
			return pass_fair_show;
		}
		public void setPass_fair_show(Integer pass_fair_show) {
			this.pass_fair_show = pass_fair_show;
		}
		public Integer getPet_ex_num() {
			return pet_ex_num;
		}
		public void setPet_ex_num(Integer pet_ex_num) {
			this.pet_ex_num = pet_ex_num;
		}
		public Integer getPet_extend_num() {
			return pet_extend_num;
		}
		public void setPet_extend_num(Integer pet_extend_num) {
			this.pet_extend_num = pet_extend_num;
		}
		public String getPrice() {
			return price;
		}
		public void setPrice(String price) {
			this.price = price;
		}
		public Integer getPride() {
			return pride;
		}
		public void setPride(Integer pride) {
			this.pride = pride;
		}
		public Integer getQian_neng_guo() {
			return qian_neng_guo;
		}
		public void setQian_neng_guo(Integer qian_neng_guo) {
			this.qian_neng_guo = qian_neng_guo;
		}
		public Integer getQian_yuan_dan() {
			return qian_yuan_dan;
		}
		public void setQian_yuan_dan(Integer qian_yuan_dan) {
			this.qian_yuan_dan = qian_yuan_dan;
		}
		public Integer getRace() {
			return race;
		}
		public void setRace(Integer race) {
			this.race = race;
		}
		public Integer getRider_exgrow_full_num() {
			return rider_exgrow_full_num;
		}
		public void setRider_exgrow_full_num(Integer rider_exgrow_full_num) {
			this.rider_exgrow_full_num = rider_exgrow_full_num;
		}
		public String getRoleid() {
			return roleid;
		}
		public void setRoleid(String roleid) {
			this.roleid = roleid;
		}
		public Integer getSchool() {
			return school;
		}
		public void setSchool(Integer school) {
			this.school = school;
		}
		public Integer getSchool_offer() {
			return school_offer;
		}
		public void setSchool_offer(Integer school_offer) {
			this.school_offer = school_offer;
		}
		public Integer getSchool_skill_1() {
			return school_skill_1;
		}
		public void setSchool_skill_1(Integer school_skill_1) {
			this.school_skill_1 = school_skill_1;
		}
		public Integer getSchool_skill_2() {
			return school_skill_2;
		}
		public void setSchool_skill_2(Integer school_skill_2) {
			this.school_skill_2 = school_skill_2;
		}
		public Integer getSchool_skill_3() {
			return school_skill_3;
		}
		public void setSchool_skill_3(Integer school_skill_3) {
			this.school_skill_3 = school_skill_3;
		}
		public Integer getSchool_skill_4() {
			return school_skill_4;
		}
		public void setSchool_skill_4(Integer school_skill_4) {
			this.school_skill_4 = school_skill_4;
		}
		public Integer getSchool_skill_5() {
			return school_skill_5;
		}
		public void setSchool_skill_5(Integer school_skill_5) {
			this.school_skill_5 = school_skill_5;
		}
		public Integer getSchool_skill_6() {
			return school_skill_6;
		}
		public void setSchool_skill_6(Integer school_skill_6) {
			this.school_skill_6 = school_skill_6;
		}
		public Integer getSchool_skill_7() {
			return school_skill_7;
		}
		public void setSchool_skill_7(Integer school_skill_7) {
			this.school_skill_7 = school_skill_7;
		}
		public Integer getSchool_skill_idx1() {
			return school_skill_idx1;
		}
		public void setSchool_skill_idx1(Integer school_skill_idx1) {
			this.school_skill_idx1 = school_skill_idx1;
		}
		public Integer getSchool_skill_idx2() {
			return school_skill_idx2;
		}
		public void setSchool_skill_idx2(Integer school_skill_idx2) {
			this.school_skill_idx2 = school_skill_idx2;
		}
		public Integer getSchool_skill_idx3() {
			return school_skill_idx3;
		}
		public void setSchool_skill_idx3(Integer school_skill_idx3) {
			this.school_skill_idx3 = school_skill_idx3;
		}
		public Integer getSchool_skill_idx4() {
			return school_skill_idx4;
		}
		public void setSchool_skill_idx4(Integer school_skill_idx4) {
			this.school_skill_idx4 = school_skill_idx4;
		}
		public Integer getSchool_skill_idx5() {
			return school_skill_idx5;
		}
		public void setSchool_skill_idx5(Integer school_skill_idx5) {
			this.school_skill_idx5 = school_skill_idx5;
		}
		public Integer getSchool_skill_idx6() {
			return school_skill_idx6;
		}
		public void setSchool_skill_idx6(Integer school_skill_idx6) {
			this.school_skill_idx6 = school_skill_idx6;
		}
		public Integer getSchool_skill_idx7() {
			return school_skill_idx7;
		}
		public void setSchool_skill_idx7(Integer school_skill_idx7) {
			this.school_skill_idx7 = school_skill_idx7;
		}
		public Integer getScore() {
			return score;
		}
		public void setScore(Integer score) {
			this.score = score;
		}
		public Integer getSelling_time() {
			return selling_time;
		}
		public void setSelling_time(Integer selling_time) {
			this.selling_time = selling_time;
		}
		public String getServer_name() {
			return server_name;
		}
		public void setServer_name(String server_name) {
			this.server_name = server_name;
		}
		public Integer getServerid() {
			return serverid;
		}
		public void setServerid(Integer serverid) {
			this.serverid = serverid;
		}
		public Integer getSew_skill() {
			return sew_skill;
		}
		public void setSew_skill(Integer sew_skill) {
			this.sew_skill = sew_skill;
		}
		public Integer getShang_hai() {
			return shang_hai;
		}
		public void setShang_hai(Integer shang_hai) {
			this.shang_hai = shang_hai;
		}
		public Integer getSheng_yu_ling_you() {
			return sheng_yu_ling_you;
		}
		public void setSheng_yu_ling_you(Integer sheng_yu_ling_you) {
			this.sheng_yu_ling_you = sheng_yu_ling_you;
		}
		public Integer getSkill_anqi() {
			return skill_anqi;
		}
		public void setSkill_anqi(Integer skill_anqi) {
			this.skill_anqi = skill_anqi;
		}
		public Integer getSkill_baoshi() {
			return skill_baoshi;
		}
		public void setSkill_baoshi(Integer skill_baoshi) {
			this.skill_baoshi = skill_baoshi;
		}
		public Integer getSkill_bianhua() {
			return skill_bianhua;
		}
		public void setSkill_bianhua(Integer skill_bianhua) {
			this.skill_bianhua = skill_bianhua;
		}
		public Integer getSkill_caifeng() {
			return skill_caifeng;
		}
		public void setSkill_caifeng(Integer skill_caifeng) {
			this.skill_caifeng = skill_caifeng;
		}
		public Integer getSkill_cuiling() {
			return skill_cuiling;
		}
		public void setSkill_cuiling(Integer skill_cuiling) {
			this.skill_cuiling = skill_cuiling;
		}
		public Integer getSkill_danyuan() {
			return skill_danyuan;
		}
		public void setSkill_danyuan(Integer skill_danyuan) {
			this.skill_danyuan = skill_danyuan;
		}
		public Integer getSkill_dazao() {
			return skill_dazao;
		}
		public void setSkill_dazao(Integer skill_dazao) {
			this.skill_dazao = skill_dazao;
		}
		public Integer getSkill_dazuo() {
			return skill_dazuo;
		}
		public void setSkill_dazuo(Integer skill_dazuo) {
			this.skill_dazuo = skill_dazuo;
		}
		public Integer getSkill_drive_pet() {
			return skill_drive_pet;
		}
		public void setSkill_drive_pet(Integer skill_drive_pet) {
			this.skill_drive_pet = skill_drive_pet;
		}
		public Integer getSkill_gudong() {
			return skill_gudong;
		}
		public void setSkill_gudong(Integer skill_gudong) {
			this.skill_gudong = skill_gudong;
		}
		public Integer getSkill_huoyan() {
			return skill_huoyan;
		}
		public void setSkill_huoyan(Integer skill_huoyan) {
			this.skill_huoyan = skill_huoyan;
		}
		public Integer getSkill_jianshen() {
			return skill_jianshen;
		}
		public void setSkill_jianshen(Integer skill_jianshen) {
			this.skill_jianshen = skill_jianshen;
		}
		public Integer getSkill_jianzhu() {
			return skill_jianzhu;
		}
		public void setSkill_jianzhu(Integer skill_jianzhu) {
			this.skill_jianzhu = skill_jianzhu;
		}
		public Integer getSkill_lianjin() {
			return skill_lianjin;
		}
		public void setSkill_lianjin(Integer skill_lianjin) {
			this.skill_lianjin = skill_lianjin;
		}
		public Integer getSkill_lingshi() {
			return skill_lingshi;
		}
		public void setSkill_lingshi(Integer skill_lingshi) {
			this.skill_lingshi = skill_lingshi;
		}
		public Integer getSkill_miaoshou() {
			return skill_miaoshou;
		}
		public void setSkill_miaoshou(Integer skill_miaoshou) {
			this.skill_miaoshou = skill_miaoshou;
		}
		public Integer getSkill_ming_xiang() {
			return skill_ming_xiang;
		}
		public void setSkill_ming_xiang(Integer skill_ming_xiang) {
			this.skill_ming_xiang = skill_ming_xiang;
		}
		public Integer getSkill_pengren() {
			return skill_pengren;
		}
		public void setSkill_pengren(Integer skill_pengren) {
			this.skill_pengren = skill_pengren;
		}
		public Integer getSkill_qiang_shen() {
			return skill_qiang_shen;
		}
		public void setSkill_qiang_shen(Integer skill_qiang_shen) {
			this.skill_qiang_shen = skill_qiang_shen;
		}
		public Integer getSkill_qiang_zhuang() {
			return skill_qiang_zhuang;
		}
		public void setSkill_qiang_zhuang(Integer skill_qiang_zhuang) {
			this.skill_qiang_zhuang = skill_qiang_zhuang;
		}
		public Integer getSkill_qiaojiang() {
			return skill_qiaojiang;
		}
		public void setSkill_qiaojiang(Integer skill_qiaojiang) {
			this.skill_qiaojiang = skill_qiaojiang;
		}
		public Integer getSkill_qimen() {
			return skill_qimen;
		}
		public void setSkill_qimen(Integer skill_qimen) {
			this.skill_qimen = skill_qimen;
		}
		public Integer getSkill_ronglian() {
			return skill_ronglian;
		}
		public void setSkill_ronglian(Integer skill_ronglian) {
			this.skill_ronglian = skill_ronglian;
		}
		public Integer getSkill_shensu() {
			return skill_shensu;
		}
		public void setSkill_shensu(Integer skill_shensu) {
			this.skill_shensu = skill_shensu;
		}
		public Integer getSkill_taoli() {
			return skill_taoli;
		}
		public void setSkill_taoli(Integer skill_taoli) {
			this.skill_taoli = skill_taoli;
		}
		public Integer getSkill_tiaoxi() {
			return skill_tiaoxi;
		}
		public void setSkill_tiaoxi(Integer skill_tiaoxi) {
			this.skill_tiaoxi = skill_tiaoxi;
		}
		public Integer getSkill_xianling() {
			return skill_xianling;
		}
		public void setSkill_xianling(Integer skill_xianling) {
			this.skill_xianling = skill_xianling;
		}
		public Integer getSkill_yangsheng() {
			return skill_yangsheng;
		}
		public void setSkill_yangsheng(Integer skill_yangsheng) {
			this.skill_yangsheng = skill_yangsheng;
		}
		public Integer getSkill_zhongyao() {
			return skill_zhongyao;
		}
		public void setSkill_zhongyao(Integer skill_zhongyao) {
			this.skill_zhongyao = skill_zhongyao;
		}
		public Integer getSkill_zhuibu() {
			return skill_zhuibu;
		}
		public void setSkill_zhuibu(Integer skill_zhuibu) {
			this.skill_zhuibu = skill_zhuibu;
		}
		public Integer getSmith_skill() {
			return smith_skill;
		}
		public void setSmith_skill(Integer smith_skill) {
			this.smith_skill = smith_skill;
		}
		public Integer getSpeed() {
			return speed;
		}
		public void setSpeed(Integer speed) {
			this.speed = speed;
		}
		public Integer getStatus() {
			return status;
		}
		public void setStatus(Integer status) {
			this.status = status;
		}
		public Integer getSum_exp() {
			return sum_exp;
		}
		public void setSum_exp(Integer sum_exp) {
			this.sum_exp = sum_exp;
		}
		public Integer getSword_score() {
			return sword_score;
		}
		public void setSword_score(Integer sword_score) {
			this.sword_score = sword_score;
		}
		/*public Integer getTaozhuang() {
			return taozhuang;
		}
		public void setTaozhuang(Integer taozhuang) {
			this.taozhuang = taozhuang;
		}*/
		public String getTime_left() {
			return time_left;
		}
		public void setTime_left(String time_left) {
			this.time_left = time_left;
		}
		public Integer getTingyuan_level() {
			return tingyuan_level;
		}
		public void setTingyuan_level(Integer tingyuan_level) {
			this.tingyuan_level = tingyuan_level;
		}
		public Long getUpexp() {
			return upexp;
		}
		public void setUpexp(Long upexp) {
			this.upexp = upexp;
		}
		public Integer getXian_yu() {
			return xian_yu;
		}
		public void setXian_yu(Integer xian_yu) {
			this.xian_yu = xian_yu;
		}
		public Integer getXiangrui_num() {
			return xiangrui_num;
		}
		public void setXiangrui_num(Integer xiangrui_num) {
			this.xiangrui_num = xiangrui_num;
		}
		public Integer getZhuang_zhi() {
			return zhuang_zhi;
		}
		public void setZhuang_zhi(Integer zhuang_zhi) {
			this.zhuang_zhi = zhuang_zhi;
		}
		public int getXingjiabi() {
			return xingjiabi;
		}
		public void setXingjiabi(int xingjiabi) {
			this.xingjiabi = xingjiabi;
		}
		public String getCbgurl() {
			return cbgurl;
		}
		public void setCbgurl(String cbgurl) {
			this.cbgurl = cbgurl;
		}
		
		public String getId() {
			return id;
		}

		public void setId(String id) {
			this.id = id;
		}
		public Timestamp getGetTime() {
			return getTime;
		}
		public void setGetTime(Timestamp getTime) {
			this.getTime = getTime;
		}
}
