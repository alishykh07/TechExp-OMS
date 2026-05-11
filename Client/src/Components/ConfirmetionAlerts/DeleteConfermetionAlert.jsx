import React from "react";

function DeleteConfirmationAlert({
  showConfirm,
  setShowConfirm,
  deleteId,
  setDeleteId,
  closing,
  setClosing,
  onConfirm,
}) {
  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setShowConfirm(false);
      setClosing(false);
      setDeleteId(null);
    }, 400);
  };

  return (
    showConfirm && (
      <div
        className="fixed inset-0 bg-black/40 flex items-start justify-center pt-3 sm:p-4 md:p-6 lg:p-8 pr-6 sm:pr-4 md:pr-6 lg:pr-8 z-50"
        onClick={(e) => {
          // Close the modal if clicking outside the modal content
          if (e.target === e.currentTarget) {
            handleClose();
          }
        }}
      >
        <div
          className={`w-full max-w-[80vw] sm:max-w-md
  mx-auto
  bg-gradient-to-br from-gray-800 to-indigo-900/80
  backdrop-blur-md rounded-xl shadow-lg border border-white/10
  relative overflow-hidden transition-all duration-300
  ${closing ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
        >
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-gray-300 hover:text-white py-1 px-3  hover:bg-gray-700/50 rounded-full transition-all duration-300 backdrop-blur-sm"
          >
            <span className="text-lg">×</span>
          </button>

          <div className="flex justify-center mb-4 pt-4">
            <svg
              className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>

          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white text-center px-4 mt-4">
            Are you sure you want to delete this Data?
          </h3>

          <div className="flex flex-col sm:flex-row gap-3 justify-center p-4 mt-2">
            <button
              onClick={handleClose}
              className="w-full sm:w-auto px-4 py-2 bg-gray-500/80 text-white 
                            rounded-full hover:bg-gray-600 transition"
            >
              No, cancel
            </button>
            <button
              onClick={() => {
                onConfirm();
                handleClose();
              }}
              className="w-full sm:w-auto px-4 py-2 bg-red-600/80 text-white 
                            rounded-full hover:bg-red-700 transition"
            >
              Yes, I&#39;m sure
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default DeleteConfirmationAlert;
