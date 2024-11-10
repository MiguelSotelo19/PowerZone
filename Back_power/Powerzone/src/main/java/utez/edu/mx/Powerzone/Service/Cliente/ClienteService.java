package utez.edu.mx.Powerzone.Service.Cliente;

import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utez.edu.mx.Powerzone.Config.ApiResponse;
import utez.edu.mx.Powerzone.Model.Cliente.ClienteBean;
import utez.edu.mx.Powerzone.Model.Cliente.ClienteRepository;
import utez.edu.mx.Powerzone.Model.Persona.PersonaBean;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class ClienteService {
    private final ClienteRepository repository;
    private JavaMailSender mailSender;

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getClientes(){
        return new ResponseEntity<>(new ApiResponse(repository.findAll(), HttpStatus.OK, "oki"), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> saveCliente(ClienteBean cliente) throws Exception {
        Optional<ClienteBean> foundCliente = repository.findByIdentificadorusuario(cliente.getIdentificadorusuario());

        if(foundCliente.isPresent()){
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Cliente ya registrado"), HttpStatus.BAD_REQUEST);
        }

        enviarCorreo(cliente.getCorreo(), cliente.getNombre());
        return new ResponseEntity<>(new ApiResponse(repository.saveAndFlush(cliente), HttpStatus.OK, "oki"), HttpStatus.OK);
    }

    public void enviarCorreo(String correo, String nombre)
            throws Exception {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(correo);
        helper.setFrom("alexisduranduran105@gmail.com");
        helper.setSubject("¡Membresía adquirida con éxito!");

        String htmlContent = "<h1 style='color: #007bff;'>¡Hola!" + nombre+"</h1>"
                + "<p style='font-weight: bold;'>¡Esperamos que estés bien!</p>"
                + "<p style='font-size: 18px;'>Este es un correo de parte de " +
                "Power Zone Gym para darte un detalle sobre tu adquisisión de membresía.</p>"
                + "<p style='font-size: 18px;'>putos todos.</p>";

        helper.setText(htmlContent, true);

        mailSender.send(message);
    }

    public ResponseEntity<ApiResponse> updateCliente(ClienteBean cliente, Long id){
        Optional<ClienteBean> foundCliente = repository.findById(id);

        if(foundCliente.isPresent()){
            ClienteBean newcliente = foundCliente.get();
            newcliente.setNombre(cliente.getNombre());
            newcliente.setCotrasenia(cliente.getCotrasenia());
            newcliente.setIdentificador_usuario(cliente.getIdentificadorusuario());
            newcliente.setRol(cliente.getRol());
            newcliente.setTelefono(cliente.getTelefono());
            newcliente.setCVV(cliente.getCVV());
            newcliente.setNumero_tarjeta(cliente.getNumero_tarjeta());
            newcliente.setMembresia(cliente.getMembresia());
            repository.save(newcliente);
            return new ResponseEntity<>(new ApiResponse(HttpStatus.OK, false, "oki"), HttpStatus.OK);
        }

        return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND, true, "Cliente no encontrado"), HttpStatus.NOT_FOUND);
    }

}
