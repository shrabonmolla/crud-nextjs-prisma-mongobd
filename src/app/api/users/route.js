import prisma from "@/lib/prisma";

export async function GET(req) {
  const alluser = await prisma.user.findMany();
  return Response.json(alluser);
}

export async function POST(req) {
  const body = await req.json();
  const { name, email, image, address } = body;
  const newuser = await prisma.user.create({
    data: { name, email, image, address },
  });
  return Response.json(newuser, { status: 201 });
}
