import mongoose from "mongoose";

const vaultFileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fileName: String,
  ipfsUrl: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const VaultFile = mongoose.model("VaultFile", vaultFileSchema);
export default VaultFile;
