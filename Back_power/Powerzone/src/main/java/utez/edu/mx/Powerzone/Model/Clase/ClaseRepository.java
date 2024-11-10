package utez.edu.mx.Powerzone.Model.Clase;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClaseRepository extends JpaRepository<ClaseBean,Long> {

    @Query("SELECT c FROM ClaseBean c WHERE c.nombre_clase = :nombre_clase")
    Optional<ClaseBean> findByNombre_clase(@Param("nombre_clase") String nombre_clase);
    Optional<ClaseBean> findById(Long id);
}
