import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

import dbConnect from "@/src/lib/dbConnect";
import User from "@/src/models/User";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await dbConnect();

  try {
    const users = await User.find();

    return res.status(201).json({ success: true, data: users });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

export default handler;
