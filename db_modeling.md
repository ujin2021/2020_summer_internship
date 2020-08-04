### db modeling
using mysql 8.0 + dbeaver(직접 sql문 작성하지 않음) <br>

구현 범위 : 회원, 브랜드-상품-이용권, 쿠폰, 콘텐츠, 리뷰, 이용권구매 ... <br>
회원이 최근 조회한 상품 화면띄우기, 찜하기기능, 리뷰기능, 쿠폰사용, 구매내역조회, 조회수별 카테고리 정렬, 이용권횟수있는것(티켓을 화면에띄워야함-사용횟수카운트), 브랜드별 상품, 해당콘텐츠(영상)과 관련된 상품 띄우기, 브랜드/상품 별 이미지 여러개<br>

:page_facing_up: table (크게 생각했을 때) <br>
user, brand, product, ticket, coupon, contents, review <br>
<br>
:page_facing_up: 구현한 것 (+attribute - pk는 모든 테이블에 존재) <br>
:heavy_check_mark: user 
==회원가입 시 필수입력== 
email(email을 id처럼) : unique
password : NN
nickname : NN
phone : NN 
==회원가입 이후 설정==
location(회원 현재 위치-현재위치에 따라 상품을 추천할 수 있도록) : NN

:heavy_check_mark: brand
* logo(브랜드 로고 이미지) : NN
* name(브랜드명) : unique, NN
* introduce(소개글) : NN

:heavy_check_mark: brand_image
> 브랜드 별 이미지가 여러개 저장되어야 하므로 따로 테이블 추가
* brand_id : NN, FK
* image : NN

:heavy_check_mark: category
* icon(카테고리 아이콘) : NN
* name(카테고리명) : NN

:heavy_check_mark: product
* name(상품명) : NN
* introduce(상품 소개글) : NN
* location(상품 위치) : NN
* age_range(사용가능연령) : NN
* thumnail(상품 썸네일) : NN
* category(카테고리) : NN, FK

:heavy_check_mark: product_image
> 상품 별 이미지가 여러개 저장되어야 하므로 따로 테이블 추가
* product_id : NN, FK
* image : NN

:small_red_triangle: coupon
* name(쿠폰명) : NN
* discount_percent(몇% 할인 쿠폰인지) : NN
> val_start(사용가능기간 시작일) : NN <br>
> val_end(사용가능기간 마감일) : NN <br>
> day(며칠 사용가능) : NN
* requirement(요구조건-얼마이상 구매시 사용가능..)

:small_red_triangle: coupon_list
> 쿠폰이 어떤 상품에 적용가능 한지 / 유저가 어떤 쿠폰을 사용하고 있는지 <br>
> 회원과 상품 분리가 되어야 할 것 같다. -> 쿠폰이 없는 상품도 있을 수 있으니 유저-쿠폰/상품-쿠폰 이렇게 두개로 나누는 것이 좋을듯
* user_id : NN, FK
* coupon_id : NN, FK
* product_id : NN, FK

:heavy_check_mark: brand_product
> 브랜드 별 어떤 상품을 보유하고 있는지 알아야 함.
* brand_id : NN, FK
* product_id : NN, FK

:heavy_check_mark: product_heart
> 회원의 상품 찜하기 + 유저의 찜해둔 상품 정보를 띄울 때
* product_id : NN, FK
* user_id : NN, FK

:heavy_check_mark: product_views
> 상품의 조회수 + 유저가 조회한 상품 정보를 띄울 때
* product_id : NN, FK
* user_id : NN, FK
* date : NN
> date 유저가 2주 안에 조회한 상품을 띄우는 조건이므로 시간을 저장해둔다.

:heavy_check_mark: ticket
> 상품하나에 여러 이용권 존재(이용권 별로 가격이 다르고, 사용자가 구매 시 이용권의 매수를 고를 수 있다.
> 이용권은(한번이용권-한번쓰고 끝나는 or 여러번 이용권-10회 이용가능), 유효기간이 존재 할 수 있다.
* name(이용권명) : NN
> val_start(사용기간 시작일) <br>
> val_end(사용기간 마감일) <br>
> 몇회 이용가능인지 -> user가 몇번 썻는지도 체크해야함 <br>

:heavy_check_mark: user_ticket
> 사용자가 구매한 티켓 정보 관리
* user_id : NN, FK
* ticket_id : NN, FK
* quantity(이용권 수량) : NN
* price(이용권가격*이용권수량) : NN
* discount(할인권 등으로 할인을 얼마 or 몇프로 받았는지 - 사용안했다면 null)
* purchase_date(구매한 일자) : NN

:heavy_check_mark: product_ticket
> 상품 별 이용권 관리
* product_id : NN, FK
* ticket_id : NN, FK

<br>

:interrobang: 어떻게 구현할지 잘 모르겠는 것
* coupon/ticket table에 이벤트로 며칠 ~ 며칠 정해져있는 쿠폰 or 사용자가 발급한 후 며칠이내 사용가능 쿠폰 어떻게 따로 저장하는지
* 찜한수/조회수 default=0으로 설정해서 따로 user가 핱 누를 때 마다 증가시키는 컬럼도 하나 추가하고 싶은데 어디에 추가 or 추가 할 필요 없음?

<br>

:heavy_exclamation_mark: 더 구현해야할 것
* 회원 약관 동의에 관한 테이블
* 티켓 이용횟수(유저가 얼만큼 이용했는지, 단일 이면 그냥 삭제)
* 남은 이용권 갯수
