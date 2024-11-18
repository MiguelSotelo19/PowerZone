package utez.edu.mx.Powerzone.Model.Planificacion;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import utez.edu.mx.Powerzone.Model.Clase.ClaseBean;
import utez.edu.mx.Powerzone.Model.Cliente.ClienteBean;
import utez.edu.mx.Powerzone.Model.Persona.PersonaBean;

@Entity
@Table(name = "Planificacion")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PlanificacionBean {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String dia;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "fk_id_clase")
    private ClaseBean clase;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "fk_id_persona")
    private ClienteBean cliente;

    public PlanificacionBean(String dia, ClaseBean clase, ClienteBean cliente) {
        this.dia=dia;
        this.clase=clase;
        this.cliente=cliente;
    }
}
