import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Share2, RotateCcw, ZoomIn, Move3D, Smartphone, Sparkles, ArrowUpRight } from 'lucide-react';
import { useLikes } from '../../context/LikesContext';

const ModelModal = ({ content, isOpen, onClose }) => {
    const { toggleLike, isLiked } = useLikes();
    const liked = content ? isLiked(content._id) : false;

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    if (!content) return null;

    const handleLike = (e) => {
        e.stopPropagation();
        toggleLike(content);
    };

    const handleShare = async (e) => {
        e.stopPropagation();
        if (navigator.share) {
            try {
                await navigator.share({
                    title: content.title,
                    text: content.description,
                    url: window.location.href
                });
            } catch (err) {
                console.log('Share cancelled');
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleBackdropClick}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-6xl max-h-[90vh] bg-[var(--bg-card)] rounded-2xl overflow-hidden shadow-2xl border border-[var(--border-color)] flex flex-col"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-primary/30 hover:border-primary/50 transition-all text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="flex flex-col lg:flex-row h-full max-h-[90vh] overflow-hidden">
                                {/* Left Side - 3D Viewer */}
                                <div className="lg:w-2/3 relative bg-gradient-to-br from-[#0D0A1A] via-[#1A1625] to-[#0D0A1A] min-h-[400px] lg:min-h-full">
                                    {/* Grid overlay */}
                                    <div className="absolute inset-0 bg-[linear-gradient(rgba(147,51,234,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(232,180,184,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

                                    {/* Glow effect */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

                                    {/* Model Viewer */}
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
                                        <div className="absolute top-6 right-16 flex gap-2 z-10">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
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
                                        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white text-sm flex items-center z-10">
                                            <Move3D className="w-4 h-4 mr-2" />
                                            Drag to rotate • Scroll to zoom
                                        </div>

                                        <button
                                            slot="ar-button"
                                            className="absolute bottom-6 right-6 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-full flex items-center shadow-2xl shadow-primary/40 hover:scale-105 transition-transform z-10"
                                        >
                                            <Smartphone className="w-5 h-5 mr-2" />
                                            View in AR
                                        </button>
                                        {/* @ts-ignore */}
                                    </model-viewer>
                                </div>

                                {/* Right Side - Content Info */}
                                <div className="lg:w-1/3 p-6 lg:p-8 overflow-y-auto bg-[var(--bg-card)]">
                                    {/* Category Badge */}
                                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-sm text-primary-light font-medium mb-4">
                                        <Sparkles className="w-3 h-3 mr-2" />
                                        {content.category}
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-2xl lg:text-3xl font-bold mb-3 text-white">{content.title}</h2>

                                    {/* Description */}
                                    <p className="text-[var(--text-secondary)] leading-relaxed mb-6">{content.description}</p>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3 mb-6">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={handleLike}
                                            className={`flex-1 flex items-center justify-center px-5 py-3 rounded-xl font-medium transition-all ${liked
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
                                            className="flex-1 flex items-center justify-center px-5 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-color)] hover:border-primary/30 transition-colors font-medium text-white"
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
                                                <Move3D className="w-4 h-4 mr-2 text-primary-light" />
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

                                    {/* View Full Page Link */}
                                    <motion.a
                                        href={`/content/${content._id}`}
                                        whileHover={{ scale: 1.02 }}
                                        className="mt-6 flex items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 text-primary-light font-medium hover:from-primary/30 hover:to-secondary/30 transition-all"
                                    >
                                        View Full Page
                                        <ArrowUpRight className="w-4 h-4 ml-2" />
                                    </motion.a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ModelModal;

