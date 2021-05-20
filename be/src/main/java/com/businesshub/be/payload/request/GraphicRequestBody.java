package com.businesshub.be.payload.request;

import com.businesshub.be.models.EPeriod;
import lombok.Data;

@Data
public class GraphicRequestBody {
    EPeriod ePeriod;

    public GraphicRequestBody() {
    }

    public GraphicRequestBody(EPeriod ePeriod) {
        this.ePeriod = ePeriod;
    }
}
