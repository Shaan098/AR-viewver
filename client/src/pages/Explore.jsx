import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from './components/Layout';
import ContentCard from './components/ContentCard';
import ModelModal from './components/ModelModal';
import { Search, Filter, X, Grid, Sparkles, Loader2, Box, Layers, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Explore = () => {
    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedContent, setSelectedContent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const categories = ['All', ...new Set(contents.map(c => c.category))];

    useEffect(() => {
        const categoryParam = searchParams.get('category');
        if (categoryParam) setSelectedCategory(categoryParam);
    }, [searchParams]);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/content');
                const data = await res.json();
                setContents(data);
            } catch (err) {
                console.error('Failed to fetch content', err);
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, []);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        if (category === 'All') {
            searchParams.delete('category');
        } else {
            searchParams.set('category', category);
        }
        setSearchParams(searchParams);
    };

    const filteredContent = contents.filter(c => {
        const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleCardClick = (content) => {
        setSelectedContent(content);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        // Small delay to allow animation to complete
        setTimeout(() => {
            setSelectedContent(null);
        }, 300);
    };

    return (
        <Layout>
            {/* Hero Header */}
            <section className="pt-28 pb-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                {/* Enhanced Background decorations */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-secondary/10" />
                <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-3xl animate-breathe" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-secondary/15 to-transparent rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-r from-accent/10 to-primary/10 rounded-full blur-2xl animate-pulse-glow" />

                {/* Animated Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(147,51,234,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(232,180,184,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

                <div className="max-w-7xl mx-auto relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-8"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 text-primary-light text-sm font-medium mb-6 backdrop-blur-sm shadow-lg shadow-primary/10"
                        >
                            <motion.span
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            >
                                <Layers className="w-4 h-4 mr-2" />
                            </motion.span>
                            <span className="bg-gradient-to-r from-primary-light to-secondary bg-clip-text text-transparent font-bold">
                                {contents.length} Models Available
                            </span>
                        </motion.div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                            Explore <span className="bg-gradient-to-r from-primary-light via-secondary to-accent bg-clip-text text-transparent animate-bg-pan bg-[length:200%_auto]">3D Models</span>
                        </h1>
                        <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
                            Discover and interact with educational 3D content across multiple categories
                            <motion.span
                                className="inline-block ml-2"
                                animate={{ y: [0, -3, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <Zap className="w-4 h-4 text-highlight inline" />
                            </motion.span>
                        </p>
                    </motion.div>

                    {/* Search Bar - Prominent */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-2xl mx-auto mb-8"
                    >
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
                            <div className="relative">
                                <Search
                                    className="absolute w-5 h-5 text-[var(--text-muted)] group-focus-within:text-primary transition-colors"
                                    style={{ left: '1.25rem', top: '50%', transform: 'translateY(-50%)' }}
                                />
                                <input
                                    type="text"
                                    placeholder="Search for 3D models..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-[var(--bg-card)] border-2 border-[var(--border-color)] rounded-xl py-4 pl-14 pr-14 text-lg focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all placeholder:text-[var(--text-muted)]"
                                />
                                <AnimatePresence>
                                    {searchTerm && (
                                        <motion.button
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            onClick={() => setSearchTerm('')}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/40 transition-colors"
                                        >
                                            <X className="w-4 h-4 text-white" />
                                        </motion.button>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>

                    {/* Category Pills */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap justify-center gap-3"
                    >
                        {categories.map((category, index) => (
                            <motion.button
                                key={category}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + index * 0.05 }}
                                whileHover={{ scale: 1.05, y: -3 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleCategoryChange(category)}
                                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all relative overflow-hidden ${selectedCategory === category
                                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-xl shadow-primary/40'
                                    : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-primary/50 hover:text-white hover:shadow-lg hover:shadow-primary/20'
                                    }`}
                            >
                                {/* Shimmer effect for selected */}
                                {selectedCategory === category && (
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                        animate={{ x: ['-100%', '100%'] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    />
                                )}
                                <span className="relative z-10 flex items-center gap-2">
                                    {category === 'All' && <Grid className="w-4 h-4" />}
                                    {category === 'All' ? 'All Models' : category}
                                </span>
                            </motion.button>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Results Section */}
            <section className="pb-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Results count */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center justify-between mb-8 px-2"
                    >
                        <p className="text-[var(--text-secondary)]">
                            Showing <span className="text-white font-semibold">{filteredContent.length}</span> {filteredContent.length === 1 ? 'model' : 'models'}
                            {selectedCategory !== 'All' && (
                                <span> in <span className="text-primary-light font-semibold">{selectedCategory}</span></span>
                            )}
                        </p>
                    </motion.div>

                    {/* Grid */}
                    <AnimatePresence mode="wait">
                        {loading ? (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center py-32"
                            >
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="w-16 h-16 rounded-full border-4 border-primary/30 border-t-primary mb-4"
                                />
                                <p className="text-[var(--text-secondary)]">Loading 3D models...</p>
                            </motion.div>
                        ) : filteredContent.length === 0 ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="text-center py-24"
                            >
                                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] mb-6">
                                    <Search className="w-10 h-10 text-[var(--text-muted)]" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">No models found</h3>
                                <p className="text-[var(--text-secondary)] mb-6">
                                    Try adjusting your search or filter criteria
                                </p>
                                <button
                                    onClick={() => {
                                        setSearchTerm('');
                                        setSelectedCategory('All');
                                    }}
                                    className="px-6 py-3 rounded-full bg-primary/20 text-primary-light font-medium hover:bg-primary/30 transition-colors"
                                >
                                    Clear filters
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="grid"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                            >
                                {filteredContent.map((content, index) => (
                                    <motion.div
                                        key={content._id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <ContentCard {...content} onCardClick={handleCardClick} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* Model Modal */}
            <ModelModal
                content={selectedContent}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </Layout >
    );
};

export default Explore;
