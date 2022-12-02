package com.gogitek.orderecommerce.config.common;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Random;

@Component
@AllArgsConstructor
public class AutoGenerateCode {
    public String generate(){
        int leftLimit = 65; // letter 'A'
        int rightLimit = 90; // letter 'Z'
        int targetStringLength = 8;
        int maxLeng = 99999;
        int minLeng = 10000;
        Random random = new Random();
        StringBuilder buffer = new StringBuilder(targetStringLength);
        for (int i = 0; i < targetStringLength; i++) {
            int randomLimitedInt = leftLimit + (int)
                    (random.nextFloat() * (rightLimit - leftLimit + 1));
            buffer.append((char) randomLimitedInt);
        }
        return buffer.append(random.ints(minLeng,maxLeng).findFirst()
                .getAsInt()).toString();
    }
}
