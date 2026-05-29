import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CircleFadingArrowUpIcon } from "lucide-react";
import Link from "next/link";
import { Trash } from "lucide-react";
import axios from "axios";
import Deletebtn from "@/Buttons/Deletebtn";

async function getUsers() {
  const res = await fetch("http://localhost:3000/api/users");
  return res.json();
}

export default async function Home() {
  const users = await getUsers();
  return (
    <div>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        All Users <span className="text-sm">({users.length})</span>
      </h1>
      <Table className={`w-10/12 m-auto`}>
        <TableHeader>
          <TableRow>
            <TableHead>Photo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium ">
                <img className="w-10 rounded-full" src={user.image} alt="" />
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell>
                <Deletebtn id={user.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="text-center py-4">
        <Link href={"/adduser"}>
          <Button variant="outline" size="lg">
            <CircleFadingArrowUpIcon /> Create User
          </Button>
        </Link>
      </div>
    </div>
  );
}
