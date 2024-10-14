import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import formidable, { IncomingForm, File } from "formidable";
import fs from "fs";
import path from "path";
import dbConnect from "@/src/lib/dbConnect";
import MovieSchema from "@/src/models/Movie";
import jwt from "jsonwebtoken";
import UserSchema from "@/src/models/User"; // Assuming you have a User model
import mongoose from "mongoose";

interface JwtPayload {
  userId: string;
}
export const config = {
  api: {
    bodyParser: false,
  },
};

const parseForm = (
  req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  return new Promise((resolve, reject) => {
    // const form = new IncomingForm();

    const uploadDir = path.join(process.cwd(), "/public/uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    const form = formidable({
      uploadDir: uploadDir,
      keepExtensions: true,
      multiples: false,
    });
    // form.uploadDir = uploadDir;
    // form.keepExtensions = true;
    // form.multiples = false;

    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  await dbConnect(); // Connect to MongoDB

  try {
    // Extract JWT from Authorization header
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res
        .status(401)
        .json({ success: false, message: "User is not authenticated" });
    }

    const token = authHeader.split(" ")[1];
    // const decoded = jwt.decode(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    const userId = decoded?.userId;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    // Parse the form and get fields and files
    const { fields, files } = await parseForm(req);
    console.log("fields", fields, "files", files);
    const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
    const year = Array.isArray(fields.year) ? fields.year[0] : fields.year;

    if (!title || !year || !files.file) {
      return res.status(400).json({
        success: false,
        message: "Title, year, and image are required",
      });
    }

    const file: File = Array.isArray(files.file)
      ? files.file[0]
      : (files.file as File);

    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.mimetype || "")) {
      return res.status(400).json({
        success: false,
        message: "Only JPEG and PNG images are allowed",
      });
    }

    const imageExt = path.extname(file.originalFilename || "").toLowerCase();
    const imageName = `${Date.now()}-${file.newFilename}${imageExt}`;
    const outputFilePath = path.join(
      process.cwd(),
      `/public/uploads/${imageName}`
    );

    // Move file from temp location to upload directory
    fs.renameSync(file.filepath, outputFilePath);

    // Create new movie document
    const newMovie = new MovieSchema({
      title,
      year: Number(year),
      poster: `/uploads/${imageName}`,
      createdBy: new mongoose.Types.ObjectId(userId), // Associate with logged-in user
    });

    const savedMovie = await newMovie.save();

    res.status(201).json({ success: true, data: savedMovie });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export default handler;
