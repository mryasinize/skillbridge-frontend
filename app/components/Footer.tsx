export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 py-12 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <span className="text-2xl font-bold text-blue-600">SkillBridge</span>
                        <p className="mt-4 text-gray-500 max-w-xs">
                            Connecting expert tutors with eager learners worldwide. Empowering the next generation of professionals.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Platform</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><a href="/tutors" className="hover:text-blue-600">Browse Tutors</a></li>
                            <li><a href="/categories" className="hover:text-blue-600">All Categories</a></li>
                            <li><a href="/pricing" className="hover:text-blue-600">Pricing</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><a href="/about" className="hover:text-blue-600">About Us</a></li>
                            <li><a href="/contact" className="hover:text-blue-600">Contact</a></li>
                            <li><a href="/privacy" className="hover:text-blue-600">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-gray-100 text-center text-sm text-gray-400">
                    © {new Date().getFullYear()} SkillBridge. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
