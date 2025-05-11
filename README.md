# FNMEDIA Search Engine Web Application

- Main DB: MySQL
- Main DB Docker Image: mysql:8.0
- Conatiner Up CMD: 
<br> docker run -d \
  --name my-mysql \
  -e MYSQL_DATABASE=my_database \
  -e MYSQL_USER=my_user \
  -e MYSQL_PASSWORD=my_password \
  -e MYSQL_ROOT_PASSWORD=root_password \
  -p 3307:3306 \
  e28eda493c37
- Execution CMD: docker exec -it mysql-dev mysql -u alphaai -p