package utez.edu.mx.Powerzone.Model.Gerente;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GerenteRepository extends JpaRepository<GerenteBean, Long> {
    Optional<GerenteBean>findByIdentificadorusuario(String id);

}
