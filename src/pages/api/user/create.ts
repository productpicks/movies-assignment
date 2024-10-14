import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";

import bcrypt from "bcryptjs";

import User from "@/src/models/User";
import dbConnect from "@/src/lib/dbConnect";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  const form = formidable();

  try {
    const [fields] = await form.parse(req);

    const userExists = await User.exists({
      email: fields.email
    });

    if (userExists) {
      return res.status(400).json({ success: false, error: 'Email already exists!' });
    }

    const user = await User.create({
      ...fields,
      password: bcrypt.hashSync(fields.password as unknown as string, 5),
    });

    return res.status(201).json({ success: true, data: user });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

export default handler;