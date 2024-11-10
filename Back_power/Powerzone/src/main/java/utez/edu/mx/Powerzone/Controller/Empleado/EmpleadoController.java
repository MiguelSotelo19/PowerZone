package utez.edu.mx.Powerzone.Controller.Empleado;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utez.edu.mx.Powerzone.Config.ApiResponse;
import utez.edu.mx.Powerzone.Controller.Empleado.DTO.EmpleadoDTO;
import utez.edu.mx.Powerzone.Service.Empleado.EmpleadoService;

@RestController
@RequestMapping("/api/power/empleado")
@CrossOrigin(origins = {"*"})
@AllArgsConstructor
public class EmpleadoController {

    private final EmpleadoService service;

    @GetMapping("/")
    public ResponseEntity<ApiResponse> EmpleadosGet(){
        return service.getEmpleados();
    }

    @PostMapping("/")
    public ResponseEntity<ApiResponse> EmpleadoSave(@RequestBody EmpleadoDTO dto) throws Exception {
        return service.saveEmpleado(dto.toEntity());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> EmpleadoUpdate(@RequestBody EmpleadoDTO dto, @PathVariable Long id){
        return service.updateEmpleado(dto.toUpdate(), id);
    }
}
