package cbg.util;


	import java.io.File;
import java.io.FileReader;
import java.io.IOException;  
	import java.util.regex.Matcher;  
	import java.util.regex.Pattern;  
	   
	   
	/** 
	 * 提取邮件地址 
	 */  
	public class MailUtil {  
	       
	    private final static Pattern emailer = Pattern.compile("\\w+?@\\w+?.com");  
	       
	    /** 
	     * @param args 
	     * @throws IOException 
	     */  
	    public static void main(String[] args) throws IOException {  
	        String txt = readString2();  
	        int i=0,j = 0;
	        //System.out.println(txt);  
	        Matcher matchr = emailer.matcher(txt);  
	        while (matchr.find()) {  
	            String email = matchr.group();  
	            System.out.println(email);  
	            i++;
	            if(i%50 ==0){
	            	j++;
	            	System.out.println("===================="+j);
	            }
	        }  
	        System.out.println(i);
	    }  
	    
	    
	    private static String readString2()

	    {

	        StringBuffer str=new StringBuffer("");

	        File file=new File("D:\\mail2.txt");

	        try {

	            FileReader fr=new FileReader(file);

	            int ch = 0;

	            while((ch = fr.read())!=-1 )

	            {
	            	str.append((char)ch);
	                //System.out.print((char)ch+" "); 

	            }

	            fr.close();

	        } catch (IOException e) {

	            // TODO Auto-generated catch block

	            e.printStackTrace();

	            System.out.println("File reader出错");

	        }
	        
	        return str.toString();

	    }
	   
	}
