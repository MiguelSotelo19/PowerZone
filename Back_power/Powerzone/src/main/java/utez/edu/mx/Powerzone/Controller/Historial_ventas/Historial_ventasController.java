package utez.edu.mx.Powerzone.Controller.Historial_ventas;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utez.edu.mx.Powerzone.Config.ApiResponse;
import utez.edu.mx.Powerzone.Service.Historial_ventas.Historial_ventasService;

@RestController
@RequestMapping("/api/power/historial")
@CrossOrigin(origins = {"*"})
@AllArgsConstructor
public class Historial_ventasController {
    private final Historial_ventasService service;

    @GetMapping("/")
    public ResponseEntity<ApiResponse> GananciasGet(){
        return service.GetGanancias();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> GananciasGet(@PathVariable Long id){
        return service.Ganancia(id);
    }
}
