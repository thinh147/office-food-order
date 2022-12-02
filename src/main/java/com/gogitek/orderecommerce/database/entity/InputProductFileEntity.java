package com.gogitek.orderecommerce.database.entity;

import com.gogitek.orderecommerce.config.common.excel.InputProductFile;
import lombok.Setter;
import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Getter
@Setter
@Entity
@Table(name = "input_product_file_entity")
public class InputProductFileEntity extends InputProductFile {
    @Id
    @Column(name = "id")
    public Long getId() {
        return id;
    }

    @Basic
    @Column(name = "product_name")
    public String getName() {
        return name;
    }

    @Basic
    @CreationTimestamp
    @Column(name = "created")
    public Timestamp getCreated() {
        return created;
    }

    @Basic
    @UpdateTimestamp
    @Column(name = "updated")
    public Timestamp getUpdated() {
        return updated;
    }

    @Override
    @Column(name = "user_id")
    public Long getUserId() {
        return userId;
    }

    @Basic
    @Column(name = "success")
    public int getSuccess() {
        return success;
    }

    @Basic
    @Column(name = "failure")
    public int getFailure() {
        return failure;
    }

    @Basic
    @Column(name = "total_rows")
    public int getTotalRows() {
        return totalRows;
    }

    @Basic
    @Column(name = "status")
    public String getStatus() {
        return status;
    }

    @Basic
    @Column(name = "created_by")
    public String getCreatedBy() {
        return createdBy;
    }

    @Basic
    @Column(name = "invalidRows")
    public String getInvalidRows() {
        return invalidRows;
    }

    @Override
    @Column(name = "link")
    public String getLink() {
        return link;
    }

    @Override
    @Column(name = "size")
    public Long getSize(){
        return size;
    }
}
