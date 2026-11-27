import { dashboardMock } from "../mocks/dashboardMock";
import Link from "next/link";
//icons
import { Users, BookOpen, ClipboardList, HeartHandshake } from "lucide-react";

const Dashboard = () => {

const ultimosAlumnos = [...dashboardMock.recentStudents].sort((a,b) =>{
        return new Date(b.fechaRegistro).getTime() - new Date(a.fechaRegistro).getTime();
    })
    .slice(0,2);

  return (
    
        <div className="p-6 bg-slate-100">

            <h1 className="text-3xl text-gray-800 font-bold mb-2">Panel principal</h1>
            <h2 className="text-lg font-medium text-gray-500 mb-6">Resumen general de Aula para Todos</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-3 justify-items-start">
                <div className="bg-white rounded-md p-6 border border-blue-200 shadow-md flex items-center gap-4 w-full max-w-sm">
                    <Users/>
                    <div className="flex flex-col gap-2 items-center">
                    <h3 className="text-sm font-semibold text-blue-400">Alumnos</h3>
                    <p className="text-3xl font-semibold text-blue-800">{dashboardMock.summary.students}</p>
                    </div>
                </div>
                <div className="bg-white rounded-md p-6 border border-blue-200 shadow-md flex items-center gap-4 w-full max-w-sm">
                    <BookOpen/>
                    <div className="flex flex-col gap-2 items-center">
                    <h3 className="text-sm font-semibold text-blue-400">Cursos</h3>
                    <p className="text-3xl font-semibold text-blue-800">{dashboardMock.summary.courses}</p>
                    </div>
                </div>
                <div className="bg-white rounded-md p-6 border border-blue-200 shadow-md flex items-center gap-4 w-full max-w-sm">
                    <ClipboardList/>
                    <div className="flex flex-col gap-2 items-center">
                    <h3 className="text-sm font-semibold text-blue-400">Inscripciones</h3>
                    <p className="text-3xl font-semibold text-blue-800">{dashboardMock.summary.enrollments}</p>
                    </div>
                </div>
                <div className="bg-white rounded-md p-6 border border-blue-200 shadow-md flex items-center gap-4 w-full max-w-sm">
                    <HeartHandshake/>
                    <div className="flex flex-col gap-2 items-center">
                    <h3 className="text-sm font-semibold text-blue-400">Donaciones</h3>
                    <p className="text-3xl font-semibold text-blue-800">{dashboardMock.summary.donations}</p>
                    </div>
                </div>
                
            </div>
                <section className="bg-white rounded-xl border border-blue-200 shadow-md p-6 mt-6">

                    <div className="flex items-center justify-between gap-6 mb-4">
                        <h2 className="text-xl font-bold text-gray-800">
                            Últimos alumnos registrados
                        </h2>

                        <Link href="/admin/students" className="text-sm text-blue-800 font-semibold">
                        Ver todos →
                        </Link>
                    </div>

                    <div>
                        {ultimosAlumnos.map((alumno) => (
                    <div
                        key={alumno.id}
                        className="flex items-center justify-between py-4 border-b border-gray-200 last:border-0">
      
                        <p className="font-semibold text-gray-800">
                        {alumno.nombre}
                        </p>

                        <p className="text-sm text-gray-500">
                        {alumno.fechaRegistro}
                        </p>
                    </div>
                    ))}
                    </div>

                </section>

        </div>
        
    
  );
};

export default Dashboard;