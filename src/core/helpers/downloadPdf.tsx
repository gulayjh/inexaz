import axios from 'axios';

export const downloadPDF = async (url: string, filename?: string) => {
    try {
        const response = await axios.get(url, {
            responseType: 'blob', // Important
        });

        const blob = new Blob([response.data], {type: 'application/pdf'});
        const blobUrl = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename ? filename : 'file.pdf';

        document.body.appendChild(link);
        link.click();

        // Clean up
        window.URL.revokeObjectURL(blobUrl);
        document.body.removeChild(link);
    } catch (error) {
        console.error('Failed to download PDF:', error);
    }
};