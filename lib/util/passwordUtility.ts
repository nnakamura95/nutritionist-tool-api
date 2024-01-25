export async function hashHandler(password: string) {
  return await Bun.password.hash(password, {
    algorithm: "bcrypt",
  });
}

export async function verifyPassword(password: string) {
  const hash: string = await hashHandler(password);
  return await Bun.password.verify(password, hash);
}