# maycry

- https://pinkromeo18.github.io/maycry/
- https://pinkromeo18.github.io/maycry/maycry.css
- https://pinkromeo18.github.io/maycry/ed.js
- https://pinkromeo18.github.io/maycry/ed.css

```
<meta name="viewport" content="width=device-width, initial-scale=1">
<link href="https://pinkromeo18.github.io/maycry/maycry.css" rel="stylesheet" />
<link href="https://pinkromeo18.github.io/maycry/ed.css" rel="stylesheet" />
<script src="https://pinkromeo18.github.io/maycry/ed.js" />
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

```

### ed.js ed.css
```
var update =(dat)=>{
  document.querySelector('#mes').textContent =dat.length;
}
var _dat="＃新規";
var ed1 = ed('#edtop',_dat,update,500);
```
