package utez.edu.mx.Powerzone.Controller.Historial_ventas.DTO;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import utez.edu.mx.Powerzone.Model.Historial_ventas.Historial_ventasBean;
import utez.edu.mx.Powerzone.Model.Membresia.MembresiaBean;

import java.time.LocalDate;

@Data
public class Historial_ventasDTO {

    private Long id;

    private LocalDate fecha;

    private Double ganancia;

    private MembresiaBean membresia;

    public Historial_ventasBean toEntity(){
        return new Historial_ventasBean(fecha,ganancia,membresia);
    }
}
