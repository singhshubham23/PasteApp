import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addtoPastes, updateToPastes } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);
  const navigate = useNavigate();

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allPastes]);

  function createPaste() {
    const paste = {
      title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    pasteId ? dispatch(updateToPastes(paste)) : dispatch(addtoPastes(paste));
    setTitle("");
    setValue("");
    navigate("/");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <input
          className="flex-1 p-3 rounded-lg text-gray-900 bg-amber-100 placeholder-gray-600 shadow-md"
          type="text"
          placeholder="Enter Title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={createPaste}
          className="bg-blue-800 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition"
        >
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>
      <textarea
        className="w-full mt-6 rounded-lg p-4 bg-amber-50 text-amber-900 shadow-inner min-h-[300px]"
        value={value}
        placeholder="Enter Your Text Here"
        onChange={(e) => setValue(e.target.value)}
        rows={15}
      ></textarea>
    </div>
  );
};

export default Home;