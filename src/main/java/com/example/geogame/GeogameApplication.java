package com.example.geogame;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.Environment;

import java.awt.Desktop;
import java.net.URI;

@SpringBootApplication
public class GeogameApplication {

    public static void main(String[] args) {
        ConfigurableApplicationContext ctx = SpringApplication.run(GeogameApplication.class, args);
        openBrowser(ctx);
    }

    private static void openBrowser(ConfigurableApplicationContext ctx) {
        try {
            Environment env = ctx.getEnvironment();
            String port = env.getProperty("server.port", "8081");
            String url = "http://localhost:" + port;
            if (Desktop.isDesktopSupported() && Desktop.getDesktop().isSupported(Desktop.Action.BROWSE)) {
                Desktop.getDesktop().browse(new URI(url));
            }
        } catch (Exception e) {
            System.out.println("Откройте вручную: http://localhost:8081");
        }
    }
}
