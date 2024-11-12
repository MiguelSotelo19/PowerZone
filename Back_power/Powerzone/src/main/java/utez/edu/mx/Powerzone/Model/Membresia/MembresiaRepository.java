package utez.edu.mx.Powerzone.Model.Membresia;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MembresiaRepository extends JpaRepository<MembresiaBean, Long> {
   Optional<MembresiaBean>findById(Long id);

 /*  @Query("SELECT SUM(h.ganancia) FROM Historial_ventasBean h WHERE h.membresia.id = :membresiaId")
   Double sumGananciaByMembresiaId(@Param("membresiaId") Long membresiaId);*/
}

