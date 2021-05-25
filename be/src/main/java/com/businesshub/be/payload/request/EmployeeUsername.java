package com.businesshub.be.payload.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class EmployeeUsername {

    @NotBlank
    @Size(min = 3, max = 20)
    String userName;
}
