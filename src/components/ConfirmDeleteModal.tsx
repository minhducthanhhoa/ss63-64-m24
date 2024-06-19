import React from 'react';

interface ConfirmModalProps {
  showDelete: boolean;
  onDeleteClose: () => void;
  onDeleteConfirm: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmModalProps> = ({ showDelete, onDeleteClose, onDeleteConfirm }) => {
  if (!showDelete) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Xác nhận</h2>
        <p className="mb-4">Bạn có chắc chắn muốn xóa bài viết này không?</p>
        <div className="flex justify-end space-x-2">
          <button onClick={onDeleteClose} className="bg-gray-500 text-white px-4 py-2 rounded">Hủy</button>
          <button onClick={onDeleteConfirm} className="bg-red-500 text-white px-4 py-2 rounded">Đồng ý</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
