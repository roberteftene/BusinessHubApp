package com.businesshub.be.exceptions;

public class MissingSubscriptionException extends Exception {

    public MissingSubscriptionException(String message) {
        super(message);
    }

    public MissingSubscriptionException() {}

}
