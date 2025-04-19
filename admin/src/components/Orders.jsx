import React, { useState } from 'react';
import Table from './Table';

const Orders = () => {
  const [filter, setFilter] = useState('All');

  const filteredOrders =
    filter === 'All'
      ? orders
      : orders.filter((order) => order.status === filter);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-2">Orders</h2>
      <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
        <span className="text-purple-600">Dashboard</span> &gt; <span>Orders</span>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 mb-4 flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <span>Filter Orders</span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring focus:border-purple-500"
          >
            <option value="All">All</option>
            <option value="Paid">Paid Orders</option>
            <option value="Un-paid">Un-Paid Orders</option>
            <option value="Completed">Completed Orders</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span>10</span>
          <span>Results on Table</span>
        </div>
      </div>

      <Table orders={filteredOrders} />
    </div>
  );
};

export default Orders;
