package com.businesshub.be.service.FileStorage;

import com.businesshub.be.models.MenuPricesModel;
import com.businesshub.be.models.ServiceModel;
import com.businesshub.be.repository.MenuPricesRepository;
import com.businesshub.be.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.xml.ws.ServiceMode;
import java.io.IOException;
import java.util.List;
import java.util.stream.Stream;

@Service
public class FileStorageService {

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private MenuPricesRepository fileDBRepository;

    public MenuPricesModel store(MultipartFile file, int serviceId) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        ServiceModel serviceModel = serviceRepository.findById(serviceId).get();
        MenuPricesModel FileDB = new MenuPricesModel(fileName, file.getContentType(), file.getBytes());
        FileDB.setServiceModel(serviceModel);
        return fileDBRepository.save(FileDB);
    }

    public MenuPricesModel getFile(String id) {
        return fileDBRepository.findById(id).get();
    }

    public Stream<MenuPricesModel> getAllFiles() {
        return fileDBRepository.findAll().stream();
    }

    public MenuPricesModel getFileByServiceId(int serviceId) {
        List<MenuPricesModel> list = fileDBRepository.findAll();
        MenuPricesModel pricesModel = null;
        for (MenuPricesModel menuPricesModel : list) {
            if(menuPricesModel.getServiceModel().getServiceId() == serviceId) {
                pricesModel = menuPricesModel;
            }
        }
               return pricesModel;
    }
}
