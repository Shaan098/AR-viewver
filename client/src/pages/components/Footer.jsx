import { Link } from 'react-router-dom';
import { Box, Github, Linkedin, Send, Heart, Zap } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative border-t border-[var(--border-color)] bg-[var(--bg-card)]">
            {/* Gradient line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link to="/" className="flex items-center space-x-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                                <Box className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <span className="text-lg font-bold gradient-text">AR Edu</span>
                                <span className="text-[10px] text-[var(--text-muted)] ml-1">VIEWER</span>
                            </div>
                        </Link>
                        <p className="text-[var(--text-muted)] text-sm mb-6 max-w-sm leading-relaxed">
                            Experience the future of education with immersive 3D models and augmented reality technology.
                        </p>

                        {/* Newsletter */}
                        <div className="flex max-w-sm">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 rounded-l-xl bg-[var(--bg-elevated)] border border-[var(--border-color)] border-r-0 text-sm focus:outline-none focus:border-primary"
                            />
                            <button className="px-4 rounded-r-xl bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 transition-opacity">
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-semibold mb-6 flex items-center">
                            <Zap className="w-4 h-4 mr-2 text-primary" />
                            Quick Links
                        </h4>
                        <ul className="space-y-3 text-sm">
                            {[
                                { to: '/', label: 'Home' },
                                { to: '/explore', label: 'Explore Models' },
                                { to: '/about', label: 'About Us' },
                            ].map((link) => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="text-[var(--text-muted)] hover:text-primary transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="font-semibold mb-6">Categories</h4>
                        <ul className="space-y-3 text-sm">
                            {['History', 'Space', 'Art', 'Technology', 'Food'].map((cat) => (
                                <li key={cat}>
                                    <Link
                                        to={`/explore?category=${cat}`}
                                        className="text-[var(--text-muted)] hover:text-primary transition-colors"
                                    >
                                        {cat}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-16 pt-8 border-t border-[var(--border-color)] flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-[var(--text-muted)] text-sm">
                        © {currentYear} AR Edu Viewer. All rights reserved.
                    </p>

                    <div className="flex items-center space-x-4">
                        <a
                            href="https://github.com/Shaan098"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-[var(--text-muted)] hover:text-primary hover:border-primary/30 transition-colors"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/shaan-saurav/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-[var(--text-muted)] hover:text-primary hover:border-primary/30 transition-colors"
                        >
                            <Linkedin className="w-5 h-5" />
                        </a>
                    </div>

                    <p className="text-[var(--text-muted)] text-sm flex items-center">
                        Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> for learning
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
