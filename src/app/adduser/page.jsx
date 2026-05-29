"use client";

import { useForm } from "react-hook-form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function AddUserPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    // console.log(data);

    setLoading(true);

    // upload image to cloudinary

    const imgFile = data.photo[0];
    const formData = new FormData();

    formData.append("file", imgFile);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
    );

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData,
    );

    const imgUrl = res.data.secure_url;

    // Save user data
    const userInfo = {
      name: data.name,
      email: data.email,
      address: data.address,
      image: imgUrl,
    };

    // console.log(userInfo);

    // API call here

    const postNewData = await axios.post(
      `http://localhost:3000/api/users`,
      userInfo,
    );

    console.log(postNewData.data);
    reset();
    setLoading(false);
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <Card className="w-full max-w-xl rounded-2xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Add User
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>

              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                {...register("name", {
                  required: "Name is required",
                })}
              />

              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>

              <Input
                id="email"
                type="text"
                placeholder="Enter Email"
                {...register("email")}
              />
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>

              <Textarea
                id="address"
                placeholder="Enter address"
                rows={4}
                {...register("address", {
                  required: "Address is required",
                })}
              />

              {errors.address && (
                <p className="text-sm text-red-500">{errors.address.message}</p>
              )}
            </div>

            {/* Photo Upload */}
            <div className="space-y-2">
              <Label htmlFor="photo">Upload Photo</Label>

              <Input
                id="photo"
                type="file"
                accept="image/*"
                {...register("photo", {
                  required: "Photo is required",
                })}
              />

              {errors.photo && (
                <p className="text-sm text-red-500">{errors.photo.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button disabled={loading} type="submit" className="w-full">
              Add User
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
