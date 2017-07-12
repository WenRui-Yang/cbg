package cbg.util;

import cbg.entity.CbgEntity;

public class PriceUtil {
	//系数 100R/mhb
	private static int mhb=1200;
	/**
	 * 一个大致的估算
	 * @param c
	 * @return
	 */
	public int value(CbgEntity c){
		int value=0;
		//行囊扩展数目
		value += (c.getBaggage_extend_num())*100*mhb;
		//现金+储备
		value +=((c.getCash()+c.getLearn_cash()/2)/10000);
		//修炼计算
		value += (getxiulian(c.getExpt_fangyu()));
		value += (getxiulian(c.getExpt_kangfa()));
		
		value += (getxiulian(c.getExpt_gongji()))*1.5;
		value += (getxiulian(c.getExpt_fashu()))*1.5;
		value += (getxiulian(c.getExpt_lieshu()))*1.5;
		//宝宝修炼计算
		value += getbbxiulian(c.getBb_expt_fangyu());
		value += getbbxiulian(c.getBb_expt_kangfa());
		value += getbbxiulian(c.getBb_expt_gongji());
		value += getbbxiulian(c.getBb_expt_fashu());
		//技能计算
		value += getSkilla(c.getSchool_skill_1());
		value += getSkilla(c.getSchool_skill_2());
		value += getSkilla(c.getSchool_skill_3());
		value += getSkilla(c.getSchool_skill_4());
		value += getSkilla(c.getSchool_skill_5());
		value += getSkilla(c.getSchool_skill_6());
		value += getSkilla(c.getSchool_skill_7());
		
		//辅助技能
		value += getshenghuo(c.getSkill_qiang_shen());
		value += getshenghuo(c.getSkill_anqi());
		value += getshenghuo(c.getSkill_caifeng());
		value += getshenghuo(c.getSkill_cuiling());
		value += getshenghuo(c.getSkill_dazao());
		value += getshenghuo(c.getSkill_jianshen());
		value += getshenghuo(c.getSkill_lianjin());
		value += getshenghuo(c.getSkill_ming_xiang());
		value += getshenghuo(c.getSkill_pengren());
		value += getshenghuo(c.getSkill_qiaojiang());
		value += getshenghuo(c.getSkill_ronglian());
		value += getshenghuo(c.getSkill_taoli());
		value += getshenghuo(c.getSkill_yangsheng());
		value += getshenghuo(c.getSkill_zhongyao());
		value += getshenghuo(c.getSkill_zhuibu());
		value += getshenghuo(c.getSew_skill());
		value += getshenghuo(c.getSkill_lingshi());
		
		
		return value;
	}
	
	//修炼
	public int getxiulian(int level){
		int sum = 0;
		//2  花费
		int array[] = {30,42,58,78,102,130,162,198,238,282,330,382,438,498,562,630,702,778,858,942,1030,1122,1218,1318,1422};
		
		for(int i = 0;i<level;i++){
			sum += array[i];
		}
		return sum;
	}
	
	//BB修炼
	public int getbbxiulian(int level){
		int sum = 0;
		//花费经验
		int array[] = {150,210,290,390,510,650,810,990,1190,1410,1650,1910,2190,2490,2810,3150,3510,3890,4290,4710,5150,5610,6090,6590,7110};
		for(int i = 0;i<level;i++){
			sum += array[i]/150*75;
		}
		return sum;
	}
	
	//师门技能计算
	public  int getSkilla( int levels) {
		if(levels >180){
			levels = 180;
		}
		long sum = 0;
		int temp[] = { 6, 12, 19, 28, 38, 51, 67, 86, 110, 139, 174, 216, 266, 325, 393, 472, 563, 667, 786, 919, 1070,
				1238, 1426, 1636, 1868, 2124, 2404, 2714, 3050, 3420, 3820, 4255, 4725, 5234, 5783, 6374, 7009, 7690,
				8419, 9199, 10032, 10920, 11865, 12871, 13938, 15070, 16270, 17540, 18882, 20299, 21795, 23371, 25031,
				26777, 28613, 30541, 32565, 34687, 36911, 39240, 41676, 44224, 46886, 49666, 52568, 55595, 58749, 62036,
				65458, 69019, 72723, 76574, 80575, 84730, 89043, 93518, 98160, 102971, 107956, 113119, 118465, 123998,
				129721, 135640, 141758, 148080, 154611, 161355, 168316, 175500, 182910, 190551, 198429, 206548, 214913,
				223529, 232400, 241533, 250931, 260599, 270544, 280770, 291283, 302087, 313188, 324592, 336303, 348328,
				360672, 373339, 386337, 399671, 413346, 427368, 441743, 456477, 471576, 487045, 502891, 519120, 535737,
				552749, 570163, 587984, 606218, 624873, 643954, 663468, 683421, 703819, 724671, 745981, 767757, 790005,
				812733, 835947, 859653, 883860, 908573, 933799, 959547, 985822, 1012633, 1039986, 1067888, 1096347,
				1125371, 1154965, 1185139, 1215900, 2494508, 2558419, 2623549, 2689914, 2757527, 4239607, 4344845,
				4452027, 4561177, 4672319, 4510041, 4594563, 4680138, 4766769, 4854465, 4943226, 5033064, 5123985,
				5215995, 5309100, 7204407, 7331490, 7460064, 7590129, 7721700, 9818475, 9986727, 10156893, 10328979,
				12252600 };
			for (int i = 0; i < levels; i++) {
				sum += temp[i];
			}
		return (int) (sum/10000);
	}
	
	//生活技能
	public int getshenghuo(int levels){
		long sum = 0L;
		int costlevel = levels/25;
		if(costlevel >6){
			costlevel = 6;
		}
		int casharray[] = {6283,111949,624526,2087756,5279766,11213056};
		int banggongarray[] = {325,950,1575,2200,2825,3450};
		for(int i = 0;i<costlevel;i++){
			sum += casharray[i];
			sum += banggongarray[i]/1000*30*mhb*10;
		}
		return (int) (sum/10000);
	}
}
