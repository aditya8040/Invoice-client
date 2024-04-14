import React, { useRef } from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

// Register fonts
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const Invoicetest = () => {
  // Create a component reference
  const componentRef = useRef();

  // Define document content
  const documentDefinition = {
    content: [
      { text: 'INVOICE', alignment: 'center', fontSize: 20, bold: true },
      { text: 'biller name', fontSize: 16 },
      // Add more content as needed
    ]
  };

  // Generate PDF document
  const generatePDF = () => {
    const pdfDoc = pdfMake.createPdf(documentDefinition);
    pdfDoc.getDataUrl((dataUrl) => {
      const iframe = document.createElement('iframe');
      iframe.src = dataUrl;
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      iframe.contentWindow.print();
    });
  };

  return (
    <div ref={componentRef}>
      {/* Render your invoice content here */}
      {/* Make sure to use billerName, billerLocation, etc. */}
      {/* Example: */}
      <h1>{'biller name'}</h1>
      {/* Add more content as needed */}

      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
};

export default Invoicetest;
