package com.gogitek.orderecommerce.database.entity;

import com.gogitek.orderecommerce.common.constant.OrderStatus;
import com.gogitek.orderecommerce.config.common.AutoGenerateCode;
import com.gogitek.orderecommerce.config.common.gogitek_response.MultiLangException;
import com.gogitek.orderecommerce.config.exception.ResultCodes;
import com.gogitek.orderecommerce.database.entity.common.Address;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;

import javax.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "sale_order")
public class SaleOrder implements Serializable {  //fill data vào bảng này
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "order_code")
    private String orderCode;

    @Column(name = "customer_id") //Id khách hàng
    private Long customerId;

    @Column(name = "active") //Có còn hoạt động không, đóng vai trò là 1 flags (Giống isDelete)
    private Integer active;

    @Column(name = "order_date") //Ngày bắt đầu (Lấy từ bảng orderDate sang)
    private Instant orderDate;

    @Column(name = "due_date") //Ngày đáo hạn: Chỉ cho thanh toán trong khoảng ngày, hết hạn đấy chuyển status -> reject
    private Instant dueDate;

    @Column(name = "completed_date") //Ngày hoàn thành
    private Instant completedDate;

    @Column(name = "note") //Ghi chú
    private String note;

    @Column(name = "payment_status") //Trạng thái thanh toán, bám tài liệu
    private Integer paymentStatus;

    @Column(name = "order_id") //Mã đơn hàng
    private Long orderId;

    @Column(name = "total_net_price") //Tổng giá trước thuế
    private Double totalNetPrice;

    @Column(name = "total_vat") //Thuế
    private Double totalVat;

    @Column(name = "final_price") //Giá cuối phải trả = tổng giá trước thuế *(1-discount) + total_vat
    private Double finalPrice;

    @Column(name = "discount") // Discount?
    private Double discount;

    @Column(name = "event_id") //cái này cần để t làm một số cái, tạm thời cứ fill null vào
    private Long eventId;

    @Column(name = "updated_at") //Ngày update
    private Instant updatedAt;

    @Column(name = "customer_name")
    private String customerName;

    @Column(name = "customer_phone")
    private String customerPhone;

    @Column(name = "customer_email")
    private String customerEmail;

    @Column(name = "payment_fee")//Phí ship
    private Double paymentFee;

    @Column(name = "payment_method_code") //Hình thức thanh toán, tạm thời cứ fix cứng nó là 1 băng enum
    private Integer paymentMethodCode;

    @Column(name = "total_point") //Số điểm tích được từ đơn lẻ này
    private Double totalPoint;

    @Column(name = "status") //Trạng thái đơn bán
    private Integer status;

    @Column(name = "point_used_amount") //Điểm sử dụng
    private Double pointUsedAmount;

    @Column(name = "sale_order_item")
    private String saleOrderItem;

   @Column(name = "address_id")
    private Long addressId;

   @Column(name = "address")
    private String address;

   @Column(name = "gross_code")
   private String grossCode;

   @Column(name = "order_type")
   private Integer orderType;

   @Column(name = "shipper_id")
   private Long shipperId;

   public Boolean canConfirm(){
       return OrderStatus.PENDING.getValue().equals(this.status);
   }

   public void confirm(){
       this.status = OrderStatus.BUYING.getValue();
       this.updatedAt = Instant.now();
   }

   public Boolean canReject(){
       return OrderStatus.PENDING.getValue().equals(this.status) || OrderStatus.BUYING.getValue().equals(this.status);
   }

   public void reject(){
       this.status = OrderStatus.REJECTED.getValue();
       this.updatedAt = Instant.now();
   }

   public void cancel(){
       if(!OrderStatus.CANCELED.getValue().equals(this.status) && !OrderStatus.REJECTED.getValue().equals(this.status)) this.status = OrderStatus.CANCELED.getValue();
   }

   public boolean isCanceled(){
       return OrderStatus.CANCELED.getValue().equals(this.status) && OrderStatus.REJECTED.getValue().equals(this.status);
   }
}
