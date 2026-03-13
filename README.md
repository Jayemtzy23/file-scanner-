# Government Document Scanner System

A web-based document scanner management system for government offices to digitize paper documents into PDF format.

## Features

- 📷 Scan/upload multiple images from paper documents
- 📄 Convert images to PDF format
- 🗂️ Organize documents by categories (Legal, Financial, Personnel, etc.)
- 🔍 Search and filter documents
- 💾 Local storage for document management
- 📥 Download generated PDFs
- 🗑️ Delete documents

## How to Use

1. Open `index.html` in a web browser
2. Click the upload area or drag images to scan documents
3. Enter document title and select category
4. Add reference number (optional)
5. Click "Generate PDF" to create the PDF file
6. View, download, or delete documents from the list below

## Categories

- Legal Documents
- Financial Records
- Personnel Files
- Correspondence
- Reports
- Other

## Technical Details

- Pure HTML, CSS, and JavaScript
- Uses jsPDF library for PDF generation
- LocalStorage for data persistence
- Responsive design for mobile and desktop

## Browser Requirements

- Modern web browser (Chrome, Firefox, Edge, Safari)
- JavaScript enabled
- LocalStorage enabled

## Notes

- Documents are stored in browser's LocalStorage
- For production use, implement server-side storage
- Add authentication and access control for security
- Consider adding OCR for searchable PDFs
