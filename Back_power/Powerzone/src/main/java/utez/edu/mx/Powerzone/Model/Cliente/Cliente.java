package utez.edu.mx.Powerzone.Model.Cliente;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import utez.edu.mx.Powerzone.Model.Persona.Persona;
@Entity
@Table(name = "Clientes")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Cliente extends Persona {
    @Column(nullable = false)
    private int CVV;

    @Column(nullable = false, length = 16)
    private int numero_tarjeta;
}
