const id = document.cookie.split("=").pop();
var req;
var res;
var fres;
var table;
var tr;
var td;
var tres;

if(id){
  req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      if(this.responseText){
        showReservations();
        showFood();
        stba();
      }
      else
        window.location.href='adminlogin.html';
    }
  };
  req.open("GET", "./php/valid.php?v="+id);
  req.send();

}

function showReservations(){
  req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      res=JSON.parse(this.responseText);
      createTable();
    }
  };
  req.open("GET", "./php/showRes.php");
  req.send();
}

function createTable(){
  table= document.createElement("table");
  var t=0;
  var tx;
  table.innerHTML="<tr><th>cust id</th><th>phone no</th><th>arival</th><th>depart</th><th>no of ppl</th><th>order</th><th>card_id</th><th>tables</th><th>remove</th></tr>";
  for (var i = 0; i < res.length; i++) {
    if(res[i][0]==t[0]){
      tx.innerHTML+=","+res[i][7];
    }
    else {
      t=res[i];
      tr = document.createElement("tr");
      for(var j=0; j < res[i].length; j++){
        td = document.createElement("td");
        td.textContent = res[i][j];
        tr.appendChild(td);
      }
      tx=td;
      td = document.createElement("td");
      td.textContent = "delete";
      td.addEventListener('click',e=>Remover(e));
      tr.appendChild(td);
      table.appendChild(tr);
    }
  }
  document.getElementById("res").appendChild(table);
}

Remover = (e)=> {
  var tb = e.srcElement;
  var row = tb.parentElement;
  var rid = row.children[0].textContent;
  row.remove();
  req = new XMLHttpRequest();
  req.open("GET", "./php/remover.php?v="+rid);
  req.send();
}

function showFood(){
  req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      fres=JSON.parse(this.responseText);
      createFTable();
    }
  };
  req.open("GET", "./php/showFRes.php?v=");
  req.send();

}

function createFTable(){
  table= document.createElement("table");
  table.innerHTML="<tr><th>pic</th><th>id</th><th>name</th><th>type</th><th>price</th><th>remove</th></tr>";
  var img;
  for (var i = 0; i < fres.length; i++) {
    tr = document.createElement("tr");
    img=document.createElement('img');
    img.src='./images/'+fres[i][0]+'.jpg';
    img.style.height="100px";
    img.style.width="150px";
    td = document.createElement("td");
    td.appendChild(img);
    tr.appendChild(td);
    for (var j = 1; j < fres[i].length; j++) {
      td = document.createElement("td");
      td.textContent = fres[i][j];
      tr.appendChild(td);
    }
    td = document.createElement('td');
    td.textContent="delete";
    td.addEventListener('click',e=>Remove(e));
    tr.appendChild(td);
    table.appendChild(tr);
  }
  document.getElementById('food').appendChild(table);
}


function stba(){
  req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      tres=JSON.parse(this.responseText);
      createstb();
    }
  };
  req.open("GET", "./php/stb.php");
  req.send();
}

Remove = (e)=> {
  var tb = e.srcElement;
  var row = tb.parentElement;
  var rid = row.children[1].textContent;
  row.remove();
  req = new XMLHttpRequest();
  req.open("GET", "./php/remove.php?v="+rid);
  req.send();
}


function createstb() {
  table= document.createElement("table");
  table.innerHTML="<tr><th>table no</th><th>cap</th></tr>";
  for (var i = 0; i <tres.length; i++) {
    tr = document.createElement("tr");
    td = document.createElement("td");
    td.textContent=tres[i][0];
    tr.appendChild(td);
    td = document.createElement("td");
    td.textContent=tres[i][1];
    tr.appendChild(td);
    td = document.createElement("td");
    td.textContent="delete";
    td.addEventListener('click',e=>Removet(e));
    tr.appendChild(td);
    table.appendChild(tr);
  }
  document.getElementById('stb').appendChild(table);
}

Removet = (e)=> {
  var tb = e.srcElement;
  var row = tb.parentElement;
  var rid = row.children[0].textContent;
  row.remove();
  req = new XMLHttpRequest();
  req.open("GET", "./php/removet.php?v="+rid);
  req.send();
}
