package utez.edu.mx.Powerzone.Service.Empleado;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utez.edu.mx.Powerzone.Config.ApiResponse;
import utez.edu.mx.Powerzone.Model.Empleado.EmpleadoBean;
import utez.edu.mx.Powerzone.Model.Empleado.EmpleadoRepository;

import java.sql.SQLException;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class EmpleadoService {
    private final EmpleadoRepository repository;

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getEmpleados(){
        return new ResponseEntity<>(new ApiResponse(repository.findAll(), HttpStatus.OK, "oki"), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> saveEmpleado(EmpleadoBean empleado) throws Exception {
        Optional<EmpleadoBean> foundEmpleado = repository.findByIdentificadorusuario(empleado.getIdentificadorusuario());

        if(foundEmpleado.isPresent()){
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Empleado ya registrado"), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new ApiResponse(repository.saveAndFlush(empleado), HttpStatus.OK, "oki"), HttpStatus.OK);
    }

    public ResponseEntity<ApiResponse> updateEmpleado(EmpleadoBean empleado, Long id){
        Optional<EmpleadoBean> foundEmpleado = repository.findById(id);

        if(foundEmpleado.isPresent()){
            EmpleadoBean newempleado = foundEmpleado.get();
            newempleado.setNombre(empleado.getNombre());
            newempleado.setCotrasenia(empleado.getCotrasenia());
            newempleado.setIdentificador_usuario(empleado.getIdentificadorusuario());
            newempleado.setRol(empleado.getRol());
            newempleado.setTelefono(empleado.getTelefono());
            newempleado.setCorreo(empleado.getCorreo());
            repository.save(newempleado);
            return new ResponseEntity<>(new ApiResponse(HttpStatus.OK, false, "oki"), HttpStatus.OK);
        }

        return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND, true, "Empleado no encontrado"), HttpStatus.NOT_FOUND);
    }

}
