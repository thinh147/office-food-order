package com.gogitek.orderecommerce.database.entity;

import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Setter
@Entity
@Table(name = "payment_log")
public class PaymentLog {
    private long id;
    private String action;
    private String actionExtend;
    private Long userId;
    private String userName;
    private String userEmail;
    private String changeInfos;
    private String objectId;
    private Long extendId;
    protected String before;
    protected String after;
    private Timestamp created;
    private Timestamp updated;
    private Integer orderType;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    @Basic
    @Column(name = "action")
    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    @Basic
    @Column(name = "action_extend")
    public String getActionExtend() {
        return actionExtend;
    }

    public void setActionExtend(String actionExtend) {
        this.actionExtend = actionExtend;
    }

    @Basic
    @Column(name = "user_id")
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Basic
    @Column(name = "user_name")
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    @Basic
    @Column(name = "change_infos")
    public String getChangeInfos() {
        return changeInfos;
    }

    public void setChangeInfos(String changeInfos) {
        this.changeInfos = changeInfos;
    }

    @Basic
    @Column(name = "object_id")
    public String getObjectId() {
        return objectId;
    }

    public void setObjectId(String objectId) {
        this.objectId = objectId;
    }

    @Basic
    @Column(name = "extend_id")
    public Long getExtendId() {
        return extendId;
    }

    public void setExtendId(Long extendId) {
        this.extendId = extendId;
    }

    @Basic
    @CreationTimestamp
    @Column(name = "created")
    public Timestamp getCreated() {
        return created;
    }

    public void setCreated(Timestamp created) {
        this.created = created;
    }

    @Basic
    @UpdateTimestamp
    @Column(name = "updated")
    public Timestamp getUpdated() {
        return updated;
    }

    public void setUpdated(Timestamp updated) {
        this.updated = updated;
    }

    @Basic
    @Column(name = "`after`")
    public String getAfter() {
        return after;
    }

    public void setAfter(String after) {
        this.after = after;
    }

    @Basic
    @Column(name = "`before`")
    public String getBefore() {
        return before;
    }

    public void setBefore(String before) {
        this.before = before;
    }

    @Basic
    @Column(name = "user_email")
    public String getUserEmail() {
        return userEmail;
    }

    @Basic
    @Column(name = "order_type")
    public Integer getOrderType() {
        return orderType;
    }

    public void setOrderType(Integer userName) {
        this.orderType = userName;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
}