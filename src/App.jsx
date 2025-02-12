import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import mockTransactions from "./Components/mockData";

const rowsWithIds = mockTransactions.map((transaction, index) => ({
  ...transaction,
  id: transaction.id || index + 1,
}));

const totalRevenue = rowsWithIds.reduce((sum, row) => sum + parseFloat(row.cost), 0).toFixed(2);

export default function App() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const appStyles = {
    display: "flex",
    backgroundColor: isDarkMode ? "#121212" : "#f0f0f0",
    color: isDarkMode ? "white" : "black",
    height: "100vh",
    width: "100vw",
  };

  const sidebarStyles = {
    width: "150px",
    backgroundColor: isDarkMode ? "#333333" : "#ffffff",
    color: isDarkMode ? "white" : "black",
    padding: "20px",
    height: "100vh",
    boxShadow: "2px 0px 5px rgba(0, 0, 0, 0.1)",
    position: "fixed",
  };

  const dataGridStyles = {
    marginLeft: "15px",
    height: "50vh",  // Increased the height a bit more
    marginTop: "180px",  // Adjusted margin to make space for total revenue
    width: "850px",  // Adjusted width
    backgroundColor: isDarkMode ? "#333333" : "#fff",
    color: isDarkMode ? "white" : "black",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
    padding: "10px",
    overflow: "hidden",  // This removes the scrollbar
  };
  
  const totalRevenueStyle = {
    marginBottom: "20px",  // Added a bit more space
    fontSize: "18px",
    fontWeight: "bold",
    color: isDarkMode ? "white" : "black",
  };

  const chartContainerStyles = {
    marginLeft: "200px",
    height: "80vh",
    width: "calc(100vw - 250px)",
    padding: "5px",
    marginTop: "80px",  // Adjusted margin at the top
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: `2px solid ${isDarkMode ? "#888" : "#ddd"}`, // Border around the chart
    borderRadius: "8px", // Rounded corners for the border
    backgroundColor: isDarkMode ? "#333333" : "#fff", // Background color for the chart container
  };

  const chartData = rowsWithIds.map((transaction) => ({
    name: transaction.user,
    revenue: parseFloat(transaction.cost),
  }));

  return (
    <div style={appStyles}>
      <div style={sidebarStyles}>
        <h2>Stevens Dashboard</h2>
        <h3>Features</h3>
        <ul>
          <li>Dashboard</li>
          <li>Reports</li>
          <li>Settings</li>
          <li>Notifications</li>
        </ul>
        <button
          onClick={toggleMode}
          style={{
            marginTop: "20px",
            padding: "10px 15px",
            backgroundColor: isDarkMode ? "#555555" : "#ddd",
            border: "none",
            color: isDarkMode ? "#fff" : "#000",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Toggle {isDarkMode ? "Light" : "Dark"} Mode
        </button>
      </div>
  
      <div style={chartContainerStyles}>
        <ResponsiveContainer width="90%" height="90%">
        <div style={totalRevenueStyle}>Total Revenue: ${totalRevenue}</div>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill={isDarkMode ? "#8884d8" : "#82ca9d"} />
          </BarChart>
        </ResponsiveContainer>
      </div>
  
      <div style={dataGridStyles}>
        
        <DataGrid
          columns={[
            { field: "txId", headerName: "Transaction ID", width: 100 },
            { field: "user", headerName: "User", width: 125, minWidth: 150, maxWidth: 200 },
            { field: "date", headerName: "Date", width: 100 },
            { field: "cost", headerName: "Cost", width: 100 },
          ]}
          rows={rowsWithIds}
        />
      </div>
    </div>
  );
}