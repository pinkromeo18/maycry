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

fn.rkana=(l=8)=>{
 var c = "bcdfghjklmnpqrstvwxyz",cl=c.length,b ="aiueo",bl=b.length,r=""
 ,mf=Math.floor,mr=Math.random
 ;for(var i=0;i<l;i++) r+=(i%2)? b[mf(mr()*bl)]:c[mf(mr()*cl)].toUpperCase();
 return r;
}

fn.jptime=(timestamp=Date.now())=>{
 return new Date(timestamp+1000*60*60*9)
  .toISOString()
  .replace('T',' ')
  .slice(0,'YYYY-MM-DD hh:mm:ss'.length)
 ;
} 

/**/
/*xyz.jpg -> .jpg*/
fn.getexe=(str)=>{
  var n = str.lastIndexOf('.');
  if(n===-1)return '';
  return str.slice(n);
};
/*xyz.jpg -> xyz*/
fn.sliceexe=(str)=>{
  var n = str.lastIndexOf('.');
  if(n===-1)return str;
  return str.slice(0,n);
}
fn.isrename=(file1,file2)=>{
  var f1 =fn.sliceexe(file1)
  var f2 =fn.sliceexe(file2)
  return f1!=f2;
}
fn.countline=(dat)=>{
  dat=dat||'';
  var ary=dat.match(/\n/g)||[];
  return ary.length;  
}


 root.fn=fn;
})(window||this);
