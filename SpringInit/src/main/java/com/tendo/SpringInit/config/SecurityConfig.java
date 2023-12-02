package com.tendo.SpringInit.config;

import com.tendo.SpringInit.filter.CsrfCookieFilter;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import java.util.Collections;

@Configuration
public class SecurityConfig
{

    private static final String[] AUTHENTICATED_APIS    =   {  };
    private static final String[] GET_PERMITTED_APIS    =   { "/api/login" };
    private static final String[] POST_PERMITTED_APIS   =   { "/api/register", "/api/authority", "/api/role" };
    private static final String[] CSRF_IGNORE_APIS      =   { "/api/register", "/addAuthority", "/addRole" };

    @Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception
    {
        CsrfTokenRequestAttributeHandler requestHandler = new CsrfTokenRequestAttributeHandler();
        requestHandler.setCsrfRequestAttributeName("_csrf");

        http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.ALWAYS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.GET, "/api/test").hasAuthority("USER")
                .requestMatchers(HttpMethod.GET, AUTHENTICATED_APIS).authenticated()
                .requestMatchers(HttpMethod.GET, GET_PERMITTED_APIS).permitAll()
                .requestMatchers(HttpMethod.POST, POST_PERMITTED_APIS).permitAll()
            )
            .cors(corsCustomizer -> corsCustomizer.configurationSource(new CorsConfigurationHelper()))
            .csrf((csrf) -> csrf
                    .csrfTokenRequestHandler(requestHandler).ignoringRequestMatchers(CSRF_IGNORE_APIS)
                    .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
            )
            .addFilterAfter(new CsrfCookieFilter(), BasicAuthenticationFilter.class)
            .httpBasic(Customizer.withDefaults());

        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder getPasswordEncoder()
    {
        return new BCryptPasswordEncoder();
    }
}

class CorsConfigurationHelper implements CorsConfigurationSource
{
    @Override
    public CorsConfiguration getCorsConfiguration(HttpServletRequest request)
    {
        CorsConfiguration   corsConfig  =   new CorsConfiguration();

        corsConfig.setAllowedOrigins(Collections.emptyList());
        corsConfig.setAllowedMethods(Collections.singletonList("*"));
        corsConfig.setAllowedHeaders(Collections.singletonList("*"));
        corsConfig.setExposedHeaders(Collections.singletonList("Authorization")); // FOR JWT
        corsConfig.setAllowCredentials(true);
        corsConfig.setMaxAge(3600L);

        return corsConfig;
    }
}
