const fs = document.getElementById('fs');
var req;
var res;
getFood();
function getFood(){
  req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      res=JSON.parse(this.responseText);
      for (var i = 0; i < res.length; i++)
        fbox(res[i]);
    }
    setTimeout(init,200);
  };
  req.open("GET", "./php/showFRes.php?v="+fs.getAttribute('value'));
  req.send();
}

function fbox(dt){
  var box = document.createElement('DIV');
  var imgb = document.createElement('DIV');
  var img = document.createElement('IMG');
  var desc = document.createElement('DIV');
  var h4 = document.createElement('H4');
  var p = document.createElement('P');

  box.classList.add("food-menu-box");
  imgb.classList.add("food-menu-img");
  img.classList.add("img-responsive","img-curve");
  desc.classList.add("food-menu-desc");
  p.classList.add("food-price");

  img.src="./images/"+dt[0]+".jpg";
  h4.textContent=dt[2];
  p.textContent ="$"+dt[4];


  box.appendChild(imgb);
  imgb.appendChild(img);
  box.appendChild(desc);
  desc.appendChild(h4);
  desc.appendChild(p);
  desc.innerHTML+='<br><input type="number" class="q" style="width:4rem; height:1.5rem;" placeholder=" quantity" min="0"><a href="order.html" class="btn btn-primary">Order Now</a>';
  fs.appendChild(box);
}
