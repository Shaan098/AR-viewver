import Navbar from './Navbar';
import Footer from './Footer';
import MouseFollower from './MouseFollower';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col">
            <MouseFollower />
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
