import { CircleAlert } from "lucide-react";
import BaseCard from "../../../../components/cards/BaseCard";


export default function ValidacionCard({ item }) {

    const name = item?.name || "Usuario desconocido";
    const title = item?.title || "Sin descripción";
    const type = item?.type || "Desconocido";
    const date = item?.date || "--/--/----";

    return (
        <BaseCard className="mb-4">
            <div className="row align-items-center">
                <div className="col-auto">
                    <CircleAlert color="#fd8d3f" size={28} />
                </div>
                <div className="col">
                    <p className="fw-bold mb-1">{name}</p>
                    <p className="text-muted mb-2 small">{title}</p>
                    <div className="d-flex justify-content-between text-secondary small">
                        <span className="fw-medium">{type}</span>
                        <span>{date}</span>
                    </div>
                </div>
            </div>
        </BaseCard>
    );
}