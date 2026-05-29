"use client";

import { Trash } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Deletebtn({ id }) {
  const router = useRouter();

  async function handleDelete(id) {
    const res = await axios.delete(`http://localhost:3000/api/users/${id}`);
    console.log(res.data);
    router.refresh();
  }

  return (
    <div>
      <Button onClick={() => handleDelete(id)}>
        <Trash />
      </Button>
    </div>
  );
}
