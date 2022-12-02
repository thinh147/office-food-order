package com.gogitek.orderecommerce.controller.service;

import com.gogitek.orderecommerce.config.common.gogitek_pagination.PaginationPage;
import com.gogitek.orderecommerce.controller.dto.req.VoucherListReq;
import com.gogitek.orderecommerce.controller.dto.req.VoucherReq;
import com.gogitek.orderecommerce.controller.dto.res.GetListVoucherRes;
import com.gogitek.orderecommerce.controller.dto.res.UserDto;
import com.gogitek.orderecommerce.database.entity.common.Voucher;

import java.util.List;

public interface VoucherService {
    Voucher saveVoucherAndRelationTable(VoucherReq req);
    void subtractVoucherAfterCreateOrder(Long id, Long userId);
    PaginationPage<GetListVoucherRes> getListVoucher(VoucherListReq req);
}
