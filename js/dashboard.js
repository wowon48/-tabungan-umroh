const params = new URLSearchParams(window.location.search);

const user_id = params.get("user_id");
const no_va = params.get("no_va");

const api =
"https://script.google.com/macros/s/AKfycbzk052mEIwZUHZLcjYcMmHqOPWcARXLS-XUE1hjUYhWP0_P61F6PKIn-HYG21fry0AD/exec"
+"?user_id="+user_id+"&no_va="+no_va;

fetch(api)
.then(res => res.json())
.then(data => {

if(data.status!="success"){
alert("Login gagal");
return;
}

document.getElementById("nama").innerText = data.nama_kepala;
document.getElementById("va").innerText = data.no_va;
document.getElementById("catatan").innerText = data.catatan;

document.getElementById("saldo").innerText =
"Rp "+data.total_tabungan.toLocaleString("id-ID");


// progress

let total = data.total_tabungan;
let target = data.target_tabungan || 1;

// hitung persen
let persen = (total / target) * 100;

// batasi max 100%
if(persen > 100) persen = 100;

// set progress bar
document.getElementById("progress").style.width =
persen + "%";

// tampilkan text
document.getElementById("progress-text").innerText =
Math.round(persen) + "% dari target";


// anggota

let anggotaHTML="";

data.anggota.forEach((a,i)=>{

anggotaHTML +=
`<li>${i+1}. ${a.nama} - ${a.jk}</li>`;

});

document.getElementById("anggota").innerHTML =
anggotaHTML;


// transaksi

let transaksiHTML="";

data.transaksi.forEach(t=>{

let tanggal =
new Date(t.tanggal).toLocaleDateString("id-ID");

transaksiHTML +=
`
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
