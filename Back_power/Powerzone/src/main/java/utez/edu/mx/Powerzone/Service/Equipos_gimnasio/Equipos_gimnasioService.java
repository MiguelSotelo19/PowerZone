package utez.edu.mx.Powerzone.Service.Equipos_gimnasio;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utez.edu.mx.Powerzone.Config.ApiResponse;
import utez.edu.mx.Powerzone.Model.Equipos_gimnasio.Equipos_gimnasioBean;
import utez.edu.mx.Powerzone.Model.Equipos_gimnasio.Equipos_gimnasioRepository;

import java.sql.SQLException;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class Equipos_gimnasioService {

    private Equipos_gimnasioRepository repository;

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> allEquipos(){
        return new ResponseEntity<>(new ApiResponse(repository.findAll(), HttpStatus.OK, "oki"), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> saveEquipos(Equipos_gimnasioBean equipo){

        Optional<Equipos_gimnasioBean> foundEquipo = repository.findByMarca(equipo.getMarca());

        if(foundEquipo.isPresent()){
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "El equipo ya esta registrado"), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(new ApiResponse(repository.saveAndFlush(equipo), HttpStatus.OK, "Oki"), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> UpdateEquipos(Equipos_gimnasioBean equipos, Long id){

        Optional<Equipos_gimnasioBean> foundEquipo = repository.findById(id);

        if (foundEquipo.isPresent()){
            Equipos_gimnasioBean found = foundEquipo.get();
            found.setCantidad(equipos.getCantidad());
            found.setEstado(equipos.getEstado());
            found.setMarca(equipos.getMarca());
            found.setModelo(equipos.getModelo());

            return new ResponseEntity<>(new ApiResponse((repository.save(found)), HttpStatus.OK, "oki"), HttpStatus.OK);
        }

        return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND, true, "Equipo no encontrado"), HttpStatus.NOT_FOUND);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse>deleteEquipos(Long id){

        Optional<Equipos_gimnasioBean> Found = repository.findById(id);

        if (Found.isPresent()){
            repository.deleteById(id);
            return new ResponseEntity<>(new ApiResponse(HttpStatus.OK, false, "oki"), HttpStatus.OK);
        }

        return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND, true, "Equipo no encontrado"), HttpStatus.NOT_FOUND);
    }

}
