package utez.edu.mx.Powerzone.Model.Membresia;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Membresias")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Membresia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_membresia;

    @Column(nullable = false)
    private Double costo;

    @Column(nullable = false, length = 25)
    private String tipo_membresia;

}
