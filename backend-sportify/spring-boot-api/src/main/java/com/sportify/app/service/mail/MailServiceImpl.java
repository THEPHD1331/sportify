package com.sportify.app.service.mail;

import com.sportify.app.dto.request.MailRequest;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Author: Paras Dongre
 * Date Created:07-02-2025
 * Time Created:23:47
 */
@Service
@Transactional
public class MailServiceImpl {

    @Autowired
    private JavaMailSender mailSender;

    public void sendMail(MailRequest mailRequest) throws MessagingException {
        if (mailRequest.getTo() == null || mailRequest.getTo().trim().isEmpty()) {
            throw new IllegalArgumentException("Recipient email (to) cannot be null or empty.");
        }

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(mailRequest.getTo());
            helper.setSubject(mailRequest.getSubject());
            helper.setText(mailRequest.getBody(), true); // true for HTML

            mailSender.send(message);
    }
}
