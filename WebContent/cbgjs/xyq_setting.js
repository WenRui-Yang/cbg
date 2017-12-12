var SchoolNameInfo = {
	1 : "���ƹٸ�",
	2 : "������",
	3 : "Ů����",
	4 : "����ɽ",
	5 : "�칬",
	6 : "����ɽ",
	7 : "����",
	8 : "��ׯ��",
	9 : "ʨ����",
	10 : "ħ��կ",
	11 : "���ܵظ�",
	12 : "��˿��",
	13 : "��ľ��",
	14 : "�貨��",
	15 : "�޵׶�"
};
var RoleKindNameInfo = {
	1 : "��ң��",
	2 : "������",
	3 : "����Ů",
	4 : "ӢŮ��",
	5 : "��ħ��",
	6 : "��ͷ��",
	7 : "������",
	8 : "�Ǿ���",
	9 : "�����",
	10 : "��̫��",
	11 : "���켧",
	12 : "���ʶ�",
	203 : "������",
	205 : "ɱ����",
	209 : "������",
	201 : "����ʦ",
	207 : "������",
	211 : "��زز"
};
var SchoolKindMapping = {
	1 : [ 1, 2, 3, 4, 203, 201 ],
	2 : [ 1, 2, 201 ],
	3 : [ 3, 4, 203 ],
	4 : [ 1, 2, 3, 4, 203, 201 ],
	5 : [ 11, 12, 9, 10, 209, 211 ],
	6 : [ 11, 12, 211 ],
	7 : [ 11, 12, 9, 10, 209, 211 ],
	8 : [ 9, 10, 209 ],
	9 : [ 5, 6, 205 ],
	10 : [ 7, 8, 5, 6, 205, 207 ],
	11 : [ 7, 8, 5, 6, 205, 207 ],
	12 : [ 7, 8, 207 ],
	13 : [ 1, 2, 3, 4, 203, 201 ],
	14 : [ 9, 10, 11, 12, 209, 211 ],
	15 : [ 5, 6, 7, 8, 205, 207 ]
};
function get_school_name(school_id) {
	return SchoolNameInfo[school_id];
}
function get_role_iconid(type_id) {
	var need_fix_range = [ [ 13, 24 ], [ 37, 48 ], [ 61, 72 ], [ 213, 224 ],
			[ 237, 248 ], [ 261, 272 ] ];
	for (var i = 0; i < need_fix_range.length; i++) {
		var range = need_fix_range[i];
		if (type_id >= range[0] && type_id <= range[1]) {
			type_id = type_id - 12
			break;
		}
	}
	return type_id;
}
function get_role_kind_name(icon) {
	var kindid = icon;
	if (icon > 200) {
		kindid = ((icon - 200 - 1) % 12 + 1) + 200;
	} else {
		kindid = ((icon - 1) % 12 + 1);
	}
	return RoleKindNameInfo[kindid];
}
var PetEquipKindInfo = {
	1 : "����",
	2 : "��Ȧ",
	3 : "����"
};
var PRIMARY_YAO_JUE = [ "����", "����", "��Ѫ", "����", "����", "ҹս", "����", "��֪", "����",
		"ڤ˼", "�۸�", "��ɱ", "����", "��", "�м�", "����", "����", "ǿ��", "����", "͵Ϯ", "��",
		"����", "������", "ħ֮��", "���Ӹ���", "������", "������", "�׻�", "����", "ˮ��", "�һ�",
		"��������", "��������", "��������", "����������", "����������", "����������", "ˮ��������", "�ٶ�" ];
var SENIOR_YAO_JUE = [ "�߼�����", "�߼�����", "�߼���Ѫ", "�߼�����", "�߼�����", "�߼�ҹս", "�߼�����",
		"�߼���֪", "�߼�����", "�߼�ڤ˼", "�߼��۸�", "�߼���ɱ", "�߼�����", "�߼���", "�߼��м�", "�߼�����",
		"�߼�����", "�߼�ǿ��", "�߼�����", "�߼�͵Ϯ", "�߼���", "�߼�����", "�߼�������", "�߼�ħ֮��",
		"�߼����Ӹ���", "�߼�������", "�߼�������", "������", "̩ɽѹ��", "ˮ����ɽ", "�����һ�", "�߼�����������",
		"�߼�����������", "�߼�����������", "�߼�ˮ��������", "�߼���������", "�߼���������", "�߼���������", "���ݻ���",
		"��Ѫ׷��" ];
