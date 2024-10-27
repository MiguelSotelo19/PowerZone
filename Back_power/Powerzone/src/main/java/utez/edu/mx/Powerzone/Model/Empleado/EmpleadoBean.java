package utez.edu.mx.Powerzone.Model.Empleado;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import utez.edu.mx.Powerzone.Model.Persona.PersonaBean;

@Entity
@Table(name = "Empleado")
@Getter
@Setter
public class EmpleadoBean extends PersonaBean {


}
