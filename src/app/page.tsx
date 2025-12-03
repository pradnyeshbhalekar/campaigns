"use client";

import { useEffect, useState } from "react";

type Campaign = {
  id: number;
  name: string;
  status: string;
  clicks: number;
  cost: number;
  impressions: number;
};

export default function Home() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await fetch(`${API}/campaigns`);
      const data = await res.json();
      setCampaigns(data);
      setLoading(false);
    }
    fetchData();
  }, [API]);

  const filtered = campaigns.filter((c) =>
    filter === "All" ? true : c.status === filter
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        padding: "24px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "white",
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0 0 12px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "16px",
          }}
        >
          Campaign Analytics Dashboard
        </h1>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <div>
            <label style={{ marginRight: "10px" }}>Filter:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Paused">Paused</option>
            </select>
          </div>

          {loading ? (
            <p style={{ color: "#666" }}>Loading...</p>
          ) : (
            <p style={{ color: "#666" }}>{filtered.length} campaigns</p>
          )}
        </div>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "14px",
          }}
        >
          <thead>
            <tr style={{ background: "#e5e5e5" }}>
              <th style={{ padding: "12px", textAlign: "left" }}>
                Campaign Name
              </th>
              <th style={{ padding: "12px", textAlign: "left" }}>Status</th>
              <th style={{ padding: "12px", textAlign: "right" }}>Clicks</th>
              <th style={{ padding: "12px", textAlign: "right" }}>Cost</th>
              <th style={{ padding: "12px", textAlign: "right" }}>
                Impressions
              </th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "12px" }}>{c.name}</td>
                <td style={{ padding: "12px" }}>{c.status}</td>
                <td style={{ padding: "12px", textAlign: "right" }}>
                  {c.clicks}
                </td>
                <td style={{ padding: "12px", textAlign: "right" }}>
                  ${c.cost.toFixed(2)}
                </td>
                <td style={{ padding: "12px", textAlign: "right" }}>
                  {c.impressions}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!loading && filtered.length === 0 && (
          <p
            style={{
              textAlign: "center",
              color: "#666",
              padding: "16px",
              fontSize: "14px",
            }}
          >
            No campaigns found
          </p>
        )}
      </div>
    </div>
  );
}
