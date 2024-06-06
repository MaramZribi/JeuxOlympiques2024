import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import index from './IndexPage';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (

        <header className=" bg-sky-950 md:w-auto w-full  left-0 text-white">
            <nav className="container mx-auto px-6 py-3 flex items-center justify-between">
                {/* Logo link visibility controlled by dropdown state */}
                <Link to={"/"} className={`font-semibold text-lg ${isOpen ? 'hidden' : 'block'}`}>Jeux olympiques paris 2024</Link>

                {/* Toggle button visible only on small devices */}
                <button onClick={() => setIsOpen(!isOpen)} className="text-white md:hidden ml-auto">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-16 6h16" />
                    </svg>
                </button>

                {/* Menu items */}
                <ul className={` ${isOpen ? 'flex flex-col md:flex-row md:items-center md:space-x-4 absolute md:relative top-12 left-0 w-full md:w-auto bg-sky-950 md:bg-transparent block' : 'flex-col md:flex-row md:items-center md:space-x-4 absolute md:relative top-full left-0 w-full md:w-auto bg-sky-950 md:bg-transparent md:flex hidden'}`}>
                    <li><Link to="/sites" className="hover:bg-zinc-400 px-3 py-2 rounded block text-center">Sites</Link></li>
                    <li><Link to="/sports" className="hover:bg-zinc-400 px-3 py-2 rounded block text-center">Sports</Link></li>

                    <li><Link to="/route-planner" className="hover:bg-zinc-400 px-3 py-2 rounded block text-center">Trajet</Link></li>
                    <li><Link to="/planning" className="hover:bg-zinc-400 px-3 py-2 rounded block text-center">Planning</Link></li>
                    <li><Link to="/about" className="hover:bg-zinc-400 px-3 py-2 rounded block text-center">A propos</Link></li>
       
                </ul>
            </nav>
        </header>





    );
}
