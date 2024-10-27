package utez.edu.mx.Powerzone.Model.Equipos_gimnasio;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Equipos")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Equipos_gimnasioBean {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_equipo;
    @Column(nullable = false)
    private int cantidad;

    @Column(nullable = false, length = 20)
    private String estado;

    @Column(nullable = false, length = 50)
    private String marca;

    @Column(nullable = false, length = 50)
    private String modelo;


}
