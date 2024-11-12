package utez.edu.mx.Powerzone.Controller.Cliente.DTO;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import utez.edu.mx.Powerzone.Model.Cliente.ClienteBean;
import utez.edu.mx.Powerzone.Model.Membresia.MembresiaBean;

@Data
public class ClienteDTO {

    private Long id;
    private String nombre;
    private String cotrasenia;
    private String correo;
    private String identificadorusuario;
    private String rol;
    private String telefono;
    private Boolean estatus;
    private int CVV;
    private String numero_tarjeta;
    private MembresiaBean membresia;

    public ClienteBean toEntity(){
        return new ClienteBean(nombre,cotrasenia,correo,identificadorusuario,rol,telefono,estatus,CVV,numero_tarjeta,membresia);
    }

    public ClienteBean toUpdate(){
        return new ClienteBean(nombre,cotrasenia,correo,identificadorusuario,rol,telefono,estatus,CVV,numero_tarjeta,membresia);
    }

}
