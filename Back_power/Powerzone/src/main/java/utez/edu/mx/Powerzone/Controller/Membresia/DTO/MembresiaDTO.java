package utez.edu.mx.Powerzone.Controller.Membresia.DTO;

import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Data;
import utez.edu.mx.Powerzone.Model.Cliente.ClienteBean;
import utez.edu.mx.Powerzone.Model.Historial_ventas.Historial_ventasBean;
import utez.edu.mx.Powerzone.Model.Membresia.MembresiaBean;

import java.util.Set;

@Data
public class MembresiaDTO {

    private Long id_membresia;
    private Double costo;
    private String tipo_membresia;
    private Set<Historial_ventasBean> historial;
    private Set<ClienteBean> clienteBeans;

    public MembresiaBean toUpdate(){
        return new MembresiaBean(costo, tipo_membresia, historial, clienteBeans);
    }
}
