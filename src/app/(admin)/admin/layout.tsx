import Sidebar from "@/components/admin/Sidebar";

const AdminLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="flex min-h-screen">
        <Sidebar/>
        <main className="flex-1 bg-slate-100">
        {children}
        </main>
        </div>
    )
}

export default AdminLayout;