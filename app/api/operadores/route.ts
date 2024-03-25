import { NextRequest, NextResponse } from "next/server";
import { genPswHash } from "@/lib/hash";
import conn from "@/lib/connect";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { usuario: user, pswd, almacenes } = body;

    // hash the  password
    const hashPswd: string = await genPswHash(pswd);

    // stringify empresas
    const stringified: string = JSON.stringify(almacenes);

    const newOperador = {
      ...body,
      pswd: hashPswd,
      almacenes: stringified,
      createdby: "system",
      usuario: user.trim(),
    };

    // store in db
    const result: any = await conn.query("INSERT INTO operadores SET ? ", [
      newOperador,
    ]);

    // check insertions
    if (result.affectedRows === 1) {
      return NextResponse.json({ res: "success" });
    }
  } catch (error: any) {
    return NextResponse.json({
      res: "error",
      errorMsg: error.sqlMessage,
      errorCode: error.code,
    });
  }
}
