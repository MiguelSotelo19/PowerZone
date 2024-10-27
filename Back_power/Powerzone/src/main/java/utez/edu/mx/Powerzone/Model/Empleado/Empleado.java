package utez.edu.mx.Powerzone.Model.Empleado;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import utez.edu.mx.Powerzone.Model.Persona.Persona;

@Entity
@Table(name = "Empleado")
@Getter
@Setter
public class Empleado extends Persona {


}
