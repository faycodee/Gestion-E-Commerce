import React from "react";
import Charts from "./Charts";
import Table from "./Table";

const Dashboard = () => {
  return (
    <div className="p-4 flex-1">
      <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">Manage Customers</h2>
      <div className="grid grid-cols-2 gap-4">
        <Charts />
        <Charts />
      </div>
      <Table />
    </div>
  );
};

export default Dashboard;