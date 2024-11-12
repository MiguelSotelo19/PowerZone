package utez.edu.mx.Powerzone.Model.Gerente;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import utez.edu.mx.Powerzone.Model.Persona.PersonaBean;

@Entity
@Table(name = "Gerente")
@Getter
@Setter
@AllArgsConstructor
public class GerenteBean extends PersonaBean {

    public GerenteBean(Long id, String nombre, String cotrasenia, String correo, String identificadorusuario, String rol, String telefono, Boolean estatus) {
        super(id, nombre, cotrasenia, correo, identificadorusuario, rol, telefono, estatus);
    }

    public GerenteBean(String nombre, String cotrasenia, String correo, String identificadorusuario, String rol, String telefono, Boolean estatus) {
        super(nombre, cotrasenia, correo, identificadorusuario, rol, telefono, estatus);
    }


}
