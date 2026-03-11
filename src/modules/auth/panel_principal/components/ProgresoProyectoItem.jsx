export default function ProyectoAvanceItem({ item }) {

    const title = item?.title || "Proyecto sin nombre";
    const progress = item?.progress || 0;

    const isHighProgress = progress >= 80;
    const badgeColorClass = isHighProgress ? "text-success" : "text-primary";
    const badgeBgColor = isHighProgress ? "#c7f7e0" : "#c1e6f7";

    return (
        <div className="mb-5">
            <div className="d-flex justify-content-between mb-2">
                <p className="h5 fw-normal mb-0">{title}</p>
                <p 
                    className={`${badgeColorClass} rounded-4 px-4 py-1 h5 mb-0`} 
                    style={{ backgroundColor: badgeBgColor }}
                >
                    {progress}%
                </p>
            </div>
            <div>
                <div className="progress" style={{ height: '13px' }}>
                    <div 
                        className="progress-bar" 
                        role="progressbar"
                        style={{ width: `${progress}%` }} 
                        aria-valuenow={progress} 
                        aria-valuemin="0" 
                        aria-valuemax="100"
                    />
                </div>
            </div>
        </div>
    );
}