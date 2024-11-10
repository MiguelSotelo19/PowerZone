package utez.edu.mx.Powerzone.Model.Empleado;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import utez.edu.mx.Powerzone.Model.Persona.PersonaBean;

@Entity
@Table(name = "Empleado")
@Getter
@Setter
@NoArgsConstructor
public class EmpleadoBean extends PersonaBean {

    public EmpleadoBean(String nombre, String cotrasenia, String correo, String identificadorusuario, String rol, String telefono) {
        super(nombre, cotrasenia, correo, identificadorusuario, rol, telefono);
    }
}
