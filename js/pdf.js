function downloadPDF() {

const { jsPDF } = window.jspdf;
const doc = new jsPDF();

// ambil data
let nama = document.getElementById("nama").innerText;
let saldo = document.getElementById("saldo").innerText;

// test basic
doc.text("LAPORAN TABUNGAN UMROH", 20, 20);
doc.text("Nama: " + nama, 20, 30);
doc.text("Saldo: " + saldo, 20, 40);

// SAVE
doc.save("test.pdf");

}
