import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/") // Replace with actual API URL
      .then((response) => response.json())
      .then((data) => {
        console.log("✅ API Response:", data); // Check console for response
        setData(data);
      })
      .catch((error) => console.error("❌ API Fetch Error:", error));
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
}
