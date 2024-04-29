var st = window.localStorage;
var cart = [];
function init(){
  var qs = document.getElementsByClassName('q');
  if(st.getItem('cart')!==null){
    cart = JSON.parse(st.getItem('cart'));
    //update vales
    for (var i = 0; i < cart.length; i++) {
      for(var j = 0; j < qs.length; j++){
        if(cart[i][0]==qs[j].parentElement.getElementsByTagName('H4')[0].textContent){
          qs[j].value = cart[i][2];
          qs[j].parentElement.parentElement.style="background-color:cyan";
          break;
        }
      }
    }
  }
  for (var i = 0; i < qs.length; i++) {
    qs[i].addEventListener('input',e=>AddThis(e));
  }

}


FindIBV=(a,v)=>{
  for(var i = 0; i < a.length; i++){
    if(a[i][0]==v)
      return i;
  }
  return -1;
}

AddThis=(e)=>{
  var src = e.srcElement;
  var p= src.parentElement;
  var gp = p.parentElement;
  var iname = p.getElementsByTagName('H4')[0].textContent;
  var iprice = parseFloat(p.getElementsByClassName('food-price')[0].textContent.substring(1));
  var iquantity = src.value;
  if(iquantity!='') iquantity=parseInt(iquantity);
  var i = FindIBV(cart,iname);

  if(iquantity!=0 || iquantity!=''){
    gp.style="background-color:cyan";

    if(i>-1){
      cart[i] = [iname,iprice,iquantity,(iprice*iquantity).toFixed(2)];
      st.setItem('cart',JSON.stringify(cart));
      return;
    }
    cart.push([iname,iprice,iquantity,(iprice*iquantity).toFixed(2)]);
    st.setItem('cart',JSON.stringify(cart));
    return;
  }
  gp.style="background-color:none";
  if(i>-1){
    cart.splice(i,1);
    st.setItem('cart',JSON.stringify(cart));
    return;
  }

}
