import mysql from "serverless-mysql";

const conn = mysql({
  config: {
    host: "localhost",
    database: "maylu",
    user: "root",
    password: "",
  },
});

export default conn;
