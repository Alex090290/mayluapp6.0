import { genSalt, hash, compare } from "bcrypt";

export async function genPswHash(str: string): Promise<string> {
  const saltos = await genSalt(5);
  const newHash = await hash(str, saltos);
  return newHash;
}

export async function verifyPswd(
  pswd: string,
  hashPswd: string
): Promise<boolean> {
  const match: boolean = await compare(pswd, hashPswd);
  return match;
}
