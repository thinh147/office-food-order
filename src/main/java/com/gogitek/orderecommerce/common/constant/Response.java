package com.gogitek.orderecommerce.common.constant;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class Response extends ResponseEntity<Object> {
    protected Response(HttpStatus status) {
        super(status);
    }

    public Response(Object body, HttpStatus status) {
        super(body, status);
    }

    public String toString() {
        StringBuilder builder = new StringBuilder("<");
        builder.append(this.getStatusCode().toString());
        builder.append(' ');
        builder.append(this.getStatusCode().getReasonPhrase());
        builder.append(',');
        Object body = this.getBody();
        HttpHeaders headers = this.getHeaders();
        if (body != null) {
            builder.append(body.toString());
            builder.append(',');
        }

        builder.append(headers);
        builder.append('>');
        return builder.toString();
    }
}
