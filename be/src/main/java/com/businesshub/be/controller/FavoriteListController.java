package com.businesshub.be.controller;

import com.businesshub.be.models.ServiceModel;
import com.businesshub.be.service.FavoriteListService.FavoriteListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/favoritelist")
public class FavoriteListController {

    @Autowired
    FavoriteListService favoriteListService;

    @PostMapping("/{serviceId}/{userId}")
    public void addServiceToFavorite(@PathVariable(value = "serviceId") int serviceId, @PathVariable(value = "userId") Long userId) {
        favoriteListService.addServiceToFavorite(serviceId,userId);
    }

    @GetMapping("/{userId}")
    public Set<ServiceModel> getLikedServices(@PathVariable(value = "userId") Long userId) {
        return favoriteListService.getLikedServices(userId);
    }

}
