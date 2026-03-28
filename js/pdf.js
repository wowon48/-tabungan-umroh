function downloadPDF(){

  if(!window.jspdf){
    alert("Library jsPDF belum dimuat!");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  let nama = document.getElementById("nama").innerText;
  let saldo = document.getElementById("saldo").innerText;

  doc.setFontSize(14);
  doc.text("TABUNGAN UMROH ELHAKIM", 20, 20);

  doc.setFontSize(11);
  doc.text("Nama : " + nama, 20, 40);
  doc.text("Total Tabungan : " + saldo, 20, 50);

  doc.save("tabungan_umroh.pdf");
}
