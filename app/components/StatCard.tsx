import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    description?: string;
    trend?: {
        value: number;
        label: string;
        isPositive: boolean;
    };
    variant?: 'blue' | 'purple' | 'emerald' | 'orange';
}

export default function StatCard({
    title,
    value,
    icon: Icon,
    description,
    trend,
    variant = 'blue'
}: StatCardProps) {
    const variants = {
        blue: 'bg-blue-50 text-blue-600',
        purple: 'bg-purple-50 text-purple-600',
        emerald: 'bg-emerald-50 text-emerald-600',
        orange: 'bg-orange-50 text-orange-600',
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${variants[variant]}`}>
                    <Icon size={24} />
                </div>
                {trend && (
                    <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${trend.isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                        }`}>
                        {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
                    </div>
                )}
            </div>

            <div>
                <h3 className="text-gray-500 font-medium text-sm mb-1">{title}</h3>
                <div className="text-2xl font-black text-gray-900 tracking-tight">
                    {value}
                </div>
                {description && (
                    <p className="text-gray-400 text-xs mt-2 leading-relaxed">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
}
