package com.study.board.repository;

import com.study.board.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository // 엔티티처럼 레포지토리로 지정
public interface BoardRepository extends JpaRepository<Board, Integer> {


}
