package com.gogitek.orderecommerce.database.repository;

import com.gogitek.orderecommerce.database.converter.ProductConverter;
import com.gogitek.orderecommerce.database.entity.common.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

public interface ProductRepo extends JpaRepository<Product, Long> {
    @Query(value = "SELECT p.id as id, p.name as name, " +
            "p.product_url as productUrl, p.affiliate_url as affiliateUrl,  " +
            "p.image_url as imageUrl, p.percent_discount as percentDiscount,  " +
            "p.channel as channel, ca.id as subcategoryId, " +
            "ca.title as subcategoryName, " +
            "p.trademark as trademark, " +
            "p.description as description, " +
            "ca.id as categoryId,  " +
            "ca.title as categoryTitle," +
            "p.price as price," +
            "p.meta_data as metaData " +
            "FROM product p " +
            "LEFT JOIN product_category_tracking t on p.id = t.product_id " +
            "LEFT JOIN sub_category ca on t.category_id = ca.id  " +
            "WHERE 1 = 1 " +
            "AND (COALESCE(?1, NULL) is NULL " +
            "   OR p.id LIKE %?1% " +
            "   OR p.channel LIKE %?1% " +
            "   OR p.name LIKE %?1% " +
            "   OR ca.title LIKE %?1% " +
            "   OR p.code LIKE %?1%) " +
            "AND (COALESCE(?2, NULL) is NULL OR p.product_url = ?2 OR p.affiliate_url = ?2)" +
            "AND (COALESCE(?3, NULL) is NULL OR p.created_at >= ?3)" +
            "AND (COALESCE(?4, NULL) is NULL OR p.created_at <= ?4)"+
            "AND (COALESCE(?5, NULL) is NULL OR p.channel in (?5))"+
            "AND (COALESCE(?6, NULL) is NULL OR p.trademark in (?6))" +
            "AND (COALESCE(?7, NULL) is NULL OR ca.id in (?7)) " +
            "AND is_delete = 0 " +
            "GROUP BY p.id",
            countQuery = "SELECT count(p.id) " +
                    "FROM product p " +
                    "LEFT JOIN product_category_tracking t on p.id = t.product_id " +
                    "LEFT JOIN sub_category ca on t.category_id = ca.id  " +
                    "WHERE 1 = 1 " +
                    "AND (COALESCE(?1, NULL) is NULL " +
                    "   OR p.id LIKE %?1% " +
                    "   OR p.channel LIKE %?1% " +
                    "   OR p.name LIKE %?1% " +
                    "   OR ca.title LIKE %?1%" +
                    "   OR p.code LIKE %?1%) " +
                    "AND (COALESCE(?2, NULL) is NULL OR p.product_url = ?2 OR p.affiliate_url = ?2)" +
                    "AND (COALESCE(?3, NULL) is NULL OR p.created_at >= ?3)" +
                    "AND (COALESCE(?4, NULL) is NULL OR p.created_at <= ?4)"+
                    "AND (COALESCE(?5, NULL) is NULL OR p.channel in (?5))"+
                    "AND (COALESCE(?6, NULL) is NULL OR p.trademark in (?6))" +
                    "AND (COALESCE(?7, NULL) is NULL OR ca.id in (?7)) " +
                    "AND is_delete = 0 " +
                    "GROUP BY p.id",
            nativeQuery = true)
    Page<ProductConverter> getListProduct(String key,
                                          String url,
                                          Instant updatedAtFrom,
                                          Instant updatedAtTo,
                                          List<String> channel,
                                          List<String> trademark,
                                          List<Long> cateId,
                                          Pageable pageable);

    @Query( "select p from Product p where p.id in :ids" )
    List<Product> findByProductIds(@Param("ids") List<Long> ids);

    @Query(value = "SELECT p.id as id, p.name as name, " +
            "p.product_url as productUrl, p.affiliate_url as affiliateUrl,  " +
            "p.image_url as imageUrl, p.percent_discount as percentDiscount,  " +
            "p.channel as channel, ca.id as subcategoryId, " +
            "ca.title as subcategoryName, " +
            "p.trademark as trademark, " +
            "p.description as description, " +
            "ca.id as categoryId,  " +
            "ca.title as categoryTitle," +
            "p.price as price, " +
            "p.meta_data as metaData " +
            "FROM product p " +
            "LEFT JOIN product_category_tracking t on p.id = t.product_id " +
            "LEFT JOIN sub_category ca on t.category_id = ca.id  " +
            "WHERE p.id = ?1 " +
            "GROUP BY p.id ", nativeQuery = true)
    Optional<ProductConverter> getProductConverterById(Long id);

    @Query(value = "SELECT p.id as id, p.name as name,  " +
            "p.product_url as productUrl, p.affiliate_url as affiliateUrl,   " +
            "p.image_url as imageUrl, p.percent_discount as percentDiscount,   " +
            "p.channel as channel, ca.id as subcategoryId,  " +
            "ca.title as subcategoryName,  " +
            "p.trademark as trademark,  " +
            "p.description as description,  " +
            "ca.id as categoryId,   " +
            "ca.title as categoryTitle, " +
            "p.price as price,  " +
            "p.meta_data as metaData  " +
            "FROM product p  " +
            "LEFT JOIN product_category_tracking t on p.id = t.product_id  " +
            "LEFT JOIN sub_category ca on t.category_id = ca.id  " +
            "WHERE ?2 is null or p.channel = ?2 " +
            "GROUP BY p.id order by rand() limit ?1 ", nativeQuery = true)
    List<ProductConverter> findProductInLimit(Integer limit, String channel);
}
