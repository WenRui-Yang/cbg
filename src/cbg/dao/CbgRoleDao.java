package cbg.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import cbg.entity.CbgEntity;

public class CbgRoleDao extends BaseDAO<CbgEntity> {
	
	// 添加操作
    public boolean addCbgEntity(final CbgEntity entity) throws Exception {
        save(entity);
        return true;
    }

    public List<CbgEntity> getCbgEntityList(int id) throws Exception {
        List<CbgEntity> lstEntity = new ArrayList<CbgEntity>();
        CbgEntity entity = findById(id);
        // 将当前封转好的数据装入对象中
        lstEntity.add(entity);
        return lstEntity;
    }
    
    //删除
    public void deleteCbgEntity(final CbgEntity entity) throws Exception {
        this.delete(entity);
    }
    //修改
    public void updateCbgEntity(final CbgEntity entity) throws Exception {
        this.update(entity);
    }
    
    public static String getUUID(){ 
        String s = UUID.randomUUID().toString(); 
        //去掉“-”符号 
        return s.substring(0,8)+s.substring(9,13)+s.substring(14,18)+s.substring(19,23)+s.substring(24); 
    } 
}
