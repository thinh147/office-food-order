package com.gogitek.orderecommerce.config.security;

import com.gogitek.orderecommerce.controller.dto.payload.RegisterRequest;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtTokenUtil {

    private final static Logger Logger = LoggerFactory.getLogger(JwtTokenUtil.class);

    @Value("${app.auth.tokenSecret}")
    private  String jwtSecret;

    @Value("${app.auth.tokenExpirationMsec}")
    private int jwtExpirationMs;

    public String generateJwtToken(Authentication authentication){

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        return Jwts.builder()
                .setSubject(userPrincipal.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    public String generateToken(String email){
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    public String getUserNameFromJwtToken(String token){
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
    }
    public boolean validateJwtToken(String authToken){
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException e){
            Logger.error("Invalid JWT signature: {}", e.getMessage());
            return false;
        } catch (MalformedJwtException e) {
            Logger.error("Invalid JWT Token: {}", e.getMessage());
            return false;
        } catch (ExpiredJwtException e){
            Logger.error("Invalid JWT expired: {}", e.getMessage());
            return false;
        } catch (UnsupportedJwtException e){
            Logger.error("Invalid JWT unsupported: {}", e.getMessage());
            return false;
        } catch (IllegalArgumentException e){
            Logger.error("JWT claims string empty : {}", e.getMessage());
            return false;
        }
    }
}
