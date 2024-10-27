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

}
