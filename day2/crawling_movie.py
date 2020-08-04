import requests
from bs4 import BeautifulSoup
from db_setting import db

url = "https://movie.naver.com/movie/sdb/rank/rmovie.nhn?sel=cur&date=20200803" # 영화+평점 페이지

webpage = requests.get(url)
soup = BeautifulSoup(webpage.content, "html.parser")
# print(soup) 해당 web page의 html 가져온다
# print(soup.p) 첫번째 p태그 가져옴
# 등등 필요한 정보만 가져오는 예시 코드 : http://hleecaster.com/python-web-crawling-with-beautifulsoup/

title_n = soup.find_all('div', 'tit5')
point_n = soup.find_all('td', 'point')
print(title_n[:3])
print(len(title_n))
print(point_n[:3])
print(len(point_n))

movie_name = [soup.find_all('div', 'tit5')[n].a.string for n in range(0, len(title_n))]
movie_point = [soup.find_all('td', 'point')[n].string for n in range(0, len(title_n))]

print(movie_name)
print(movie_point)

import pymysql

conn = pymysql.connect(host=db['host'], user=db['user'], password=db['password'], db=db['db'], charset=db['charset'])
curs = conn.cursor(pymysql.cursors.DictCursor)

for title,point in zip(movie_name, movie_point):
    sql = "INSERT INTO test_crawling (movie, point) VALUES (%s,%s)"
    val = (title,point)
    curs.execute(sql, val)

conn.commit()
conn.close()

