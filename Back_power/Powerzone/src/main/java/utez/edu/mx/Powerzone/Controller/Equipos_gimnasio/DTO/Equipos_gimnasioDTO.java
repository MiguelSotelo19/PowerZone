package utez.edu.mx.Powerzone.Controller.Equipos_gimnasio.DTO;

import jakarta.persistence.Column;
import lombok.Data;
import lombok.NoArgsConstructor;
import utez.edu.mx.Powerzone.Model.Equipos_gimnasio.Equipos_gimnasioBean;

@Data
@NoArgsConstructor
public class Equipos_gimnasioDTO {
    private Long id_equipo;
    private int cantidad;
    private String estado;
    private String marca;
    private String modelo;

    public Equipos_gimnasioBean toEntity(){
        return new Equipos_gimnasioBean(cantidad, estado, marca, modelo);
    }

    public Equipos_gimnasioBean toUpdate(){
        return new Equipos_gimnasioBean(id_equipo,cantidad, estado, marca, modelo);
    }
}
