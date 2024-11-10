package utez.edu.mx.Powerzone.Controller.Membresia;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utez.edu.mx.Powerzone.Config.ApiResponse;
import utez.edu.mx.Powerzone.Controller.Membresia.DTO.MembresiaDTO;
import utez.edu.mx.Powerzone.Service.Membresia.MembresiaService;

@RestController
@RequestMapping("/api/power/membresia")
@CrossOrigin(origins = {"*"})
@AllArgsConstructor
public class MembresiaController {
    private final MembresiaService service;

    @GetMapping("/")
    public ResponseEntity<ApiResponse> MembresiasGet(){
        return service.getMembresias();
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> MembresiaUpdate(@RequestBody MembresiaDTO dto, @PathVariable Long id){
        return service.updateMembresia(dto.toUpdate(), id);
    }

}
