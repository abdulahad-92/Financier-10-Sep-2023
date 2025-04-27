import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import FilePdf from '../components/FilePdf';

export const generateAndSavePdf = async (data) => {
  try {
    if (!data || !data.fileName) {
      throw new Error('Invalid or missing file data');
    }
    const pdfDoc = <FilePdf data={data} />;
    const blob = await pdf(pdfDoc).toBlob();
    saveAs(blob, `${data.fileName || 'Financier_File'}.pdf`);
    return { success: true };
  } catch (error) {
    console.error('Error generating PDF:', error);
    return { success: false, error: error.message };
  }
};