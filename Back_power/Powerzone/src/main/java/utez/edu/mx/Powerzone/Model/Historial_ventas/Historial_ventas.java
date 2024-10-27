package utez.edu.mx.Powerzone.Model.Historial_ventas;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "HistorialVentas")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Historial_ventas {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fecha;

    @Column(nullable = false, columnDefinition = "DOUBLE")
    private Double ganancia;

}
