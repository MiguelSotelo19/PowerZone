package utez.edu.mx.Powerzone.Model.Clase;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;

@Entity
@Table(name = "Clases")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Clase {
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
}
