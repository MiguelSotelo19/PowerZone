package utez.edu.mx.Powerzone.Controller.Empleado.DTO;

import lombok.Data;
import utez.edu.mx.Powerzone.Model.Empleado.EmpleadoBean;

@Data
public class EmpleadoDTO {

    private Long id;
    private String nombre;
    private String cotrasenia;
    private String correo;
    private String identificadorusuario;
    private String rol;
    private String telefono;

    public EmpleadoBean toEntity(){
        return new EmpleadoBean(nombre,cotrasenia,correo,identificadorusuario,rol,telefono);
    }

    public EmpleadoBean toUpdate(){
        return new EmpleadoBean(nombre,cotrasenia,correo,identificadorusuario,rol,telefono);
    }
}
