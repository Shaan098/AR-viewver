import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Layout from './components/Layout';
import Hero from './components/Hero';
import ContentCard from './components/ContentCard';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Box, Sparkles, Smartphone, Zap, Target, Layers, ChevronDown } from 'lucide-react';

// Animated counter hook
const useCounter = (end, duration = 2000, start = 0) => {
    const [count, setCount] = useState(start);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [isVisible]);

    useEffect(() => {
        if (!isVisible) return;

        let startTime;
        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * (end - start) + start));
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }, [isVisible, end, start, duration]);

    return { count, ref };
};

const Home = () => {
    const [featuredContent, setFeaturedContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const { scrollY } = useScroll();
    const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
    const heroScale = useTransform(scrollY, [0, 300], [1, 0.95]);

    const modelsCounter = useCounter(6, 1500);
    const categoriesCounter = useCounter(5, 1500);
    const arCounter = useCounter(100, 2000);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/content');
                const data = await res.json();
                setFeaturedContent(data.slice(0, 3));
            } catch (err) {
                console.error('Failed to fetch featured content', err);
            } finally {
                setLoading(false);
            }
        };
        fetchFeatured();
    }, []);

    const features = [
        { icon: <Box className="w-6 h-6" />, title: 'Interactive 3D', desc: 'Rotate, zoom, and explore every detail', color: 'from-primary to-cyan-400' },
        { icon: <Smartphone className="w-6 h-6" />, title: 'AR Experience', desc: 'Place models in your real space', color: 'from-secondary to-purple-400' },
        { icon: <Zap className="w-6 h-6" />, title: 'Fast Loading', desc: 'Optimized for quick performance', color: 'from-accent to-orange-400' },
        { icon: <Target className="w-6 h-6" />, title: 'Educational', desc: 'Curated content for learning', color: 'from-success to-emerald-400' },
    ];

    return (
        <Layout>
            <motion.div style={{ opacity: heroOpacity, scale: heroScale }}>
                <Hero />
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="flex justify-center -mt-16 relative z-10"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex flex-col items-center text-[var(--text-muted)]"
                >
                    <span className="text-xs mb-2">Scroll to explore</span>
                    <ChevronDown className="w-5 h-5" />
                </motion.div>
            </motion.div>

            {/* Stats Section with Animated Counters */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
                <div className="max-w-5xl mx-auto relative">
                    <div className="grid grid-cols-3 gap-8">
                        {[
                            { ref: modelsCounter.ref, count: modelsCounter.count, suffix: '+', label: '3D Models' },
                            { ref: categoriesCounter.ref, count: categoriesCounter.count, suffix: '', label: 'Categories' },
                            { ref: arCounter.ref, count: arCounter.count, suffix: '%', label: 'AR Compatible' }
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                ref={stat.ref}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="text-center p-8 rounded-2xl glass-card cursor-default"
                            >
                                <div className="text-5xl font-bold gradient-text mb-2">
                                    {stat.count}{stat.suffix}
                                </div>
                                <div className="text-[var(--text-muted)]">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="p-6 rounded-2xl glass-card hover:border-primary/30 transition-colors text-center group cursor-pointer hover-elastic spotlight"
                            >
                                <motion.div
                                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                                    transition={{ duration: 0.5 }}
                                    className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4`}
                                >
                                    {feature.icon}
                                </motion.div>
                                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors hover-underline">{feature.title}</h3>
                                <p className="text-sm text-[var(--text-muted)]">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Content */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center px-3 py-1 rounded-full glass-card text-sm text-primary mb-4">
                            <Sparkles className="w-4 h-4 mr-2" />
                            Featured Models
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold">
                            Popular <span className="gradient-text">3D Content</span>
                        </h2>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Link
                            to="/explore"
                            className="group inline-flex items-center px-6 py-3 rounded-full glass-card hover:border-primary/30 transition-colors text-sm font-medium"
                        >
                            View All Models
                            <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </motion.span>
                        </Link>
                    </motion.div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((n) => (
                            <motion.div
                                key={n}
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="aspect-[4/3] rounded-2xl bg-white/5"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredContent.map((content, index) => (
                            <motion.div
                                key={content._id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                            >
                                <ContentCard {...content} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>

            {/* How It Works */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

                <div className="max-w-4xl mx-auto relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center px-3 py-1 rounded-full glass-card text-sm text-secondary mb-4">
                            <Layers className="w-4 h-4 mr-2" />
                            Simple Process
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            How It <span className="gradient-text">Works</span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { step: 1, title: 'Browse', desc: 'Explore our collection of educational 3D models', color: 'from-primary to-primary-light' },
                            { step: 2, title: 'Interact', desc: 'Rotate, zoom, and examine models in detail', color: 'from-secondary to-purple-400' },
                            { step: 3, title: 'Experience', desc: 'View in AR to place models in your space', color: 'from-accent to-orange-400' }
                        ].map((item, index) => (
                            <motion.div
                                key={item.step}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                whileHover={{ y: -10 }}
                                className="relative"
                            >
                                <div className="text-center p-8 rounded-2xl glass-card hover:border-primary/30 transition-colors cursor-pointer group">
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-2xl font-bold mb-6 shadow-lg`}
                                    >
                                        {item.step}
                                    </motion.div>
                                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                                    <p className="text-[var(--text-muted)] text-sm">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02 }}
                        className="relative p-12 sm:p-16 rounded-3xl overflow-hidden text-center cursor-pointer group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-secondary transition-all duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />

                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", delay: 0.2 }}
                            className="relative"
                        >
                            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                                Ready to Start Learning?
                            </h2>
                            <p className="text-white/80 mb-8 max-w-lg mx-auto">
                                Explore our complete collection of interactive 3D educational content
                            </p>
                            <Link
                                to="/explore"
                                className="inline-flex items-center px-8 py-4 rounded-full bg-white text-primary font-semibold hover:bg-white/90 hover:scale-105 transition-all shadow-xl"
                            >
                                Explore All Models
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
};

export default Home;
