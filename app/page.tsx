import About from './_components/About';
import Features from './_components/Features';
import Footer from './_components/Footer';
import Hero from './_components/Hero';
import Navbar from './_components/Navbar';
import Product from './_components/Product';

export default function App() {
    return (
        <div>
            <Navbar />
            <Hero />
            <Product />
            <About />
            <Features />
            <Footer />
        </div>
    );
}
