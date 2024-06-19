import React, { useState } from 'react';
import axios from 'axios';

interface AddPostFormProps {
  onClose: () => void;
  onAddPost: (post: any) => void;
}

const AddPostForm: React.FC<AddPostFormProps> = ({ onClose, onAddPost }) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !image || !content) {
      setError('Tên bài viết, hình ảnh và nội dung không được để trống');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/posts', {
        title,
        image,
        content,
        status: 'Đã xuất bản',
        date: new Date().toISOString(),
      });

      onAddPost(response.data);
      onClose();
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Thêm mới bài viết</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Tên bài viết</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Hình ảnh</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Nội dung</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
              Đóng
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Xuất bản
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPostForm;
