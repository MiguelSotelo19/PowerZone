package utez.edu.mx.Powerzone.Controller.Planificacion.DTO;

import lombok.Data;
import utez.edu.mx.Powerzone.Controller.Clase.DTO.ClaseDTO;
import utez.edu.mx.Powerzone.Controller.Cliente.DTO.ClienteDTO;
import utez.edu.mx.Powerzone.Model.Planificacion.PlanificacionBean;

@Data
public class PlanificacionDTO2 {

    private Long id;
    private String dia;
    private ClaseDTO clase;
    private ClienteDTO cliente;

    public PlanificacionDTO2(PlanificacionBean planificacion) {
        this.id = planificacion.getId();
        this.dia = planificacion.getDia();
        this.clase = new ClaseDTO(planificacion.getClase());
        this.cliente = new ClienteDTO(planificacion.getCliente());
    }
}
