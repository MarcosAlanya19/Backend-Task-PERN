create database tasksdb

create extension if not exists "uuid-ossp";
create table task(
  id UUID primary key default uuid_generate_v4(),
  title varchar(255) unique,
  description varchar(255)
)
