;(function(root){

var fn={};
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

 root.fn=fn;
})(window||this);
