package com.sportify.app.controller;

import com.sportify.app.dto.request.MailRequest;
import com.sportify.app.dto.response.ApiResponse;
import com.sportify.app.service.mail.MailServiceImpl;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Author: Paras Dongre
 * Date Created:07-02-2025
 * Time Created:23:49
 */
@RestController
@RequestMapping("/mail")
public class MailController {

    @Autowired
    private MailServiceImpl mailService;

    @PostMapping("/send")
    public ResponseEntity<ApiResponse> sendMail(@RequestBody MailRequest mailStructure) {
        try {
            mailService.sendMail(mailStructure);
            return ResponseEntity.ok(new ApiResponse("Email Sent to "+mailStructure.getTo(), null));
        } catch (MessagingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(e.getMessage(), null));
        }
    }
}
