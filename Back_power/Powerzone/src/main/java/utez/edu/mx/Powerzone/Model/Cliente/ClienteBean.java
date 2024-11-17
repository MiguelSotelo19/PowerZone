package utez.edu.mx.Powerzone.Model.Cliente;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import utez.edu.mx.Powerzone.Model.Membresia.MembresiaBean;
import utez.edu.mx.Powerzone.Model.Persona.PersonaBean;
import utez.edu.mx.Powerzone.Model.Planificacion.PlanificacionBean;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "Clientes")
@Getter
@Setter
@NoArgsConstructor
public class ClienteBean extends PersonaBean {
    @Column(nullable = false)
    private int CVV;

    @Column(nullable = false, length = 16)
    private String numero_tarjeta;


    @Column(columnDefinition = "DATE")
    private LocalDate adquisicion;

    @Column(columnDefinition = "DATE")
    private LocalDate vencimiento;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "fk_id_membresia")
    @JsonIgnore
    private MembresiaBean membresia;

    @OneToMany(mappedBy = "cliente", fetch = FetchType.LAZY)
    private Set<PlanificacionBean> planificacionBeans;

    public ClienteBean(String nombre, String cotrasenia, String correo, String identificadorusuario, String rol, String telefono, Boolean estatus, int CVV, String numero_tarjeta, MembresiaBean membresia) {
        super(nombre, cotrasenia, correo, identificadorusuario, rol, telefono,estatus);
        this.CVV = CVV;
        this.numero_tarjeta = numero_tarjeta;
        this.membresia = membresia;
    }

    public ClienteBean(String nombre, String cotrasenia, String correo, String identificadorusuario, String rol, String telefono, Boolean estatus, int CVV, String numero_tarjeta, LocalDate adquisicion, LocalDate vencimiento, MembresiaBean membresia, Set<PlanificacionBean> planificacionBeans) {
        super(nombre, cotrasenia, correo, identificadorusuario, rol, telefono, estatus);
        this.CVV = CVV;
        this.numero_tarjeta = numero_tarjeta;
        this.adquisicion = adquisicion;
        this.vencimiento = vencimiento;
        this.membresia = membresia;
        this.planificacionBeans = planificacionBeans;
    }

    public ClienteBean(String nombre, String cotrasenia, String correo, String identificadorusuario, String rol, String telefono, Boolean estatus, int CVV, String numero_tarjeta, LocalDate adquisicion, LocalDate vencimiento, MembresiaBean membresia) {
        super(nombre, cotrasenia, correo, identificadorusuario, rol, telefono, estatus);
        this.CVV = CVV;
        this.numero_tarjeta = numero_tarjeta;
        this.adquisicion = adquisicion;
        this.vencimiento = vencimiento;
        this.membresia = membresia;
    }
}
