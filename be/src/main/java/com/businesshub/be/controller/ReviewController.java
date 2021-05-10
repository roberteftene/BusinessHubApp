package com.businesshub.be.controller;

import com.businesshub.be.models.ReviewModel;
import com.businesshub.be.service.ReviewService.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    ReviewService reviewService;

    @PostMapping("/{id}")
    @ResponseBody
    public ReviewModel saveReview(@RequestBody ReviewModel reviewModel,@PathVariable(value = "id") int id) {
        return reviewService.saveReview(id,reviewModel);
    }

}
