package utez.edu.mx.Powerzone.Model.Planificacion;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "Planificacion")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Planificacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String dia;
}
