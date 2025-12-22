import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Menu, X, Sparkles, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { useLikes } from '../../context/LikesContext';

const Navbar = () => {
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { getLikedCount } = useLikes();
    const likedCount = getLikedCount();

    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/explore', label: 'Explore' },
        { path: '/liked', label: 'Liked', showBadge: true },
        { path: '/about', label: 'About' },
    ];

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-50">
                {/* Gradient top line */}
                <div className="h-1 bg-gradient-to-r from-primary via-secondary to-primary-light" />

                <div className="bg-[var(--bg-card)] backdrop-blur-xl border-b border-[var(--border-color)] shadow-lg">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            {/* Logo */}
                            <Link to="/" className="flex items-center space-x-3 group">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity" />
                                    <div className="relative w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                                        <Box className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-lg font-bold text-white">AR Edu</span>
                                    <span className="text-[10px] text-primary-light font-semibold tracking-widest -mt-1">VIEWER</span>
                                </div>
                            </Link>

                            <div className="flex items-center space-x-6">
                                {/* Desktop Navigation */}
                                <div className="hidden md:flex items-center space-x-1">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.path}
                                            to={link.path}
                                            className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-2 ${isActive(link.path)
                                                ? 'text-white bg-primary/30 border border-primary/50'
                                                : 'text-[var(--text-secondary)] hover:text-white hover:bg-primary/10'
                                                }`}
                                        >
                                            {link.showBadge && <Heart className={`w-4 h-4 ${likedCount > 0 ? 'text-red-400 fill-red-400' : ''}`} />}
                                            {link.label}
                                            {link.showBadge && likedCount > 0 && (
                                                <span className="ml-1 px-1.5 py-0.5 text-xs font-bold bg-red-500 text-white rounded-full min-w-[20px] text-center">
                                                    {likedCount}
                                                </span>
                                            )}
                                            {isActive(link.path) && (
                                                <motion.div
                                                    layoutId="nav-pill"
                                                    className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-lg -z-10 border border-primary/30"
                                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                />
                                            )}
                                        </Link>
                                    ))}
                                </div>

                                {/* CTA Button */}
                                <Link
                                    to="/explore"
                                    className="hidden sm:flex items-center px-5 py-2.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold hover:shadow-xl hover:shadow-primary/40 transition-all hover:scale-105"
                                >
                                    <Sparkles className="w-4 h-4 mr-2" />
                                    Try AR
                                </Link>

                                <ThemeToggle />

                                {/* Mobile Menu Button */}
                                <button
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                    className="md:hidden p-2 rounded-lg hover:bg-primary/10 text-white transition-colors"
                                    aria-label="Toggle menu"
                                >
                                    {mobileMenuOpen ? (
                                        <X className="w-6 h-6" />
                                    ) : (
                                        <Menu className="w-6 h-6" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                            onClick={() => setMobileMenuOpen(false)}
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="fixed top-0 right-0 h-full w-72 bg-[var(--bg-card)] border-l border-[var(--border-color)] z-50 md:hidden"
                        >
                            {/* Gradient accent */}
                            <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-primary via-secondary to-accent" />

                            <div className="p-6 pt-24">
                                <nav className="space-y-2">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.path}
                                            to={link.path}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={`block px-4 py-3 rounded-xl font-medium transition-all ${isActive(link.path)
                                                ? 'bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/30'
                                                : 'text-[var(--text-secondary)] hover:bg-white/5'
                                                }`}
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </nav>

                                <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
                                    <p className="text-sm text-[var(--text-muted)] mb-3">Experience 3D models in AR</p>
                                    <Link
                                        to="/explore"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block w-full text-center px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-white text-sm font-medium"
                                    >
                                        Start Exploring
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
