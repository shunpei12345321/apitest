"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from 'react';
import React, { useRef } from "react";
import { getIDmStr } from "@/app/lib/nfc/rcs300.mjs";

const postUser = async (
  email: string | undefined,
  name: string | undefined,
  idm: string | undefined
) => {
  const res = await fetch("http://localhost:3000/api/ticket", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, name, idm }),
  });

  return res.json();
};

export default  function PostUser() {
  //const PostBlog = () => { //アロー関数
  const router = useRouter();

  const emailRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const [id, setId] = useState<string | undefined>(undefined); // 入力された文字列を格納する状態変数

  const handleInputChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
    const inputValue = event.target.value.replace(/\s/g, ''); // 空白を削除
    setId(inputValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    await postUser(emailRef.current?.value, nameRef.current?.value, id ?? '');
  
    router.push("/");
    router.refresh();
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
    <div>
      <div className="flex flex-col  items-center">
        <div className="w-full py-5 flex items-center justify-between">
          <h1 className="text-5xl font-bold flex-grow text-center">new User</h1>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col w-2/3 pb-5">
          <input
            ref={emailRef}
            type="text"
            placeholder="Emailを入力"
            className="border-2 border-gray-500 p-2 m-2 text-black"
          />
          <input
            ref={nameRef}
            type="text"
            placeholder="nameを入力"
            className="border-2 border-gray-500 p-2 m-2 text-black"
          />
          <input
            type="text"
            value={id} 
            onChange={handleInputChange} 
            placeholder="idmを入力"
            className="border-2 border-gray-500 p-2 m-2 text-black"
          />
          <button className="m-auto px-5 py-1 border-2 rounded-lg text-green-800 border-green-700 bg-green-100">
            追加
          </button>
        </form>
        <button
          onClick={handleClick}
          className="bg-white border-4 border-gray-500 rounded-full text-black px-2 py-2 hover:bg-white hover:text-black"
        >
          read IDm
        </button>
        <p className="pt-5">{id && `IDm: ${id}`}</p>
      </div>
    </div>
  );
}

//export default PostBlog;
