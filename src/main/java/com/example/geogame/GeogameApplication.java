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

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

@SpringBootApplication
public class GeogameApplication {

    public static void main(String[] args) {
        Application.launch(GameWindow.class, args);
    }

    public static class GameWindow extends Application {

        @Override
        public void start(Stage stage) {
            // Spring Boot — в отдельном потоке, чтобы не блокировать JavaFX
            new Thread(() -> {
                try {
                    SpringApplication.run(GeogameApplication.class, new String[0]);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }, "spring-boot").start();

            WebView webView = new WebView();
            WebEngine engine = webView.getEngine();

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

            waitForServerAndLoad(engine, "http://localhost:8081");
        }

        private void waitForServerAndLoad(WebEngine engine, String url) {
            new Thread(() -> {
                for (int i = 0; i < 60; i++) {
                    if (isServerUp(url)) {
                        Platform.runLater(() -> engine.load(url));
                        return;
                    }
                    try { Thread.sleep(500); } catch (InterruptedException ignored) {}
                }
                // Если через 30 сек не поднялся — всё равно пробуем
                Platform.runLater(() -> engine.load(url));
            }, "server-watcher").start();
        }

        private boolean isServerUp(String url) {
            try {
                HttpURLConnection conn = (HttpURLConnection) new URL(url).openConnection();
                conn.setConnectTimeout(500);
                conn.setReadTimeout(500);
                int code = conn.getResponseCode();
                return code >= 200 && code < 500;
            } catch (Exception e) {
                return false;
            }
        }
    }
}