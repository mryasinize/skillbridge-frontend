'use client';

import { createCategoryAction, deleteCategoryAction, updateCategoryAction } from '@/app/actions/admin';
import { AlertCircle, Check, Loader2, Pencil, Plus, Tag, Trash2, X } from 'lucide-react';
import React, { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { Category } from '../types/intex';

export default function CategoryManager({ initialCategories }: { initialCategories: Category[] }) {
    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [newName, setNewName] = useState('');
    const [editName, setEditName] = useState('');
    const [isPending, startTransition] = useTransition();

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newName.trim()) return;

        startTransition(async () => {
            const res = await createCategoryAction(newName);
            if (res.success) {
                setCategories([...categories, res.data]);
                setNewName('');
                setIsAdding(false);
                toast.success('Category created successfully');
            } else {
                toast.error(res.error || 'Failed to create category');
            }
        });
    };

    const handleUpdate = async (id: string) => {
        if (!editName.trim()) return;

        startTransition(async () => {
            const res = await updateCategoryAction(id, editName);
            if (res.success) {
                setCategories(categories.map(c => c.id === id ? res.data : c));
                setEditingId(null);
                toast.success('Category updated successfully');
            } else {
                toast.error(res.error || 'Failed to update category');
            }
        });
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this category? Tutors and bookings in this category will show as "Category removed".')) return;

        startTransition(async () => {
            const res = await deleteCategoryAction(id);
            if (res.success) {
                setCategories(categories.filter(c => c.id !== id));
                toast.success('Category deleted successfully');
            } else {
                toast.error(res.error || 'Failed to delete category');
            }
        });
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Manage Categories</h1>
                    <p className="text-gray-500 mt-1 font-medium">Create and organize subjects for the platform.</p>
                </div>
                <button
                    onClick={() => setIsAdding(true)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-sm shadow-blue-200"
                >
                    <Plus size={20} />
                    Add Category
                </button>
            </div>

            {isAdding && (
                <div className="bg-white border-2 border-blue-100 rounded-[2rem] p-8 shadow-xl shadow-blue-50/50 animate-in slide-in-from-top-4 duration-300">
                    <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                autoFocus
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                placeholder="Enter category name (e.g. Mathematics, Programming)"
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-gray-900"
                            />
                        </div>
                        <div className="flex gap-3">
                            <button
                                type="submit"
                                disabled={isPending || !newName.trim()}
                                className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-8 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-100"
                            >
                                {isPending ? <Loader2 className="animate-spin" size={20} /> : <Check size={20} />}
                                Save Category
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsAdding(false)}
                                className="p-4 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-2xl font-bold transition-all"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.length === 0 ? (
                    <div className="col-span-full py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center px-10">
                        <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-gray-300 shadow-sm mb-6">
                            <Tag size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No categories yet</h3>
                        <p className="text-gray-500 max-w-sm italic">Add your first category to start organizing tutors and subjects on the platform.</p>
                    </div>
                ) : (
                    categories.map((category) => (
                        <div key={category.id} className="group bg-white border border-gray-100 rounded-3xl p-6 hover:border-blue-200 shadow-sm hover:shadow-xl transition-all duration-500 relative overflow-hidden">
                            <div className="flex items-center justify-between gap-4">
                                {editingId === category.id ? (
                                    <div className="flex-1 flex gap-2">
                                        <input
                                            autoFocus
                                            type="text"
                                            value={editName}
                                            onChange={(e) => setEditName(e.target.value)}
                                            className="flex-1 px-4 py-2 bg-blue-50 border-2 border-blue-200 rounded-xl outline-none font-bold text-gray-900"
                                        />
                                        <button
                                            onClick={() => handleUpdate(category.id)}
                                            disabled={isPending || !editName.trim()}
                                            className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50"
                                        >
                                            {isPending ? <Loader2 className="animate-spin" size={20} /> : <Check size={20} />}
                                        </button>
                                        <button
                                            onClick={() => setEditingId(null)}
                                            className="p-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-all"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                                                <Tag size={20} />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-black text-gray-900 group-hover:text-blue-600 transition-colors">{category.name}</h3>
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">ID: {category.id.slice(0, 8)}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                            <button
                                                onClick={() => {
                                                    setEditingId(category.id);
                                                    setEditName(category.name);
                                                }}
                                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                            >
                                                <Pencil size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(category.id)}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                        </div>
                    ))
                )}
            </div>

            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100 flex items-start gap-4">
                <AlertCircle className="text-amber-500 mt-1 shrink-0" size={20} />
                <div>
                    <h4 className="font-bold text-amber-900">Important Note on Deletion</h4>
                    <p className="text-sm text-amber-800/80 leading-relaxed font-medium">Deletions are final. If you delete a category, any active tutors or bookings associated with it will exhibit a "Category removed" label in the platform. We recommend renaming categories instead of deleting them if they are in active use.</p>
                </div>
            </div>
        </div>
    );
}
