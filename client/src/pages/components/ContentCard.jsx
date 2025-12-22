import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Eye, Sparkles, Box, Heart, Share2 } from 'lucide-react';
import { useLikes } from '../../context/LikesContext';

const ContentCard = ({ _id, title, description, thumbnailUrl, modelUrl, category, onCardClick }) => {
    const cardRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const [showModel, setShowModel] = useState(true);
    const { toggleLike, isLiked } = useLikes();

    const liked = isLiked(_id);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePosition({ x, y });
    };

    const handleLikeClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleLike({ _id, title, description, thumbnailUrl, modelUrl, category });
    };

    const handleShareClick = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const shareUrl = `${window.location.origin}/content/${_id}`;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: description,
                    url: shareUrl
                });
            } catch (err) {
                console.log('Share cancelled');
            }
        } else {
            navigator.clipboard.writeText(shareUrl);
            alert('Link copied to clipboard!');
        }
    };

    const handleCardClick = () => {
        if (onCardClick) {
            onCardClick({ _id, title, description, thumbnailUrl, modelUrl, category });
        }
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setMousePosition({ x: 0, y: 0 });
            }}
            onClick={handleCardClick}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
                transform: isHovered
                    ? `perspective(1000px) rotateX(${mousePosition.y * -10}deg) rotateY(${mousePosition.x * 10}deg) scale(1.02)`
                    : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
                transition: 'transform 0.15s ease-out'
            }}
            className="group relative cursor-pointer"
        >
            {/* Like and Share Buttons */}
            <div className="absolute top-4 right-4 z-30 flex gap-2">
                {/* Share Button - Blue */}
                <motion.button
                    onClick={handleShareClick}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2.5 rounded-full backdrop-blur-md transition-all bg-black/50 text-white hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/30"
                >
                    <Share2 className="w-5 h-5" />
                </motion.button>

                {/* Like Button - Red */}
                <motion.button
                    onClick={handleLikeClick}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-2.5 rounded-full backdrop-blur-md transition-all ${liked
                        ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                        : 'bg-black/50 text-white hover:bg-red-500/80'
                        }`}
                >
                    <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                </motion.button>
            </div>

            <div className="block">
                {/* Dynamic spotlight effect */}
                <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
                    style={{
                        background: isHovered
                            ? `radial-gradient(circle at ${(mousePosition.x + 0.5) * 100}% ${(mousePosition.y + 0.5) * 100}%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)`
                            : 'none'
                    }}
                />

                {/* Glow on hover */}
                <motion.div
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-xl -z-10"
                />

                <div className="relative glass-card rounded-2xl overflow-hidden group-hover:border-primary/30 transition-colors animated-gradient-border hover-float-shadow">
                    {/* 3D Model Viewer Container */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
                        {showModel && modelUrl ? (
                            <>
                                {/* @ts-ignore */}
                                <model-viewer
                                    className="w-full h-full block"
                                    src={modelUrl}
                                    alt={title}
                                    poster={thumbnailUrl}
                                    auto-rotate
                                    rotation-per-second="30deg"
                                    camera-controls
                                    disable-zoom
                                    interaction-prompt="none"
                                    shadow-intensity="0.5"
                                    environment-image="neutral"
                                    style={{
                                        pointerEvents: isHovered ? 'auto' : 'none',
                                        '--progress-bar-color': '#9333EA'
                                    }}
                                >
                                    {/* Loading indicator */}
                                    <div slot="poster" className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                            className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent"
                                        />
                                    </div>
                                    {/* @ts-ignore */}
                                </model-viewer>

                                {/* 3D Badge - moved to bottom left to avoid overlap with Like button */}
                                <div className="absolute bottom-4 left-4 z-20">
                                    <motion.div
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="flex items-center px-2 py-1 rounded-lg bg-primary/90 text-white text-xs font-bold backdrop-blur-sm"
                                    >
                                        <Box className="w-3 h-3 mr-1" />
                                        3D
                                    </motion.div>
                                </div>
                            </>
                        ) : (
                            <motion.img
                                src={thumbnailUrl}
                                alt={title}
                                className="w-full h-full object-cover"
                                animate={{ scale: isHovered ? 1.1 : 1 }}
                                transition={{ duration: 0.5 }}
                            />
                        )}

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent opacity-90 pointer-events-none" />

                        {/* Category badge */}
                        <motion.div
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="absolute top-4 left-4 z-20"
                        >
                            <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-[var(--bg-card)]/80 backdrop-blur-md border border-[var(--border-color)] flex items-center">
                                <Sparkles className="w-3 h-3 mr-1 text-primary" />
                                {category}
                            </span>
                        </motion.div>

                        {/* View indicator */}
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
                            className="absolute bottom-4 right-4 z-20"
                        >
                            <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                                <Eye className="w-5 h-5 text-primary" />
                            </div>
                        </motion.div>

                        {/* Interact hint */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isHovered ? 1 : 0 }}
                            className="absolute bottom-4 left-16 z-20"
                        >
                            <span className="text-xs text-white/80 bg-black/50 px-2 py-1 rounded-lg backdrop-blur-sm">
                                Drag to rotate
                            </span>
                        </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-5 bg-gradient-to-b from-transparent to-[var(--bg-card)]">
                        <motion.h3
                            animate={{ x: isHovered ? 5 : 0 }}
                            className="text-lg font-bold mb-2 text-white group-hover:text-primary-light transition-colors line-clamp-1"
                        >
                            {title}
                        </motion.h3>
                        <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-4 leading-relaxed">
                            {description}
                        </p>

                        <div className="flex items-center justify-between pt-2 border-t border-[var(--border-color)]">
                            <motion.span
                                animate={{ x: isHovered ? 5 : 0 }}
                                className="text-sm font-semibold text-primary-light flex items-center hover:text-white transition-colors"
                            >
                                View in AR
                                <motion.span animate={{ x: isHovered ? 3 : 0, y: isHovered ? -3 : 0 }}>
                                    <ArrowUpRight className="ml-1 w-4 h-4" />
                                </motion.span>
                            </motion.span>

                            <motion.div
                                animate={{ width: isHovered ? 48 : 0 }}
                                className="h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ContentCard;
