package utez.edu.mx.Powerzone.Controller.Equipos_gimnasio;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utez.edu.mx.Powerzone.Config.ApiResponse;
import utez.edu.mx.Powerzone.Controller.Equipos_gimnasio.DTO.Equipos_gimnasioDTO;
import utez.edu.mx.Powerzone.Service.Equipos_gimnasio.Equipos_gimnasioService;

@RestController
@RequestMapping("/api/power/equipos")
@CrossOrigin(origins = {"*"})
@AllArgsConstructor
public class Equipos_gimnasioController {
    private Equipos_gimnasioService service;

    @GetMapping("/")
    public ResponseEntity<ApiResponse> equiposAll(){
        return service.allEquipos();
    }

    @PostMapping("/")
    public ResponseEntity<ApiResponse> equiposSave(@RequestBody Equipos_gimnasioDTO dto){
        return service.saveEquipos(dto.toEntity());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> equiposUpdate(@RequestBody Equipos_gimnasioDTO dto, @PathVariable Long id){
        return service.UpdateEquipos(dto.toUpdate(), id);
    }
}
