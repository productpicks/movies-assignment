'use server';

import dbConnect from "@/lib/dbConnect";
import Invoice from "@/models/Invoice";

export async function getInvoices(type: string) {
  await dbConnect();

  const invoices = await Invoice.find({
    type
  }).exec();

  return JSON.parse(JSON.stringify(invoices));
}
