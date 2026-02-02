import { Suspense } from 'react';
import Footer from './components/Footer';
import HomeSearchInput from './components/HomeSearchInput';
import Navbar from './components/Navbar';
import HomeLoading from './components/HomeLoading';
import HomeContent from './components/HomeContent';

export default function Home() {
  return (
    <div className="min-h-screen bg-white selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      <section className="relative pt-20 pb-24 md:pt-32 md:pb-40 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-blue-50/50 rounded-full -mr-64 -mt-64 blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 bg-blue-50 text-blue-600 px-5 py-2 rounded-full mb-8">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Platform Excellence 2026</span>
            </div>

            <h1 className="text-6xl sm:text-8xl font-black text-gray-900 tracking-tighter leading-[0.9] mb-8">
              Master any skill with <br />
              <span className="text-blue-600">Expert Tutors.</span>
            </h1>

            <p className="text-xl text-gray-500 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
              Connect with professional mentors for personalized 1-on-1 sessions. Streamlined booking, verified experts, and real progress.
            </p>

            <HomeSearchInput />
          </div>
        </div>
      </section>

      <Suspense fallback={<HomeLoading />}>
        <HomeContent />
      </Suspense>

      <Footer />
    </div>
  );
}
