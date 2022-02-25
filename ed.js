/*
with ed.css
*/
;(function(root){

  function debounce(callback, wait) {
    let timerId;
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        callback(...args);
      }, wait);
    };
  }

  function makeImages(text){
    var fra = document.createDocumentFragment();  
    text.split('\n')
      .filter(d=>/http/.test(d))
      .map(d=>d.slice(d.indexOf('http')) )
      .map(url=>fn.i3(`<img src="${url}" />`))
      .map(el=>{fra.appendChild(el)})
    ;
    return fra;  
  }

  function updateimg(el){
    var $ped;
    var $ed;
    var $img;
    if(el.dataset.ed || el.dataset.img){
      $ped = el.parentElement;
    }
    if(el.dataset.ped){
      $ped =el;
    }
    if(!$ped)return;
    $ed = fn.q('[data-ed]',$ped);
    $img =fn.q('[data-img]',$ped);

    var dat = $ed.textContent;
    var fra =makeImages(dat);
    $img.innerHTML='';
    fn.a2(fra,$img);
  }

  var fn={}
  fn.q=(s,doc=document)=>{return doc.querySelector(s)};
  fn.qa=(s,doc=document)=>{
    return [].slice
      .call(doc.querySelectorAll(s))
  };
  fn.a2=(me,p)=>{p.appendChild(me);return me};
  fn.as2=(me,p)=>{
    p.parentNode
      .insertBefore(me,p.nextElementSibling);
    return me
  };
  fn.i3=(d)=>{
    if(typeof d !=='string') return d
    var el=document.createElement('table');
    el.innerHTML=d.trim();
    var me=el.childNodes[0]
    el=void 0;
    return me
  }

  function entry(query,_dat,_caller,detime=500){
    var cep='＃'
    var q_child ='[data-ed]';
    var parent = fn.q(query);
    if(!parent) return console.log('notfound query',query);
    var tag = `
    <div data-ped="true">
    <div contenteditable="plaintext-only"
    data-ed="true">${cep}</div>
    <div data-img="true"></div>    
    </div>    
    `
    _dat =_dat||'＃新規'
    _dat.split(cep).slice(1).map(d=>{
      var el =fn.a2(fn.i3(tag),parent)
      var a =fn.q('[data-ed]',el);
      a.textContent =cep+d;
      //updateimg(el,cls_img)
    })
    var caller =(_caller)?debounce(_caller,detime):void 0;
    var getdat =()=>{
      return fn.qa(q_child,parent)
        .map(d=>d.textContent)
        .join('\n')  
    }

    parent.onkeydown=(ev)=>{
      if(!ev.target.dataset.ed)return;
      var ped = ev.target.parentElement;
      if(ev.ctrlKey && ev.key ==='Enter'){
        var el =fn.as2(fn.i3(tag),ped)
        el.focus();       
      }
      if(ev.ctrlKey && ev.key ==='Backspace')
        if(ev.target.textContent.length==0 && fn.qa(q_child).length!=1){
          ped.remove();
        }
    }

    parent.onkeyup=(ev)=>{
      if(!ev.target.dataset.ed)return;
      updateimg(ev.target)      
      if(!caller)return;
      switch (ev.key) {
        case "Down": // IE/Edge specific value
        case "ArrowDown":
        case "Up": // IE/Edge specific value
        case "ArrowUp":
        case "Left": // IE/Edge specific value
        case "ArrowLeft":
        case "Right": // IE/Edge specific value
        case "ArrowRight":
          return;
      }
      caller(getdat());
    }
    return parent;
  }

  root.ed=entry;
  root.updateimg=updateimg;
})(window||this);

var update =(dat)=>{
  document.querySelector('#mes').textContent =dat.length;
  document.querySelector('#prev').textContent =dat;
}
var _dat="＃新規";
var ed1 = ed('#edtop',_dat,update);
//and updateimg(el/*[data-ed]*/)
