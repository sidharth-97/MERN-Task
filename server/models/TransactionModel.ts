import mongoose from "mongoose"

const TransactionSchema = new mongoose.Schema({
    id: {
        type:String
    },
    title: {
        type:String
    },
    price: {
        type:Number
    },
    description: {
        type:String
    },
    category: {
        type:String
    },
    image: {
        type:String
    },
    sold: {
        type:Boolean
    },
    dateOfSale: {
        type:String
    }
})

export const TransactionModel=mongoose.model("Transaction",TransactionSchema)