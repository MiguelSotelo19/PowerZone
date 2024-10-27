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
@AllArgsConstructor
@NoArgsConstructor
public class ClienteBean extends PersonaBean {
    @Column(nullable = false)
    private int CVV;

    @Column(nullable = false, length = 16)
    private int numero_tarjeta;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "fk_id_membresia")
    private MembresiaBean membresia;
}
