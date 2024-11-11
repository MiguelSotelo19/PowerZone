package utez.edu.mx.Powerzone.Service.Historial_ventas;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utez.edu.mx.Powerzone.Config.ApiResponse;
import utez.edu.mx.Powerzone.Model.Historial_ventas.HistorialRepository;
import utez.edu.mx.Powerzone.Model.Historial_ventas.Historial_ventasBean;
import utez.edu.mx.Powerzone.Model.Membresia.MembresiaBean;
import utez.edu.mx.Powerzone.Model.Membresia.MembresiaRepository;

import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class Historial_ventasService {
    private final HistorialRepository repository;
    private final MembresiaRepository membresiaRepository;

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> GetGanancias(){
        return new ResponseEntity<>(new ApiResponse(repository.findAll(), HttpStatus.OK, "oki"), HttpStatus.OK);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse>Ganancia(Long membresia){
        return new ResponseEntity<>(new ApiResponse(repository.findHistorialByMembresiaId(membresia), HttpStatus.OK,"oki"), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> SaveGanancias(MembresiaBean membresia) {
        Optional<MembresiaBean> foundMembresia = membresiaRepository.findById(membresia.getId());
        MembresiaBean idMebresia = foundMembresia.get();
        System.out.println("Costo de membresía: " + membresia.getCosto());
        Double costo = idMebresia.getCosto();
        System.out.println("Costo de membresía: " + costo);
        Historial_ventasBean historial = new Historial_ventasBean();
        historial.setGanancia(costo);
        historial.setMembresia(idMebresia);
        return new ResponseEntity<>(new ApiResponse(repository.saveAndFlush(historial),HttpStatus.OK,"oki"),HttpStatus.OK);
    }
}
