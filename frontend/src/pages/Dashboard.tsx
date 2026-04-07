import React, { useEffect, useState } from 'react';
import { linkService } from '../api/services';
import { Plus, Trash2, ExternalLink, BarChart3, Link as LinkIcon, RefreshCw } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [links, setLinks] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [shortCode, setShortCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  const fetchLinks = async () => {
    setLoading(true);
    try {
      const res = await linkService.getAll();
      setLinks(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleAddLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      await linkService.create({ title, url, shortCode: shortCode || undefined });
      setTitle('');
      setUrl('');
      setShortCode('');
      fetchLinks();
    } catch (err) {
      alert('Failed to create link. Short code might be taken.');
    } finally {
      setBtnLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure?')) return;
    try {
      await linkService.delete(id);
      fetchLinks();
    } catch (err) {
      alert('Failed to delete');
    }
  };

  return (
    <div className="min-h-screen pt-32 px-6 pb-20 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black mb-2">My Links</h1>
          <p className="text-white/50 text-lg">Manage and track your digital presence.</p>
        </div>
        <button 
          onClick={fetchLinks}
          className="p-3 glass rounded-xl hover:bg-white/10 transition-all text-white/70"
        >
          <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Create Link Form */}
        <div className="lg:col-span-1">
          <div className="glass p-8 rounded-3xl sticky top-32">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Plus className="text-primary" />
              Add New link
            </h3>
            <form onSubmit={handleAddLink} className="space-y-4">
              <input
                type="text"
                placeholder="Title (e.g. My Portfolio)"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary outline-none transition-all"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="url"
                placeholder="Destination URL"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary outline-none transition-all"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <input
                type="text"
                placeholder="Custom Short Code (optional)"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary outline-none transition-all"
                value={shortCode}
                onChange={(e) => setShortCode(e.target.value)}
              />
              <button
                disabled={btnLoading}
                className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-blue-600 transition-all disabled:opacity-50 mt-4 shadow-lg shadow-blue-500/20"
              >
                {btnLoading ? 'Creating...' : 'Create link'}
              </button>
            </form>
          </div>
        </div>

        {/* Links List */}
        <div className="lg:col-span-2 space-y-4">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : links.length === 0 ? (
            <div className="glass p-20 rounded-3xl text-center border-dashed">
               <LinkIcon size={48} className="mx-auto mb-6 text-white/20" />
               <p className="text-white/40 text-xl font-medium">No links found. Create your first one!</p>
            </div>
          ) : (
            links.map((link) => (
              <div key={link.id} className="glass p-6 rounded-3xl flex items-center justify-between group hover:border-white/20 transition-all">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <LinkIcon size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">{link.title}</h4>
                    <div className="flex items-center gap-2 text-white/40 text-sm">
                       <span className="text-primary font-mono bg-primary/10 px-2 py-0.5 rounded">act.link/s/{link.shortCode}</span>
                       <span>•</span>
                       <span className="flex items-center gap-1 font-medium"><BarChart3 size={14} /> {link.clicks || 0} clicks</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <a 
                    href={`http://localhost:3000/s/${link.shortCode}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-3 hover:bg-white/10 rounded-xl transition-colors text-white/50 hover:text-white"
                  >
                    <ExternalLink size={20} />
                  </a>
                  <button 
                    onClick={() => handleDelete(link.id)}
                    className="p-3 hover:bg-red-500/10 rounded-xl transition-colors text-white/40 hover:text-red-400"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
