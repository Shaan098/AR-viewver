import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from './components/Layout';
import { ArrowLeft, Box, Smartphone, Share2, Heart, Sparkles, RotateCcw, ZoomIn, Move3D, MousePointer } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLikes } from '../context/LikesContext';

const ContentDetail = () => {
    const { id } = useParams();
    const [content, setContent] = useState(null);
    const [relatedContent, setRelatedContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const { toggleLike, isLiked } = useLikes();

    const liked = content ? isLiked(content._id) : false;

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/content/${id}`);
                const data = await res.json();
                setContent(data);

                const allRes = await fetch('http://localhost:5000/api/content');
                const allData = await allRes.json();
                const related = allData.filter(c => c.category === data.category && c._id !== id).slice(0, 2);
                setRelatedContent(related);
            } catch (err) {
                console.error('Failed to fetch content', err);
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, [id]);

    const handleLike = () => {
        if (content) {
            toggleLike(content);
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({ title: content.title, text: content.description, url: window.location.href });
            } catch (err) { console.log('Share cancelled'); }
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="h-screen flex flex-col items-center justify-center">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-16 h-16 rounded-full border-4 border-primary/30 border-t-primary mb-4"
                    />
                    <p className="text-[var(--text-secondary)]">Loading 3D model...</p>
                </div>
            </Layout>
        );
    }

    if (!content) {
        return (
            <Layout>
                <div className="h-screen flex flex-col items-center justify-center">
                    <div className="w-24 h-24 mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <Box className="w-10 h-10 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2 text-white">Content Not Found</h2>
                    <p className="text-[var(--text-secondary)] mb-6">The model you're looking for doesn't exist.</p>
                    <Link to="/explore" className="px-6 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-medium">
                        Back to Explore
                    </Link>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="min-h-screen pt-20">
                <div className="grid lg:grid-cols-5 min-h-[calc(100vh-5rem)]">
                    {/* Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-2 p-6 lg:p-10 border-r border-[var(--border-color)] bg-[var(--bg-card)] overflow-y-auto"
                    >
                        <Link to="/explore" className="inline-flex items-center text-[var(--text-secondary)] hover:text-primary-light mb-6 transition-colors group">
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Back to Explore
                        </Link>

                        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-sm text-primary-light font-medium mb-4">
                            <Sparkles className="w-3 h-3 mr-2" />
                            {content.category}
                        </div>

                        <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-white">{content.title}</h1>
                        <p className="text-[var(--text-secondary)] leading-relaxed mb-6">{content.description}</p>

                        {/* Actions */}
                        <div className="flex gap-3 mb-6">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleLike}
                                className={`flex items-center px-5 py-3 rounded-xl font-medium transition-all ${liked
                                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                    : 'bg-[var(--bg-elevated)] border border-[var(--border-color)] hover:border-red-500/30 text-white'
                                    }`}
                            >
                                <Heart className={`w-5 h-5 mr-2 ${liked ? 'fill-current' : ''}`} />
                                {liked ? 'Saved' : 'Save'}
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleShare}
                                className="flex items-center px-5 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-color)] hover:border-primary/30 transition-colors font-medium text-white"
                            >
                                <Share2 className="w-5 h-5 mr-2" />
                                Share
                            </motion.button>
                        </div>

                        {/* Controls Guide */}
                        <div className="p-5 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-color)] mb-6">
                            <h3 className="font-bold mb-4 flex items-center text-white">
                                <Move3D className="w-5 h-5 mr-2 text-primary-light" />
                                How to Interact
                            </h3>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div className="flex items-center text-[var(--text-secondary)]">
                                    <MousePointer className="w-4 h-4 mr-2 text-primary-light" />
                                    Drag to rotate
                                </div>
                                <div className="flex items-center text-[var(--text-secondary)]">
                                    <ZoomIn className="w-4 h-4 mr-2 text-primary-light" />
                                    Scroll to zoom
                                </div>
                            </div>
                        </div>

                        {/* AR Instructions */}
                        <div className="p-5 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
                            <h3 className="font-bold mb-4 flex items-center text-white">
                                <Smartphone className="w-5 h-5 mr-2 text-secondary" />
                                AR on Mobile
                            </h3>
                            <ol className="space-y-2 text-sm text-[var(--text-secondary)]">
                                <li className="flex items-start">
                                    <span className="w-5 h-5 rounded-md bg-primary/30 text-primary-light text-xs font-bold flex items-center justify-center mr-2 shrink-0">1</span>
                                    Open on mobile device
                                </li>
                                <li className="flex items-start">
                                    <span className="w-5 h-5 rounded-md bg-primary/30 text-primary-light text-xs font-bold flex items-center justify-center mr-2 shrink-0">2</span>
                                    Tap "View in AR" button
                                </li>
                                <li className="flex items-start">
                                    <span className="w-5 h-5 rounded-md bg-primary/30 text-primary-light text-xs font-bold flex items-center justify-center mr-2 shrink-0">3</span>
                                    Point at a flat surface
                                </li>
                            </ol>
                        </div>

                        {/* Related */}
                        {relatedContent.length > 0 && (
                            <div className="mt-6">
                                <h3 className="font-bold mb-4 text-white">Related Models</h3>
                                <div className="space-y-3">
                                    {relatedContent.map((item) => (
                                        <Link
                                            key={item._id}
                                            to={`/content/${item._id}`}
                                            className="flex items-center gap-4 p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-color)] hover:border-primary/30 transition-colors group"
                                        >
                                            <img src={item.thumbnailUrl} alt={item.title} className="w-14 h-14 rounded-xl object-cover" />
                                            <div>
                                                <h4 className="font-medium text-white group-hover:text-primary-light transition-colors">{item.title}</h4>
                                                <p className="text-xs text-[var(--text-muted)]">{item.category}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {/* 3D Viewer */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-3 relative bg-gradient-to-br from-[#0D0A1A] via-[#1A1625] to-[#0D0A1A]"
                    >
                        {/* Grid overlay */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(147,51,234,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(232,180,184,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

                        {/* Glow effect */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

                        {/* @ts-ignore */}
                        <model-viewer
                            style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
                            src={content.modelUrl}
                            alt={content.title}
                            poster={content.thumbnailUrl}
                            auto-rotate
                            camera-controls
                            ar
                            ar-modes="webxr scene-viewer quick-look"
                            shadow-intensity="1.5"
                            environment-image="neutral"
                            exposure="1"
                            shadow-softness="1"
                        >
                            {/* Reset button */}
                            <div className="absolute top-6 right-6 flex gap-2">
                                <button
                                    onClick={() => {
                                        const mv = document.querySelector('model-viewer');
                                        if (mv) {
                                            mv.cameraOrbit = 'auto auto auto';
                                            mv.cameraTarget = 'auto auto auto';
                                        }
                                    }}
                                    className="w-12 h-12 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-primary/30 hover:border-primary/50 transition-all text-white"
                                    title="Reset view"
                                >
                                    <RotateCcw className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Interaction hint */}
                            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white text-sm flex items-center">
                                <Move3D className="w-4 h-4 mr-2" />
                                Drag to rotate • Scroll to zoom
                            </div>

                            <button slot="ar-button" className="absolute bottom-6 right-6 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-full flex items-center shadow-2xl shadow-primary/40 hover:scale-105 transition-transform">
                                <Smartphone className="w-5 h-5 mr-2" />
                                View in AR
                            </button>
                            {/* @ts-ignore */}
                        </model-viewer>
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
};

export default ContentDetail;
