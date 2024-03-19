import { NextRequest, NextResponse } from "next/server";
import conn from "@/lib/connect";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // get id grupo
    const grupoId: string = params.id;

    // get operador
    const result: any = await conn.query("SELECT * FROM grupos WHERE id=?", [
      grupoId,
    ]);

    const usersCount: any = await conn.query(
      "SELECT COUNT(nombre) AS `users` FROM `maylu`.`operadores` WHERE grupoid = ?",
      [grupoId]
    );
    const data = {
      grupo: result[0],
      users: usersCount[0],
    };
    return NextResponse.json({ res: "success", data });
  } catch (error: any) {
    return NextResponse.json({
      res: "error",
      errorMsg: error.sqlMessage,
      errorCode: error.code,
    });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // get the body
    const body = await req.json();
    let { accesos } = body;
    accesos = JSON.stringify(accesos);

    // get id grupo
    const grupoId: string = params.id;

    // update grupo
    const result: any = await conn.query(
      "UPDATE grupos SET accesos=? WHERE `grupos`.`id`=?",
      [accesos, grupoId]
    );

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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // get id grupo
    const grupoId: string = params.id;

    // Delete record
    const result: any = await conn.query(
      "DELETE FROM `maylu`.`grupos` WHERE `maylu`.`grupos`.`id`=?",
      [grupoId]
    );

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
