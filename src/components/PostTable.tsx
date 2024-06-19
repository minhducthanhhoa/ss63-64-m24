import React from 'react';
import PostRow from './PostRow';

const PostTable: React.FC<{ posts: any[], onBlockClick: (post: any) => void, onDeleteClick: (post: any) => void }> = ({ posts, onBlockClick, onDeleteClick }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">STT</th>
            <th className="p-2 border">Tiêu đề</th>
            <th className="p-2 border">Hình ảnh</th>
            <th className="p-2 border">Ngày viết</th>
            <th className="p-2 border">Trạng thái</th>
            <th className="p-2 border">Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {posts.slice(0, 5).map((post, index) => (
            <PostRow key={post.id} post={post} index={index + 1} onBlockClick={onBlockClick} onDeleteClick={onDeleteClick} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostTable;
