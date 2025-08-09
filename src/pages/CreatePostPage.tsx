import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Eye, Image, Tag } from 'lucide-react';
import { categories } from '../data/mockData';

const CreatePostPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log({ title, excerpt, content, categoryId, featuredImage, tags });
    setIsSaving(false);
    navigate('/posts');
  };

  const selectedCategory = categories.find(c => c.id === categoryId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 border-b pb-4">
            <h1 className="text-3xl font-bold text-blue-900">Create New Post</h1>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsPreview(!isPreview)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 transition"
              >
                <Eye className="w-4 h-4" />
                {isPreview ? 'Edit' : 'Preview'}
              </button>
              <button
                type="submit"
                form="post-form"
                disabled={isSaving}
                className="flex items-center gap-2 px-6 py-2 rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {isSaving ? 'Saving...' : 'Publish'}
              </button>
            </div>
          </div>

          <form id="post-form" onSubmit={handleSubmit} className="space-y-8">
            {!isPreview ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    placeholder="Enter your post title..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
                  <textarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    placeholder="Write a short excerpt..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
                  <div className="flex gap-2 items-center">
                    <Image className="text-gray-500" />
                    <input
                      type="url"
                      value={featuredImage}
                      onChange={(e) => setFeaturedImage(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      placeholder="https://example.com/image.jpg"
                      required
                    />
                  </div>
                  {featuredImage && (
                    <img
                      src={featuredImage}
                      alt="Preview"
                      className="mt-4 w-full h-48 object-cover rounded-lg border"
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      placeholder="Add a tag..."
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >Add</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                      <span key={tag} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        #{tag}
                        <button
                          type="button"
                          className="ml-2 text-blue-600 hover:text-red-500"
                          onClick={() => handleRemoveTag(tag)}
                        >×</button>
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={16}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    placeholder="Write your post using Markdown..."
                    required
                  />
                </div>
              </>
            ) : (
              <div className="prose max-w-none">
                {selectedCategory && (
                  <span className={`${selectedCategory.color} text-white px-4 py-1 rounded-full inline-block mb-4 font-semibold`}>
                    {selectedCategory.name}
                  </span>
                )}
                <h1>{title || 'Post Title'}</h1>
                <p className="text-gray-600 italic">{excerpt || 'Excerpt will show here...'}</p>
                {featuredImage && <img src={featuredImage} alt="Featured" className="rounded-lg mt-6" />}
                {content
                  ? content.split('\n').map((para, i) => {
                      if (para.startsWith('## ')) return <h2 key={i}>{para.replace('## ', '')}</h2>;
                      if (para.startsWith('### ')) return <h3 key={i}>{para.replace('### ', '')}</h3>;
                      return <p key={i}>{para}</p>;
                    })
                  : <p className="text-gray-500 italic">Content will appear here...</p>}
                {tags.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold">Tags</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.map(tag => (
                        <span key={tag} className="bg-blue-200 text-blue-900 px-3 py-1 rounded-full text-sm">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
