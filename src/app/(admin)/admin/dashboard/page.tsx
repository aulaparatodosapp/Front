//icons
import { Users, BookOpen, ClipboardList, HeartHandshake } from "lucide-react";

const Dashboard = () => {
  return (
    
        <div className="p-6">

            <h1 className="text-3xl text-gray-800 font-bold mb-2">Panel principal</h1>
            <h2 className="text-lg font-medium text-gray-500 mb-6">Resumen general de Aula para Todos</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-3 justify-items-start">
                <div className="bg-white rounded-md p-6 border-blue-200 shadow-md flex items-center gap-4 w-full max-w-sm">
                    <Users/>
                    <div className="flex flex-col gap-2 items-center">
                    <h3 className="text-sm font-semibold text-blue-400">Alumnos</h3>
                    <p className="text-3xl font-semibold text-blue-800">120</p>
                    </div>
                </div>
                <div className="bg-white rounded-md p-6 border-blue-200 shadow-md flex items-center gap-4 w-full max-w-sm">
                    <BookOpen/>
                    <div className="flex flex-col gap-2 items-center">
                    <h3 className="text-sm font-semibold text-blue-400">Cursos</h3>
                    <p className="text-3xl font-semibold text-blue-800">10</p>
                    </div>
                </div>
                <div className="bg-white rounded-md p-6 border-blue-200 shadow-md flex items-center gap-4 w-full max-w-sm">
                    <ClipboardList/>
                    <div className="flex flex-col gap-2 items-center">
                    <h3 className="text-sm font-semibold text-blue-400">Inscripciones</h3>
                    <p className="text-3xl font-semibold text-blue-800">50</p>
                    </div>
                </div>
                <div className="bg-white rounded-md p-6 border-blue-200 shadow-md flex items-center gap-4 w-full max-w-sm">
                    <HeartHandshake/>
                    <div className="flex flex-col gap-2 items-center">
                    <h3 className="text-sm font-semibold text-blue-400">Donaciones</h3>
                    <p className="text-3xl font-semibold text-blue-800">35</p>
                    </div>
                </div>
                
            </div>

        </div>
        
    
  );
};

export default Dashboard;