package utez.edu.mx.Powerzone.Model.Cliente;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import utez.edu.mx.Powerzone.Model.Membresia.MembresiaBean;
import utez.edu.mx.Powerzone.Model.Persona.PersonaBean;
@Entity
@Table(name = "Clientes")
@Getter
@Setter
@NoArgsConstructor
public class ClienteBean extends PersonaBean {
    @Column(nullable = false)
    private int CVV;

    @Column(nullable = false, length = 16)
    private String numero_tarjeta;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "fk_id_membresia")
    private MembresiaBean membresia;

    public ClienteBean(String nombre, String cotrasenia, String correo, String identificadorusuario, String rol, String telefono, int CVV, String numero_tarjeta, MembresiaBean membresia) {
        super(nombre, cotrasenia, correo, identificadorusuario, rol, telefono);
        this.CVV = CVV;
        this.numero_tarjeta = numero_tarjeta;
        this.membresia = membresia;
    }
}
