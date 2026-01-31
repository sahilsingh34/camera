import React from 'react';

export default function Footer() {
    return (
        <footer className="py-24 w-full bg-black border-t border-white/5 flex flex-col items-center justify-center text-center">
            <h2 className="text-sm font-bold tracking-[0.3em] text-white/40 uppercase mb-8">VANTEXA</h2>
            <div className="flex gap-8 mb-8">
                <a href="#" className="text-[10px] uppercase tracking-widest text-gray-600 hover:text-white transition-colors">Privacy</a>
                <a href="#" className="text-[10px] uppercase tracking-widest text-gray-600 hover:text-white transition-colors">Legal</a>
                <a href="#" className="text-[10px] uppercase tracking-widest text-gray-600 hover:text-white transition-colors">Contact</a>
            </div>
            <p className="text-[10px] text-gray-800 tracking-widest">
                &copy; 2026 VANTEXA SYSTEMS. ALL RIGHTS RESERVED.
            </p>
        </footer>
    );
}
