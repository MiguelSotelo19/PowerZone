package utez.edu.mx.Powerzone.Controller.Cliente;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utez.edu.mx.Powerzone.Config.ApiResponse;
import utez.edu.mx.Powerzone.Controller.Cliente.DTO.ClienteDTO;
import utez.edu.mx.Powerzone.Service.Cliente.ClienteService;

@RestController
@RequestMapping("/api/power/cliente")
@CrossOrigin(origins = {"*"})
@AllArgsConstructor
public class ClienteController {

    private final ClienteService service;

    @GetMapping("/")
    public ResponseEntity<ApiResponse> ClientesGet(){
        return service.getClientes();
    }

    @PostMapping("/")
    public ResponseEntity<ApiResponse> ClienteSave(@RequestBody ClienteDTO dto) throws Exception {
        return service.saveCliente(dto.toEntity());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> ClienteUpdate(@RequestBody ClienteDTO dto, @PathVariable Long id){
        return service.updateCliente(dto.toUpdate(), id);
    }
}
