import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trash2, ArrowRight, HeartOff, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from './components/Layout';
import ContentCard from './components/ContentCard';
import { useLikes } from '../context/LikesContext';

const Liked = () => {
    const { likedItems, clearAllLikes, getLikedCount } = useLikes();

    return (
        <Layout>
            {/* Hero Section */}
            <section className="pt-28 pb-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                {/* Background decorations */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
                <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />

                <div className="max-w-7xl mx-auto relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-8"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary-light text-sm font-medium mb-6"
                        >
                            <Heart className="w-4 h-4 mr-2 fill-current" />
                            Your Favorites
                        </motion.div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                            Liked <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Content</span>
                        </h1>
                        <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
                            {getLikedCount() === 0
                                ? "You haven't liked any content yet. Start exploring to save your favorites!"
                                : `You have ${getLikedCount()} saved item${getLikedCount() > 1 ? 's' : ''}`
                            }
                        </p>

                        {getLikedCount() > 0 && (
                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={clearAllLikes}
                                className="mt-6 inline-flex items-center px-6 py-3 rounded-full bg-accent/20 border border-accent/30 text-accent font-medium hover:bg-accent/30 transition-all"
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Clear All Favorites
                            </motion.button>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Content Grid */}
            <section className="pb-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <AnimatePresence mode="wait">
                        {getLikedCount() === 0 ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="text-center py-20"
                            >
                                <motion.div
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        rotate: [0, 5, -5, 0]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 mb-8"
                                >
                                    <HeartOff className="w-16 h-16 text-primary/60" />
                                </motion.div>

                                <h2 className="text-3xl font-bold text-white mb-4">No Favorites Yet</h2>
                                <p className="text-[var(--text-secondary)] mb-8 max-w-md mx-auto text-lg">
                                    Click the heart icon on any 3D model to save it here for quick access
                                </p>

                                <Link
                                    to="/explore"
                                    className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-2xl hover:shadow-primary/40 transition-all hover:scale-105"
                                >
                                    <Sparkles className="mr-2 w-5 h-5" />
                                    Explore 3D Models
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Link>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="grid"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                {/* Results count */}
                                <div className="flex items-center justify-between mb-8 px-2">
                                    <p className="text-[var(--text-secondary)]">
                                        <span className="text-white font-semibold">{getLikedCount()}</span> saved {getLikedCount() === 1 ? 'model' : 'models'}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    <AnimatePresence>
                                        {likedItems.map((item, index) => (
                                            <motion.div
                                                key={item._id}
                                                layout
                                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                                                transition={{ delay: index * 0.1 }}
                                            >
                                                <ContentCard {...item} />
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* Explore More CTA */}
            {getLikedCount() > 0 && (
                <section className="pb-24 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-3xl bg-gradient-to-br from-[var(--bg-card)] to-primary/5 border border-[var(--border-color)] text-center relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />

                            <div className="relative">
                                <h3 className="text-2xl font-bold text-white mb-3">Want to discover more?</h3>
                                <p className="text-[var(--text-secondary)] mb-6">
                                    Explore our full collection of interactive 3D models
                                </p>
                                <Link
                                    to="/explore"
                                    className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-xl hover:shadow-primary/30 transition-all hover:scale-105"
                                >
                                    Browse All Models
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>
            )}
        </Layout>
    );
};

export default Liked;
