import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function App() {
  const [section, setSection] = useState("home");
  const [user, setUser] = useState(null);
  const [ndaAccepted, setNdaAccepted] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setUser({ name: "Investor A" });
    setSection("nda");
  };

  const handleNdaAccept = () => {
    setNdaAccepted(true);
    setSection("dashboard");
  };

  const salesData = [
    { date: "2025-01-31", product: "Battery V.1", quantity: 2, amount: 12000 },
    { date: "2025-02-28", product: "Battery V.1", quantity: 7, amount: 42000 },
    { date: "2025-05-31", product: "Battery V.2", quantity: 10, amount: 60000 },
    { date: "2025-06-30", product: "Battery V.3", quantity: 14, amount: 140000 },
  ];

  const chartData = {
    labels: salesData.map((item) => item.date),
    datasets: [
      {
        label: "Sales Amount Per Month",
        data: salesData.map((item) => item.amount),
        backgroundColor: "#3B82F6",
        borderColor: "#1D4ED8",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: "black" } },
    },
    scales: {
      x: {
        grid: { color: "rgba(0,0,0,0.1)" },
        ticks: { color: "black" },
      },
      y: {
        grid: { color: "rgba(0,0,0,0.1)" },
        ticks: { color: "black" },
      },
    },
  };

  const exportCSV = () => {
    const csvRows = [
      ["Date", "Product", "Quantity", "Amount"],
      ...salesData.map(item => [item.date, item.product, item.quantity, `$${item.amount}`])
    ];
    const csvContent = csvRows.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "sales_data.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="bg-amber-50 min-h-screen text-black flex flex-col justify-between">
      <div>
        <header className="p-6 text-center border-b border-black/20">
          <h1 className="text-4xl font-bold mb-2">Hyerise Electronics Inc.</h1>
          <p className="text-lg mb-4">Expanding on New Energy Everyday</p>
          <nav className="flex justify-center gap-4 mb-6">
            <button onClick={() => setSection("home")} className="bg-orange-200 px-4 py-2 border border-black hover:bg-orange-300">Welcome & News</button>
            <button onClick={() => setSection("dashboard")} className="bg-orange-200 px-4 py-2 border border-black hover:bg-orange-300">Dashboard</button>
            <button onClick={() => setSection("login")} className="bg-orange-200 px-4 py-2 border border-black hover:bg-orange-300">Employee Portal</button>
            <button onClick={() => setSection("invest")} className="bg-orange-200 px-4 py-2 border border-black hover:bg-orange-300">Invest Now</button>
          </nav>
        </header>

        {section === "dashboard" && (!user || !ndaAccepted) && (
          <main className="max-w-xl mx-auto py-10 px-6 text-center">
            <div className="bg-orange-100 p-6 border border-black">
              <h2 className="text-xl font-semibold mb-4">Access Denied</h2>
              <p>You must login with your Employee ID and password before accessing the dashboard.</p>
            </div>
          </main>
        )}

        {section === "dashboard" && user && ndaAccepted && (
          <main className="max-w-5xl mx-auto py-10 px-6 space-y-8">
            <div className="bg-white p-6 border border-black">
              <h2 className="text-2xl font-semibold mb-4">Company News</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Battery V.3 Launch sees all-time high in sales compared to previous versions</li>
                <li>V.4 In Development, New Power Source in Development!</li>
              </ul>
            </div>

            <div className="bg-white p-6 border border-black">
              <h2 className="text-2xl font-semibold mb-4">New Security Protocol!</h2>
              <p>
                We’ve implemented a new Management Information System (MIS) for the lab to enhance internal access tracking and reporting.
                Learn more in our
                <a
                  href="https://1drv.ms/w/c/1ab1741225f70801/EZq7FqyYuSlHgbI5hpiULRABwo_c5aL17sdtg0ZdKsGH1w"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline ml-1"
                >
                  Security Protocol Documentation
                </a>.
              </p>
            </div>

            <div className="bg-orange-100 p-6 border border-black mb-6">
              <h2 className="text-2xl font-semibold mb-4">Sales Analytics</h2>
              <table className="w-full text-left border border-black mb-6">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="p-2 border">Date</th>
                    <th className="p-2 border">Product</th>
                    <th className="p-2 border">Quantity</th>
                    <th className="p-2 border">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {salesData.map((item, index) => (
                    <tr key={index} className="even:bg-blue-50">
                      <td className="p-2 border">{item.date}</td>
                      <td className="p-2 border">{item.product}</td>
                      <td className="p-2 border">{item.quantity}</td>
                      <td className="p-2 border">${item.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="bg-white p-4 border border-black h-[400px]">
                <Bar data={chartData} options={chartOptions} />
              </div>

              <div className="mt-6">
                <button onClick={exportCSV} className="bg-green-700 text-white px-4 py-2 border border-black hover:bg-green-800">
                  Export as CSV
                </button>
              </div>
            </div>
          </main>
        )}

        {section === "login" && (
          <main className="max-w-2xl mx-auto py-10 px-6">
            <div className="bg-orange-100 p-6 border border-black">
              <h2 className="text-2xl font-semibold mb-4">Employee Login</h2>
              <form onSubmit={handleLogin} className="grid gap-4">
                <input className="p-2 border border-black" placeholder="Username" required />
                <input className="p-2 border border-black" type="password" placeholder="Password" required />
                <button className="bg-green-600 text-white px-4 py-2 border border-black hover:bg-green-700">Login</button>
              </form>
            </div>
          </main>
        )}

        {section === "nda" && user && !ndaAccepted && (
          <main className="max-w-3xl mx-auto py-10 px-6">
            <div className="bg-orange-100 p-6 border border-black">
              <h2 className="text-2xl font-semibold mb-4">Non-Disclosure Agreement</h2>
              <p className="mb-6">
                By acessing the Hyerise Employee Portal, you agree to not share, reproduce, or disclose any proprietary data without prior consent by management. Breach of this agreement will result in immediate legal action.
              </p>
              <button onClick={handleNdaAccept} className="bg-blue-700 text-white px-4 py-2 border border-black hover:bg-blue-800">
                I Agree and Continue
              </button>
            </div>
          </main>
        )}

        {section === "home" && (
          <main className="max-w-4xl mx-auto py-10 px-6">
            <section className="bg-orange-100 p-6 border border-black mb-10">
              <h2 className="text-2xl font-semibold mb-4">What Do We Do?</h2>
              <p>
                HyeRise Electronics Inc. is a innovative technological company creating
                the future of self-sufficient battery solutions. Our goal is to develope and produce
                sustainable energy by delivering efficient, autonomous power systems to be sold commercially
              </p>
            </section>

            <section className="bg-orange-100 p-6 border border-black mb-10">
              <h2 className="text-2xl font-semibold mb-4">What Have We Done So Far?</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Optimized Self-Powering Energy Source</li>
                <li>Cooling Systems Designed To Sustain Thermal Conditions</li>
                <li>Zero-Maintence Mechanics</li>
                <li>Environmental Friendly Production</li>
              </ul>
            </section>

            <section className="bg-orange-100 p-6 border border-black mb-10">
              <h2 className="text-2xl font-semibold mb-4">Secure Laboratory Access</h2>
              <p>
                Our facilities utilize a Management Operating System designed to protect, secure, and contain our technology while providing a form of getting potential investors by creating an integrated and organized system of personnel logging and verification
              </p>
            </section>

            <section className="bg-orange-100 p-6 border border-black">
              <h2 className="text-2xl font-semibold mb-4">Current Investors Commentary</h2>
              <blockquote className="mb-4 border-l-4 pl-4 italic">"Hyerise helped us scale our projects beyond projections with their new batteries" – United Mechanics</blockquote>
              <blockquote className="border-l-4 pl-4 italic">"The Lab Security provided a strong and comfortable experience when seeking Investment" – Enhance Partners</blockquote>
            </section>
          </main>
        )}

        {section === "invest" && (
          <main className="max-w-2xl mx-auto py-10 px-6">
            <div className="bg-orange-100 p-6 border border-black">
              <h2 className="text-2xl font-semibold mb-4">Investor Application</h2>
              <form className="grid gap-4">
                <input className="p-2 border border-black" placeholder="Full Name" required />
                <input className="p-2 border border-black" type="email" placeholder="Email Address" required />
                <input className="p-2 border border-black" placeholder="Company Name (optional)" />
                <input className="p-2 border border-black" placeholder="Investment Interest" required />
                <button className="bg-orange-800 text-white px-4 py-2 border border-black hover:bg-orange-900">Apply to Invest</button>
              </form>
            </div>
          </main>
        )}
      </div>

      <footer className="text-center p-4 mt-10 border-t border-black text-sm">
        © 2025 Hyerise Electronics Inc. | All rights reserved.
      </footer>
    </div>
  );
}
