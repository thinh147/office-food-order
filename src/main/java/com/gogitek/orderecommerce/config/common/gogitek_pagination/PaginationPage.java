package com.gogitek.orderecommerce.config.common.gogitek_pagination;

import java.util.Collection;
import java.util.Collections;

public class PaginationPage<E> {
    long totalElements = 0L;
    Collection<E> elements;

    public PaginationPage() {
    }

    public PaginationPage<E> setElements(Collection<E> elements) {
        this.elements = (Collection)(elements == null ? Collections.emptyList() : elements);
        return this;
    }

    public Collection<E> getElements() {
        return this.elements;
    }

    public PaginationPage<E> setTotalElements(long totalElements) {
        this.totalElements = totalElements;
        return this;
    }

    public long getTotalElements() {
        return this.totalElements == 0L ? (long)this.elements.size() : this.totalElements;
    }
}
