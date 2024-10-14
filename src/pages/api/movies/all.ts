import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/src/lib/dbConnect";
import MovieSchema from "@/src/models/Movie";


const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  await dbConnect(); // Connect to MongoDB

  try {
    // Fetch all movies from the database
    const movies = await MovieSchema.find({});
    res.status(200).json({ success: true, data: movies });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export default handler;
