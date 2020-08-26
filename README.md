# 2020_summer_internship
:office: <a href='https://kidsfactory.net/'>주식회사 키즈팩토리</a> <br>
:date: 기간 : 2020.08.03 ~ 2020.08.31 <br>
:hourglass_flowing_sand: AM 10:00 ~ PM 7:00 <br>
:pencil:배우고 있는것... db 설계, express.js로 API  <br> <br>
#### 1일차
* csv 파일 mysql 적용시키기 (mysql workbench 사용)
* db 이론공부 (<a href="https://victorydntmd.tistory.com/125">참고</a>)
* db설계 연습(<a href="https://blog.advenoh.pe.kr/database/%EA%B4%80%EA%B3%84%ED%98%95-%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4-%EC%84%A4%EA%B3%84-%EB%B0%8F-%EA%B5%AC%EC%B6%95/">참고</a>)
* project ux/ui 분석 후 db설계(<a href="https://dionysus2074.tistory.com/105">참고</a>)

#### 2일차
* project db 설계
* feedback 받기 위해 구현한 것 정리, 질문할 것 정리(+ 크롤링을 언제 하는게 적합? 어떤정보를 갖고올지)
* 정보 크롤링하여 db에 저장하기
* :heavy_exclamation_mark: 설계시 FK를 연결해놓을 필요가 없었다(지금 하고있는 건 하드웨어적인 fk)
> <a href="https://m.blog.naver.com/PostView.nhn?blogId=hist0134&logNo=220249120040&proxyReferer=https:%2F%2Fwww.google.com%2F">참고</a>

#### 3일차
* 개발과장님 피드백 및 질문
* node.js 공부(생활코딩 node.js pm2 사용법까지)

#### 4일차
* node.js 강의 글삭제 기능완성까지(CRUD 구현 clear)
<br>
내일할 것 : node.js 강의마저듣기(CRUD구현)(2시간정도) + express.js 강의듣기(2시간정도) <br>
간단한 서버 구축하고 express.js로 post, get코드 구현해보기(postman으로 작동잘되는지 확인하기) <br>

#### 5일차
* 프로젝트 시작 <br>
> <a href='https://github.com/ujin2021/internship_project.git'>프로젝트</a>

#### 7일차
* 이메일 중복체크, 회원가입, 로그인, 토큰발급, 토큰확인(db는 조회안했는데 일단 되는것 같긴하다..?), 카테고리 불러오기 까지 완료
* node.js crawling, 카테고리에 해당하는 상품들 가져오기(db를 두번 조회해야해서...)

#### ❤️피드백(코드, mysql 연결 middleware 만들기, crawling)

##### 1) crawling
  
  * 크론탭서버를 먼저 구축해야함 (크롤링 api를 사용할 수 있는 곳들을 잘 알아봐야함. 잘못하면 한번 크롤링 하고 ip가 막힐 수 있다 -> 그럼 서버가 죽음)
  * 먼저 크롤링을 할 수 있는지 확실히 알아보고, 그에 따른 프로젝트 인원이 몇명이 필요할지, 어떻게 진행할지 등 사람들과 상의(애자일 방법론)
  * 스케줄러를 설정해놓아야 한다. -> 사람들이 최대한 사용안하는 시간에 크롤링 하도록(간격은 일주일에 한번정도)
  * 크롤링한 정보들을 db에 저장해놓는다(실시간으로 하면 i/o 처리량이 많아 서버가 죽는다) 크롤링되는 주기를 정해놓고 바뀐정보가 있으면 업데이트한다.
  > <a href="https://happist.com/553442/%EC%84%9C%EB%B2%84%EC%97%90%EC%84%9C-%EC%9E%90%EB%8F%99-%EC%8B%A4%ED%96%89%EC%9D%84-%EA%B0%80%EB%8A%A5%EC%BC%80-%ED%95%B4%EC%A3%BC%EB%8A%94-crontab%ED%81%AC%EB%A1%A0%ED%83%AD-%EC%84%A4%EC%A0%95"></a>
  
  :boom::boom: axios cross domain 문제일수도 있으니 header에 cross doamin 추가해서 테스트해보기!!
  
##### 2) code

1. <a href="https://gist.github.com/2f897ba534658d8c09c524cd9b23c5c0.git">내코드</a> <br>

2. <a href="https://gist.github.com/11ee92f548836af1e48d343c1e39f97a.git">과장님 코드 </a> (내코드 기반으로 수정해주신 것)<br>

❗️ 주의할것 <br>

* function은 async로 (await을 쓰든 안쓰든) 일단 붙여놓고 await이 필요할 때 붙이는 것이 낫다.
* status (201->200, 503->400) 50으로 시작하는 것은 치명적인 경우(서버가 죽거나 db가 죽었을 때.) 웬만하면 4로 시작하는 거 쓰자.
* try catch 구문으로 작성할 것(웬만한 error은 출력되도록, 이렇게 안하면 error났을 때 서버가 죽는다)
* js 파일이름에 보통 \_ (언더바)를 넣지 않는다.

##### 3) mysql middleware 설정

* 만들어진 pool은 res에 넣어준다.
* mysql 모듈은 현재 미들웨어로 사용을 못한다(?) -> mysql2 를 사용
* middle ware 설정방법은 코드 참고
* middel ware는 app에서 app.use로 구현한다(router에서 x)
> $ npm uninstall mysql <br>
> $ npm install --save mysql2

