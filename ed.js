/*
and with ed.css
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
  
  function updateimg(el,cls){
    var dat = el.textContent;
    var url = dat.split('\n')
    .filter(d=>/http/.test(d)).slice(0,1).join('');
    if(url){
      el.style.backgroundImage='url('+url+')'
      el.classList.add(cls);
    }else{
      el.style.backgroundImage=''
      el.classList.remove(cls);    
    }
  }
  

  var fn={}
  fn.q=(s,doc=document)=>{return doc.querySelector(s)};
  fn.qa=(s,doc=document)=>{return [].slice.call(doc.querySelectorAll(s))};
  fn.a2=(me,p)=>{p.appendChild(me);return me};
  fn.as2=(me,p)=>{p.parentNode.insertBefore(me,p.nextElementSibling/*nextSibling*/);return me};
  fn.i3=(d)=>{
    if(typeof d !=='string') return d
    var el=document.createElement('table'); el.innerHTML=d.trim();
    var me=el.childNodes[0]
    el=void 0;
    return me
  }



  function entry(query,_dat,_caller,detime=500){
    var cep='＃'
    var q_child ='[contenteditable]';
    var parent = fn.q(query);
    if(!parent) return console.log('notfound query',query);
    var tag = `<div contenteditable="plaintext-only" data-ed="true">${cep}</div>`
    _dat =_dat||'＃新規'
    _dat.split(cep).slice(1).map(d=>{
      var el =fn.a2(fn.i3(tag),parent)
      el.textContent =cep+d;
    })
    var caller =(_caller)?debounce(_caller,detime):void 0;
    var getdat =()=>{
      return fn.qa(q_child,parent)
        .map(d=>d.textContent)
        .join('\n')  
    }

    parent.onkeydown=(ev)=>{
      if(!ev.target.dataset.ed)return;
      if(ev.ctrlKey && ev.key ==='Enter'){
        var el =fn.as2(fn.i3(tag),ev.target)
        el.focus();       
      }
      if(ev.ctrlKey && ev.key ==='Backspace')
        if(ev.target.textContent.length==0 && fn.qa(q_child).length!=1){
          ev.target.remove();
        }
    }

    parent.onkeyup=(ev)=>{
      if(!ev.target.dataset.ed)return;
      updateimg(ev.target,'ed-img')      
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
})(window||this);

/*
var update =(dat)=>{
  document.querySelector('#mes').textContent =dat.length;
}
var _dat="＃新規";
var ed1 = ed('#edtop',_dat,update);
*/
