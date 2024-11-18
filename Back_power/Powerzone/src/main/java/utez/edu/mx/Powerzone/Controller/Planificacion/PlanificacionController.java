package utez.edu.mx.Powerzone.Controller.Planificacion;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import utez.edu.mx.Powerzone.Config.ApiResponse;
import utez.edu.mx.Powerzone.Controller.Planificacion.DTO.PlanificacionDTO;
import utez.edu.mx.Powerzone.Model.Planificacion.PlanificacionBean;
import utez.edu.mx.Powerzone.Service.Planificacion.PlanificacionService;

@RestController
@RequestMapping("/api/power/planificacion")
@CrossOrigin(origins = {"*"})
@AllArgsConstructor
public class PlanificacionController {
    private final PlanificacionService service;
    @GetMapping("/")
    public ResponseEntity<ApiResponse> PlanificacionesGet() {
        return service.getPlanificaciones();
    }

    @PostMapping("/")
    public ResponseEntity<ApiResponse> PlanificacionSave(@RequestBody PlanificacionDTO dto) {
        return service.savePlanificacion(dto.toEntity());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> PlanificacionUpdate(@RequestBody PlanificacionDTO dto, @PathVariable Long id){
        return service.updatePlanificacion(dto.toEntity(),id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> equiposDelete(@PathVariable Long id){
        return service.deletePlanificacion(id);
    }
}
