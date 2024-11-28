package utez.edu.mx.Powerzone.Model.Equipos_gimnasio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface Equipos_gimnasioRepository extends JpaRepository<Equipos_gimnasioBean, Long> {
    Optional<Equipos_gimnasioBean> findById(Long id);
    Optional<Equipos_gimnasioBean> findByMarca(String marca);
}
