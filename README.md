# Fullstack

## Описание

Данное Web-приложение представляет собой Dashboard с боковым меню, содержащий две таблицы Ag-Grid, загружающие данные из базы данных PostgreSQL. Реализованы CRUD-операции для управления записями в связанных таблицах. Для частичной подгрузки данных в главной таблице используется Infinite Row Model. Серверная часть построена на Node.js с использованием pg-promise, а клиентская часть - на React.

## Установка и запуск

### 1. Клонирование репозитория
```sh
git clone https://github.com/pav046/Fullstack
cd Fullstack
```

### 2. Установка зависимостей
#### Серверная часть:
```sh
cd server
npm install
```
#### Клиентская часть:
```sh
cd ../client
npm install
```

### 3. Настройка базы данных
1. Установите PostgreSQL.
2. Создайте базу данных и пользователя. (Пользователь, созданный Вами, и пароль для него должны совпадать с данными, указанными в файле Fullstack/server/db.js)
3. Выполните скрипт инициализации БД, находясь в корне проекта:
   ```sh
   psql -U <пользователь> -d <имя_любой_базы_данных> -f init-db.sql
   ```
### 4. Запуск приложения
#### Сервер:
```sh
cd server
npm start
```
#### Клиент:
```sh
cd ../client
npm start
```

После успешного запуска сервер будет доступен по адресу `http://localhost:8080`, а клиент — по `http://localhost:3000`.

