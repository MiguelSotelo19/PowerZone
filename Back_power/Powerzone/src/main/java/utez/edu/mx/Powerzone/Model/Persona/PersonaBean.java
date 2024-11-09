package utez.edu.mx.Powerzone.Model.Persona;

import jakarta.persistence.*;
@MappedSuperclass
public class PersonaBean {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String cotrasenia;
    private String correo;
    @Column(name = "identificador_usuario")
    private String identificadorusuario;
    private String rol;
    private String telefono;

    public PersonaBean(String nombre, String cotrasenia, String correo, String identificadorusuario, String rol, String telefono) {
        this.nombre = nombre;
        this.cotrasenia = cotrasenia;
        this.correo = correo;
        this.identificadorusuario = identificadorusuario;
        this.rol = rol;
        this.telefono = telefono;
    }

    public PersonaBean() {
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCotrasenia() {
        return cotrasenia;
    }

    public void setCotrasenia(String cotrasenia) {
        this.cotrasenia = cotrasenia;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getIdentificadorusuario() {
        return identificadorusuario;
    }

    public void setIdentificador_usuario(String identificadorusuario) {
        this.identificadorusuario = identificadorusuario;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }
}
