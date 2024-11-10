package utez.edu.mx.Powerzone.Model.Historial_ventas;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import utez.edu.mx.Powerzone.Model.Membresia.MembresiaBean;

import java.time.LocalDate;

@Entity
@Table(name = "HistorialVentas")
@Getter
@Setter
@NoArgsConstructor
public class Historial_ventasBean {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreationTimestamp
    @Column(nullable = true)
    private LocalDate fecha;

    @Column(nullable = true, columnDefinition = "DOUBLE")
    private Double ganancia;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "fk_membresia")
    private MembresiaBean membresia;

    public Historial_ventasBean(LocalDate fecha, Double ganancia, MembresiaBean membresia) {
        this.fecha = fecha;
        this.ganancia = ganancia;
        this.membresia = membresia;
    }
}
