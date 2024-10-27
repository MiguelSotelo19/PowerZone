package utez.edu.mx.Powerzone.Model.Gerente;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import utez.edu.mx.Powerzone.Model.Persona.Persona;

@Entity
@Table(name = "Gerente")
@Getter
@Setter
@AllArgsConstructor
public class Gerente extends Persona {

}
