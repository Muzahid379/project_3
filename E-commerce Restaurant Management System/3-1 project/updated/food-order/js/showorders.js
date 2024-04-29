var st = window.localStorage;
var total = 0;
var ccn = document.getElementById('ccn');
var exd = document.getElementById('exd');
var ccv = document.getElementById('ccv');
if(st.getItem('cart')!==null){
  var cart = JSON.parse(st.getItem('cart'));
  if(cart.length!=0){
    ShowOrders(cart);
    Confirm();
  }
}

function ShowOrders(cart){
  var container = document.getElementById('orders');
  var t = document.createElement('TABLE');
  t.style='margin-left: 20vw; color:white';
  t.innerHTML="<tr> <th>Item</th> <th style='padding:2rem;'>Price per each($)</th> <th style='padding:2rem;'>Quantity</th> <th>Price($)</th></tr>";
  for (var i = 0; i < cart.length; i++){
    var tr = document.createElement('TR');
    for (var j = 0; j <4; j++) {
      tr.appendChild(PutData(cart[i][j]));
    }
  t.appendChild(tr);
  total+=parseFloat(cart[i][3]);
  }
  container.appendChild(t);
  var tdiv= document.createElement('DIV');
  tdiv.textContent="Total: $"+total.toFixed(2);
  tdiv.style="padding-top:5rem;"
  container.appendChild(tdiv);
}

function PutData(v){
  var td = document.createElement('TD');
  td.textContent = v;
  return td;
}

function Confirm() {
  var cb = document.getElementById('cb');
  cb.classList.add("btn");
  cb.classList.add("btn-primary");
  cb.style ="margin:auto; margin-top:2rem; text-align: center;";
  if((st.getItem('id')!==null)){
    var id=st.getItem('id');
    cardInfo();
    cb.textContent="Confirm Order";
    cb.addEventListener("click",()=>{
      if(ccn.value && ccv.value && exd.value){
        let sr = new XMLHttpRequest();
        var x = id+"↱"+JSON.stringify(cart)+" Total: "+total+"↱"+ccn.value+"↱"+exd.value+"↱"+ccv.value+"↱"+total;
        sr.open("POST","./php/placeOrder.php?v="+x,true);
        sr.onreadystatechange = function(){
          if (this.readyState == 4 && this.status == 200){
            
            if(this.responseText == true ){
               window.location.href = "./success.html";
            } else {
               window.location.href = "./failed.html";
            }
          }
        }
        sr.send();
        st.clear();
        //window.location.href="/food-order/index.html";
      }
      else alert('input card info');
    });

    return;
  }
  cb.textContent="Please Book a Table First";
  cb.addEventListener("click",()=>{window.location.href="/food-order/table.html"});
}

function cardInfo() {
  ccn.style.display='block';
  exd.style.display='block';
  ccv.style.display='block';

}
