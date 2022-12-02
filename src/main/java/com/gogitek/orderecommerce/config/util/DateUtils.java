package com.gogitek.orderecommerce.config.util;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Date;
import java.util.TimeZone;

public class DateUtils {
    private static final String TIME_ZONE = "Asia/Ho_Chi_Minh";
    private static final String DATE_FORMAT = "MM/dd/yyyy";
    private static final String VN_DATE_TIME_FORMAT = "dd/MM/yyyy HH:mm:ss";

    public static String formatInstantByVNFormat(Instant date) {
        if (date == null) return "";
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(VN_DATE_TIME_FORMAT).withZone(ZoneId.of(TIME_ZONE));
        return formatter.format(date);
    }

    public static Instant convertStringToInstant(String dateStr) {
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern(VN_DATE_TIME_FORMAT);
            return LocalDateTime.parse(dateStr, formatter).atZone(ZoneId.of(TIME_ZONE)).toInstant();
        } catch (DateTimeParseException e) {
            return null;
        }
    }

    public static String formatInstantToString(Instant date, String pattern) {
        if (date == null) return "";
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern).withZone(ZoneId.of("UTC"));
        return formatter.format(date);
    }

    public static Instant convertStringToInstantVN(String dateStr) {
        try {
            SimpleDateFormat format = new SimpleDateFormat(VN_DATE_TIME_FORMAT);
            format.setTimeZone(TimeZone.getTimeZone(TIME_ZONE));
            Date date = format.parse(dateStr);

            return date.toInstant();
        } catch (Exception e) {
            return null;
        }
    }
}
