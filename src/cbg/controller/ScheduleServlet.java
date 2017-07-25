package cbg.controller;

import java.util.Date;
import java.util.Timer;
import java.util.TimerTask;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

import cbg.dao.CbgRoleDao;

/**
 * 网站首页定时生成
 * 
 * @author Administrator
 * 
 */
public class ScheduleServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public ScheduleServlet() {
		super();
	}

	public void destroy() {
		super.destroy();
	}

	public void init() throws ServletException {
		System.out.println("删除14天前的数据");
		this.timerTask();
	}

	public static void timerTask() {
		new Timer().schedule(new TimerTask() {
			@Override
			public void run() {
				CbgRoleDao cbgdao = new CbgRoleDao();
				try {
					cbgdao.delete14day();
					cbgdao.closeConnection();
				} catch (Exception e) {
					e.printStackTrace();
				}
				System.out.println("删除14天前的数据成功-----------------------------");
			}
		}, new Date(), 1000*60*60*24);
	}
}
