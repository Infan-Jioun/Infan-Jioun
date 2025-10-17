import React from 'react';

const ScrollToTopButton = ({ showScroll, onScrollToTop }) => {
    if (!showScroll) return null;

    return (
        <button
            onClick={onScrollToTop}
            className="fixed bottom-6 right-6 p-3 w-12 h-12 font-bold z-50 rounded-full bg-white text-purple-700 hover:text-white shadow-xl hover:bg-transparent hover:backdrop-blur-3xl transition-all duration-300 animate-bounce flex items-center justify-center"
            title="Back to top"
            aria-label="Scroll to top"
        >
            ↑
        </button>
    );
};

export default ScrollToTopButton;