import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // ✅ Import correctly
import logo from "../img/logoroom.png";

const downloadComplaintProof = (complaint) => {
  const doc = new jsPDF();

  // ✅ Set Background Color (Light Blue)
  doc.setFillColor("white"); // Light Blue
  doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, "F");

  // ✅ Add Logo (Top Left)
  const img = new Image();
  img.src = logo;
  img.onload = function () {
    doc.addImage(img, "PNG", 10, 10, 40, 20); // Logo at original position

    // 🏢 Rental Company Name
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Dekho Rentals - Complaint Proof", 60, 20);

    // 📜 Company Details
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text(" Dekho Rentals, Near Ashiana PG, Law Gate, LPU, Phagwara, Punjab,INDIA", 60, 27);
    doc.text("Contact: +91 9876543210 | Email: dekhorentals@gmail.com", 60, 32);
    doc.text("Website: dekhorentals.com", 60, 37);

    // 📌 Complaint Details in Table
    autoTable(doc, {  // ✅ Use autoTable function correctly
      startY: 50,
      head: [["Field", "Details"]], // Table Header
      body: [
        ["Complaint ID", complaint.id],
        ["PG Name", complaint.RoomsAvailable?.PG?.name || "N/A"],
        ["Room No", complaint.RoomsAvailable?.roomNumber || "N/A"],
        ["Complaint Type", complaint.complaintType],
        ["Status", complaint.status?.toUpperCase() || "PENDING"],
        ["Filed On", new Date().toLocaleString()],
      ],
      theme: "grid",
      headStyles: { fillColor: [100, 150, 255] }, // Blue header
      alternateRowStyles: { fillColor: [230, 240, 255] }, // Light Blue alternate rows
    });

    // ✍️ Signature & Authorized Section
    let finalY = doc.lastAutoTable.finalY + 10;
    doc.text("Date: _______________", 20, finalY);
    doc.text("Authorized Signature: ___________________", 20, finalY + 15);
    doc.text("Company Stamp:", 150, finalY + 15);

    // 📝 Footer Section
    doc.setFontSize(10);
    doc.text(
      "This is a system-generated document and does not require a physical signature.",
      20,
      finalY + 30
    );
    doc.text("For any queries, contact our support team at dekhorentals@gmail.com", 20, finalY + 35);

    // 📂 Save the PDF
    doc.save(`Complaint_${complaint.id}.pdf`);
  };
};

export default downloadComplaintProof;
