export default function BaseCard({ children, title, footer, className = "" }) {
  return (
    <div className={`card border-0 shadow h-100 ${className}`}>
      
      {title && (
        <div className="card-header bg-white border-bottom-0 pt-3 pb-0">
          <h5 className="card-title mb-0 fw-bold text-dark">{title}</h5>
        </div>
      )}

      <div className="card-body">
        {children}
      </div>

      {footer && (
        <div className="card-footer bg-white border-top-0 pb-3 pt-0">
          {footer}
        </div>
      )}
    </div>
  );
}