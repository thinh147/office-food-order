package com.gogitek.orderecommerce.controller.api;

import com.gogitek.orderecommerce.common.constant.ChannelList;
import com.gogitek.orderecommerce.common.constant.Error;
import com.gogitek.orderecommerce.common.constant.Response;
import com.gogitek.orderecommerce.common.constant.ResultCodes;
import com.gogitek.orderecommerce.config.common.gogitek_response.GogitekResponse;
import com.gogitek.orderecommerce.controller.dto.req.SectionDto;
import com.gogitek.orderecommerce.controller.service.SectionService;
import com.gogitek.orderecommerce.database.entity.Section;
import com.gogitek.orderecommerce.service.cache.HomePageCache;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;

@RestController
@AllArgsConstructor
@RequestMapping("/home")
public class HomePageController {
    HomePageCache homePageCache;
    SectionService sectionService;
    @GetMapping("/product")
    public Response getRandomProductHomePage(@RequestParam Integer limit, @RequestParam(defaultValue = "") Integer channel){
        try{
            String channelName = null;
            if(channel != null){
                channelName = ChannelList.valueOfType(channel).getTypeInStr().toLowerCase();
            }
            return GogitekResponse.ok(homePageCache.getListProductRandom(limit, channelName));
        }catch (Exception e){
            return GogitekResponse.ok(new ArrayList<>());
        }
    }

    @GetMapping("/section/{id}")
    public Response findSectionById(@PathVariable Long id){
        try {
            return GogitekResponse.ok(sectionService.findById(id));
        }catch (Exception e){
            return GogitekResponse.fail(ResultCodes.INTERNAL_SERVER_ERROR, Collections.singletonList(new Error("Section",e.getMessage(),"")));
        }
    }
}
