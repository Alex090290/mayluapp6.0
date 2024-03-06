CREATE TABLE
    operadores (
        id int auto_increment,
        nombre varchar(50) not null,
        usuario varchar(15) not null unique,
        pswd varchar(200) not null,
        grupoid int not null,
        activo int not null default 0,
        empresas json,
        createdat timestamp default current_timestamp,
        createdby varchar(15) not null,
        primary key (id),
        foreign key (grupoid) references grupos (id)
    )