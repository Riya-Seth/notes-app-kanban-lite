// ✅ src/utils/exportPDF.js
import html2pdf from "html2pdf.js";

export const exportNoteToPDF = (note) => {
  const content = `
    <div style="font-family: 'Poppins', sans-serif; padding: 20px; line-height: 1.6;">
      <h1 style="text-align:center;">${note.title}</h1>
      <hr/>
      <p>${note.content}</p>
      <p><strong>Tag:</strong> ${note.tag || "General"}</p>
      <p><strong>Status:</strong> ${note.status}</p>
      <p style="text-align:right; margin-top:30px; font-size: 0.9rem;">Exported from Notes App</p>
    </div>
  `;

  const options = {
    margin: 10,
    filename: `${note.title || "note"}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  html2pdf().set(options).from(content).save();
};
