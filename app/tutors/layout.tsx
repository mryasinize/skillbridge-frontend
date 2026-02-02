import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
export default async function TutorsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}