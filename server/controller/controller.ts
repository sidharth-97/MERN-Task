import { TransactionModel } from "../models/TransactionModel";
import { Request, Response } from "express";
import axios from "axios"

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
    let docCount = await TransactionModel.countDocuments(query);
    const transactions = await TransactionModel.aggregate([
      { $match: { ...query } },
      { $skip: (page - 1) * 10 },
      { $limit: 10 },
    ]);
    docCount = docCount - 10 * page
    if (docCount < 0) {
      docCount=0
    }
    res.send({ status: 200, data: transactions, docCount});
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).send({ status: 500, message: "Internal Server Error" });
  }
};

export const Statistics = async (req: Request, res: Response) => {
    try {
      const { month } = req.query
      let query:any = {}
      if (month) {
        const monthNumber = parseInt(month as string);
        const monthRegex = `\\d{4}-${monthNumber.toString().padStart(2, '0')}-\\d{2}`;
        query.dateOfSale = { $regex: monthRegex };
      }
      const count=await TransactionModel.countDocuments(query)
      const result = await TransactionModel.aggregate([
      {$match:{sold:true}},
      { $match: { ...query } },
      {$group:{_id:null,sale:{$sum:"$price"},count:{$sum:1}}}
      ])
      const unsold = count - result[0].count
      result[0]["unsold"]=unsold
    res.send({status:200,data:result[0]})
    } catch (error) {
        console.log(error);  
    }
}

export const priceRange = async (req: Request, res: Response) => {
  try {
    const { month } = req.query
    let query: any = {}
    if (month) {
      const monthNumber = parseInt(month as string);
      const monthRegex = `\\d{4}-${monthNumber.toString().padStart(2, '0')}-\\d{2}`;
      query.dateOfSale = { $regex: monthRegex };
    }
    const result = await TransactionModel.aggregate([
      { $match: { ...query } },
      {
        $group: {
          _id: {
            $switch: {
              branches: [
                { case: { $and: [{ $gte: ['$price', 0] }, { $lte: ['$price', 100] }] }, then: '0 - 100' },
                { case: { $and: [{ $gt: ['$price', 100] }, { $lte: ['$price', 200] }] }, then: '101 - 200' },
                { case: { $and: [{ $gt: ['$price', 200] }, { $lte: ['$price', 300] }] }, then: '201 - 300' },
                { case: { $and: [{ $gte: ['$price', 300] }, { $lte: ['$price', 400] }] }, then: '301 - 400' },
                { case: { $and: [{ $gt: ['$price', 400] }, { $lte: ['$price', 500] }] }, then: '401 - 500' },
                { case: { $and: [{ $gt: ['$price', 500] }, { $lte: ['$price', 600] }] }, then: '501 - 600' },
                { case: { $and: [{ $gt: ['$price', 600] }, { $lte: ['$price', 700] }] }, then: '601 - 700' },
                { case: { $and: [{ $gt: ['$price', 700] }, { $lte: ['$price', 800] }] }, then: '701 - 800' },
                { case: { $and: [{ $gte: ['$price', 800] }, { $lte: ['$price', 900] }] }, then: '801 - 900' },
                { case: { $and: [{ $gt: ['$price', 900] }] }, then: '901 - above ' },
              ],
              default: 'Unknown',
            },
          },
          count:{$sum:1}
      }}
    ])
    res.send({status:200,data:result})
  } catch (error) {
    console.log(error);
  }
}

export const categoryList = async (req: Request, res: Response) => {
  try {
    const { month } = req.query
    let query:any = {}
    if (month) {
      const monthNumber = parseInt(month as string);
      const monthRegex = `\\d{4}-${monthNumber.toString().padStart(2, '0')}-\\d{2}`;
      query.dateOfSale = { $regex: monthRegex };
    }
    const result = await TransactionModel.aggregate([
      { $match: { ...query } },
      {$group:{_id:"$category",count:{$sum:1}}}
    ])
    res.send({status:200,data:result})
  } catch (error) {
    console.log(error);   
  }
}

export const fetchAll = async (req: Request, res: Response) => {
  try {
    let url = ["http://localhost:3000/api/categorylist", "http://localhost:3000/api/pricerange", "http://localhost:3000/api/statistics"]
    const response = await Promise.all(url.map(async (url) => await axios.get(url)))
    const data=response.map((resp)=>resp=resp.data.data)
    res.send({status:200,data:data})
  } catch (error) {
    console.log(error);
  }
}