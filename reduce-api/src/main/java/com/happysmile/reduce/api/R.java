package com.happysmile.reduce.api;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

import lombok.Data;

@Component
@Data
@ControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
@RestController
public class R<T> {
    // 接口是否成功调用
    Boolean success;
    // 失败原因
    String errorMessage;
    // 返回数据
    T data;

    @ExceptionHandler(Exception.class)
    public R<T> exceptionBuild(Exception ex) {
        R<T> response = new R<T>();
        response.setData(null);
        response.setErrorMessage(ex.getMessage());
        response.setSuccess(false);
        return response;
    }

    public R<T> build(T data) {
        R<T> response = new R<T>();
        response.setData(data);
        response.setErrorMessage("");
        response.setSuccess(true);
        return response;
    }
}
