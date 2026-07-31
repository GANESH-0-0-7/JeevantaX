import React, { useState, useEffect } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import vaultImg from '../assets/feature4.jpg';

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
                const res = await axios.get(
  "http://localhost:5000/api/vault/my-files",
  {
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
        if (!file || !password) return alert("File and password required");
        setLoading(true);
        const reader = new FileReader();
        reader.onload = async () => {
            try {
                const wordArray = CryptoJS.lib.WordArray.create(reader.result);
                const encrypted = CryptoJS.AES.encrypt(wordArray, password).toString();
                const blob = new Blob([encrypted], { type: "text/plain" });
                const formData = new FormData();
                formData.append("file", blob, `encrypted_${file.name}.txt`);
               const res = await axios.post(
  "http://localhost:5000/api/vault/upload",
  formData,
  {
                    withCredentials: true,
                });
                setUploads((prev) => [res.data, ...prev]);
                setFile(null);
                setPassword("");
                alert("File encrypted & uploaded to Pinata");
            } catch (err) {
                console.error("Upload failed:", err);
                alert("Upload failed");
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
            const decrypted = CryptoJS.AES.decrypt(encryptedText, decryptPassword);
            const byteString = CryptoJS.enc.Base64.stringify(decrypted);
            const binary = atob(byteString);
            const bytes = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) {
                bytes[i] = binary.charCodeAt(i);
            }
            const blob = new Blob([bytes], { type: "image/jpeg" });
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank'); // Open in new tab
        } catch (err) {
            console.error(err);
            setDecryptError(" Wrong password or corrupted file");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 py-6 px-2 md:px-6 overflow-y-visible">
            <div className="w-full max-w-6xl flex flex-col md:flex-row md:gap-12 gap-6 items-start">
                <div className="w-full md:w-4/5 flex flex-col gap-8 md:gap-10 items-stretch">
                    <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                        <div className="md:w-1/2 w-full bg-slate-900/70 border border-slate-800 rounded-3xl shadow-2xl p-4 md:p-8 text-center mb-2">
                            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100 mb-4 tracking-tight">🔐 Jeevanta Secure Vault</h1>
                            <h2 className="text-base md:text-lg font-semibold mb-2 text-slate-300">Encrypt & Upload File</h2>
                            <input
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                className="mb-3 block w-full text-base bg-slate-800 border border-slate-700 text-slate-100 px-4 py-2 rounded-xl shadow-sm"
                            />
                            <input
                                type="password"
                                placeholder="Enter encryption password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-400 px-4 py-2 mb-4 rounded-xl text-base shadow-sm"
                            />
                            <button
                                onClick={handleUpload}
                                className={`w-full px-5 py-3 rounded-xl text-white font-semibold text-base md:text-lg shadow transition-colors duration-150 ${loading ? "bg-slate-600 cursor-not-allowed" : "bg-indigo-500/90 hover:bg-indigo-500"
                                    }`}
                                disabled={loading}
                            >
                                {loading ? "Encrypting..." : "Encrypt & Upload to Vault"}
                            </button>
                        </div>

                        <div className="md:w-1/2 w-full bg-slate-900/70 border border-slate-800 rounded-3xl shadow-2xl p-4 md:p-8 text-center mb-2 flex flex-col justify-center">
                            <h2 className="text-lg md:text-xl font-extrabold mb-3 text-slate-100 tracking-tight">🔓 Decrypt File</h2>
                            <input
                                type="text"
                                placeholder="Paste or select IPFS URL to decrypt"
                                value={selectedIpfsUrl}
                                onChange={e => {
                                    setSelectedIpfsUrl(e.target.value);
                                    setDecryptError("");
                                }}
                                className="block w-full bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-400 px-4 py-2 mb-3 rounded-xl text-base shadow-sm"
                            />
                            <input
                                type="password"
                                placeholder="Enter password to decrypt"
                                value={decryptPassword}
                                onChange={e => setDecryptPassword(e.target.value)}
                                className="block w-full bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-400 px-4 py-2 mb-3 rounded-xl text-base shadow-sm"
                            />
                            <button
                                onClick={handleDecrypt}
                                className={`w-full px-4 py-3 rounded-xl text-white font-semibold text-base md:text-lg shadow transition-colors duration-150 ${loading ? "bg-slate-600 cursor-not-allowed" : "bg-purple-500/90 hover:bg-purple-500"
                                    }`}
                                disabled={loading || !selectedIpfsUrl || !decryptPassword}
                            >
                                {loading ? "Decrypting..." : "Decrypt & Show Image"}
                            </button>
                            {decryptError && <p className="text-red-400 mt-2 text-center">{decryptError}</p>}
                        </div>
                    </div>

                    <div className="bg-slate-900/70 border border-slate-800 rounded-3xl shadow-2xl p-4 md:p-8">
                        <h2 className="text-xl md:text-2xl font-extrabold text-slate-100 mb-4 text-center">My Encrypted Files</h2>
                        {uploads.length === 0 ? (
                            <p className="text-slate-400 text-center">No files uploaded yet.</p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                                {uploads.map((file) => (
                                    <div key={file._id} className="bg-slate-800/70 border border-slate-700 rounded-xl p-4 shadow flex flex-col justify-between">
                                        <div>
                                            <p className="font-medium text-base md:text-lg truncate text-slate-100" title={file.fileName}>{file.fileName}</p>
                                            <p className="text-xs text-slate-400 break-all mb-2">{file.ipfsUrl}</p>
                                        </div>
                                        <button
                                            className="mt-2 text-xs md:text-sm bg-purple-500/90 hover:bg-purple-500 text-white px-4 py-2 rounded-xl font-semibold shadow transition-colors duration-200"
                                            onClick={() => {
                                                setSelectedIpfsUrl(file.ipfsUrl);
                                                setDecryptError("");
                                            }}
                                        >
                                            Select for Decrypt
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="w-full md:w-1/5 flex flex-col gap-4 md:gap-6 items-center mt-8 md:mt-0">
                    <div className="w-full md:w-72 min-h-[28rem] md:min-h-[32rem] bg-slate-900/70 border border-slate-800 rounded-3xl shadow-xl overflow-hidden flex flex-col items-center">
                        <img src={vaultImg} alt="Vault" className="w-full h-40 md:h-68 rounded-t-3xl object-contain" />
                        <div className="p-4 md:p-6 text-center">
                            <h2 className="text-lg md:text-2xl font-bold text-slate-100 mb-2">Vault Usage Rules</h2>
                            <ul className="text-left text-slate-300 text-base md:text-lg list-disc list-inside">
                                <li>Encrypt files before upload.</li>
                                <li>Remember your password. No recovery!</li>
                                <li>Never share your password with anyone.</li>
                                <li>Only you can decrypt your files.</li>
                                <li>Files are stored securely on IPFS.</li>
                            </ul>
                            <div className="mt-3 text-xs text-slate-400">Access: Only logged-in users</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
