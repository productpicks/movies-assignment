'use server';

import { hashSync } from "bcryptjs";
import { getServerSession } from "next-auth";

import dbConnect from "@/lib/dbConnect";
import User, { Users } from "@/models/User";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { isEmpty } from "lodash";

export async function getUsers() {
  await dbConnect();

  const users = await User.find({}).exec();

  return JSON.parse(JSON.stringify(users));
}

export async function getProfile() {
  await dbConnect();

  const session = await getServerSession(authOptions);

  const user = await User.findById(session.user.id).orFail();

  return JSON.parse(JSON.stringify(user));
}

export async function updateProfile(fields: {
  id: string;
  name: string;
  email: string;
  contact: string;
  password: string
  passwordConfirmation: string
}) {
  await dbConnect();

  const userExists = await User.findOne({
    email: fields.email,
  });

  if (userExists && String(userExists._id) != fields.id) {
    return { success: false, error: 'Email already exists!' };
  }

  let payload: any = fields;

  if (fields.password && !isEmpty(fields.password)) {
    payload = {
      ...payload,
      password: hashSync(fields.password as unknown as string, 5),
    }
  } else {
    delete payload.password;
  }

  const user = await User.findByIdAndUpdate(fields.id, {
    $set: payload
  });

  return JSON.parse(JSON.stringify({ success: true, data: user }));
}

export async function getUserById(id: string): Promise<Users> {
  await dbConnect();

  const user = await User.findById(id).orFail();

  return JSON.parse(JSON.stringify(user));
}

export async function deleteUser(id: string) {
  await dbConnect();

  const user = await User.findByIdAndDelete(id).orFail();

  return JSON.parse(JSON.stringify(user));
}

export async function createUser(fields: {
  name: string;
  contact: string;
  email: string;
  password: string;
  addedBy: string;
}) {
  await dbConnect();

  const userExists = await User.exists({
    email: fields.email
  });

  if (userExists) {
    return {
      status: false,
      data: 'Email already in use!'
    };
  }

  const user = await User.create({
    ...fields,
    password: hashSync(fields.password as unknown as string, 5),
  });

  return {
    status: true,
    data: user,
  };
}