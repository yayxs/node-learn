## 数据库操作

1. 数据库版本

```
mysql -V
```

2. 连接数据库

```
mysql -uroot -p你的密码
```

3. 展示软件中的数据库

```
show databases;
```

```sql
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| blog               |
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
5 rows in set (0.00 sec)
```

4. 当前正在使用的数据库

```sql

1
mysql> select database();
+------------+
| database() |
+------------+
| NULL       |
+------------+
1 row in set (0.00 sec)
```

5. 使用数据库 `use`

```sql
mysql> use blog;
Database changed
```

6. 查看数据库中的表

```sql
mysql> show tables;
+----------------+
| Tables_in_blog |
+----------------+
| article_entity |
| juejin         |
| photo          |
| user           |
| user_entity    |
+----------------+
5 rows in set (0.00 sec)
```

7. 创建表

```sql
create table tests
```

8. 查询

```sql
select * from tests
```

## SQL 语句

```
#DDL 数据库表 创建 删除 修改等操作
#DML 表添加删除修改
#DQL 数据库中查询记录
#DCL 权限的访问控制
```

```sql
# 删除数据库
DROP DATABASE IF EXISTS test;
```

```sql
# 查看表的结构
DESC 表的名字

# 查看创建表的语句

SHOW CREATE
```

## 数据类型

1. 数字

- int
- bigint
- float
- double

2. 日期类型

3. 字符串类型

## 表约束

1. 主键
   非空的、

2. 唯一

uniq 唯一性的 比如手机号

3. NOT NULL

不能为空

4. 默认值 DEFAULT

5. 自动递增
   比如用户的 id

## 创建一个完整的表

```sql
# 修改表的名字

ALTER TABLE `users` RENAME TO `user`;

# 添加一个新的字段

ALTER TABLE `user` ADD `字段名` TIMESTAMP;

# 修改已有的字段

```