var MO_SHOU_YAO_JUE = PRIMARY_YAO_JUE.concat(SENIOR_YAO_JUE);
function is_advanced_yaojue(name) {
	for (var i = 0; i < SENIOR_YAO_JUE.length; i++)
		if (name.indexOf(SENIOR_YAO_JUE[i]) != -1)
			return true;
	return false;
}
var EquipKind = {
	"pet" : 1,
	"stone" : 2,
	"msyj" : 3,
	"other" : 4
};
var PET_WUXING_INFO = {
	"1" : "��",
	"2" : "ľ",
	"4" : "��",
	"8" : "ˮ",
	"16" : "��"
};
var PetNeidanInfo = {
	901 : "Ѹ��",
	902 : "��ŭ",
	903 : "����",
	904 : "����",
	905 : "����",
	906 : "����",
	907 : "�ý�",
	908 : "��˼",
	909 : "�ֻ�",
	910 : "���",
	912 : "����",
	913 : "ײ��",
	914 : "�����",
	915 : "��Ų��",
	916 : "������",
	917 : "������",
	918 : "������",
	919 : "�����",
	920 : "������",
	921 : "������",
	922 : "��η",
	923 : "�ߺ�",
	924 : "������",
	925 : "�����",
	926 : "ͨ�鷨",
	927 : "˫�Ǳ�",
	928 : "������",
	929 : "�㶾",
	930 : "�����",
	931 : "�Ѵ�",
	932 : "����",
	933 : "ʥ��",
	934 : "Ѫծ��",
	935 : "������",
	936 : "���",
	937 : "��ȸ��"
};
var PetSkillInfo = {
	"301" : "ҹս",
	"302" : "����",
	"303" : "����",
	"304" : "��Ѫ",
	"305" : "����",
	"306" : "����",
	"307" : "����",
	"308" : "��֪",
	"309" : "����",
	"310" : "ڤ˼",
	"311" : "���Ӹ���",
	"312" : "������",
	"313" : "����",
	"314" : "��",
	"315" : "�۸�",
	"316" : "��ɱ",
	"317" : "����",
	"318" : "������",
	"319" : "��",
	"320" : "�м�",
	"321" : "����",
	"322" : "����",
	"323" : "������",
	"324" : "ħ֮��",
	"325" : "͵Ϯ",
	"326" : "�׻�",
	"327" : "����",
	"328" : "ˮ��",
	"329" : "�һ�",
	"330" : "����������",
	"331" : "����������",
	"332" : "ˮ��������",
	"333" : "����������",
	"334" : "ǿ��",
	"335" : "����",
	"401" : "�߼�ҹս",
	"402" : "�߼�����",
	"403" : "�߼�����",
	"404" : "�߼���Ѫ",
	"405" : "�߼�����",
	"406" : "�߼�����",
	"407" : "�߼�����",
	"408" : "�߼���֪",
	"409" : "�߼�����",
	"410" : "�߼�ڤ˼",
	"411" : "�߼����Ӹ���",
	"412" : "�߼�������",
	"413" : "�߼�����",
	"414" : "�߼���",
	"415" : "�߼��۸�",
	"416" : "�߼���ɱ",
	"417" : "�߼�����",
	"418" : "�߼�������",
	"419" : "�߼���",
	"420" : "�߼��м�",
	"421" : "�߼�����",
	"422" : "�߼�����",
	"423" : "�߼�������",
	"424" : "�߼�ħ֮��",
	"425" : "�߼�͵Ϯ",
	"426" : "������",
	"427" : "̩ɽѹ��",
	"428" : "ˮ����ɽ",
	"429" : "�����һ�",
	"430" : "�߼�����������",
	"431" : "�߼�����������",
	"432" : "�߼�ˮ��������",
	"433" : "�߼�����������",
	"434" : "�߼�ǿ��",
	"435" : "�߼�����",
	"501" : "������",
	"502" : "������",
	"503" : "����ˮ",
	"504" : "�����",
	"505" : "�ٶ�",
	"510" : "��������",
	"511" : "*�Ϲ����ռ��",
	"512" : "*�Ϲ����ռ��",
	"513" : "*�Ϲ����ռ��",
	"514" : "*�Ϲ����ռ��",
	"515" : "*�ƶ��б�ռ��",
	"516" : "*�ƶ��б�ռ��",
	"551" : "����һ��",
	"552" : "�����ٻ�",
	"553" : "�Ϲ����",
	"554" : "�ƶ��б�",
	"555" : "������",
	"556" : "���",
	"557" : "��������",
	"558" : "������",
	"559" : "����ն",
	"560" : "������¶",
	"561" : "�������",
	"562" : "���꽣��",
	"563" : "���ȷ��",
	"564" : "�������",
	"565" : "��������",
	"566" : "����",
	"567" : "Ǳ������",
	"568" : "�Ƶ��ھ�",
	"569" : "������",
	"570" : "���֮��",
	"571" : "������ɽ",
	"572" : "ҹ�����",
	"573" : "�߼���������",
	"575" : "��������",
	"576" : "��������",
	"577" : "�߼���������",
	"578" : "�߼���������",
	"579" : "��������",
	"581" : "��ջ���",
	"582" : "�ٶ�����",
	"583" : "������",
	"584" : "֪��֪��",
	"585" : "���з���",
	"586" : "����",
	"587" : "��������",
	"588" : "����",
	"589" : "��ɰ��ʯ",
	"590" : "��ڤ����",
	"591" : "����ͬ��",
	"592" : "ɱ����",
	"593" : "���׷���",
	"594" : "��������",
	"595" : "���ݻ���",
	"596" : "��Ѫ׷��",
	"597" : "�����ķ�",
	"598" : "Ǳ�ܼ���",
	"599" : "�ƻ���ľ",
	"624" : "����",
	"626" : "�����ֿ�",
	"627" : "�߼������ֿ�",
	"628" : "����",
	"629" : "�߼�����",
	"631" : "����ָ·",
	"632" : "���·ת",
	"633" : "���ż�ɽ",
	"634" : "�ų��е�",
	"635" : "�������",
	"636" : "ǧ������",
	"637" : "��������",
	"638" : "��������",
	"639" : "���ܼ���",
	"640" : "����",
	"641" : "�߼�����",
	"642" : "*��������(����Ч��)",
	"644" : "��ɱ",
	"645" : "����",
	"646" : "��ʯ",
	"647" : "������ɽ",
	"648" : "��ӿ����",
	"649" : "��������",
	"650" : "���ŭ��",
	"660" : "��������",
	"661" : "��������",
	"662" : "ǧ��һŭ",
	"663" : "�콵���",
	"667" : "������",
	"669" : "�¹�",
	"671" : "��η��ʩ",
	"673" : "��ɽ����",
	"672" : "�������"
};
var PetFunctions = {
	1 : "����",
	2 : "����",
	3 : "Ѫ��",
	4 : "Ѫ����",
	5 : "������"
};
var EmptySkillImg = ResUrl + "/images/role_skills/empty_skill.gif";
var SaleNeidanSkills = [ '�����', '��Ų��', '������', '������', '������', '�����', '������',
		'������', '������', '�����', 'ͨ�鷨', '˫�Ǳ�', '������', '�����', '������', 'Ѫծ��' ];
