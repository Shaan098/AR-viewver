import { motion } from 'framer-motion';
import { Box, Smartphone, Globe, Sparkles, Users, Zap, Eye, Target, Layers, ArrowRight, Github, Linkedin, Heart, Code, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from './components/Layout';

const About = () => {
    const features = [
        { icon: <Box className="w-6 h-6" />, title: "Interactive 3D", desc: "Full rotation, zoom, and pan controls for immersive exploration", color: "from-primary to-secondary" },
        { icon: <Smartphone className="w-6 h-6" />, title: "AR Experience", desc: "View models in your physical space with WebXR technology", color: "from-secondary to-primary-light" },
        { icon: <Globe className="w-6 h-6" />, title: "Cross-Platform", desc: "Works seamlessly on any modern browser and device", color: "from-primary-light to-primary" },
        { icon: <Zap className="w-6 h-6" />, title: "Fast Loading", desc: "Optimized GLB models for lightning-fast performance", color: "from-secondary to-primary" },
        { icon: <Users className="w-6 h-6" />, title: "Educational", desc: "Curated content designed for effective learning", color: "from-primary to-primary-light" },
        { icon: <Target className="w-6 h-6" />, title: "Accurate Models", desc: "High-fidelity 3D assets with realistic textures", color: "from-primary-light to-secondary" },
    ];

    const techStack = [
        { name: "React", desc: "Frontend Framework" },
        { name: "Three.js", desc: "3D Rendering" },
        { name: "Model Viewer", desc: "AR/3D Component" },
        { name: "Node.js", desc: "Backend Runtime" },
        { name: "MongoDB", desc: "Database" },
        { name: "Express", desc: "API Framework" },
    ];

    return (
        <Layout>
            {/* Hero */}
            <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
                <div className="absolute top-20 right-1/4 w-[600px] h-[600px] bg-secondary/15 rounded-full blur-[180px] animate-breathe" />
                <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />

                <div className="max-w-4xl mx-auto text-center relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            className="inline-flex items-center px-5 py-2.5 rounded-full bg-primary/20 border border-primary/30 text-sm text-primary-light font-medium mb-8 backdrop-blur-sm"
                        >
                            <Eye className="w-4 h-4 mr-2" />
                            About AR Edu Viewer
                        </motion.div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
                            The Future of{' '}
                            <span className="bg-gradient-to-r from-primary-light via-secondary to-primary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                                Educational
                            </span>
                            <br />Content is Here
                        </h1>

                        <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed">
                            We're transforming how people learn by bringing 3D models and augmented reality
                            into everyday education. Explore, interact, and understand complex concepts visually.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/explore"
                                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-2xl hover:shadow-primary/40 transition-all hover:scale-105"
                            >
                                <Rocket className="mr-2 w-5 h-5" />
                                Start Exploring
                            </Link>
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-primary/50 text-white font-semibold hover:bg-primary/10 transition-all"
                            >
                                <Github className="mr-2 w-5 h-5" />
                                View on GitHub
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
                <div className="absolute inset-0 bg-[var(--bg-card)]/50" />

                <div className="max-w-7xl mx-auto relative">
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center px-4 py-2 rounded-full bg-secondary/20 border border-secondary/30 text-sm text-secondary font-medium mb-4"
                        >
                            <Sparkles className="w-4 h-4 mr-2" />
                            Platform Features
                        </motion.div>
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
                            Why Choose <span className="text-primary-light">AR Edu?</span>
                        </h2>
                        <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
                            Built with cutting-edge technology for the best learning experience
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-primary/50 transition-all group cursor-pointer shadow-lg hover:shadow-xl hover:shadow-primary/10"
                            >
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-lg`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-primary-light transition-colors">{feature.title}</h3>
                                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section className="py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-sm text-primary-light font-medium mb-4">
                            <Code className="w-4 h-4 mr-2" />
                            Technology
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
                            Built With <span className="text-secondary">Modern Stack</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {techStack.map((tech, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-center hover:border-primary/50 transition-all group"
                            >
                                <h4 className="font-bold text-white group-hover:text-primary-light transition-colors">{tech.name}</h4>
                                <p className="text-xs text-[var(--text-muted)]">{tech.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

                <div className="max-w-4xl mx-auto relative">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary/20 border border-secondary/30 text-sm text-secondary font-medium mb-4">
                            <Layers className="w-4 h-4 mr-2" />
                            Getting Started
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
                            How It <span className="text-primary-light">Works</span>
                        </h2>
                    </div>

                    <div className="space-y-6">
                        {[
                            { step: 1, title: "Browse Content", desc: "Explore our curated library of educational 3D models across various categories including Science, History, Art, and Technology.", icon: <Globe className="w-6 h-6" /> },
                            { step: 2, title: "View in 3D", desc: "Interact with models using intuitive touch or mouse controls. Rotate, zoom, and examine every detail of each model.", icon: <Box className="w-6 h-6" /> },
                            { step: 3, title: "Experience AR", desc: "On compatible devices, tap 'View in AR' to place the 3D model in your physical environment using augmented reality.", icon: <Smartphone className="w-6 h-6" /> }
                        ].map((item, index) => (
                            <motion.div
                                key={item.step}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                className="flex items-start gap-6 p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-primary/40 transition-all group"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                                    <span className="text-2xl font-bold">{item.step}</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-primary-light">{item.icon}</span>
                                        <h3 className="text-xl font-bold text-white">{item.title}</h3>
                                    </div>
                                    <p className="text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
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
                        className="p-12 sm:p-16 rounded-3xl bg-gradient-to-br from-primary/20 via-[var(--bg-card)] to-secondary/20 border border-primary/30 text-center relative overflow-hidden"
                    >
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/20 rounded-full blur-3xl" />

                        <div className="relative">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary mb-6">
                                <Heart className="w-8 h-8 text-white" />
                            </div>

                            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">Ready to Start Learning?</h2>
                            <p className="text-[var(--text-secondary)] mb-8 max-w-lg mx-auto text-lg">
                                Dive into our collection of interactive 3D educational content and transform the way you learn.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    to="/explore"
                                    className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-2xl hover:shadow-primary/40 transition-all hover:scale-105"
                                >
                                    Explore All Content
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
};

export default About;
