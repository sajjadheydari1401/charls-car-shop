import mongoose from "mongoose";

const invoiceSchema = mongoose.Schema(
  {
    invoicePrice: {
      type: Number,
      required: true,
      ref: "Car",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    invoiceItem: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Car",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Invoice = mongoose.model("Invoice", invoiceSchema);

export default Invoice;
