import { Search } from "lucide-react";
import BaseCard from "../../components/cards/BaseCard";

export default function Proyectos(){
    return(
        <div className="container-fluid p-0">
            <div className="row">
                <div className="col-12 d-flex justify-content-between">
                    <div className="input-group flex-grow-1 shadow-sm" style={{ maxWidth: '1000px', height: '50px' }}>
                        <span className="input-group-text bg-white border-end-0 text-muted px-3">
                            <Search size={18} />
                        </span>
                        <input 
                            type="search" 
                            className="form-control border-start-0 ps-0" 
                            placeholder="Buscar por nombre o correo..." 
                        />
                    </div>
                    <button className="btn btn-primary text-nowrap"> + Nuevo Proyecto</button>
                </div>
                <div className="row mt-5 d-flex justify-content-between">
                    <div className="col-6 mb-5" style={{width: '990px'}}>
                        <BaseCard>
                            <div className="d-flex px-4 pt-5 row">   
                                <div className="col-12 mb-2 d-flex justify-content-between">
                                    <p className="h4 fw-bold">[Titulo]</p>
                                    <p className="h4 fw-bold">...</p>
                                </div>
                                <div className="col-12 mb-2">
                                    <p className="h5">[Texto]</p>
                                </div>
                                <div className="col-12 d-flex mb-2">
                                    <p className="h5 fw-bold">Dr. Roberto Hernández</p>
                                    <p className="px-5 py">[Fecha]</p>
                                </div>
                                <div className="mb-5">
                                    <div className="d-flex justify-content-between">
                                        <p className="h5 fw-normal">[Tittle]</p>
                                        {10 >= 80 ? (
                                            <p className="text-success rounded-4 px-4 py-1 h5" style={{backgroundColor: '#c7f7e0'}}>10%</p>
                                        ):(
                                            <p className="text-primary rounded-4 px-4 py-1 h5" style={{backgroundColor: '#c1e6f7'}}>10%</p>
                                        )}
                                    </div>
                                    <div>
                                        <div className="progress" style={{ height: '13px' }}>
                                            <div 
                                            className="progress-bar" 
                                            style={{ width: `10%` }} 
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 gap-3 mb-3 d-flex">
                                    <div className="container text-center rounded-4 p-3" style={{backgroundColor: '#f9fafb'}}>
                                        <p className="h2 fw-bold">18/24</p>
                                        <p>Tareas</p>
                                    </div>
                                    <div className="container text-center rounded-4 p-3" style={{backgroundColor: '#f9fafb'}}>
                                        <p>[Numero_Horas]</p>
                                        <p>Horas totales</p>
                                    </div>
                                    <div className="container text-center rounded-4 p-3" style={{backgroundColor: '#f9fafb'}}>
                                        <p>[Numero_Estudiantes]</p>
                                        <p>Estudiantes</p>
                                    </div>
                                </div>
                                <div className="col-12 text-end">
                                    <p>[Estado]</p>
                                </div>
                            </div>
                        </BaseCard>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}