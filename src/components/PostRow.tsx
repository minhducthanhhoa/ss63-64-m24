import React from 'react';
import { FaEdit, FaTrash, FaLock } from 'react-icons/fa';

const PostRow: React.FC<{ post: any; index: number; onBlockClick: (post: any) => void; onDeleteClick: (post: any) => void }> = ({ post, index, onBlockClick, onDeleteClick }) => {
  return (
    <tr className="hover:bg-gray-100">
      <td className="p-2 border text-center">{index}</td>
      <td className="p-2 border">{post.title}</td>
      <td className="p-2 border text-center">
        <img src={post.image} alt={post.title} className="w-10 h-10 inline" />
      </td>
      <td className="p-2 border text-center">{new Date(post.date).toLocaleDateString()}</td>
      <td className="p-2 border text-center">
        <span className={`px-2 py-1 rounded ${post.status === 'Đã xuất bản' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
          {post.status}
        </span>
      </td>
      <td className="p-2 border text-center">
        <button className="text-yellow-500 hover:text-yellow-700 mx-1" onClick={() => onBlockClick(post)}><FaLock /></button>
        <button className="text-blue-500 hover:text-blue-700 mx-1"><FaEdit /></button>
        <button className="text-red-500 hover:text-red-700 mx-1" onClick={() => onDeleteClick(post)}><FaTrash /></button>
      </td>
    </tr>
  );
};

export default PostRow;
