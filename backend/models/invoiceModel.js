import mongoose from "mongoose";

const invoiceSchema = mongoose.Schema(
  {
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
