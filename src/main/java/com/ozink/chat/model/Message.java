package com.ozink.chat.model;

import lombok.Data;

@Data
public class Message {

    private String name;
    private String content;
    private String dateTime;
}
