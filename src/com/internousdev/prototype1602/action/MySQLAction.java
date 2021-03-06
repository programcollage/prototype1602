/**
 *
 */
package com.internousdev.prototype1602.action;

import java.util.List;

import com.internousdev.prototype1602.dao.MySQLDAO;
import com.internousdev.prototype1602.dto.MySQLDTO;
import com.opensymphony.xwork2.ActionSupport;

/**
 * ユーザーをデータベースへ追加するActionクラス
 *
 * @author SHOUGO TOOI
 * @version 1.0
 * @since 1.0
 */
public class MySQLAction extends ActionSupport {

    /**
     * 生成されたシリアルナンバー
     */
    private static final long serialVersionUID = -3702786559657479634L;
    private String mode;
    private String id;
    private String password;
    private List<MySQLDTO> selectList;

    private String notifyMessage;

    public String execute() {
        String msg = ERROR;
        MySQLDAO dao = new MySQLDAO();
        String notify = "";
        if (mode.equals("search")) {
            notify = "検索";
            if (id.equals("")) {
                selectList = dao.selectAll();
            } else {
                selectList = dao.select(id);
            }
            notifyMessage = notify + "が完了しました。";
            return SUCCESS;
        }

        // search以外
        selectList = dao.selectAll();
        if (mode.equals("insert")) {
            notify = "追加";
            dao.insert(id, password);
            msg = SUCCESS;

        } else if (mode.equals("update")) {
            notify = "更新";
            msg = SUCCESS;
            dao.update(id, password);
        } else if (mode.equals("delete")) {
            notify = "削除";
            dao.delete(id);
            msg = SUCCESS;

        }
        notifyMessage = notify + "が完了しました。";
        return msg;

    }

    /**
     * @return mode
     */
    public String getMode() {
        return mode;
    }

    /**
     * @param mode セットする mode
     */
    public void setMode(String mode) {
        this.mode = mode;
    }

    /**
     * @return password
     */
    public String getPassword() {
        return password;
    }

    /**
     * @param password セットする password
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * @return selectList
     */
    public List<MySQLDTO> getSelectList() {
        return selectList;
    }

    /**
     * @param selectList セットする selectList
     */
    public void setSelectList(List<MySQLDTO> selectList) {
        this.selectList = selectList;
    }

    /**
     * @return id
     */
    public String getId() {
        return id;
    }

    /**
     * @param id セットする id
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * @return notifyMessage
     */
    public String getNotifyMessage() {
        return notifyMessage;
    }

    /**
     * @param notifyMessage セットする notifyMessage
     */
    public void setNotifyMessage(String notifyMessage) {
        this.notifyMessage = notifyMessage;
    }

}
