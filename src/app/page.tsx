"use client";

import Link from "next/link";
import { BlogType } from "./types";


async function fetchAllBlogs() {
  const res = await fetch("http://localhost:3000/api/blog", {
    cache: "no-store", //SSR
  });
  const data = await res.json();
  //console.log(data);
  return data.blogs;
}

export default async function Home() {
  const blogs = await fetchAllBlogs();

  // Delete Blog
  const handleDelete = async (blog: BlogType) => {
    const response = await fetch(`/api/blog/${blog.id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      console.error("Failed to delete");
      return;
    }
    location.reload();
  };

  return (
    <div>
      {/* Body */}
      <div className="flex flex-col items-center scroll-py-5">
        <h1 className="font-bold text-5xl pt-10 pb-5">my Blogs</h1>
        <p className="px-20">
          ここは日々の経験や感じたことを自由に書き留めることができます。このブログはあなたのプライベートな日記帳のようなものです。
        </p>
        <Link
          href="/blog/create"
          className=" px-4 py-2 border-2 bg-black text-white rounded-full"
        >
          new BLOG
        </Link>
        <div className="w-full space-y-4 flex flex-col items-center pb-10 mt-5">
          {blogs.map((blog: BlogType) => (
            <div
              key={blog.id}
              className="w-2/3 px-4 py-2 border rounded-lg border-gray-700"
            >
              <div className="flex justify-between">
                <h1 className="font-bold text-xl">{blog.title}</h1>
                <div className="space-x-2">
                  <Link
                    href={`/blog/edit/${blog.id}`}
                    className="px-5 py-1 bg-black text-white rounded-full text-sm"
                  >
                    edit
                  </Link>
                  <button
                    onClick={() => handleDelete(blog)}
                    className="px-3 py-1 bg-red-600 text-white rounded-full text-sm"
                  >
                    delete
                  </button>
                </div>
              </div>
              <h2 className="text-sm border-b-2">
                
              </h2>

              <div className="p-4">{blog.content}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}