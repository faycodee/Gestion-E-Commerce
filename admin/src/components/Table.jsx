import React from 'react';

const Table = ({ orders }) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 font-medium">Client</th>
            <th className="p-4 font-medium">Order ID</th>
            <th className="p-4 font-medium">Amount</th>
            <th className="p-4 font-medium">Status</th>
            <th className="p-4 font-medium">Date</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {orders.map((order, idx) => (
            <tr key={idx} className="border-t hover:bg-gray-50">
              <td className="p-4 flex items-center gap-2">
                <img
                  src={order.image}
                  alt={order.name}
                  className="w-8 h-8 rounded-full"
                />
                <span>{order.name}</span>
              </td>
              <td className="p-4">#{order.id}</td>
              <td className="p-4">${order.amount}</td>
              <td className="p-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    order.status === 'Paid'
                      ? 'bg-green-100 text-green-600'
                      : order.status === 'Completed'
                      ? 'bg-orange-100 text-orange-600'
                      : 'bg-red-100 text-red-600'
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td className="p-4">{order.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
