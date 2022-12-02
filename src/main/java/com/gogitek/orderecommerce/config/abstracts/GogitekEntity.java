package com.gogitek.orderecommerce.config.abstracts;

import javax.persistence.*;

@MappedSuperclass
public class GogitekEntity extends BaseEntity {
    public GogitekEntity() {
    }

    @Basic
    @Id
    @Column(
            name = "id"
    )
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    public Long getId() {
        return this.id;
    }

    public boolean equals(Object o) {
        if (o == this) {
            return true;
        } else if (!(o instanceof GogitekEntity)) {
            return false;
        } else {
            GogitekEntity other = (GogitekEntity)o;
            if (!other.canEqual(this)) {
                return false;
            } else {
                return super.equals(o);
            }
        }
    }

    protected boolean canEqual(Object other) {
        return other instanceof GogitekEntity;
    }

    public int hashCode() {
        int result = super.hashCode();
        return result;
    }
}
