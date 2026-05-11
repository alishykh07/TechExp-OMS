import React, { useEffect, useState } from "react";
import Back_Button from "../BackButton/Back_Button";
import { loggedUser } from "../../Services/AuthService";
import DeleteConfirmationAlert from "../ConfirmetionAlerts/DeleteConfermetionAlert";

function Photos() {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [user, setUser] = useState(null);

  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const u = await loggedUser();
      setUser(u);
    };
    getUser();
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/all-images")
      .then((res) => res.json())
      .then((data) => setImages(data));
  }, []);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("http://localhost:3001/upload-image", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setImages((prev) => [data, ...prev]);
    setFile(null);
  };

  const toggleSelect = (id) => {
    if (selectedImages.includes(id)) {
      setSelectedImages(selectedImages.filter((i) => i !== id));
    } else {
      setSelectedImages([...selectedImages, id]);
    }
  };

  const openBulkDelete = () => {
    if (selectedImages.length === 0) return;
    setDeleteId("MULTI");
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (deleteId === "MULTI") {
      for (let id of selectedImages) {
        await fetch(`http://localhost:3001/delete-image/${id}`, {
          method: "DELETE",
        });
      }

      setImages(images.filter((img) => !selectedImages.includes(img._id)));
      setSelectedImages([]);
      setDeleteMode(false);
    } else {
      await fetch(`http://localhost:3001/delete-image/${deleteId}`, {
        method: "DELETE",
      });

      setImages(images.filter((img) => img._id !== deleteId));
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)] px-4 sm:px-6 md:px-10 py-10 pt-20">
      <Back_Button />

      {/* TITLE */}
      <div className="max-w-3xl mx-auto text-center pt-10 sm:pt-12 md:pt-20 pb-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
          Office Gallery
        </h1>
      </div>

      {/* UPLOAD SECTION */}
      {user?.role === "Manager" && (
        <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full sm:w-auto bg-white px-3 py-2 rounded-lg shadow text-sm"
          />

          <button
            onClick={handleUpload}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 text-sm sm:text-md font-bold text-white rounded-lg 
            bg-[radial-gradient(circle_at_top,_rgba(0,150,255,0.5)_0%,_#202251_70%)]
            hover:bg-blue-500 transition"
          >
            Add Image
          </button>

          <button
            onClick={() => {
              setDeleteMode(!deleteMode);
              setSelectedImages([]);
            }}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 text-sm sm:text-md font-bold text-white rounded-lg 
            bg-[radial-gradient(circle_at_top,_rgba(139,191,77,0.5)_0%,_#4f7a2d_70%)]
            hover:bg-[#73a240] transition"
          >
            {deleteMode ? "Cancel" : "Delete Mode"}
          </button>

          {deleteMode && (
            <button
              onClick={openBulkDelete}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 text-sm sm:text-md font-bold text-white rounded-lg 
              bg-[radial-gradient(circle_at_top,_rgba(139,191,77,0.5)_0%,_#4f7a2d_70%)]
              hover:bg-[#73a240] transition"
            >
              Delete ({selectedImages.length})
            </button>
          )}
        </div>
      )}

      {/* GALLERY */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
        {images.map((img) => (
          <div
            key={img._id}
            onClick={() => deleteMode && toggleSelect(img._id)}
            className={`group break-inside-avoid rounded-xl sm:rounded-2xl overflow-hidden bg-white
              shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1
              ${selectedImages.includes(img._id) ? "ring-4 ring-emerald-500" : ""}
            `}
          >
            <div className="relative overflow-hidden">
              <img
                src={img.imageUrl}
                alt=""
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition"></div>

              {/* badge */}
              {deleteMode && (
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] sm:text-xs shadow">
                  {selectedImages.includes(img._id) ? "✅" : "⬜"}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      <DeleteConfirmationAlert
        showConfirm={showConfirm}
        setShowConfirm={setShowConfirm}
        deleteId={deleteId}
        setDeleteId={setDeleteId}
        closing={closing}
        setClosing={setClosing}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default Photos;
