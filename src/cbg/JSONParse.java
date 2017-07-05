package cbg;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;

import cbg.entity.CbgEntity;  

public class JSONParse {  
    private static HashMap<String, String> jsonMap = new HashMap<String, String>();  
    private static int layer;  
    private static int layer2;  
  
    public static void parseJson(JSONObject jsonObject) {  
        parseJson(jsonObject, null);  
    }  
      
    public static void parseJson(JSONObject jsonObject, String appendKey){  
        if (jsonObject == null)  
            return;  
        @SuppressWarnings("unchecked")  
        Iterator<String> it = jsonObject.keys();  
        while (it.hasNext()) {  
            String key = it.next();  
            JSONArray array = jsonObject.optJSONArray(key);  
            if(appendKey == null)  
                appendKey = key;  
            else  
                appendKey = appendKey + "/" + key;  
              
            if (array == null){  
                String value = jsonObject.optString(key);  
                if(value != null && !value.contains("{")){  
                    jsonMap.put(appendKey, value);  
                }else{
                	if(value.contains("{")){
                		parseJson(getJSONObject(value),appendKey);  
                	}else{
                		System.out.println(value);
                	}
                }  
            }  
            else {  
                parseJsonArray(array, -1,layer);  
            }  
        }  
    }  
      
    public static JSONObject getJSONObject(String json){  
        try {  
			JSONObject result = new JSONObject(json);  
			return result;  
        } catch (JSONException e) {  
            e.printStackTrace();  
        }  
        return null;  
    }  
      
    /** 
     * 当index为-1时，表示没有进行jsonArray迭代 
     * @param array 
     * @param index 
     * @param layer 
     * @return 
     */  
    public static int parseJsonArray(JSONArray array, int index,int layer) {  
        if (array == null)  
            return layer;  
        int lastLayer = layer++;  
        int len = array.length();  
        for (int i = 0; i < len; i++) {  
            JSONObject obj = (JSONObject) array.opt(i);  
            @SuppressWarnings("unchecked")  
            Iterator<String> it = obj.keys();  
            while (it.hasNext()) {  
                String key = it.next();  
                JSONArray a = obj.optJSONArray(key);  
                if (a != null)  
                    parseJsonArray(a, i,layer);  
                else {  
                	String keyvalue = obj.optString(key);
                    
                    String jsonKey = i + "/" + lastLayer + "/" + key;  
                    if(keyvalue != null && !keyvalue.contains("{")){  
                        jsonMap.put(jsonKey, keyvalue);  
                    }else{
                    	if(keyvalue != null && keyvalue.startsWith("[")){
                    		JSONArray array2 = obj.optJSONArray(keyvalue);  
                    		parseJsonArray(array2, -1,layer2);  
                    		
                    	}else{
                    		JSONObject jsonObject = getJSONObject(keyvalue);  
                        	parseJson(jsonObject, jsonKey);  
                    	}
                    	
                    }
                }  
            }  
        }  
        return layer;  
    }  
      
    public static HashMap<String,String> getJSONMap(){  
        return jsonMap;  
    }  
    
    public static void main(String[] args) {
    	String getUrl = "http://xyq.cbg.163.com/cgi-bin/xyq_overall_search.py?j49koy60&level_min=175&level_max=175&limit_clothes_logic=or&act=overall_search_role&page=1";
		String s = HttpRequest.sendGet(getUrl, "");
		
		JSONObject cbgobj = getJSONObject(s);
		
		/*if (cbgobj == null)  
            return;  
        @SuppressWarnings("unchecked")  
        Iterator<String> it = cbgobj.keys();  
        while (it.hasNext()) {  
            String key = it.next();  
            JSONArray array = cbgobj.optJSONArray(key);  
            String value = cbgobj.optString(key);
            HashMap<String, String> cbgjsonMap = new HashMap<String, String>();  
            cbgjsonMap.put(key, value);  
        } */
		
		String pager = cbgobj.optString("pager");
		JSONObject pagerobj = getJSONObject(pager);
        
		JSONArray rolelist = cbgobj.optJSONArray("equip_list");
		
		
		List<CbgEntity> list = new ArrayList<>();
		Gson gson = new Gson();
		for(int i = 0 ;i < rolelist.length();i++){
			CbgEntity cbgEntity = null;
			try {
				cbgEntity = gson.fromJson(rolelist.getString(i), CbgEntity.class);
			} catch (JsonSyntaxException e) {
				e.printStackTrace();
			} catch (JSONException e) {
				e.printStackTrace();
			}
			if(cbgEntity!=null){
				list.add(cbgEntity);
			}
		}
		
		/*parseJson();
		Map map = getJSONMap();*/
	}
}  