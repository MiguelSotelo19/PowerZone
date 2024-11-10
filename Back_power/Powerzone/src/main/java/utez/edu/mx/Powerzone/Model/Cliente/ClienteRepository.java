package utez.edu.mx.Powerzone.Model.Cliente;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClienteRepository extends JpaRepository<ClienteBean, Long> {
  Optional<ClienteBean> findByIdentificadorusuario(String id);
    Optional<ClienteBean> findById(Long id);

}