var PetBattleLevelTypes = [ [ 2559, 0 ], [ 2047, 0 ], [ 2046, 0 ], [ 2045, 0 ],
		[ 2044, 0 ], [ 2555, 0 ], [ 2554, 0 ], [ 2042, 0 ], [ 2553, 0 ],
		[ 2041, 0 ], [ 2552, 0 ], [ 2040, 0 ], [ 2039, 0 ], [ 2038, 0 ],
		[ 2037, 0 ], [ 2036, 0 ], [ 2548, 0 ], [ 2547, 0 ], [ 2034, 0 ],
		[ 2546, 0 ], [ 2033, 0 ], [ 2545, 0 ], [ 2544, 0 ], [ 2030, 0 ],
		[ 2542, 0 ], [ 2029, 0 ], [ 2541, 0 ], [ 2028, 0 ], [ 2540, 0 ],
		[ 2539, 0 ], [ 2538, 0 ], [ 2537, 0 ], [ 2024, 0 ], [ 2536, 0 ],
		[ 2023, 0 ], [ 2534, 0 ], [ 2022, 0 ], [ 2533, 0 ], [ 2530, 0 ],
		[ 2529, 0 ], [ 2017, 0 ], [ 2528, 0 ], [ 2015, 0 ], [ 2012, 0 ],
		[ 2524, 0 ], [ 2523, 0 ], [ 2011, 0 ], [ 2010, 0 ], [ 2522, 0 ],
		[ 2009, 0 ], [ 2007, 0 ], [ 2006, 0 ], [ 2517, 0 ], [ 2004, 0 ],
		[ 2003, 0 ], [ 2515, 0 ], [ 2002, 0 ], [ 2001, 0 ], [ 2512, 0 ],
		[ 2511, 0 ], [ 2510, 0 ], [ 2509, 0 ], [ 2507, 0 ], [ 2506, 0 ],
		[ 2504, 0 ], [ 2502, 0 ], [ 2501, 0 ], [ 2324, 2 ], [ 2323, 2 ],
		[ 2322, 2 ], [ 2321, 2 ], [ 2320, 2 ], [ 2319, 2 ], [ 2824, 2 ],
		[ 2823, 2 ], [ 2310, 0 ], [ 2822, 2 ], [ 2309, 0 ], [ 2821, 2 ],
		[ 2308, 0 ], [ 2820, 2 ], [ 2307, 0 ], [ 2819, 2 ], [ 2306, 0 ],
		[ 2305, 0 ], [ 2304, 0 ], [ 2303, 0 ], [ 2300, 0 ], [ 2810, 0 ],
		[ 2809, 0 ], [ 2808, 0 ], [ 2807, 0 ], [ 2806, 0 ], [ 2805, 0 ],
		[ 2804, 0 ], [ 2803, 0 ], [ 2283, 0 ], [ 2783, 0 ], [ 2247, 2 ],
		[ 2246, 2 ], [ 2245, 2 ], [ 2244, 2 ], [ 2243, 2 ], [ 2242, 2 ],
		[ 2241, 1 ], [ 2240, 1 ], [ 2239, 1 ], [ 2238, 0 ], [ 2237, 0 ],
		[ 2236, 0 ], [ 2235, 0 ], [ 2747, 2 ], [ 2234, 0 ], [ 2746, 2 ],
		[ 2233, 0 ], [ 2745, 2 ], [ 2232, 1 ], [ 2744, 2 ], [ 2231, 1 ],
		[ 2743, 2 ], [ 2230, 1 ], [ 2742, 2 ], [ 2229, 0 ], [ 2741, 1 ],
		[ 2228, 0 ], [ 2740, 1 ], [ 2227, 0 ], [ 2739, 1 ], [ 2226, 0 ],
		[ 2738, 0 ], [ 2225, 0 ], [ 2737, 0 ], [ 2224, 0 ], [ 2736, 0 ],
		[ 2735, 0 ], [ 2223, 0 ], [ 2222, 0 ], [ 2734, 0 ], [ 2221, 0 ],
		[ 2733, 0 ], [ 2220, 0 ], [ 2732, 1 ], [ 2219, 0 ], [ 2731, 1 ],
		[ 2218, 0 ], [ 2730, 1 ], [ 2217, 0 ], [ 2729, 0 ], [ 2216, 0 ],
		[ 2728, 0 ], [ 2215, 0 ], [ 2727, 0 ], [ 2214, 0 ], [ 2726, 0 ],
		[ 2213, 0 ], [ 2725, 0 ], [ 2212, 0 ], [ 2724, 0 ], [ 2723, 0 ],
		[ 2211, 0 ], [ 2722, 0 ], [ 2210, 0 ], [ 2209, 0 ], [ 2721, 0 ],
		[ 2208, 0 ], [ 2720, 0 ], [ 2207, 0 ], [ 2719, 0 ], [ 2206, 0 ],
		[ 2718, 0 ], [ 2205, 0 ], [ 2717, 0 ], [ 2204, 0 ], [ 2716, 0 ],
		[ 2715, 0 ], [ 2203, 0 ], [ 2714, 0 ], [ 2202, 0 ], [ 2713, 0 ],
		[ 2201, 0 ], [ 2712, 0 ], [ 2200, 0 ], [ 2711, 0 ], [ 2199, 0 ],
		[ 2198, 0 ], [ 2710, 0 ], [ 2197, 0 ], [ 2709, 0 ], [ 2708, 0 ],
		[ 2196, 0 ], [ 2707, 0 ], [ 2195, 0 ], [ 2706, 0 ], [ 2194, 0 ],
		[ 2705, 0 ], [ 2193, 0 ], [ 2704, 0 ], [ 2192, 0 ], [ 2703, 0 ],
		[ 2191, 0 ], [ 2702, 0 ], [ 2190, 0 ], [ 2701, 0 ], [ 2189, 0 ],
		[ 2188, 0 ], [ 2700, 0 ], [ 2187, 0 ], [ 2699, 0 ], [ 2698, 0 ],
		[ 2186, 0 ], [ 2185, 0 ], [ 2697, 0 ], [ 2184, 0 ], [ 2696, 0 ],
		[ 2183, 0 ], [ 2695, 0 ], [ 2694, 0 ], [ 2182, 0 ], [ 2693, 0 ],
		[ 2181, 0 ], [ 2692, 0 ], [ 2180, 0 ], [ 2691, 0 ], [ 2179, 0 ],
		[ 2690, 0 ], [ 2178, 0 ], [ 2689, 0 ], [ 2688, 0 ], [ 2687, 0 ],
		[ 2686, 0 ], [ 2685, 0 ], [ 2684, 0 ], [ 2683, 0 ], [ 2682, 0 ],
		[ 2681, 0 ], [ 2680, 0 ], [ 2679, 0 ], [ 2678, 0 ], [ 2164, 0 ],
		[ 2163, 1 ], [ 2162, 0 ], [ 2161, 1 ], [ 2160, 1 ], [ 2159, 0 ],
		[ 2153, 0 ], [ 2664, 0 ], [ 2152, 0 ], [ 2663, 1 ], [ 2151, 0 ],
		[ 2662, 0 ], [ 2150, 0 ], [ 2661, 1 ], [ 2660, 1 ], [ 2659, 0 ],
		[ 2144, 0 ], [ 2143, 0 ], [ 2142, 0 ], [ 2141, 0 ], [ 2653, 0 ],
		[ 2140, 0 ], [ 2652, 0 ], [ 2139, 0 ], [ 2651, 0 ], [ 2138, 0 ],
		[ 2650, 0 ], [ 2137, 0 ], [ 2136, 0 ], [ 2135, 0 ], [ 2134, 0 ],
		[ 2133, 0 ], [ 2130, 1 ], [ 2129, 0 ], [ 2128, 1 ], [ 2127, 0 ],
		[ 2126, 1 ], [ 2125, 0 ], [ 2124, 0 ], [ 2123, 0 ], [ 2122, 0 ],
		[ 2121, 0 ], [ 2120, 0 ], [ 2119, 0 ], [ 2630, 1 ], [ 2118, 0 ],
		[ 2629, 0 ], [ 2117, 0 ], [ 2628, 1 ], [ 2116, 0 ], [ 2627, 0 ],
		[ 2115, 0 ], [ 2626, 1 ], [ 2114, 0 ], [ 2625, 0 ], [ 2113, 0 ],
		[ 2624, 0 ], [ 2112, 0 ], [ 2623, 0 ], [ 2111, 0 ], [ 2622, 0 ],
		[ 2621, 0 ], [ 2620, 0 ], [ 2619, 0 ], [ 2107, 0 ], [ 2618, 0 ],
		[ 2106, 0 ], [ 2617, 0 ], [ 2105, 0 ], [ 2616, 0 ], [ 2104, 0 ],
		[ 2615, 0 ], [ 2103, 0 ], [ 2614, 0 ], [ 2102, 0 ], [ 2613, 0 ],
		[ 2612, 0 ], [ 2099, 0 ], [ 2611, 0 ], [ 2098, 0 ], [ 2097, 0 ],
		[ 2096, 0 ], [ 2607, 0 ], [ 2095, 0 ], [ 2606, 0 ], [ 2094, 0 ],
		[ 2605, 0 ], [ 2093, 0 ], [ 2604, 0 ], [ 2603, 0 ], [ 2602, 0 ],
		[ 2599, 0 ], [ 2087, 0 ], [ 2598, 0 ], [ 2086, 0 ], [ 2597, 0 ],
		[ 2085, 0 ], [ 2596, 0 ], [ 2595, 0 ], [ 2594, 0 ], [ 2593, 0 ],
		[ 2078, 0 ], [ 2077, 0 ], [ 2076, 0 ], [ 2587, 0 ], [ 2586, 0 ],
		[ 2074, 0 ], [ 2585, 0 ], [ 2073, 0 ], [ 2072, 0 ], [ 2071, 0 ],
		[ 2070, 0 ], [ 2068, 0 ], [ 2067, 0 ], [ 2578, 0 ], [ 2066, 0 ],
		[ 2577, 0 ], [ 2065, 0 ], [ 2576, 0 ], [ 2064, 0 ], [ 2063, 0 ],
		[ 2574, 0 ], [ 2062, 0 ], [ 2061, 0 ], [ 2573, 0 ], [ 2572, 0 ],
		[ 2571, 0 ], [ 2059, 0 ], [ 2570, 0 ], [ 2568, 0 ], [ 2567, 0 ],
		[ 2055, 0 ], [ 2054, 0 ], [ 2566, 0 ], [ 2053, 0 ], [ 2565, 0 ],
		[ 2052, 0 ], [ 2564, 0 ], [ 2563, 0 ], [ 2562, 0 ], [ 2561, 0 ],
		[ 2048, 0 ] ];
