package utez.edu.mx.Powerzone.Controller.Gerente;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utez.edu.mx.Powerzone.Config.ApiResponse;
import utez.edu.mx.Powerzone.Controller.Gerente.DTO.GerenteDTO;
import utez.edu.mx.Powerzone.Service.Gerente.GerenteService;

@RestController
@RequestMapping("/api/power/gerente")
@CrossOrigin(origins = {"*"})
@AllArgsConstructor
public class GerenteController {
    private final GerenteService service;

    @GetMapping("/")
    public ResponseEntity<ApiResponse> GerentrGet(){
        return service.getGerente();
    }

    @PostMapping("/")
    public ResponseEntity<ApiResponse> GerenteSave(@RequestBody GerenteDTO dto){
        return service.saveGerente(dto.toEntity());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> GerenteUpdate(@RequestBody GerenteDTO dto, @PathVariable Long id){
        return service.updateGerente(dto.toUpdate(), id);
    }
}
