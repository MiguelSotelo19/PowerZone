package utez.edu.mx.Powerzone.Controller.Clase;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utez.edu.mx.Powerzone.Config.ApiResponse;
import utez.edu.mx.Powerzone.Controller.Clase.DTO.ClaseDTO;
import utez.edu.mx.Powerzone.Service.Clase.ClaseService;

@RestController
@RequestMapping("/api/power/clase")
@CrossOrigin(origins = {"*"})
@AllArgsConstructor
public class ClaseController {

    private final ClaseService service;

    @GetMapping("/")
    public ResponseEntity<ApiResponse> ClasesGet(){
        return service.getClases();
    }

    @PostMapping("/")
    public ResponseEntity<ApiResponse> ClaseSave(@RequestBody ClaseDTO dto) throws Exception{
        return service.saveClases(dto.toEntity());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> ClaseUpdate(@RequestBody ClaseDTO dto, @PathVariable Long id){
        return service.updateClases(dto.toUpdate(),id);
    }
    
}
