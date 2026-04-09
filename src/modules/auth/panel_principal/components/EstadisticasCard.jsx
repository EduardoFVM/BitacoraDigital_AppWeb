import { Users, FolderKanban, ClipboardCheck, ImageOff, Clock, CircleCheckBig, CircleX } from "lucide-react";
import BaseCard from "../../../../components/cards/BaseCard";

const IconMap = {
    "users": Users,
    "projects": FolderKanban,
    "tasks": ClipboardCheck,
    "default": ImageOff,
    "clock": Clock,
    "circle-check": CircleCheckBig,
    "circle-x": CircleX,
};

export default function EstadisticasCard({ item }) {
    if (!item) return null;

    const title = item.title || "Sin Título";
    const value = item.value || 0;
    const color = item.color || "bg-secondary";
    
    let IconComponent = ImageOff; 

    if (item.iconId && IconMap[item.iconId]) {
        IconComponent = IconMap[item.iconId];
    } 
    else if (item.icon) {
        IconComponent = item.icon; 
    }

    return (
        <div className="col-12 col-sm-12 col-xl-4">
            <BaseCard>
                <div className="p-4 d-flex justify-content-between align-items-start">
                    <div>
                        <p className="text-muted fw-bold h5 mb-1">{title}</p>
                        <h3 className="h2 fw-bold mb-2">{value}</h3>
                    </div>
                    <div className={`${color} text-white p-3 rounded-3 shadow-sm`}>
                        <IconComponent size={40} />
                    </div>
                </div>
            </BaseCard>
        </div>
    );
}