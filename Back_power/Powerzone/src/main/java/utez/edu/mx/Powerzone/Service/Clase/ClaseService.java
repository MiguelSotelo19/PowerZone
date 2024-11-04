package utez.edu.mx.Powerzone.Service.Clase;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utez.edu.mx.Powerzone.Config.ApiResponse;
import utez.edu.mx.Powerzone.Model.Clase.ClaseBean;
import utez.edu.mx.Powerzone.Model.Clase.ClaseRepository;

import java.sql.SQLException;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class ClaseService {

    private final ClaseRepository repository;

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getClases(){
        return new ResponseEntity<>(new ApiResponse(repository.findAll(), HttpStatus.OK,"oki"), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> saveClases(ClaseBean clase) throws Exception{
        Optional<ClaseBean> foundClase = repository.findByNombre_clase(clase.getNombre_clase());

        if(foundClase.isPresent()){
        return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true,"Clase ya registrada"), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(new ApiResponse(repository.saveAndFlush(clase), HttpStatus.OK, "oki"), HttpStatus.OK);
    }

    public ResponseEntity<ApiResponse> updateClases(ClaseBean clase, Long id){
        Optional<ClaseBean> foundClase = repository.findById(id);
        if(foundClase.isPresent()){
            ClaseBean newClase = foundClase.get();
            newClase.setCapacidad_maxima(clase.getCapacidad_maxima());
            newClase.setHora_inicio(clase.getHora_inicio());
            newClase.setNombre_clase(clase.getNombre_clase());
            newClase.setNombre_profesor(clase.getNombre_profesor());
            repository.save(newClase);
            return new ResponseEntity<>(new ApiResponse(HttpStatus.OK,false,"oki"),HttpStatus.OK);
        }
        return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND, true,"Clase no encontrada"),HttpStatus.NOT_FOUND);
    }
}
