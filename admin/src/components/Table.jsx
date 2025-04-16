import React from "react";

const Table = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mt-4">
      <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-2">Customer List</h3>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="py-2">First Name</th>
            <th className="py-2">Last Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Joined On</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2">Chandler</td>
            <td className="py-2">Jacobi</td>
            <td className="py-2">chandlerjacobi@test.net</td>
            <td className="py-2">03/02/2020</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;