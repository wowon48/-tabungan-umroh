function downloadPDF(){

const { jsPDF } = window.jspdf;

let doc = new jsPDF();

doc.text("TABUNGAN UMROH",20,20);

doc.text(
"Nama : "+document.getElementById("nama").innerText,
20,40
);

doc.text(
"Total Tabungan : "+
document.getElementById("saldo").innerText,
20,50
);

doc.save("tabungan_umroh.pdf");

}