function get_pet_battle_level(petId) {
	for (var i = 0, max = PetBattleLevelTypes.length; i < max; i++) {
		var list = PetBattleLevelTypes[i];
		var id = +list[0] + 100000;
		if (petId == id) {
			return list[1];
		}
	}
	return -1;
}
function get_pet_ext_zz(data, options) {
	if (data.pet_name.indexOf('����') === 0 && data.lifetime === '����') {
		return;
	}
	options = Object
			.merge(
					{
						attrs : 'gong_ji_ext,fang_yu_ext,su_du_ext,duo_shan_ext,ti_li_ext,fa_li_ext',
						total_attrs : 'gong_ji_zz,fang_yu_zz,su_du_zz,duo_shan_zz,ti_li_zz,fa_li_zz',
						csavezz : '',
						carrygradezz : -1,
						pet_id : -1
					}, options || {});
	var attrs = options.attrs.split(','), totalAttrs = options.total_attrs
			.split(',');
	var csavezz = options.csavezz;
	var carrygradezz = options.carrygradezz;
	if (!csavezz) {
		return;
	}
	csavezz = csavezz.split('|');
	if (carrygradezz < 0 || carrygradezz === void 0) {
		carrygradezz = get_pet_battle_level(options.pet_id);
	}
	if (carrygradezz < 0) {
		return;
	}
	var maxZZ = [ [ 1550, 1550, 1550, 1800, 5500, 3050 ],
			[ 1600, 1600, 1600, 2000, 6500, 3500 ],
			[ 1650, 1650, 1650, 2000, 7000, 3600 ] ];
	var zz = maxZZ[carrygradezz];
	for (var i = 0, max = zz.length; i < max; i++) {
		var z = zz[i];
		var key = attrs[i];
		var totalKey = totalAttrs[i];
		if (totalKey in data) {
			var value = data[totalKey] - Math.max(z, csavezz[i] || 0);
			data[key] = Math.max(value, 0);
			data[totalKey] -= data[key];
		}
	}
}