import { GraduationCap } from 'lucide-react';
import Link from 'next/link';

interface LogoProps {
    size?: 'md' | 'lg';
}

export default function Logo({ size = 'md' }: LogoProps) {
    const sizes = {
        md: { icon: 24, iconContainer: 'w-10 h-10', text: 'text-xl' },
        lg: { icon: 28, iconContainer: 'w-12 h-12', text: 'text-2xl' },
    };

    const { icon, iconContainer, text } = sizes[size];

    return (
        <Link href="/" className="flex items-center gap-2 w-fit">
            <div className={`${iconContainer} bg-blue-600 rounded-xl flex items-center justify-center`}>
                <GraduationCap className="text-white" size={icon} />
            </div>
            <span className={`${text} font-black tracking-tight`}>
                <span className="text-gray-900">Skill</span>
                <span className="text-blue-600">Bridge</span>
            </span>
        </Link>
    );
}