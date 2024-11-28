package utez.edu.mx.Powerzone.Service.Membresia;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utez.edu.mx.Powerzone.Config.ApiResponse;
import utez.edu.mx.Powerzone.Model.Membresia.MembresiaBean;
import utez.edu.mx.Powerzone.Model.Membresia.MembresiaRepository;

import java.sql.SQLException;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class MembresiaService {
    private final MembresiaRepository repository;

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getMembresias(){
        return new ResponseEntity<>(new ApiResponse(repository.findAll(), HttpStatus.OK, "oki"), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> updateMembresia(MembresiaBean membresia, Long id){
        Optional<MembresiaBean> foundMembresia = repository.findById(id);

        if(foundMembresia.isPresent()){
            MembresiaBean membresiaBean = foundMembresia.get();
            membresiaBean.setCosto(membresia.getCosto());
            membresiaBean.setTipo_membresia(membresia.getTipo_membresia());
            membresiaBean.setHistorial(membresia.getHistorial());
            membresiaBean.setClienteBeans(membresia.getClienteBeans());

            repository.save(membresiaBean);
            return new ResponseEntity<>(new ApiResponse(HttpStatus.OK, false, "oki"), HttpStatus.OK);
        }
        return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND, true, "no encontrada"), HttpStatus.NOT_FOUND);
    }
}
