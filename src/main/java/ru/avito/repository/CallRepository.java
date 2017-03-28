package ru.avito.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.avito.model.calls.Call;

/**
 * Created by Dmitriy on 26.02.2017.
 */
public interface CallRepository extends JpaRepository<Call,Integer>{ //TODO реализовать репозиторий + сущности звонков
}
