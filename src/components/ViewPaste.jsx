import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === id);

  if (!paste) {
    return <div className="text-center text-white mt-10">Paste not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <input
        className="w-full p-3 rounded-lg text-gray-900 bg-amber-100 mb-6 shadow-md"
        type="text"
        value={paste.title}
        disabled
      />
      <textarea
        className="w-full p-4 rounded-lg bg-amber-50 text-amber-900 shadow-inner min-h-[300px]"
        value={paste.content}
        disabled
        rows={15}
      ></textarea>
    </div>
  );
};

export default ViewPaste;
