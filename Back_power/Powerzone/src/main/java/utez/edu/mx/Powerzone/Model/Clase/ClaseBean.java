package utez.edu.mx.Powerzone.Model.Clase;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import utez.edu.mx.Powerzone.Model.Cliente.ClienteBean;
import utez.edu.mx.Powerzone.Model.Planificacion.PlanificacionBean;

import java.util.Set;

@Entity
@Table(name = "Clases")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ClaseBean {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private int capacidad_maxima;

    @Column(nullable = false)
    private String hora_inicio;

    @Column(nullable = false, length = 50)
    private String nombre_clase;

    @Column(nullable = false, length = 150)
    private String nombre_profesor;

    @Column(columnDefinition = "BOOLEAN")
    private Boolean estatus;

    @JsonIgnore
    @OneToMany(mappedBy = "clase", fetch = FetchType.LAZY)
    private Set<PlanificacionBean> planificacionBeans;

    public ClaseBean(int capacidad_maxima, String hora_inicio, String nombre_clase, String nombre_profesor) {
        this.capacidad_maxima = capacidad_maxima;
        this.hora_inicio = hora_inicio;
        this.nombre_clase = nombre_clase;
        this.nombre_profesor = nombre_profesor;
    }


}
