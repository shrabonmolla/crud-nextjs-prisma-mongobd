import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { id: id },
  });

  return Response.json(user);
}

export async function DELETE(req, { params }) {
  const { id } = await params;

  const user = await prisma.user.delete({
    where: { id: id },
  });

  return Response.json({
    status: 204,
  });
}

export async function PATCH(req, { params }) {
  const { id } = await params;

  const newdata = await req.json();

  const user = await prisma.user.update({
    where: { id: id },
    data: {
      name: newdata.name,
      email: newdata.email,
    },
  });

  return Response.json(user);
}
