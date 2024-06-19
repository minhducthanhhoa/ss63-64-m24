import React from 'react';

interface ToolbarProps {
  onAddPostClick: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onAddPostClick }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex space-x-2">
        <input 
          type="text" 
          placeholder="Nhập từ khóa tìm kiếm" 
          className="border rounded p-2"
        />
        <select className="border rounded p-2">
          <option value="">Lọc bài viết</option>
        </select>
      </div>
      <button onClick={onAddPostClick} className="bg-blue-500 text-white px-4 py-2 rounded">
        Thêm mới bài viết
      </button>
    </div>
  );
};

export default Toolbar;
