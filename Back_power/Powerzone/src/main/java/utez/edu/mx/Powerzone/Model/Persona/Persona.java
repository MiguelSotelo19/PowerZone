package utez.edu.mx.Powerzone.Model.Persona;

import jakarta.persistence.*;
@MappedSuperclass
public class Persona {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String cotrasenia;
    private String correo;
    private String identificador_usuario;
    private String rol;
    private String telefono;

    public Persona(String nombre, String cotrasenia, String correo, String identificador_usuario, String rol, String telefono) {
        this.nombre = nombre;
        this.cotrasenia = cotrasenia;
        this.correo = correo;
        this.identificador_usuario = identificador_usuario;
        this.rol = rol;
        this.telefono = telefono;
    }

    public Persona() {
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

    public String getIdentificador_usuario() {
        return identificador_usuario;
    }

    public void setIdentificador_usuario(String identificador_usuario) {
        this.identificador_usuario = identificador_usuario;
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
