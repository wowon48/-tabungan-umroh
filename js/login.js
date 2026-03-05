function login(){

let user = document.getElementById("user_id").value;
let va = document.getElementById("no_va").value;

if(user == "" || va == ""){
document.getElementById("error").innerText = "Isi USER ID dan NO VA";
return;
}

window.location.href =
"dashboard.html?user_id="+user+"&no_va="+va;

}