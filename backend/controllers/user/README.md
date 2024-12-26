# api detail book
http://localhost:8888/detail-book?id=1

---------------------------------------------
# api search book
Filter sẽ bao gồm: genre, startPrice - endPrice, age, có 3 mục sort (chỉ chọn 1 trong 3 để sort): discounted_price, sold_quantity, rating_count: tăng dần thì 'asc', giảm dần thì 'desc'
# 1. Khi tìm kiếm lần đầu tiên (Không chọn các mục filter):
http://localhost:8888/search?keyword=the+f&page=1

# 2. Khi chọn filter:
Với mục filter nào không chọn thì để trống, và sort để trống hoặc chọn 1 trong 3 ( Không đồng thời nhiều cái)

ví dụ 1 api: Hủy chọn filter (cơ bản giống 1, nhưng đang ở filter)
http://localhost:8888/search/filter?keyword=&page=1

ví dụ 2 api: Chọn genre
http://localhost:8888/search/filter?keyword=&page=1&genre=fiction

ví dụ 3 api: Chọn sort theo giá (giảm dần), độ tuối:
http://localhost:8888/search/filter?keyword=&page=1&genre=fiction&discounted_price=desc&age=adult

ví dụ 4 api: Chọn sort theo số lượng bán (tăng dần), độ tuối, giá từ 100000 đến 200000:
http://localhost:8888/search/filter?keyword=&page=1&genre=fiction&sold_quantity=asc&age=adult&startPrice=100000&endPrice=200000

## api hoàn chỉnh: Chọn full các filter

http://localhost:8888/search/filter?keyword=&page=1&genre=fiction&age=adult&startPrice=100000&endPrice=200000&sold_quantity=asc

----------------------------------------------
# api thể loại book
Filter sẽ bao gồm: startPrice - endPrice, age, có 3 mục sort (chỉ chọn 1 trong 3 để sort): discounted_price, sold_quantity, rating_count: tăng dần thì 'asc', giảm dần thì 'desc'
# 1. Khi chọn thể loại lần đầu tiên (Không chọn các mục filter):
http://localhost:8888/get-list?genre=fiction&page=1

# 2. Khi chọn filter:
Với mục filter nào không chọn thì để trống, và sort để trống hoặc chọn 1 trong 3 ( Không đồng thời nhiều cái)

ví dụ 1 api: Hủy chọn filter (cơ bản giống 1, nhưng đang ở filter)
http://localhost:8888/get-list/filter?genre=fiction&page=1

ví dụ 2 api: Chọn sort theo giá (giảm dần), độ tuối:
http://localhost:8888/get-list/filter?genre=fiction&page=1&discounted_price=desc&age=adult

ví dụ 3 api: Chọn sort theo số lượng bán (tăng dần), độ tuối, giá từ 100000 đến 200000:
http://localhost:8888/get-list/filter?genre=fiction&page=1&sold_quantity=asc&age=adult&startPrice=100000&endPrice=200000

## api hoàn chỉnh: Chọn full các filter

http://localhost:8888/get-list/filter?genre=fiction&page=1&age=adult&startPrice=100000&endPrice=200000&sold_quantity=asc

----------------------------------------------





