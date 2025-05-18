"use client";

import NftAbi from "@/contract/MyNFT.json";
import { ethers } from "ethers";
import { useState } from "react";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export default function Home() {
  const [uri, setUri] = useState("");
  const [tx, setTx] = useState("");

  const handleMint = async () => {
    if (!window.ethereum) return alert("Please install metamask");

    
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, NftAbi.abi, signer);

    try {
      const tx = await contract.mint(uri);
      setTx(`Minted! Tx Hash: ${tx.hash}`);
    } catch (err) {
      setTx(`Error: ${err.message}`)
    }
  }

  return (
    <main>
      <div className="p-6">
        <h1 className="text-2xl mb-4">Mint Your NFT</h1>
        <input
          type="text"
          placeholder="Token URI"
          value={uri}
          onChange={(e) => setUri(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <button
          onClick={handleMint}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Mint
        </button>
        {tx && <p className="mt-4">{tx}</p>}
      </div>
    </main>
  );
}
