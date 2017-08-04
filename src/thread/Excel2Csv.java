package thread;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.mysql.jdbc.StringUtils;

public class Excel2Csv {

	public static void main(String[] args) {
		String directoryPath = "C:\\Users\\KingXu\\Desktop\\五大行业关键词";
		String outFilePath = "C:\\Users\\KingXu\\Desktop\\keyword.txt";
		try {
			List<String> filePathList = refreshFileList(directoryPath);
			readExcel(filePathList, outFilePath);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private static void readExcel(List<String> filePathList, String outFilePath) {
		ThreadReadWrite smtt = null;
		try {
			smtt = new ThreadReadWrite(2);
			for (String filePath : filePathList) {
				File file = new File(filePath);
				// 执行任务模板
				smtt.handle(file);
			}
			File file = new File(outFilePath);
			smtt.outPut(file);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 通過路徑獲取文件名稱
	 * 
	 * @param filePath
	 * @return
	 */
	public static String getFileName(String filePath) {
		if (null != filePath && !StringUtils.isNullOrEmpty(filePath)) {
			File file = new File(filePath);
			String fileName = file.getName();
			if (fileName.indexOf(".") > -1) {
				return fileName.split(".")[0];
			}
		}
		return null;
	}

	/**
	 * 获取目录下的所有文件
	 * 
	 * @param strPath
	 * @return
	 */
	public static List<String> refreshFileList(String directoryPath) {
		File dir = new File(directoryPath);
		File[] files = dir.listFiles();
		if (files == null)
			return null;
		List<String> filelist = new ArrayList<String>();
		for (int i = 0; i < files.length; i++) {
			if (files[i].isDirectory()) {
				refreshFileList(files[i].getAbsolutePath());
			} else {
				String strFileName = files[i].getAbsolutePath().toLowerCase();
				System.out.println("---" + strFileName);
				filelist.add(files[i].getAbsolutePath());
			}
		}
		return filelist;
	}

}