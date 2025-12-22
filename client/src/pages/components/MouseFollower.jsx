import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MouseFollower = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [trailPositions, setTrailPositions] = useState([]);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });

            // Add trail effect
            setTrailPositions(prev => {
                const newPos = [...prev, { x: e.clientX, y: e.clientY, id: Date.now() }];
                return newPos.slice(-8); // Keep last 8 positions
            });
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        const handleMouseOver = (e) => {
            if (e.target.closest('a, button, [role="button"], .interactive')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    // Clean up old trail positions
    useEffect(() => {
        const interval = setInterval(() => {
            setTrailPositions(prev => prev.filter(p => Date.now() - p.id < 200));
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {/* Glow effect */}
            <motion.div
                className="pointer-events-none fixed z-[9998] mix-blend-screen"
                animate={{
                    x: mousePosition.x - 150,
                    y: mousePosition.y - 150,
                    scale: isHovering ? 1.5 : 1,
                    opacity: 0.6
                }}
                transition={{ type: "spring", damping: 30, stiffness: 200 }}
                style={{
                    width: 300,
                    height: 300,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)'
                }}
            />

            {/* Main cursor */}
            <motion.div
                className="pointer-events-none fixed z-[9999] rounded-full border-2 border-primary"
                animate={{
                    x: mousePosition.x - (isHovering ? 24 : 16),
                    y: mousePosition.y - (isHovering ? 24 : 16),
                    width: isHovering ? 48 : 32,
                    height: isHovering ? 48 : 32,
                    scale: isClicking ? 0.8 : 1,
                    borderColor: isHovering ? '#8b5cf6' : '#06b6d4'
                }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
            />

            {/* Center dot */}
            <motion.div
                className="pointer-events-none fixed z-[9999] rounded-full bg-primary"
                animate={{
                    x: mousePosition.x - 4,
                    y: mousePosition.y - 4,
                    scale: isClicking ? 1.5 : 1,
                    backgroundColor: isHovering ? '#8b5cf6' : '#06b6d4'
                }}
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                style={{ width: 8, height: 8 }}
            />

            {/* Trail effect */}
            <AnimatePresence>
                {trailPositions.map((pos, i) => (
                    <motion.div
                        key={pos.id}
                        className="pointer-events-none fixed z-[9997] rounded-full bg-primary/30"
                        initial={{ opacity: 0.5, scale: 1 }}
                        animate={{ opacity: 0, scale: 0.5 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            left: pos.x - 3,
                            top: pos.y - 3,
                            width: 6,
                            height: 6
                        }}
                    />
                ))}
            </AnimatePresence>
        </>
    );
};

export default MouseFollower;
