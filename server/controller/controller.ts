import { TransactionModel } from "../models/TransactionModel";
import { Request, Response } from "express";

export const initializeDb = async (req: Request, res: Response) => {
  async function fetchData() {
    try {
      const response = await fetch(
        "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  const data = await fetchData();
  await TransactionModel.insertMany(data);
  res.send({ status: 201, data: "Data inserted success" });
};

export const allTransactions = async (req: Request, res: Response) => {
  try {
    const { search, month } = req.query;
    let page = parseInt(req.query.page as string) || 1;
    let query: any = {};
    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { price: typeof search === "number" ? search : "" },
        ],
      };
    }

    if (month) {
        const monthNumber = parseInt(month as string);
        const monthRegex = `\\d{4}-${monthNumber.toString().padStart(2, '0')}-\\d{2}`;
        query.dateOfSale = { $regex: monthRegex };
      }
    const docCount = await TransactionModel.countDocuments(query);
    const transactions = await TransactionModel.aggregate([
      { $match: { ...query } },
      { $skip: (page - 1) * 10 },
      { $limit: 10 },
    ]);
    res.send({ status: 200, data: transactions, docCount });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).send({ status: 500, message: "Internal Server Error" });
  }
};
