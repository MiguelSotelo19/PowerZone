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
@NoArgsConstructor
public class Equipos_gimnasioBean {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_equipo;
    @Column(nullable = false)
    private int cantidad;

    @Column(length = 20)
    private String estado;

    @Column(length = 50)
    private String marca;

    @Column(length = 50)
    private String modelo;


    @Column(columnDefinition = "BOOLEAN")
    private Boolean estatus;

    public Equipos_gimnasioBean(int cantidad, String estado, String marca, String modelo, Boolean estatus) {
        this.cantidad = cantidad;
        this.estado = estado;
        this.marca = marca;
        this.modelo = modelo;
        this.estatus = estatus;
    }

    public Equipos_gimnasioBean(Long id_equipo, int cantidad, String estado, String marca, String modelo, Boolean estatus) {
        this.id_equipo = id_equipo;
        this.cantidad = cantidad;
        this.estado = estado;
        this.marca = marca;
        this.modelo = modelo;
        this.estatus = estatus;
    }
}
