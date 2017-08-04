package thread;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicBoolean;

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

/**
 * 多线程下写文件
 * 
 * @author Administrator
 * 
 */
public class ThreadReadWrite {

	/** 执行结果队列 */
	private ConcurrentLinkedQueue<Map<String, Object>> dataQueue;
	/** 工作线程池 */
	private ExecutorService threadPool;
	/** 工作线程数 */
	private int workerNum;
	/** 关闭状态标识 */
	private AtomicBoolean isShutDown;

	public ThreadReadWrite(int workerNum) {
		this.workerNum = workerNum > 50 ? 50 : workerNum;
		this.threadPool = Executors.newFixedThreadPool(this.workerNum);// 一定要加1，否则会缺失一个线程
		System.out.println(">>>SimpleMapReduceTaskTemplate 线程池大小：" + (this.workerNum));

		this.dataQueue = new ConcurrentLinkedQueue<Map<String, Object>>();
		this.isShutDown = new AtomicBoolean(false);
	}

	public void handle(File file) throws InterruptedException {
		try {
			checkIsShutDown();
			if (null != file) {
				System.out.println("启动ExecuteReadWorker线程池。。。。。。。。。。");
				// 启动ExecuteReadWorker线程池
				threadPool.execute(new ExecuteReadWorker(dataQueue, file));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void outPut(File file) throws InterruptedException {
		try {
			checkIsShutDown();
			if (null != file) {
				System.out.println("启动ExecuteReadWorker线程池。。。。。。。。。。");
				new Thread(new ExecuteWritWorker(file, dataQueue)).start();// 监听线程，不断从queue中读数据写入到文件中
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 关闭释放资源
	 */
	public void shutdown() {
		try {
			isShutDown.set(true);
			dataQueue.add(poison);
			if (null != threadPool) {
				threadPool.shutdown();
				threadPool.awaitTermination(Integer.MAX_VALUE, TimeUnit.SECONDS);
			}
			dataQueue.clear();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private void checkIsShutDown() throws InterruptedException {
		if (isShutDown.get())
			throw new InterruptedException("shutdown");
	}

	/** 单例毒丸对象 */
	public static final Map<String, Object> poison = new HashMap<String, Object>();
}

/**
 * 读取文件，写入到queue队列中
 * 
 * @author Administrator
 * 
 */
class ExecuteReadWorker implements Runnable {
	private ConcurrentLinkedQueue<Map<String, Object>> queue;
	private File readFile;

	public ExecuteReadWorker() {
	}

	public ExecuteReadWorker(ConcurrentLinkedQueue<Map<String, Object>> queue, File file) {
		this.queue = queue;
		this.readFile = file;
	}

	@Override
	public void run() {
		try {
			Thread.sleep(100);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		readExcel();
	}

	/**
	 * 文件讀取
	 */
	public void readExcel() {
		String fileName = readFile.getName();
		System.out.println("后缀名：" + fileName);
		try {
			if (fileName.endsWith("xls")) {
				readExcel2003(readFile.getPath(), readFile);
			} else if (fileName.endsWith("xlsx")) {
				readExcel2007(readFile.getPath(), readFile);
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
	public void readExcel2003(String filePath, File readFile) throws IOException {
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
							if (!isValidRow && cellValue != null && cellValue.trim().length() > 0) {
								isValidRow = true;
							}
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
					// 第I行所有的列数据读取完毕，放入queue
					if (isValidRow) {
						// 寫隊列數據
						queue.add(val);
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
	public void readExcel2007(String filePath, File readFile) throws IOException {
		long allStart = System.currentTimeMillis();
		String fileName = getFileName(readFile);
		FileInputStream fis = null;
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
				// System.out.println("j =
				// row.getFirstCellNum()::"+row.getFirstCellNum());
				// System.out.println("row.getPhysicalNumberOfCells()::"+row.getPhysicalNumberOfCells());
				for (int j = row.getFirstCellNum(); j <= row.getPhysicalNumberOfCells(); j++) {
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
									cellValue = new DataFormatter().formatRawCellContents(cell.getNumericCellValue(), 0,
											"yyyy-MM-dd HH:mm:ss");
								} else {
									cellValue = String.valueOf(cell.getNumericCellValue());
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
						queue.add(val);
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

	private static String getCellValue(HSSFCell cell) {
		DecimalFormat df = new DecimalFormat("#");
		String cellValue = null;
		if (cell == null)
			return null;
		switch (cell.getCellType()) {
		case HSSFCell.CELL_TYPE_NUMERIC:
			if (HSSFDateUtil.isCellDateFormatted(cell)) {
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				cellValue = sdf.format(HSSFDateUtil.getJavaDate(cell.getNumericCellValue()));
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

/**
 * 将队列中的数据写入到文件
 * 
 * @author Administrator
 *
 */
class ExecuteWritWorker implements Runnable {
	private File outFile;
	private ConcurrentLinkedQueue<Map<String, Object>> queue;

	public ExecuteWritWorker() {
	}

	public ExecuteWritWorker(File file, ConcurrentLinkedQueue<Map<String, Object>> queue) {
		this.outFile = file;
		this.queue = queue;
	}

	@Override
	public void run() {
		for (;;) {
			try {
				if (!queue.isEmpty()) {
					String content = map2Txt(queue.poll());
					long allStart = System.currentTimeMillis();
					//WriteUtils.addFileContent3(outFile, content);
					long allEnd = System.currentTimeMillis();
					System.out.println(
							"當前剩餘條數：" + queue.size() + ";正在執行寫記錄 " + content + ";耗時：" + (allEnd - allStart) + "毫秒");
				}
				Thread.sleep(1);
			} catch (InterruptedException e) {
				e.printStackTrace();
				Thread.currentThread().interrupt();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

	}

	public String map2Txt(Map<String, Object> valueMap) {
		StringBuilder strBuilder = new StringBuilder();
		int index = 1;
		int length = valueMap.size();

		for (Map.Entry<String, Object> entry : valueMap.entrySet()) {
			strBuilder.append(entry.getValue());
			if (index < length) {
				strBuilder.append(",");
			}
			index++;
		}
		return strBuilder.toString();
	}

}