import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";


const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    return res.status(201).json({ success: true, data: "AA" });
  } catch (error) {
    return res.status(400).json({ success: false, error })
  }
};

export default handler;
