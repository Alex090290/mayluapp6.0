CREATE TABLE
    grupos (
        id int auto_increment,
        nombre varchar(20) not null unique,
        permisos json,
        createdat timestamp default current_timestamp,
        createdby varchar(20),
        primary key (id)
    )