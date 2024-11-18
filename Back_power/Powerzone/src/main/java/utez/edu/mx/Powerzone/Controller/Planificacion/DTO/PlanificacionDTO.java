package utez.edu.mx.Powerzone.Controller.Planificacion.DTO;

import lombok.Data;
import utez.edu.mx.Powerzone.Model.Clase.ClaseBean;
import utez.edu.mx.Powerzone.Model.Cliente.ClienteBean;
import utez.edu.mx.Powerzone.Model.Planificacion.PlanificacionBean;

@Data
public class PlanificacionDTO {

    private Long id;
    private String dia;
    private ClaseBean clase;
    private ClienteBean cliente;

    public PlanificacionBean toEntity(){
        return new PlanificacionBean(dia,clase,cliente);
    }
}
