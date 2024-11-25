package utez.edu.mx.Powerzone.Service.Gerente;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utez.edu.mx.Powerzone.Config.ApiResponse;
import utez.edu.mx.Powerzone.Model.Cliente.ClienteBean;
import utez.edu.mx.Powerzone.Model.Gerente.GerenteBean;
import utez.edu.mx.Powerzone.Model.Gerente.GerenteRepository;

import java.sql.SQLException;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class GerenteService {

    private final GerenteRepository repository;

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getGerente(){
        return new ResponseEntity<>(new ApiResponse(repository.findAll(), HttpStatus.OK, "oki"), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> saveGerente(GerenteBean gerente) {
        Optional<GerenteBean> foundGerente = repository.findByIdentificadorusuario(gerente.getIdentificadorusuario());

        if(foundGerente.isPresent()){
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Cliente ya registrado"), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(new ApiResponse(repository.saveAndFlush(gerente), HttpStatus.OK, "oki"), HttpStatus.OK);
    }

    public ResponseEntity<ApiResponse> updateGerente(GerenteBean gerente, Long id){
        Optional<GerenteBean> foundCliente = repository.findById(id);

        if(foundCliente.isPresent()){
            GerenteBean newgerente = foundCliente.get();
            newgerente.setNombre(gerente.getNombre());
            newgerente.setCotrasenia(gerente.getCotrasenia());
            newgerente.setCorreo(gerente.getCorreo());
            newgerente.setIdentificador_usuario(gerente.getIdentificadorusuario());
            newgerente.setRol(gerente.getRol());
            newgerente.setTelefono(gerente.getTelefono());
            repository.save(newgerente);
            return new ResponseEntity<>(new ApiResponse(HttpStatus.OK, false, "oki"), HttpStatus.OK);
        }

        return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND, true, "Gerente no encontrado"), HttpStatus.NOT_FOUND);
    }


}
