function renderHeader(qrUrl){

// WATERMARK
doc.addImage(watermark, "PNG", 35, 80, 140, 140);

// LOGO
doc.addImage(logo, "PNG", 15, 10, 20, 20);

// TITLE HEADER
doc.setFont("helvetica", "bold");
doc.setFontSize(13);
doc.text("ELHAKIM TRAVEL UMROH HAJI", 40, 17);

doc.setFont("helvetica", "normal");
doc.setFontSize(8);
doc.text("Jl. Ki Mangun Sarkoro Tulungagung", 40, 22);

// GARIS
doc.line(15, 30, 195, 30);

// JUDUL
doc.setFontSize(12);
doc.setFont("helvetica", "bold");
doc.text("LAPORAN TABUNGAN UMROH", 105, 40, { align: "center" });

// QR (HANYA HALAMAN 1)
if(qrUrl){
doc.addImage(qrUrl, "PNG", 160, 35, 30, 30);
}

// DATA AKUN (HANYA HALAMAN 1)
if(qrUrl){

doc.setFont("helvetica", "normal");
doc.setFontSize(9);

doc.text(`Nama Jamaah : ${nama}`, 15, 55);
doc.text(`No VA        : ${va}`, 15, 61);
doc.text(`Catatan      : ${catatan}`, 15, 67);

doc.text(`Total Tabungan : ${saldo}`, 110, 55);
doc.text(`${targetText}`, 110, 61);
doc.text(`Progress : ${progressText}`, 110, 67);

doc.line(15, 73, 195, 73);

return 80; // start tabel halaman 1
}

// halaman 2 dst
return 45;
}
