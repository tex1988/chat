package com.ozink.chat.controller;

import com.ozink.chat.model.Message;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.time.Instant;

@Controller
@Slf4j
public class ChatController {

    @MessageMapping("/general")
    @SendTo("/topic/general")
    public Message greeting(Message message) {
        message.setDateTime(Instant.now().toString());
        return message;
    }
}
