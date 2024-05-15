"use client"

import { useState } from 'react';
import { getIDmStr } from "@/app/lib/nfc/rcs300.mjs";
import Link from "next/link";

export default function Home() {
  const [id, setId] = useState<string | undefined>(undefined); // 入力された文字列を格納する状態変数

  // input 要素の値が変更されたときに呼び出される関数
  const handleInputChange = ( event:any ) => {
    setId(event.target.value); // 入力された文字列を id 状態に更新
  };
  
  const handleClick = async () => {
    try {
      await getIDmStr(navigator).then((id) => {
        console.log("getIDmStr: " + id);
        const trimmedId = id?.replace(/\s/g, ''); // 空白を削除
        setId(trimmedId);
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl">Search No.?</h1>
        <div>
          {/* input 要素に onChange イベントハンドラーを設定 */}
          <input 
            type="text" 
            value={id} 
            onChange={handleInputChange} 
            style={{ width: "180px", border: "1px solid black", borderRadius: "4px", padding: "5px", marginBottom: "10px"}} 
            className="text-black"
          />
        </div>
        {/* Link コンポーネントでページ遷移を行い、入力された文字列を URL パラメーターとして渡す */}
        <Link href={`/ticket/Check/${id}`}>OK</Link>
        <Link href={`/ticket/Create`}>newUsere?</Link>
        <Link href={`/`}>DeleteUsere?</Link>

        <button
          onClick={handleClick}
          className="bg-white border-4 border-gray-500 rounded-full text-white px-2 py-2 hover:bg-white hover:text-black"
        >
          read IDm
        </button>
        <p className="pt-5">{id && `IDm: ${id}`}</p>
      </div>
    </div>
  );
}