import React from 'react';

interface ConfirmModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded shadow-lg w-1/3">
        <div className="border-b p-4 flex justify-between items-center">
          <h3 className="text-lg font-bold">Xác nhận</h3>
          <button onClick={onClose}>&times;</button>
        </div>
        <div className="p-4">
          <p className="flex items-center">
            <span className="text-yellow-500 mr-2">&#9888;</span>
            Bạn có chắc chắn muốn ngừng xuất bản bài viết?
          </p>
        </div>
        <div className="border-t p-4 flex justify-end">
          <button className="bg-gray-200 px-4 py-2 rounded mr-2" onClick={onClose}>Hủy</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onConfirm}>Xác nhận</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
