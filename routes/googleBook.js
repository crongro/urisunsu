/*
 * GET users listing.
 */
exports.res = function(req, res){

    //normal json response
    res.json([{
Name : "게으름뱅이 탈출학교: 시간의 소중함을 모르는 아이들을 위한 시간관리의 지혜 (어린이 자기계발학교 1)",
ImageLink: "https://encrypted.google.com/books/images/frontcover/q9sZBAAAQBAJ?fife=w340-rw",
PageLink : "https://play.google.com/store/books/details/%ED%99%A9%EA%B7%BC%EA%B8%B0_%EA%B2%8C%EC%9C%BC%EB%A6%84%EB%B1%85%EC%9D%B4_%ED%83%88%EC%B6%9C%ED%95%99%EA%B5%90?id=q9sZBAAAQBAJ",
Writer: "황근기",
WriterLink: "https://play.google.com/store/books/author?id=%ED%99%A9%EA%B7%BC%EA%B8%B0",
Price: "6,000"
},
{
Name : "초등고민 탈출학교: 초등학생이 가장 고민하는 30가지 심리문제에 답하는 책 (어린이 자기계발학교 5)",
ImageLink: "https://encrypted.google.com/books/images/frontcover/3as9BAAAQBAJ?fife=w340-rw",
PageLink : "https://play.google.com/store/books/details/%EC%9D%B4%EB%AF%BC%EC%8B%9D_%EC%B4%88%EB%93%B1%EA%B3%A0%EB%AF%BC_%ED%83%88%EC%B6%9C%ED%95%99%EA%B5%90?id=3as9BAAAQBAJ",
Writer: "이민식",
WriterLink: "https://play.google.com/store/books/author?id=%EC%9D%B4%EB%AF%BC%EC%8B%9D",
Price: "6,000"
},
{
Name : "시험불안 탈출학교: 실력만큼 성적이 나오지 않는 어린이를 위한 (어린이 자기계발학교 2)",
ImageLink: "https://encrypted.google.com/books/images/frontcover/0NsZBAAAQBAJ?fife=w340-rw",
PageLink : "https://play.google.com/store/books/details/%EB%85%B8%EC%A7%80%EC%98%81_%EC%8B%9C%ED%97%98%EB%B6%88%EC%95%88_%ED%83%88%EC%B6%9C%ED%95%99%EA%B5%90?id=0NsZBAAAQBAJ",
Writer: "노지영",
WriterLink: "https://play.google.com/store/books/author?id=%EB%85%B8%EC%A7%80%EC%98%81",
Price: "5,500"
},
{
Name : "자녀를 위한 7가지 부의 법칙",
       ImageLink: "https://encrypted.google.com/books/images/frontcover/k2sLBAAAQBAJ?fife=w340-rw",
       PageLink : "https://play.google.com/store/books/details/%EC%8B%A0%EC%9A%A9%EC%A4%80_%EC%9E%90%EB%85%80%EB%A5%BC_%EC%9C%84%ED%95%9C_7%EA%B0%80%EC%A7%80_%EB%B6%80%EC%9D%98_%EB%B2%95%EC%B9%99?id=k2sLBAAAQBAJ",
       Writer: "신용준",
       WriterLink: "https://play.google.com/store/books/author?id=%EC%8B%A0%EC%9A%A9%EC%A4%80",
       Price: "8,400"
},
{
Name : "천국 같은 일주일을 위한 바르셀로나•세비야•그라나다",
       ImageLink: "https://encrypted.google.com/books/images/frontcover/KusUBAAAQBAJ?fife=w340-rw",
       PageLink : "https://play.google.com/store/books/details/%EC%9D%B4%EC%A4%80%ED%98%B8_%EC%B2%9C%EA%B5%AD_%EA%B0%99%EC%9D%80_%EC%9D%BC%EC%A3%BC%EC%9D%BC%EC%9D%84_%EC%9C%84%ED%95%9C_%EB%B0%94%EB%A5%B4%EC%85%80%EB%A1%9C%EB%82%98_%EC%84%B8%EB%B9%84%EC%95%BC_%EA%B7%B8%EB%9D%BC%EB%82%98%EB%8B%A4?id=KusUBAAAQBAJ",
       Writer: "이준호",
       WriterLink: "https://play.google.com/store/books/author?id=%EC%9D%B4%EC%A4%80%ED%98%B8",
       Price: "4,500"
},
{
Name : "중2병 엄마는 불안하고, 아이는 억울하다",
       ImageLink: "https://encrypted.google.com/books/images/frontcover/YzX2AwAAQBAJ?fife=w340-rw",
       PageLink : "https://play.google.com/store/books/details/%EC%9D%B4%EC%A7%84%EC%95%84_%EC%A4%912%EB%B3%91_%EC%97%84%EB%A7%88%EB%8A%94_%EB%B6%88%EC%95%88%ED%95%98%EA%B3%A0_%EC%95%84%EC%9D%B4%EB%8A%94_%EC%96%B5%EC%9A%B8%ED%95%98%EB%8B%A4?id=YzX2AwAAQBAJ",
       Writer: "이진아",
       WriterLink: "https://play.google.com/store/books/author?id=%EC%9D%B4%EC%A7%84%EC%95%84",
       Price: "11,200"
}]
);
  //res.jsonp({"title" : "jisu"});
};
