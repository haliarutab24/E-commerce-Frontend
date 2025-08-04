import React from "react";

function User({ users }) {
    const capitalizeWords = (str) =>
        str
          ?.split(" ")
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Recent Users</h2>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="bg-gray-100 text-gray-600">
            <th className="p-2">Name</th>
            <th className="p-2">Role</th>
            <th className="p-2">Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const formattedDate = new Date(user.createdAt).toLocaleDateString(
              "en-GB",
              {
                day: "numeric",
                month: "short",
                year: "numeric",
              }
            );
            return (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="p-2">{capitalizeWords(user.username)}</td>
                <td className="p-2 capitalize">{user.role}</td>
                <td className="p-2">{formattedDate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default User;
