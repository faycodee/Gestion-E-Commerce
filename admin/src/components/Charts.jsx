// src/pages/Chats.jsx
import React from "react";

const contacts = [
  { id: 1, name: "Chandler Jacobi", avatar: "https://randomuser.me/api/portraits/men/11.jpg", online: true },
  { id: 2, name: "Harry Peter", avatar: "https://randomuser.me/api/portraits/men/12.jpg", online: false },
  { id: 3, name: "Judith Espanaso", avatar: "https://randomuser.me/api/portraits/women/13.jpg", online: true },
  { id: 4, name: "Jason Mike", avatar: "https://randomuser.me/api/portraits/men/14.jpg", online: false },
  { id: 5, name: "Adam Joe", avatar: "https://randomuser.me/api/portraits/men/15.jpg", online: true },
];

const Chats = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Connect with your customers</h2>

      <div className="flex gap-6">
        {/* Chat Section */}
        <div className="flex-1 bg-white rounded-xl shadow p-8 flex flex-col items-center justify-center">
          <div className="grid grid-cols-3 gap-2 mb-2">
            {Array.from({ length: 9 }).map((_, i) => (
              <span
                key={i}
                className="w-3 h-3 rounded-full bg-gray-400"
              />
            ))}
          </div>
          <span className="text-gray-600 mt-2">Select a chat</span>
        </div>

        {/* Contacts List */}
        <div className="w-64 bg-white rounded-xl shadow p-4">
          <h3 className="text-lg font-semibold mb-4">Contacts</h3>
          <ul className="space-y-4">
            {contacts.map((user) => (
              <li key={user.id} className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
                  {user.online && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
                  )}
                </div>
                <span className="text-sm font-medium">{user.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Chats;
