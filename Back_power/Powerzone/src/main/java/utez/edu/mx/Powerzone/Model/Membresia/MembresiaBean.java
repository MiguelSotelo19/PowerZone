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
    private Long id_membresia;

    @Column(nullable = false)
    private Double costo;

    @Column(nullable = false, length = 25)
    private String tipo_membresia;

    @OneToOne(mappedBy = "membresia")
    private Historial_ventasBean historial;

    @OneToMany(mappedBy = "membresia", fetch = FetchType.LAZY)
    private Set<ClienteBean> clienteBeans;

    /*
    *  @OneToMany(mappedBy = "pozoBean", fetch = FetchType.LAZY)
    private Set<HistorialBean> datosPozoBeans;
    *
    * @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "fk_id_pozo")
    private PozoBean pozoBean;
    *
    * */

}
