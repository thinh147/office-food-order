package com.gogitek.orderecommerce.service.impl.service;

import com.gogitek.orderecommerce.common.constant.AccountRole;
import com.gogitek.orderecommerce.config.common.gogitek_pagination.PaginationPage;
import com.gogitek.orderecommerce.config.security.UserPrincipal;
import com.gogitek.orderecommerce.config.util.DateUtils;
import com.gogitek.orderecommerce.controller.dto.req.VoucherListReq;
import com.gogitek.orderecommerce.controller.dto.req.VoucherReq;
import com.gogitek.orderecommerce.controller.dto.res.GetListVoucherRes;
import com.gogitek.orderecommerce.controller.service.VoucherService;
import com.gogitek.orderecommerce.database.converter.VoucherConverter;
import com.gogitek.orderecommerce.database.entity.common.User;
import com.gogitek.orderecommerce.database.entity.common.Voucher;
import com.gogitek.orderecommerce.database.entity.common.VoucherUserEntity;
import com.gogitek.orderecommerce.database.repository.VoucherRepo;
import com.gogitek.orderecommerce.database.repository.VoucherUserRepo;
import com.gogitek.orderecommerce.service.mapper.CommonMapper;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class VoucherServiceImp implements VoucherService {
    VoucherRepo voucherRepo;

    VoucherUserRepo voucherUserRepo;

    CommonMapper commonMapper;
    public Voucher createVoucher(VoucherReq req) {

        Voucher voucher = new Voucher();
        if(req.getId() != null){
            voucher = voucherRepo.getById(req.getId());
        }
        voucher.setCode(req.getCode());
        List<User> users = req.getUserIds().stream().map(User::new).collect(Collectors.toList());
        voucher.setUsers(users);
        voucher.setChannel(req.getChannel());
        voucher.setCreatedDate(Instant.now());
        voucher.setDiscountType(req.getTypeDiscount());
        voucher.setDiscount(req.getDiscount());
        voucher.setIsActive(0);
        voucher.setMaxPriceDiscount(req.getPriceDiscountMax());
        voucher.setCode(req.getCode());
        voucher.setDueDate(DateUtils.convertStringToInstantVN(req.getEndDate()));
        voucher.setStartDate(DateUtils.convertStringToInstantVN(req.getStartDate()));
        voucher.setMaxPriceDiscount(req.getPriceDiscountMax());

        voucherRepo.save(voucher);
        return voucher;
    }

    @Override
    public Voucher saveVoucherAndRelationTable(VoucherReq req) {
        Voucher voucher = createVoucher(req);
        List<Long> userIds = voucher.getUsers().stream().map(User::getId).collect(Collectors.toList());
        List<VoucherUserEntity> res = voucherUserRepo.getListVoucherUserByVoucherIdAndUserIdIn(voucher.getId(), userIds);
        voucherUserRepo.saveAll(res.stream().peek(item -> {
                    item.setQuantityRemaining(req.getQuantity());
                    item.setQuantity(req.getQuantity());
                })
                .collect(Collectors.toList()));
        return voucher;
    }

    @Override
    public PaginationPage<GetListVoucherRes> getListVoucher(VoucherListReq req) {
        UserPrincipal userPresent = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        PaginationPage<GetListVoucherRes> res = new PaginationPage<>();
        Long id = userPresent.getId();
        if(userPresent.getRole().equals(AccountRole.ADMIN.getTypeInStr())) id = null;
        Pageable pageable = PageRequest.of(req.getPage(), req.getSize());
        Page<VoucherConverter> listVoucherConverter = voucherRepo.getListVoucher(req.getCode(), req.getStatus(), id, pageable);
        res.setTotalElements(listVoucherConverter.getTotalElements());
        res.setElements(listVoucherConverter.stream().map(item -> commonMapper.converterToRes(item)).collect(Collectors.toList()));
        return res;
    }

    @Override
    public void subtractVoucherAfterCreateOrder(Long id, Long userId) {
        List<VoucherUserEntity> voucherUserEntity = voucherUserRepo.getListVoucherUserByVoucherIdAndUserIdIn(id, List.of(userId));
        voucherUserRepo.saveAll(voucherUserEntity.stream().peek(item -> item.setQuantity(item.getQuantity() - 1)).collect(Collectors.toList()));
    }
}
