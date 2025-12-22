import { createContext, useContext, useState, useEffect } from 'react';

const LikesContext = createContext();

export const useLikes = () => {
    const context = useContext(LikesContext);
    if (!context) {
        throw new Error('useLikes must be used within a LikesProvider');
    }
    return context;
};

export const LikesProvider = ({ children }) => {
    const [likedItems, setLikedItems] = useState(() => {
        // Load from localStorage on initial render
        const saved = localStorage.getItem('likedItems');
        return saved ? JSON.parse(saved) : [];
    });

    // Save to localStorage whenever likedItems changes
    useEffect(() => {
        localStorage.setItem('likedItems', JSON.stringify(likedItems));
    }, [likedItems]);

    const toggleLike = (item) => {
        setLikedItems(prev => {
            const isLiked = prev.some(liked => liked._id === item._id);
            if (isLiked) {
                return prev.filter(liked => liked._id !== item._id);
            } else {
                return [...prev, item];
            }
        });
    };

    const isLiked = (itemId) => {
        return likedItems.some(item => item._id === itemId);
    };

    const removeLike = (itemId) => {
        setLikedItems(prev => prev.filter(item => item._id !== itemId));
    };

    const clearAllLikes = () => {
        setLikedItems([]);
    };

    const getLikedCount = () => {
        return likedItems.length;
    };

    return (
        <LikesContext.Provider value={{
            likedItems,
            toggleLike,
            isLiked,
            removeLike,
            clearAllLikes,
            getLikedCount
        }}>
            {children}
        </LikesContext.Provider>
    );
};

export default LikesContext;
