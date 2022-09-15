package com.study.board.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity // DB에 있는 테이블을 의미
@Data
public class Board {   // DB 테이블 형식에 맞게 필드를 지정해줌.

    @Id // primary key를 의미
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto_increment
    private Integer id;

    private String title;

    private String content;

}
