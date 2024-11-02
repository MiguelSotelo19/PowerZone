package utez.edu.mx.Powerzone.Model.Membresia;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import utez.edu.mx.Powerzone.Model.Cliente.ClienteBean;
import utez.edu.mx.Powerzone.Model.Historial_ventas.Historial_ventasBean;

import java.util.Set;

@Entity
@Table(name = "Membresias")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MembresiaBean {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Double costo;

    @Column(nullable = false, length = 25)
    private String tipo_membresia;

    @OneToOne(mappedBy = "membresia")
    private Historial_ventasBean historial;

    @OneToMany(mappedBy = "membresia", fetch = FetchType.LAZY)
    private Set<ClienteBean> clienteBeans;

    public MembresiaBean(Double costo, String tipo_membresia, Historial_ventasBean historial, Set<ClienteBean> clienteBeans) {
        this.costo = costo;
        this.tipo_membresia = tipo_membresia;
        this.historial = historial;
        this.clienteBeans = clienteBeans;
    }
}
