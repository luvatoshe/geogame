package com.example.geogame;

import javafx.application.Application;
import javafx.application.Platform;
import javafx.scene.Scene;
import javafx.scene.image.Image;
import javafx.scene.web.WebEngine;
import javafx.scene.web.WebView;
import javafx.stage.Stage;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import java.io.InputStream;

@SpringBootApplication
public class GeogameApplication {

    public static void main(String[] args) {
        SpringApplication.run(GeogameApplication.class, args);
        Application.launch(GameWindow.class, args);
    }

    public static class GameWindow extends Application {

        @Override
        public void start(Stage stage) {
            String port = System.getProperty("server.port", "8081");
            String url = "http://localhost:" + port;

            WebView webView = new WebView();
            WebEngine engine = webView.getEngine();
            engine.load(url);

            Scene scene = new Scene(webView, 1280, 820);

            stage.setTitle("Географический тест");
            stage.setScene(scene);
            stage.setMinWidth(900);
            stage.setMinHeight(600);

            try (InputStream icon = GeogameApplication.class.getResourceAsStream("/icon.png")) {
                if (icon != null) {
                    stage.getIcons().add(new Image(icon));
                }
            } catch (Exception ignored) {}

            stage.setOnCloseRequest(e -> {
                Platform.exit();
                System.exit(0);
            });

            stage.show();
        }
    }
}