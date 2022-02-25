# maycry

- https://pinkromeo18.github.io/maycry/
- https://pinkromeo18.github.io/maycry/maycry.css
- https://pinkromeo18.github.io/maycry/ed.js
- https://pinkromeo18.github.io/maycry/ed.css
- https://pinkromeo18.github.io/maycry/drop.js 
- https://pinkromeo18.github.io/maycry/githubapi.js 
- https://pinkromeo18.github.io/maycry/fn.js 

```
<meta name="viewport" content="width=device-width, initial-scale=1">
<link href="https://pinkromeo18.github.io/maycry/maycry.css" rel="stylesheet" />
<link href="https://pinkromeo18.github.io/maycry/ed.css" rel="stylesheet" />
<script src="https://pinkromeo18.github.io/maycry/ed.js" />
<script src="https://pinkromeo18.github.io/maycry/drop.js" />
<script src="https://pinkromeo18.github.io/maycry/githubapi.js" type="module" />

```

### maycry.css
```
:root{
  --font-family:"Yu Gothic", YuGothic,"Hiragino Kaku Gothic Pro",Meiryo, Osaka,"MS PGothic", sans-serif;  
  --brand:#000;
  --brand2:#112;
  --word:#f1f1ff;
  --link:#0ff;
}
```
```
.block
 .one-half.column
  div right
 .one-half.column
  div left
  
.block
 nav.ul
  li ...

.block
 nav.ul-row
  li ...

.block.full

.block.full.sticky /* .sticky */

.block.box  /* .box */

```

### ed.js ed.css
```
var update =(dat)=>{
  document.querySelector('#mes').textContent =dat.length;
  document.querySelector('#prev').textContent =dat;
}
var _dat="＃新規";
var ed1 = ed('#edtop',_dat,update);
//and updateimg(el/*[data-ed]*/) //<------------


```

### drop.js
```
drop((file,url)=>{
  //console.log(file,url)
  var el =document.activeElement;
  if(!url)return;
  if(!el.dataset.ed) el=ed1.querySelector('[data-ed]');
  el.textContent +='\n'+url;
  updateimg(el);///
})
```

### githubapi.js
```
var opt={};
opt.token1 ="ghp_WjFtZHMWbe2u3v4";
opt.token2 ="Dhr5ziHCR2ufMNi37mp3f";
opt.file = '';
opt.baseurl ='/repos/pinkromeo18/quick-post/contents/';
opt.debug=false;

var api = githubapi(opt);
console.log(api);
```
