var r = document.getElementById('res');
var f = document.getElementById('food');
var add = document.getElementById('add');
var stb = document.getElementById('stb');
var addt = document.getElementById('addt');
r.style.display="none";
f.style.display="none";
add.style.display="none";
stb.style.display="none";
addt.style.display="none";
var t = [false,false,false,false,false];

document.getElementById("t1").addEventListener("click", t1);
document.getElementById("t2").addEventListener("click", t2);
document.getElementById("t3").addEventListener("click", t3);
document.getElementById("t4").addEventListener("click", t4);
document.getElementById("t5").addEventListener("click", t5);
document.getElementById("t6").addEventListener("click", t6);

function t1() {
  if(!t[0]){
    r.style.display="block";
    t[0]=!t[0];
    return;
  }
  r.style.display="none";
  t[0]=!t[0];
}

function t2() {
  if(!t[1]){
    f.style.display="block";
    t[1]=!t[1];
    return;
  }
  f.style.display="none";
  t[1]=!t[1];
}
function t3() {
  if(!t[2]){
    add.style.display="block";
    t[2]=!t[2];
    return;
  }
  add.style.display="none";
  t[2]=!t[2];
}

function t4() {
  if(!t[3]){
    stb.style.display="block";
    t[3]=!t[3];
    return;
  }
  stb.style.display="none";
  t[3]=!t[3];
}

function t5() {
  if(!t[4]){
    addt.style.display="block";
    t[4]=!t[4];
    return;
  }
  addt.style.display="none";
  t[4]=!t[4];
}

function t6() {
  document.cookie = 'admin=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  window.location.href="./index.html";
}
