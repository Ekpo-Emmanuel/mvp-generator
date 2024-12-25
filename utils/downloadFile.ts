
export const downloadFile = (blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    
    anchor.href = url;
    anchor.download = filename;
    
    document.body.appendChild(anchor);
    anchor.click();
    
    window.URL.revokeObjectURL(url);
    document.body.removeChild(anchor);
};