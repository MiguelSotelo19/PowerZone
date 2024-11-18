package utez.edu.mx.Powerzone.Service.Planificacion;

import ch.qos.logback.core.pattern.parser.OptionTokenizer;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utez.edu.mx.Powerzone.Config.ApiResponse;
import utez.edu.mx.Powerzone.Controller.Planificacion.DTO.PlanificacionDTO2;
import utez.edu.mx.Powerzone.Model.Clase.ClaseRepository;
import utez.edu.mx.Powerzone.Model.Cliente.ClienteRepository;
import utez.edu.mx.Powerzone.Model.Planificacion.PlanificacionBean;
import utez.edu.mx.Powerzone.Model.Planificacion.PlanificacionRepository;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class PlanificacionService {

    private final PlanificacionRepository repository;

    private final ClienteRepository clienteRepository;
    private final ClaseRepository claseRepository;

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getPlanificaciones(){
        List<PlanificacionDTO2> planificacionesDTO = repository.findAll().stream()
                .map(PlanificacionDTO2::new)
                .collect(Collectors.toList());
        return new ResponseEntity<>(new ApiResponse(planificacionesDTO, HttpStatus.OK,"oki"),HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> savePlanificacion(PlanificacionBean planificacion){

        if (!clienteRepository.existsById(planificacion.getCliente().getId())) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND,true,"Cliente no encontrado"),HttpStatus.NOT_FOUND);
        }
        if (!claseRepository.existsById(planificacion.getClase().getId())) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND,true,"Clase no encontrada"),HttpStatus.NOT_FOUND);
        }
        PlanificacionBean savedPlanificacion = repository.saveAndFlush(planificacion);
        return new ResponseEntity<>(new ApiResponse(savedPlanificacion,HttpStatus.OK,"Registro de planificacion exitoso"), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> updatePlanificacion(PlanificacionBean planificacion, Long id){
        Optional<PlanificacionBean> founPlanificacion = repository.findById(id);

        if (founPlanificacion.isPresent()){
            PlanificacionBean planificacionBean = founPlanificacion.get();
            planificacionBean.setDia(planificacion.getDia());
            planificacionBean.setClase(planificacion.getClase());
            planificacionBean.setCliente(planificacion.getCliente());

            repository.save(planificacionBean);
            return new ResponseEntity<>(new ApiResponse(HttpStatus.OK, false, "oki"), HttpStatus.OK);
        }
        return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND, true, "Planificacion no encontrada"), HttpStatus.NOT_FOUND);
    }

    @Transactional(rollbackFor = SQLException.class)
    public ResponseEntity<ApiResponse> deletePlanificacion(Long id){
        Optional<PlanificacionBean> found = repository.findById(id);
        if (found.isPresent()){
            repository.deleteById(id);
            return new ResponseEntity<>(new ApiResponse(HttpStatus.OK, false, "oki"), HttpStatus.OK);
        }
        return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND, true, "Planificacion no encontrado"), HttpStatus.NOT_FOUND);
    }
}