##### 4) 실행 프로그램

* pm2는 무중단(watch opt) -> 메모리를 많이 잡아먹는다
* nodemon을 사용한다
> nodemon 설치 : $ npm install -g nodemon <br>
> nodemon 실행 : $ nodemon app.js

#### 9일차
* 좋아요, 리뷰 db생성, insert 하는 코드 추가
* 좋아요수, 리뷰수, 조회수, 리뷰별점평균 어디에 추가해야할지 몰라서 과장님께 질문!!

#### ❤️피드백(db관련)
* d로 시작하는건 무조건 하지말아야한다. Delete, Drop!! -> 지워버리면 나중에 통계 안낼꺼야?!
* log로 시작하는 것은 절대 지우면 안된다. 기록같은것. 삼국사기같은거 안없애잖아?!
* table이름은 복수로(users, categories, ...) 여러개를 저장하는 거니까
* column이름 줄이지 말고 다 풀어쓰기(테이블 이름도그렇고 네이밍을 잘해야 인수인계를 할 때, 남에게 db관리를 맡길 때 편하다)
* column 이름은 table이름단수_이름. 예시)table : users, column : user_email
* pk도 나는 다 id로 통일했는데 그러면 헷갈릴 수 있다. table이 user면 user_no 처럼 테이블단수_no 이렇게 설정하자
* 단순계산 같은것은 그냥 테이블을 따로만들지 않고 컬럼으로 넣어둔다(조회수, 하트수 등등) 따로 만들게 되면 긁어와야하니까
* delete 를 절대하지말고(log를 남겨야함) remove를 하자 -> enable 컬럼을 테이블에 추가하여 0,1로 구현하자.

#### 10일차
* jwt decode 하는 코드가 중복되어 미들웨어로 만들려고 함.

#### ❤️피드백(jwt middleware 관련)
* db는 app.js 에서 middleware 설정. -> res에 넣어준다. (db는 특수케이스)
* jwt는 route.js에서 middleware 설정 -> req에 넣어준다. (내가 req로 받은것을 다시 넘겨줘야하니까)
* 완전히 이해는 안되지만 어느정도 감은 옴..!

#### db설계는 간단히. 어떻게 코드를 짤 것인가. -> 과연 이렇게 설계했을 때 간단히 select 나 join 할수 있는가?

#### ❤️피드백(coupon사용 구현 관련)
나의 질문 : 어떤 상품을 구매할지, 수량이 얼마인지 체크해서 총 가격을 체크 후 사용자가 가지고 있는 쿠폰 중 사용가능한 것(요구조건에 맞는.. 얼마 이상)을 띄워주려고 하는데 이것을 어떻게 구현해야하는지? <br> 
=> 방법이 2가지 있다 <br>
1) server에서 처리하기 (2 depth)
* 티켓 선택, 티켓 수량 선택 등을 받는다
* 그다음 결제 창에서 이전 url로 받은 정보를 활용하여 사용자가 사용가능한 쿠폰을 보내준다
2) client에서 처리하기 (1 depth)
* 티켓 정보들(가격) 과 사용자가 가진 쿠폰을 모두 client에게 보내준다
* 쿠폰을 사용할 수 있는지는(쿠폰의 요구조건에 맞는지) client측에서 판단
=> 모든걸 server가 처리할 수 없다! 유효성 검사 같은것은 클라이언트 측에서 

#### ❤️피드백(코드관련-jwt, 암호화)
* jwt 보통 access token + refresh token 
=> access token은 만료일이 지정되어있다. refresh token은 db에 저장해놓는다(로그아웃시 사라지고 새로 로그인할 때 재발급. 암호화가 잘되어 있어야 한다.) <br>
=> access token과 refresh 를 같이 보내고 만약 access가 만료되었다면 access token 재발급(만료되었으니까 어떤사용자인지 어떻게 판단?->refresh 로) <br>
=> 자동로그인같은경우, app에 refresh token을 저장해두면 된다. <br>
=> 따라서 jwt 확인하는것은 미들웨어로 구현해야한다. 만약 만료되었으면 다시보내주어야하므로 그때는 res에 token을 추가해서 보내준다 <
-> 어려운 내용... <br>
* node(statless)는 session을 사용하기 힘들다
=> single thread. 사람들이 많이 몰리면 느려질 수 있다. -> 새로운 컴퓨터로 서버를 열면 사용자는 다시로그인해야함
* 비밀번호 암호화는 무조건 단방향.(절대 복호화 할 수 없게 해야한다.) => mysql password를 사용(여기선 secret key가 refresh 되기때문에 복호화 하기 어렵다.)

#### ❤️피드백(앞으로의 공부방향에 대해서)
* 계속 같은 함수들, 같은알고리즘만 짜니까 발전이 없다고 느껴진다. 클린코드 어떻게 해야할지 <br>
=> boilerplate 를 만들어보기 <br>
=> 조회수 가장높은것을 체크하는 api를 만들어보기 <br>
=> awesome django boilerplate 키워드로 검색해보자 <br>
=> 여러 사람의 코드를 찾아보면서 코드를 어떻게 짜는지 알아보자 <br>
=> 여러 도서들을 읽어보자(개발에 대한) <br>
=> 네이밍, restful api 작성법을 잘 숙지해놓자(http method도.. put을 써도 되는 것에 post를 쓰고있진 않은지..) <br>
=> 알고리즘을 공부하자 <br>
