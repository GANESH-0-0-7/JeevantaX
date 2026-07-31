import VaultFile from "../models/vault.model.js";
import axios from "axios";
import fs from "fs";
import FormData from "form-data";

export const uploadToPinata = async (req, res) => {
  try {
    const userId = req.user._id; 
    const file = req.file;
    if (!file) return res.status(400).json({ message: "No file uploaded" });

    const data = new FormData();
    data.append("file", fs.createReadStream(file.path));
    data.append("pinataMetadata", JSON.stringify({ name: file.originalname }));

    const result = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      data,
      {
        maxBodyLength: "Infinity",
        headers: {
          ...data.getHeaders(),
          Authorization: process.env.PINATA_JWT,
        },
      }
    );

    fs.unlinkSync(file.path);

    const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${result.data.IpfsHash}`;

    const newFile = await VaultFile.create({
      userId,
      fileName: file.originalname,
      ipfsUrl,
    });

    return res.status(200).json(newFile);
  } catch (err) {
    console.error("Upload to Pinata failed:", err.response?.data || err.message);
    return res.status(500).json({ message: "Upload failed" });
  }
};

export const getMyVaultFiles = async (req, res) => {
    try {
      const userId = req.user._id;
      const files = await VaultFile.find({ userId }).sort({ createdAt: -1 });
      res.json(files);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch files" });
    }
};
  
