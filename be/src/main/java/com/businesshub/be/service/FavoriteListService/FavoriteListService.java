package com.businesshub.be.service.FavoriteListService;

import com.businesshub.be.models.BusinessFavoriteList;
import com.businesshub.be.models.ServiceModel;
import com.businesshub.be.models.UserAccountModel;
import com.businesshub.be.repository.FavoriteListRepository;
import com.businesshub.be.repository.ServiceRepository;
import com.businesshub.be.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.xml.ws.ServiceMode;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Service
public class FavoriteListService {

    @Autowired
    FavoriteListRepository favoriteListRepository;

    @Autowired
    ServiceRepository serviceRepository;

    @Autowired
    UserRepository userRepository;

    public void addServiceToFavorite(int serviceId, Long userId) {
        BusinessFavoriteList businessFavoriteList = new BusinessFavoriteList();
        ServiceModel serviceModel = serviceRepository.findById(serviceId).get();
        UserAccountModel userAccountModel = userRepository.findById(userId).get();

        businessFavoriteList.setUserAccount(userAccountModel);
        Set<ServiceModel> serviceModels = new HashSet<>();
        serviceModels = businessFavoriteList.getFavoriteBusinesses();
        serviceModels.add(serviceModel);
        businessFavoriteList.setFavoriteBusinesses(serviceModels);
        favoriteListRepository.save(businessFavoriteList);
    }

    public Set<ServiceModel> getLikedServices(Long userId) {
        List<BusinessFavoriteList> businessFavoriteLists = favoriteListRepository.findAll();
        List<BusinessFavoriteList> userFavs = businessFavoriteLists.stream()
                .filter(x -> x.getUserAccount().getId().equals(userId))
                .collect(Collectors.toList());

        Set<ServiceModel> serviceModels = new HashSet<>();
        for (BusinessFavoriteList userFav : userFavs) {
            for (ServiceModel favoriteBusiness : userFav.getFavoriteBusinesses()) {
                serviceModels.add(favoriteBusiness);
            }
        }

        return serviceModels;
    }
}
