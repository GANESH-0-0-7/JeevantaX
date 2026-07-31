import React, { useState, useEffect } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import vaultImg from "../assets/feature4.jpg";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function VaultPage() {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [uploads, setUploads] = useState([]);
  const [decryptPassword, setDecryptPassword] = useState("");
  const [selectedIpfsUrl, setSelectedIpfsUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [decryptError, setDecryptError] = useState("");

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await axios.get(`${API}/api/vault/my-files`, {
          withCredentials: true,
        });

        setUploads(res.data);
      } catch (err) {
        console.error("Failed to fetch files:", err);
        alert("Failed to load vault files");
      }
    };

    fetchFiles();
  }, []);

  const handleUpload = async () => {
    if (!file || !password) {
      return alert("File and password required");
    }

    setLoading(true);

    const reader = new FileReader();

    reader.onload = async () => {
      try {
        const wordArray = CryptoJS.lib.WordArray.create(reader.result);
        const encrypted = CryptoJS.AES.encrypt(
          wordArray,
          password
        ).toString();

        const blob = new Blob([encrypted], {
          type: "text/plain",
        });

        const formData = new FormData();
        formData.append("file", blob, `encrypted_${file.name}.txt`);

        const res = await axios.post(
          `${API}/api/vault/upload`,
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setUploads((prev) => [res.data, ...prev]);
        setFile(null);
        setPassword("");

        alert("File encrypted & uploaded successfully");
      } catch (err) {
        console.error("Upload failed:", err);
        alert(err.response?.data?.message || "Upload failed");
      } finally {
        setLoading(false);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const handleDecrypt = async () => {
    if (!selectedIpfsUrl || !decryptPassword) return;

    setLoading(true);
    setDecryptError("");

    try {
      const res = await fetch(selectedIpfsUrl);
      const encryptedText = await res.text();

      const decrypted = CryptoJS.AES.decrypt(
        encryptedText,
        decryptPassword
      );

      const byteString = CryptoJS.enc.Base64.stringify(decrypted);

      const binary = atob(byteString);

      const bytes = new Uint8Array(binary.length);

      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }

      const blob = new Blob([bytes], {
        type: "image/jpeg",
      });

      const url = URL.createObjectURL(blob);

      window.open(url, "_blank");
    } catch (err) {
      console.error(err);
      setDecryptError("Wrong password or corrupted file");
    } finally {
      setLoading(false);
    }
  };

  // Keep the remainder of your JSX exactly as it is.
  return (
    // ... your existing JSX ...
  );
}