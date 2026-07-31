import React, { useEffect, useState } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import {
  Upload,
  Download,
  Lock,
  Shield,
  FileText,
  Key,
  Loader2,
  FolderOpen,
  AlertCircle,
} from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function VaultPage() {
  const [file, setFile] = useState(null);

  const [password, setPassword] = useState("");

  const [decryptPassword, setDecryptPassword] = useState("");

  const [uploads, setUploads] = useState([]);

  const [selectedFile, setSelectedFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const [decryptError, setDecryptError] = useState("");

  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const res = await axios.get(
        `${API}/api/vault/my-files`,
        {
          withCredentials: true,
        }
      );

      setUploads(res.data);
    } catch (err) {
      console.log(err);

      alert("Unable to load vault files.");
    }
  };

  const handleUpload = () => {
    if (!file)
      return alert("Please choose a file.");

    if (!password)
      return alert("Please enter password.");

    setLoading(true);

    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const wordArray =
          CryptoJS.lib.WordArray.create(
            e.target.result
          );

        const encrypted =
          CryptoJS.AES.encrypt(
            wordArray,
            password
          ).toString();

        const blob = new Blob(
          [encrypted],
          {
            type: "text/plain",
          }
        );

        const formData = new FormData();

        formData.append(
          "file",
          blob,
          `encrypted_${file.name}.txt`
        );

        formData.append(
          "originalName",
          file.name
        );

        formData.append(
          "mimeType",
          file.type
        );

        const res = await axios.post(
          `${API}/api/vault/upload`,
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        setUploads([
          res.data,
          ...uploads,
        ]);

        setFile(null);

        setPassword("");

        setSuccess(
          "File encrypted & uploaded successfully."
        );

        setTimeout(() => {
          setSuccess("");
        }, 3000);
      } catch (err) {
        console.log(err);

        alert(
          err.response?.data?.message ||
            "Upload failed."
        );
      } finally {
        setLoading(false);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const handleDecrypt = async () => {
    if (!selectedFile)
      return alert(
        "Select a file first."
      );

    if (!decryptPassword)
      return alert(
        "Enter decryption password."
      );

    setLoading(true);

    setDecryptError("");

    try {
      const response = await fetch(
        selectedFile.ipfsUrl
      );

      const encryptedText =
        await response.text();

      const decrypted =
        CryptoJS.AES.decrypt(
          encryptedText,
          decryptPassword
        );

      if (decrypted.sigBytes <= 0) {
        setDecryptError(
          "Incorrect password."
        );

        setLoading(false);

        return;
      }

      const base64 =
        CryptoJS.enc.Base64.stringify(
          decrypted
        );

      const binary = atob(base64);

      const bytes =
        new Uint8Array(binary.length);

      for (
        let i = 0;
        i < binary.length;
        i++
      ) {
        bytes[i] =
          binary.charCodeAt(i);
      }

      const blob = new Blob(
        [bytes],
        {
          type:
            selectedFile.mimeType ||
            "application/octet-stream",
        }
      );

      const url =
        URL.createObjectURL(blob);

      const a =
        document.createElement("a");

      a.href = url;

      a.download =
        selectedFile.originalName ||
        "file";

      document.body.appendChild(a);

      a.click();

      a.remove();

      URL.revokeObjectURL(url);

      setDecryptPassword("");

      setSuccess(
        "File decrypted successfully."
      );

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      console.log(err);

      setDecryptError(
        "Wrong password or corrupted file."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
  <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-yellow-50 py-12 px-6">
    <div className="max-w-7xl mx-auto">

      {/* Header */}

      <div className="text-center mb-12">

        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-red-700 to-yellow-500 shadow-xl mb-5">

          <Shield className="text-white" size={38} />

        </div>

        <h1 className="text-5xl font-extrabold text-red-800">
          Secure Medical Vault
        </h1>

        <p className="text-gray-600 text-lg mt-3">
          Protect your medical records with AES Encryption
        </p>

      </div>

      {/* Alerts */}

      {success && (
        <div className="mb-8 rounded-xl border border-green-300 bg-green-50 p-4 text-green-700 font-medium shadow">
          {success}
        </div>
      )}

      {decryptError && (
        <div className="mb-8 rounded-xl border border-red-300 bg-red-50 p-4 text-red-700 font-medium shadow flex items-center gap-2">
          <AlertCircle size={20} />
          {decryptError}
        </div>
      )}

      {/* Cards */}

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Upload Card */}

        <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-8">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">

              <Upload className="text-red-700" />

            </div>

            <h2 className="text-2xl font-bold text-red-800">
              Encrypt & Upload
            </h2>

          </div>

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border border-gray-300 rounded-xl p-3 mb-5"
          />

          <div className="relative mb-6">

            <Lock
              className="absolute left-4 top-3.5 text-gray-400"
              size={18}
            />

            <input
              type="password"
              placeholder="Encryption Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full border border-gray-300 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-yellow-500 outline-none"
            />

          </div>

          <button
            onClick={handleUpload}
            disabled={loading}
            className="w-full bg-gradient-to-r from-red-700 to-yellow-500 text-white font-bold py-3 rounded-xl transition hover:scale-[1.02] shadow-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin" size={18} />
                Uploading...
              </span>
            ) : (
              "Encrypt & Upload"
            )}
          </button>

        </div>

        {/* Decrypt Card */}

        <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-8">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">

              <Download className="text-yellow-700" />

            </div>

            <h2 className="text-2xl font-bold text-red-800">
              Decrypt File
            </h2>

          </div>

          <select
            value={selectedFile?.ipfsUrl || ""}
            onChange={(e) => {
              const selected = uploads.find(
                (u) => u.ipfsUrl === e.target.value
              );
              setSelectedFile(selected);
            }}
            className="w-full border border-gray-300 rounded-xl p-3 mb-5"
          >
            <option value="">
              Select Encrypted File
            </option>

            {uploads.map((upload) => (
              <option
                key={upload._id}
                value={upload.ipfsUrl}
              >
                {upload.originalName ||
                  upload.filename}
              </option>
            ))}
          </select>

          <div className="relative mb-6">

            <Key
              className="absolute left-4 top-3.5 text-gray-400"
              size={18}
            />

            <input
              type="password"
              placeholder="Decryption Password"
              value={decryptPassword}
              onChange={(e) =>
                setDecryptPassword(
                  e.target.value
                )
              }
              className="w-full border border-gray-300 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-red-500 outline-none"
            />

          </div>

          <button
            onClick={handleDecrypt}
            disabled={loading}
            className="w-full bg-gradient-to-r from-yellow-500 to-red-700 text-white font-bold py-3 rounded-xl transition hover:scale-[1.02] shadow-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin" size={18} />
                Decrypting...
              </span>
            ) : (
              "Decrypt & Download"
            )}
          </button>

        </div>

      </div>
            {/* Security Guidelines */}

      <div className="grid lg:grid-cols-2 gap-8 mt-10">

        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">

          <img
            src={vaultImg}
            alt="Secure Vault"
            className="w-full h-64 object-cover"
          />

          <div className="p-8">

            <h2 className="text-2xl font-bold text-red-800 mb-6 flex items-center gap-3">
              <Shield className="text-yellow-600" />
              Security Guidelines
            </h2>

            <div className="space-y-4 text-gray-700">

              <div className="flex gap-3">
                <Shield className="text-green-600 mt-1" size={18}/>
                <p>Your password is never stored on our servers.</p>
              </div>

              <div className="flex gap-3">
                <Lock className="text-red-700 mt-1" size={18}/>
                <p>Files are encrypted locally using AES encryption.</p>
              </div>

              <div className="flex gap-3">
                <FileText className="text-yellow-600 mt-1" size={18}/>
                <p>Only encrypted data is uploaded to cloud storage.</p>
              </div>

              <div className="flex gap-3">
                <Key className="text-blue-600 mt-1" size={18}/>
                <p>Remember your password. It cannot be recovered.</p>
              </div>

              <div className="flex gap-3">
                <Shield className="text-purple-600 mt-1" size={18}/>
                <p>Your medical records remain private and secure.</p>
              </div>

            </div>

          </div>

        </div>

        {/* My Files */}

        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8">

          <h2 className="text-2xl font-bold text-red-800 flex items-center gap-3 mb-6">
            <FolderOpen className="text-yellow-600"/>
            My Encrypted Files
          </h2>

          {uploads.length === 0 ? (

            <div className="text-center py-12">

              <FileText
                size={70}
                className="mx-auto text-gray-300 mb-4"
              />

              <p className="text-gray-500 text-lg">
                No encrypted files uploaded yet.
              </p>

            </div>

          ) : (

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">

              {uploads.map((upload) => (

                <div
                  key={upload._id}
                  className="border border-gray-200 rounded-2xl p-5 hover:border-yellow-500 hover:shadow-lg transition duration-300"
                >

                  <div className="flex justify-between items-center">

                    <div>

                      <h3 className="font-semibold text-lg text-gray-800">

                        {upload.originalName || "Encrypted File"}

                      </h3>

                      <p className="text-sm text-gray-500 mt-1">

                        {upload.createdAt
                          ? new Date(upload.createdAt).toLocaleString()
                          : "Recently uploaded"}

                      </p>

                    </div>

                    <button
                      onClick={() => {
                        setSelectedFile(upload);
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }}
                      className="bg-gradient-to-r from-red-700 to-yellow-500 text-white px-5 py-2 rounded-xl hover:scale-105 transition"
                    >
                      Select
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

      {/* Footer */}

      <div className="mt-14 text-center text-gray-500 text-sm">

        <p>
          🔐 JeevantaX Secure Vault • End-to-End AES Encryption • Secure Medical Record Storage
        </p>

      </div>

    </div>
  </div>
);
}