import { getUserAction } from "../actions/auth";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
export default async function TutorsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getUserAction();
    return (
        <div>
            <Navbar user={user} />
            {children}
            <Footer />
        </div>
    );
}