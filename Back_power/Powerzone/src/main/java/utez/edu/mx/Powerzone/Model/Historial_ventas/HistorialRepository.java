package utez.edu.mx.Powerzone.Model.Historial_ventas;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface HistorialRepository extends JpaRepository<Historial_ventasBean, Long> {

    Optional<Historial_ventasBean> findById(Long id);
    //Optional<Historial_ventasBean> findAllByFecha(LocalDate fecha);

}
