package com.businesshub.be.controller;

import com.businesshub.be.models.ReviewModel;
import com.businesshub.be.service.ReviewService.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    ReviewService reviewService;

    @PostMapping("/{uId}/{serviceId}")
    @ResponseBody
    public ReviewModel saveReview(@PathVariable(value = "uId") Long id,@PathVariable(value = "serviceId") int serviceId, @RequestBody ReviewModel reviewModel) {
        return reviewService.saveReview(id,serviceId,reviewModel);
    }

    @PostMapping("/{serviceId}")
    @ResponseBody
    public ReviewModel saveReviewByGuest(@PathVariable(value = "serviceId") int serviceId, @RequestBody ReviewModel reviewModel) {
        return reviewService.saveReviewWithGuestRole(serviceId,reviewModel);
    }

    @GetMapping("/{serviceId}")
    @ResponseBody
    public List<ReviewModel> getReviewsByServiceId(@PathVariable(value= "serviceId") int serviceId) {
        return reviewService.getReviewsByServiceId(serviceId);
    }


    @GetMapping("/getByUser/{userId}")
    @ResponseBody
    public List<ReviewModel> getReviewsByUserId(@PathVariable(value= "userId") Long userId) {
        return reviewService.getReviewsByUserId(userId);
    }

}
