# Back-end of Human-Computer Interaction final project 
Để chạy cần cài đặt: 
- Docker Desktop (Windows) và Docker Compose. 
- Khởi động Docker Desktop. 
- Run: **docker-compose up** and **mvn spring-boot:run**. 
- Test APIs using Postman with API prefix (http://localhost:8080/api/v1/cards/):
    - category: get all categories. 
    - category/{categoryId}: get all cards in a category. 
    - cardId: get a card. 