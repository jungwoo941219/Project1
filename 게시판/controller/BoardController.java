package com.study.board.controller;

import com.study.board.entity.Board;
import com.study.board.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Controller
public class BoardController {
    @Autowired
    private BoardService boardService;
    // 게시글 작성
    @GetMapping("/board/write")  // localhost:8080/board/write
    public String boardwriteForm(){

        return "boardwrite";
    }
    @PostMapping("/board/writepro") // localhost:8080/board/writepro
    public String boardwritepro(Board board, Model model){

        model.addAttribute("message","글 작성이 완료 되었습니다.");
        model.addAttribute("searchUrl","/board/list");

        return "message";
    }
    // 게시글 리스트
    @GetMapping("/board/list")    
    public String boardList(Model model, @PageableDefault(page = 0, size = 25, sort = "id", direction = Sort.Direction.DESC) Pageable pageable){
                                            // 페이징 처리
                                            // page: default 페이지 // size : 한페이지 게시글 수 // sort : 정렬기준 컬럼 // direction : 정렬 순서 DESC == 디센딩
        Page<Board> list = boardService.boardList(pageable);

        int nowPage = list.getPageable().getPageNumber() + 1; // 0에서부터 시작되어서 1을 더해줘야함.
        int startPage = Math.max(nowPage - 4, 1);
        int endPage = Math.min(nowPage + 5, list.getTotalPages());

        model.addAttribute("list",list);
        model.addAttribute("nowPage",nowPage);
        model.addAttribute("startPage",startPage);
        model.addAttribute("endPage",endPage);
        return "boardlist";
    }
    // 게시글 불러오기
    @GetMapping("/board/view") // localhost:8080/board/view?id=1 // 게시글 불러오기
    public String boardview(Model model, Integer id){

        model.addAttribute("board",boardService.boardview(id));
        return "boardview";
    }
    // 게시글 삭제
    @GetMapping("/board/delete")
    public String boardDelete(Integer id, Model model){

        boardService.boardDelete(id);

        model.addAttribute("message","글 삭제가 완료 되었습니다.");
        model.addAttribute("searchUrl","/board/list");

        return "message";
    }

    // 게시글 수정페이지
    @GetMapping("/board/modify/{id}")    // PathVariable : {id}를 Integer형으로 불러옴
                                           // 즉, view?id=1 이 아닌 view?{1}..view?{2}..view?{3} 이런식으로
    public String boardModify(@PathVariable("id") Integer id, Model model) {

        model.addAttribute("board",boardService.boardview(id));
        // 수정시 기존에 있던 데이터를 그대로 불러오기 위함
        // 즉 , 수정 클릭시 제목 / 내용 그대로 불러오기 위함
        return "boardmodify";
    }
    // 글 수정완료
    @PostMapping("/board/update/{id}")
    public String boardUpdate(@PathVariable("id") Integer id, Board board){

        Board boardTemp = boardService.boardview(id); // 기존에 있던 내용 가져오기
        boardTemp.setTitle(board.getTitle()); // 덮어씌우기
        boardTemp.setContent(board.getContent()); // 덮어씌우기
        // 원래는 글 수정시 덮어씌우면 절대 안됨!!
        boardService.write(boardTemp);
        return "redirect:/board/list";
    }
}
