package com.gogitek.orderecommerce.config.common.gogitek_response;

import com.gogitek.orderecommerce.common.constant.Error;

import java.util.Collection;
import java.util.Collections;

class ErrorHandle extends Content{
    protected Collection<Error> errors;

    public ErrorHandle(int code, String message, Collection<Error> errors) {
        super(code, message);
        this.errors = (Collection)(errors == null ? Collections.emptyList() : errors);
    }

    public String toString() {
        StringBuffer sb = new StringBuffer("ErrorContent{");
        sb.append("errors=").append(this.errors);
        sb.append(", code='").append(this.code).append('\'');
        sb.append(", message='").append(this.message).append('\'');
        sb.append('}');
        return sb.toString();
    }

    public Collection<Error> getErrors() {
        return this.errors;
    }

    public void setErrors(Collection<Error> errors) {
        this.errors = errors;
    }
}
