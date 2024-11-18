package utez.edu.mx.Powerzone.Model.Planificacion;

import org.apache.catalina.Loader;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlanificacionRepository extends JpaRepository<PlanificacionBean, Long> {

    Optional<PlanificacionBean> findById(Long id);
}
