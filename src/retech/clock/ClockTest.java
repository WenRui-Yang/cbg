package retech.clock;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class ClockTest {
	/**
	 * 文件讀取
	 */
	public void readExcel() {
		String filePath = "C:/Users/SEELE/Documents/Tencent Files/979302157/FileRecv/8月考勤.xlsx";
		File file = new File(filePath);
		try {
			if (filePath.endsWith("xls")) {
				readExcel2003(filePath, file);
			} else if (filePath.endsWith("xlsx")) {
				readExcel2007(filePath, file);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 合并方法，读取excel文件 根据文件名自动识别读取方式 支持97-2013格式的excel文档
	 * 
	 * @param fileName
	 *            上传文件名
	 * @param file
	 *            上传的文件
	 * @return 返回列表内容格式： 每一行数据都是以对应列的表头为key 内容为value 比如 excel表格为：
	 *         =============== A | B | C | D ===|===|===|=== 1 | 2 | 3 | 4
	 *         ---|---|---|--- a | b | c | d --------------- 返回值 map： map1: A:1
	 *         B:2 C:3 D:4 map2: A:a B:b C:d D:d
	 * @throws java.io.IOException
	 */
	/**
	 * 读取97-2003格式
	 * 
	 * @param filePath
	 *            文件路径
	 * @throws java.io.IOException
	 */
	public void readExcel2003(String filePath, File readFile)
			throws IOException {
		long allStart = System.currentTimeMillis();
		String fileName = getFileName(readFile);
		FileInputStream fis = null;
		try {
			fis = new FileInputStream(filePath);
			HSSFWorkbook wookbook = new HSSFWorkbook(fis); // 创建对Excel工作簿文件的引用
			HSSFSheet sheet = wookbook.getSheetAt(0); // 在Excel文档中，第一张工作表的缺省索引是0
			int rows = sheet.getPhysicalNumberOfRows(); // 获取到Excel文件中的所有行数­
			Map<Integer, String> keys = new HashMap<Integer, String>();
			int cells = 0;
			// 遍历行­（第1行 表头） 准备Map里的key
			HSSFRow firstRow = sheet.getRow(0);
			if (firstRow != null) {
				// 获取到Excel文件中的所有的列
				cells = firstRow.getPhysicalNumberOfCells();
				// 遍历列
				for (int j = 0; j < cells; j++) {
					// 获取到列的值­
					try {
						HSSFCell cell = firstRow.getCell(j);
						String cellValue = getCellValue(cell);
						keys.put(j, cellValue);
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
			// 遍历行­（从第二行开始）
			for (int i = 1; i < rows; i++) {
				// 读取左上端单元格(从第二行开始)
				HSSFRow row = sheet.getRow(i);
				// 行不为空
				if (row != null) {
					// 准备当前行 所储存值的map
					Map<String, Object> val = new LinkedHashMap<String, Object>();
					val.put("extra", fileName);
					boolean isValidRow = false;

					// 遍历列
					for (int j = 0; j < cells; j++) {
						// 获取到列的值­
						try {
							HSSFCell cell = row.getCell(j);
							String cellValue = getCellValue(cell);
							val.put(keys.get(j), cellValue);
							if (!isValidRow && cellValue != null
									&& cellValue.trim().length() > 0) {
								isValidRow = true;
							}
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
					// 第I行所有的列数据读取完毕，放入queue
					if (isValidRow) {
						// 寫隊列數據
						// queue.add(val);
					}
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			fis.close();
		}
		long allEnd = System.currentTimeMillis();
		System.out.println("执行文件读取共需：" + (allEnd - allStart) + "毫秒");
	}

	/**
	 * 合并方法，读取excel文件 根据文件名自动识别读取方式 支持97-2013格式的excel文档
	 * 
	 * @param fileName
	 *            上传文件名
	 * @param file
	 *            上传的文件
	 * @return 返回列表内容格式： 每一行数据都是以对应列的表头为key 内容为value 比如 excel表格为：
	 *         =============== A | B | C | D ===|===|===|=== 1 | 2 | 3 | 4
	 *         ---|---|---|--- a | b | c | d --------------- 返回值 map： map1: A:1
	 *         B:2 C:3 D:4 map2: A:a B:b C:d D:d
	 * @throws java.io.IOException
	 */
	/**
	 * 读取2007-2013格式
	 * 
	 * @param filePath
	 *            文件路径
	 * @return
	 * @throws java.io.IOException
	 */
	public void readExcel2007(String filePath, File readFile)
			throws IOException {
		long allStart = System.currentTimeMillis();
		String fileName = getFileName(readFile);
		FileInputStream fis = null;
		Map<Integer,Map<String, Object>> dataMap = new LinkedHashMap<Integer, Map<String, Object>>();
		try {
			fis = new FileInputStream(filePath);
			XSSFWorkbook xwb = new XSSFWorkbook(fis); // 构造XSSFWorkbook对象，strPath传入文件路径
			XSSFSheet sheet = xwb.getSheetAt(0); // 读取第一章表格内容
			// 定义 row、cell
			XSSFRow row;
			// 循环输出表格中的第一行内容 表头
			Map<Integer, String> keys = new HashMap<Integer, String>();
			row = sheet.getRow(0);
			if (row != null) {
				// System.out.println("j = row.getFirstCellNum()::"+row.getFirstCellNum());
				// System.out.println("row.getPhysicalNumberOfCells()::"+row.getPhysicalNumberOfCells());
				for (int j = row.getFirstCellNum(); j <= row
						.getPhysicalNumberOfCells(); j++) {
					// 通过 row.getCell(j).toString() 获取单元格内容，
					if (row.getCell(j) != null) {
						if (!row.getCell(j).toString().isEmpty()) {
							keys.put(j, row.getCell(j).toString());
						}
					} else {
						keys.put(j, "K-R1C" + j + "E");
					}
				}
			}
			// 循环输出表格中的从第二行开始内容
			for (int i = sheet.getFirstRowNum() + 1; i <= sheet.getPhysicalNumberOfRows(); i++) {
				row = sheet.getRow(i);
				if (row != null) {
					boolean isValidRow = false;
					Map<String, Object> val = new LinkedHashMap<String, Object>();
					val.put("extra", fileName);
					for (int j = row.getFirstCellNum(); j <= row.getPhysicalNumberOfCells(); j++) {
						XSSFCell cell = row.getCell(j);
						if (cell != null) {
							String cellValue = null;
							if (cell.getCellType() == XSSFCell.CELL_TYPE_NUMERIC) {
								if (DateUtil.isCellDateFormatted(cell)) {
									cellValue = new DataFormatter()
											.formatRawCellContents(
													cell.getNumericCellValue(),
													0, "yyyy-MM-dd HH:mm:ss");
								} else {
									cellValue = String.valueOf(cell
											.getNumericCellValue());
								}
							} else {
								cellValue = cell.toString();
							}
							if (cellValue != null && cellValue.trim().length() <= 0) {
								cellValue = null;
							}
							val.put(keys.get(j), cellValue);
							if (!isValidRow && cellValue != null && cellValue.trim().length() > 0) {
								isValidRow = true;
							}
						}
					}
					// 第I行所有的列数据读取完毕，放入queue
					if (isValidRow) {
						// 寫隊列數據
						// queue.add(val);
						dataMap.put(i, val);
					}
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			fis.close();
		}
		long allEnd = System.currentTimeMillis();
		System.out.println("执行文件读取共需：" + (allEnd - allStart) + "毫秒");
		
		String username = "";
		Date startdate = null;
		Date enddate = null;
		 for (Entry<Integer, Map<String, Object>> entry : dataMap.entrySet()) {
			 Map<String, Object> tmpmap = entry.getValue();
			 username  = String.valueOf(tmpmap.get("姓名"));
			 
			 if(tmpmap.get("日期时间").equals("")){
				 
			 }
			 //for (Entry<String, Object> entrydata : entry.getValue().entrySet()) {
				
				   //System.out.println("key= " + entrydata.getKey() + " and value= " + entrydata.getValue());
			// }
		 }
		
		
	}

	private static String getCellValue(HSSFCell cell) {
		DecimalFormat df = new DecimalFormat("#");
		String cellValue = null;
		if (cell == null)
			return null;
		switch (cell.getCellType()) {
		case HSSFCell.CELL_TYPE_NUMERIC:
			if (HSSFDateUtil.isCellDateFormatted(cell)) {
				SimpleDateFormat sdf = new SimpleDateFormat(
						"yyyy-MM-dd HH:mm:ss");
				cellValue = sdf.format(HSSFDateUtil.getJavaDate(cell
						.getNumericCellValue()));
				break;
			}
			cellValue = df.format(cell.getNumericCellValue());
			break;
		case HSSFCell.CELL_TYPE_STRING:
			cellValue = String.valueOf(cell.getStringCellValue());
			break;
		case HSSFCell.CELL_TYPE_FORMULA:
			cellValue = String.valueOf(cell.getCellFormula());
			break;
		case HSSFCell.CELL_TYPE_BLANK:
			cellValue = null;
			break;
		case HSSFCell.CELL_TYPE_BOOLEAN:
			cellValue = String.valueOf(cell.getBooleanCellValue());
			break;
		case HSSFCell.CELL_TYPE_ERROR:
			cellValue = String.valueOf(cell.getErrorCellValue());
			break;
		}
		if (cellValue != null && cellValue.trim().length() <= 0) {
			cellValue = null;
		}
		return cellValue;
	}

	/**
	 * 通過路徑獲取文件名稱
	 * 
	 * @param filePath
	 * @return
	 */
	public static String getFileName(File file) {
		if (null != file) {
			String fileName = file.getName();
			if (fileName.indexOf(".") > -1) {
				return fileName.split("\\.")[0];
			}
		}
		return null;
	}
}
