package utez.edu.mx.Powerzone.Model.Historial_ventas;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface HistorialRepository extends JpaRepository<Historial_ventasBean, Long> {

    Optional<Historial_ventasBean> findById(Long id);
    //Optional<Historial_ventasBean> findAllByFecha(LocalDate fecha);

    @Query("SELECT h FROM Historial_ventasBean h WHERE h.membresia.id = :membresiaId")
    List<Historial_ventasBean> findHistorialByMembresiaId(@Param("membresiaId") Long membresiaId);


}
