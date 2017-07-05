package cbg.jdbc;

import java.io.IOException;
import java.util.Properties;

public class Config {
    private static Properties prop = new Properties();    
    static{        
        try {
            //加载dbconfig.properties配置文件
            prop.load(Config.class.getResourceAsStream("dbconfig.properties"));
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
    
    //设置常量
    public static final String CLASS_NAME = prop.getProperty("jdbc.driver");
    public static final String DATABASE_URL = prop.getProperty("jdbc.url");
    public static final String USERNAME = prop.getProperty("jdbc.username");
    public static final String PASSWORD = prop.getProperty("jdbc.password");
    
}
