import { NextRequest, NextResponse } from "next/server";
import conn from "@/lib/connect";

export async function GET() {
  try {
    const result: any[] = await conn.query(
      "SELECT * FROM `maylu`.`grupos` ORDER BY `grupos`.`createdat` ASC"
    );
    const changedGrupos: Array<any> = result.map((grupo) => {
      grupo.accesos = JSON.parse(grupo.accesos);
      return grupo;
    });
    return NextResponse.json({ res: "success", data: changedGrupos });
  } catch (error: any) {
    return NextResponse.json({
      res: "error",
      errorMsg: error.sqlMessage,
      errorCode: error.code,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let { accesos } = body;
    accesos = JSON.stringify(accesos);
    const newBody = { ...body, accesos };
    const result: any = await conn.query("INSERT INTO `maylu`.`grupos` SET ?", [
      newBody,
    ]);

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
