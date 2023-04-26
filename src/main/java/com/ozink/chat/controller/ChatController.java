package com.ozink.chat.controller;

import com.ozink.chat.model.Message;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Controller
@Slf4j
public class ChatController {

    @MessageMapping("/general")
    @SendTo("/topic/general")
    public Message greeting(Message message) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
        message.setTime(LocalDateTime.now().format(formatter));
        return message;
    }
}
