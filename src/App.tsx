import React, { useEffect, useState } from 'react';
import PostTable from './components/PostTable';
import Toolbar from './components/Toolbar';
import ConfirmModal from './components/ConfirmModal';
import AddPostForm from './components/AddPostForm';
import axios from 'axios';
import './App.css';
import ConfirmDeleteModal from './components/ConfirmDeleteModal';

interface Post {
  id: number;
  title: string;
  image: string;
  date: string;
  status: string;
}

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5000/posts')
      .then(response => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const handleBlockClick = (post: Post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const handleDeleteClick = (post: Post) => {
    setSelectedPost(post);
    setIsDeleting(true);
    setShowModal(true);
  };

  const handleConfirm = () =>{
    if(selectedPost){
      axios.put(`http://localhost:5000/posts/${selectedPost.id}`, {
        ...selectedPost,
        status: selectedPost.status === 'Đã xuất bản' ? 'Ngừng xuất bản' : 'Đã xuất bản'
      })
        .then(response => {
          setPosts(posts.map(post => post.id === selectedPost.id ? response.data : post));
          setShowModal(false);
          setSelectedPost(null);
        })
        .catch(error => {
          console.error('Error updating post status:', error);
        });
    }
  }
  const handleDeleteConfirm = ()=>{
    if(selectedPost){
      axios.delete(`http://localhost:5000/posts/${selectedPost.id}`)
          .then(() => {
            setPosts(posts.filter(post => post.id !== selectedPost.id));
            setShowModal(false);
            setSelectedPost(null);
            setIsDeleting(false);
          })
          .catch(error => {
            console.error('Error deleting post:', error);
          });
    }
  }
  const handleAddPost = (newPost: Post) => {
    setPosts([...posts, newPost]);
  };

  return (
    <div className="container mx-auto my-8 p-4">
      <h1 className="text-2xl font-bold mb-4">Giao diện quản lý bài viết</h1>
      <Toolbar onAddPostClick={() => setShowAddForm(true)} />
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
        </div>
      ) : (
        <div className="max-h-96 overflow-y-auto">
          <PostTable posts={posts} onBlockClick={handleBlockClick} onDeleteClick={handleDeleteClick} />
        </div>
      )}
      <ConfirmModal show={showModal} onClose={() => setShowModal(false)} onConfirm={handleConfirm} />
      <ConfirmDeleteModal showDelete={showModal} onDeleteClose={() => { setShowModal(false); setIsDeleting(false); }} onDeleteConfirm={handleDeleteConfirm} />
      {showAddForm && <AddPostForm onClose={() => setShowAddForm(false)} onAddPost={handleAddPost} />}
    </div>
  );
};

export default App;
