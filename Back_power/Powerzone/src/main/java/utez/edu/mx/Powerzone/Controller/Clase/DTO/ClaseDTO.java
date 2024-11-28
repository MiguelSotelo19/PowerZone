package utez.edu.mx.Powerzone.Controller.Clase.DTO;

import lombok.Data;
import utez.edu.mx.Powerzone.Model.Clase.ClaseBean;

@Data
public class ClaseDTO {

    private Long id;
    private int capacidad_maxima;
    private String hora_inicio;
    private String nombre_clase;
    private String nombre_profesor;

    public ClaseBean toEntity(){
        return new ClaseBean(capacidad_maxima,hora_inicio,nombre_clase,nombre_profesor);
    }

    public ClaseBean toUpdate(){
        return new ClaseBean(capacidad_maxima,hora_inicio,nombre_clase,nombre_profesor);
    }

    public ClaseDTO(ClaseBean clase) {
        this.id = clase.getId();
    }
}
