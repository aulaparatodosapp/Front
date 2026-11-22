"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {

    const pathname = usePathname();

    return (
        <nav className="w-64 bg-slate-900 text-slate-200 flex flex-col gap-1 px-6 min-h-screen">
            <h2 className="text-xl font-bold text-white mt-4">Aula para Todos</h2>
            <p className="text-sm text-slate-300">Panel administrativo</p>
            <hr className="border-slate-600 my-5"/>
        
            <ul className="flex flex-col gap-3 mt-4">
                <li><Link href="/admin/dashboard" className={`block px-3 py-2 rounded-md transition-colors ${pathname === "/admin/dashboard" ? "bg-slate-600" : "hover:bg-slate-600"}`}>Dashboard</Link></li>    
                <li><Link href="/admin/students" className={`block px-3 py-2 rounded-md transition-colors ${pathname === "/admin/students" ? "bg-slate-600" : "hover:bg-slate-600"}`}>Alumnos</Link></li>    
                <li><Link href="/admin/courses" className={`block px-3 py-2 rounded-md transition-colors ${pathname === "/admin/courses" ? "bg-slate-600" : "hover:bg-slate-600"}`}>Cursos</Link></li>    
                <li><Link href="/admin/donations" className={`block px-3 py-2 rounded-md transition-colors ${pathname === "/admin/donations" ? "bg-slate-600" : "hover:bg-slate-600"}`}>Donaciones</Link></li>    
            </ul>
        </nav>
    )
}

export default Sidebar;