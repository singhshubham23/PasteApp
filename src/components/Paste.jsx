import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filterData = pastes.filter(
    (paste) =>
      paste.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paste.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleShare(pasteId) {
  const shareableLink = `${window.location.origin}/pastes/${pasteId}`;
  navigator.clipboard.writeText(shareableLink);
  toast.success("Shareable link copied!");
}

  function copyNote(content) {
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard");
  }

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <input
        className="w-full p-3 rounded-lg bg-gray-100 text-gray-800 shadow-md"
        type="search"
        placeholder="Search Here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filterData.map((paste, index) => (
          <div
            key={paste._id || `${paste.title}-${index}`}
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-4 rounded-lg shadow-md flex flex-col justify-between"
          >
            <h3 className="font-semibold text-lg truncate mb-2">
              {paste.title}
            </h3>
            <p className="text-sm break-words line-clamp-5 mb-4">
              {paste.content}
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              <Link
                to={`/?pasteId=${paste._id}`}
                className="bg-yellow-500 hover:bg-yellow-400 text-white px-3 py-1 rounded"
              >
                Edit
              </Link>
              <Link
                to={`/pastes/${paste._id}`}
                className="bg-blue-500 hover:bg-blue-400 text-white px-3 py-1 rounded"
              >
                View
              </Link>
              <button
                onClick={() => handleDelete(paste._id)}
                className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
              <button
                onClick={() => handleShare(paste._id)}
                className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded"
              >
                Share
              </button>
              <button
                onClick={() => copyNote(paste.content)}
                className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded"
              >
                Copy
              </button>
            </div>
            <div className="mt-2 text-xs text-gray-400">{paste.createdAt}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Paste;
