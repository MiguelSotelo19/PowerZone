package utez.edu.mx.Powerzone.Model.Empleado;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmpleadoRepository extends JpaRepository<EmpleadoBean, Long> {

    Optional<EmpleadoBean> findById(Long id);

    Optional<EmpleadoBean> findByIdentificadorusuario(String id);

}
