package utez.edu.mx.Powerzone.Controller.Gerente.DTO;

import lombok.Data;
import utez.edu.mx.Powerzone.Model.Cliente.ClienteBean;
import utez.edu.mx.Powerzone.Model.Gerente.GerenteBean;
import utez.edu.mx.Powerzone.Model.Membresia.MembresiaBean;

@Data
public class GerenteDTO {
    private Long id;
    private String nombre;
    private String cotrasenia;
    private String correo;
    private String identificadorusuario;
    private String rol;
    private String telefono;
    private Boolean estatus;


    public GerenteBean toEntity(){
        return new GerenteBean(nombre,cotrasenia,correo,identificadorusuario,rol,telefono,estatus);
    }

    public GerenteBean toUpdate(){
        return new GerenteBean(id,nombre,cotrasenia,correo,identificadorusuario,rol,telefono,estatus);
    }
}
