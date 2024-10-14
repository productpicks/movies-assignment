'use server';

import dbConnect from "@/lib/dbConnect";
import Hospital, { Hospitals } from "@/models/Hospital";

export async function getHospitals() {
  await dbConnect();

  const hospitals = await Hospital.find({}).exec();

  return JSON.parse(JSON.stringify(hospitals));
}

export async function getHospitalById(id: string): Promise<Hospitals> {
  await dbConnect();

  const hospital = await Hospital.findById(id).orFail();

  return JSON.parse(JSON.stringify(hospital));
}

export async function deleteHospital(id: string) {
  await dbConnect();

  const hospital = await Hospital.findByIdAndDelete(id).orFail();

  return JSON.parse(JSON.stringify(hospital));
}

export async function updateHospital({
  name,
}: {
  name: string,
}, id: string) {
  await dbConnect();

  const hospitalExists = await Hospital.exists({
    name
  });

  if (hospitalExists && hospitalExists._id !== id) {
    return {
      status: false,
      data: 'Name already in use!'
    };
  }

  const hospital = await Hospital.findByIdAndUpdate(id, {
    $set: {
      name
    }
  });

  return {
    status: true,
    data: JSON.parse(JSON.stringify(hospital)),
  };
}

export async function createHospital({
  name,
  addedBy
}: {
  name: string,
  addedBy: string
}) {
  await dbConnect();

  const hospitalExists = await Hospital.exists({
    name
  });

  if (hospitalExists) {
    return {
      status: false,
      data: 'Name already in use!'
    };
  }

  const hospital = await Hospital.create({
    name,
    addedBy
  });

  return {
    status: true,
    data: JSON.parse(JSON.stringify(hospital)),
  };
}
