package com.example.geogame.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;

@RestController
public class ImageProxyController {

    @GetMapping("/api/proxy-image")
    public ResponseEntity<byte[]> proxyImage(@RequestParam("url") String url) {
        try {
            URL target = URI.create(url).toURL();
            HttpURLConnection conn = (HttpURLConnection) target.openConnection();
            conn.setRequestProperty("User-Agent",
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
                            "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");
            conn.setConnectTimeout(5000);
            conn.setReadTimeout(10000);
            conn.setInstanceFollowRedirects(true);

            int code = conn.getResponseCode();
            if (code != 200) {
                return ResponseEntity.notFound().build();
            }

            String contentType = conn.getContentType();
            if (contentType == null) contentType = "image/jpeg";

            try (InputStream in = conn.getInputStream()) {
                byte[] bytes = in.readAllBytes();
                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType))
                        .body(bytes);
            }
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
