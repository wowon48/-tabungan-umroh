.then(data => {

if(data.status != "success"){
  alert("Login gagal");
  return;
}

// =====================
// DATA UTAMA
// =====================
document.getElementById("nama").innerText = data.nama_kepala;
document.getElementById("va").innerText = data.no_va;
document.getElementById("catatan").innerText = data.catatan;

document.getElementById("saldo").innerText =
"Rp " + data.total_tabungan.toLocaleString("id-ID");

// =====================
// TARGET & PROGRESS
// =====================
let total = data.total_tabungan;
let target = data.target_tabungan || 1;

document.getElementById("target-text").innerText =
"Target: Rp " + target.toLocaleString("id-ID");

// hitung persen
let persen = (total / target) * 100;

// max 100%
if(persen > 100) persen = 100;

// progress bar
let bar = document.getElementById("progress");
bar.style.width = persen + "%";

// warna progress
if(persen < 50){
  bar.style.background = "red";
}else if(persen < 100){
  bar.style.background = "orange";
}else{
  bar.style.background = "green";
}

// text progress
document.getElementById("progress-text").innerText =
Math.round(persen) + "% dari target";

// status lunas
if(persen >= 100){
  document.querySelector(".status").innerText = "LUNAS";
  document.querySelector(".status").style.color = "green";
}

// =====================
// ANGGOTA
// =====================
let anggotaHTML = "";

data.anggota.forEach((a,i)=>{
  anggotaHTML += `<li>${i+1}. ${a.nama} - ${a.jk}</li>`;
});

document.getElementById("anggota").innerHTML = anggotaHTML;

// =====================
// TRANSAKSI
// =====================
let transaksiHTML = "";

data.transaksi.forEach(t=>{

  let tanggal =
  new Date(t.tanggal).toLocaleDateString("id-ID");

  transaksiHTML += `
  <tr>
    <td>${tanggal}</td>
    <td>+ ${t.nominal.toLocaleString("id-ID")}</td>
    <td>${t.saldo.toLocaleString("id-ID")}</td>
  </tr>
  `;
});

document.getElementById("transaksi").innerHTML =
transaksiHTML;

});
