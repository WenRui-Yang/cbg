package cbg.test;

import java.util.HashMap;
import java.util.Map;

import org.junit.Test;

import cbg.dao.CbgRoleDao;
import cbg.entity.CbgEntity;

public class CbgDaoTest {
	
	//@Test
    public void testAdd() throws Exception {
		CbgEntity emp = new CbgEntity();
		emp.setId(CbgRoleDao.getUUID());
		emp.setNickname("测试");
        CbgRoleDao dao = new CbgRoleDao();
        dao.addCbgEntity(emp);
    }
    //@Test
    public void testUpdate() throws Exception {
        CbgRoleDao dao = new CbgRoleDao();
        CbgEntity emp = dao.findById("029e28503d604925ae35cb75ce2fa345");
        emp.setPrice("100");
        dao.updateCbgEntity(emp);
    }
    //@Test
    public void testdelete() throws Exception {
        CbgRoleDao dao = new CbgRoleDao();
        CbgEntity emp = dao.findById("029e28503d604925ae35cb75ce2fa345");
        dao.deleteCbgEntity(emp);
    }
    @Test
    public void testfindbyparam() throws Exception {
    	CbgRoleDao dao = new CbgRoleDao();
    	Map<String,	 Object> queryparam = new HashMap<>();
		queryparam.put("roleid", "1");
		queryparam.put("area_name", "12");
		queryparam.put("server_name", "1243");
		CbgEntity localCbgEntity = dao.findByParam(queryparam);
    }
}
