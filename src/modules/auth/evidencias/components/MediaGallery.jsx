import { PhotoProvider, PhotoView } from "react-photo-view";

export default function MediaGallery({ files }) {
   const getPreviewUrl = (url) => {
      if(url.endsWith('.pdf')) {
         return url.replace('.pdf', '.jpg');
      }
      return url;
   }

   return (
      <PhotoProvider
        toolbarRender={({index}) => {
          const currentUrl = files[index].url;
          return currentUrl.endsWith('.pdf') ? (
            <a href={currentUrl} target="_blank" rel="noreferrer" style={{color: 'white', marginLeft: '20px'}}>
              Abrir PDF
            </a>
          ) : null;
        }}  
      >
         <div className="d-flex gap-2 overflow-x-auto mt-3 mb-3">
        {files.map((file, index) => (
          <PhotoView key={index} src={getPreviewUrl(file.url)}>
            <div style={{ cursor: 'pointer', position: 'relative' }}>
              <img 
                src={getPreviewUrl(file.url)} 
                alt={`Media ${index}`} 
                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} 
              />
              
              {/* Indicador visual si es un PDF */}
              {file.url.endsWith('.pdf') && (
                <span className="position-absolute rounded-1 px-2 py-1" style={{
                  bottom: 5, right: 5, background: 'red',
                  color: 'white', fontSize: '10px'
                }}>
                  PDF
                </span>
              )}
            </div>
          </PhotoView>
        ))}
      </div>
      </PhotoProvider>
   )
}