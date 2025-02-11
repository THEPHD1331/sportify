package com.sportify.app.dto.request;

/**
 * Author: Paras Dongre
 * Date Created:07-02-2025
 * Time Created:23:45
 */
public class MailRequest {

    private String to; // Email address
    private String subject;
    private String body;

    // Getters and Setters
    public String getTo() { return to; }
    public void setTo(String to) { this.to = to; }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public String getBody() { return body; }
    public void setBody(String body) { this.body = body; }
}
