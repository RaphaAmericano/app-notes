package com.notes.api.config;

import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.boot.web.servlet.server.ConfigurableServletWebServerFactory;
import org.springframework.stereotype.Component;

@Component
public class CustomizationBean implements WebServerFactoryCustomizer<ConfigurableServletWebServerFactory> {
    // todo: url da api diferente do cliente
    @Override
    public void customize(ConfigurableServletWebServerFactory container){
        //container.setContextPath("/api");
    }
}
