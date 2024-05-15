"use client"

import { useEffect, useState } from 'react';

export default function Home({ idm }:any) {
  const [ticket, setTicket] = useState<any[]>([]);

  useEffect(() => {
    // ページの URL からパラメーターを取得
    const pathArray = window.location.pathname.split('/');
    const pageId = pathArray[pathArray.length - 1];

    const fetchTicket = async () => {
      try {
        const res = await fetch(`/api/ticket/${pageId}`);
        const data = await res.json();
        setTicket(data.ticket); // サーバーからのレスポンスには ticket が含まれています
      } catch (error) {
        console.error('Error fetching ticket:', error);
      }
    };

    fetchTicket(); // ページがロードされたらチケットを取得

  }, []); // useEffect は初回のみ実行される

  return (
    <main>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl">Check User</h1>
        <div>
          {ticket.length > 0 ? (
            ticket.map((ticket, index) => (
              <div key={index}>
                <h1>Ticket Details</h1>
                <p>Name: {ticket.name}</p>
                <p>Email: {ticket.email}</p>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </main>
  )
}
