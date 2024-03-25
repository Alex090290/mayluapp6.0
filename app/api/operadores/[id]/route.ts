import { NextRequest, NextResponse } from "next/server";
import conn from "@/lib/connect";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // get id operador
    const operId: string = params.id;

    // get operador
    const result: any = await conn.query(
      "SELECT * FROM operadores WHERE id=?",
      [operId]
    );
    return NextResponse.json({ res: "success", data: result[0] });
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
    // get id operador
    const operId: string = params.id;

    // Delete record
    const result: any = await conn.query(
      "DELETE FROM `maylu`.`operadores` WHERE `maylu`.`operadores`.`id`=?",
      [operId]
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

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // get the body
    const body = await req.json();
    const { nombre, usuario, grupoid, activo, almacenes } = body;
    const newBody = {
      nombre,
      usuario,
      grupoid,
      activo,
      almacenes: JSON.stringify(almacenes),
    };

    // get id operador
    const operId: string = params.id;

    // update operador
    const result: any = await conn.query(
      "UPDATE operadores SET ? WHERE `operadores`.`id`=?",
      [newBody, operId]
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
