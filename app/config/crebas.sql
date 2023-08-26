/*==============================================================*/
/* DBMS name:      MySQL 8.x                                    */
/* Created on:     8/2/2023 12:41:45 AM                         */
/*==============================================================*/

-- Eliminar tablas si existen
drop table if exists TRANSACTION;
drop table if exists BOOK;
drop table if exists TRANSACTION_TYPE;

/*==============================================================*/
/* Table: BOOK                                                  */
/*==============================================================*/
create table BOOK
(
   ID_BOOK              integer not null auto_increment,
   TITLE                varchar(100),
   AUTHOR               varchar(100),
   PRICE                float,
   STOCK                integer,
   PUBLISHER            varchar(100),
   primary key (ID_BOOK)
) engine=InnoDB;

/*==============================================================*/
/* Table: TRANSACTION                                           */
/*==============================================================*/
create table TRANSACTION
(
   ID_TRANSACTION       integer not null auto_increment,
   ID_TYPE_TRANSACTION  integer,
   ID_BOOK              integer,
   QUANTITY             integer,
   DATE_TRANSACTION     varchar(100),
   primary key (ID_TRANSACTION)
) engine=InnoDB;

/*==============================================================*/
/* Table: TRANSACTION_TYPE                                      */
/*==============================================================*/
create table TRANSACTION_TYPE
(
   ID_TYPE_TRANSACTION  integer not null auto_increment,
   NAME_TRANSACTION     varchar(100),
   VALUE_TRANSACTION     varchar(1),
   primary key (ID_TYPE_TRANSACTION)
) engine=InnoDB;

-- Añadir restricciones de claves foráneas
alter table TRANSACTION add constraint FK_TRANSACT_REFERENCE_TRANSACT foreign key (ID_TYPE_TRANSACTION)
      references TRANSACTION_TYPE (ID_TYPE_TRANSACTION) on delete restrict on update restrict;

alter table TRANSACTION add constraint FK_TRANSACT_REFERENCE_BOOK foreign key (ID_BOOK)
      references BOOK (ID_BOOK) on delete restrict on update restrict;
      
-- Inserción de datos
INSERT INTO TRANSACTION_TYPE (NAME_TRANSACTION, VALUE_TRANSACTION)
VALUES ('Compra','+');

INSERT INTO TRANSACTION_TYPE (NAME_TRANSACTION, VALUE_TRANSACTION)
VALUES ('Venta','-');

INSERT INTO BOOK (TITLE, AUTHOR, PRICE, STOCK, PUBLISHER)
VALUES ('Libro de Ejemplo', 'Autor de Ejemplo', 29.99, 100, 'Editorial de Ejemplo');

INSERT INTO TRANSACTION (ID_TYPE_TRANSACTION, ID_BOOK, QUANTITY,DATE_TRANSACTION)
VALUES (1, 1, 10, '2023-08-02');

