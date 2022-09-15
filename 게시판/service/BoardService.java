package com.study.board.service;

import com.study.board.entity.Board;
import com.study.board.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public class BoardService {

    @Autowired
    private BoardRepository boardRepository ;

    public void write(Board board){         // 글 작성 처리

        boardRepository.save(board);

    }
    // 게시글 리스트 처리
    public Page<Board> boardList(Pageable pageable){         // 게시물 리스트 처리

        return boardRepository.findAll(pageable);
    }

    // 특정 게시글 불러오기
    public Board boardview(Integer id){               // 특정 게시글 불러오기

        return boardRepository.findById(id).get();
    }
    
    // 특정 게시글 삭제
    public void boardDelete(Integer id){

        boardRepository.deleteById(id);
    }
}
