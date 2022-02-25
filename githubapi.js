
import { Octokit } from "https://cdn.skypack.dev/@octokit/core";
;(function(root){

  function rkana(l=8){
    var c = "bcdfghjklmnpqrstvwxyz",cl=c.length,b ="aiueo",bl=b.length,r=""
    ,mf=Math.floor,mr=Math.random
    ;for(var i=0;i<l;i++) r+=(i%2)? b[mf(mr()*bl)]:c[mf(mr()*cl)].toUpperCase();
    return r;
  }
  function base64Encode(...parts) {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = () => {
        const offset = reader.result.indexOf(",") + 1;
        resolve(reader.result.slice(offset));
      };
      reader.readAsDataURL(new Blob(parts));
    });
  }
  function istext(d){
    return /\.txt$/.test(d)
  }

  function entry(opt){
    var api=new Octokit({auth: opt.token1 + opt.token2})
    ;
    Object.assign(api,opt);
    api.istext=istext;
    api.encode=base64Encode;
    api.rkana=rkana;
    ///////
    api.file = api.rkana(8) + '.txt';
    ///////

    api.list=async ()=>{
      var {debug,baseurl} = api;
      var {data}=await api.request('GET '+baseurl);
      if(debug) console.log(data);
      return data.filter(d=>istext(d.name));
    }

    api.sha=async (file)=>{
      if(!file)return void 0;
      //isis
      var {debug,baseurl} = api;      
      var res = await api.request('GET '+baseurl+file)
      .catch(e=>void 0);
      if(debug) console.log('api.sha',res);
      if(res) return res.data.sha
      return void 0;
    }
    api.get=async (file)=>{
      //before call api.sha
      var {debug,baseurl} = api;      
      var res = await api.request('GET '+baseurl+file)
      .catch(e=>void 0);
      if(debug) console.log('api.get',res);    
      if(!res)return void 0;
      var url =res.data.download_url;
      return url;
    }
    api.del=async (file)=>{
      var {debug,baseurl} = api;      
      var sha=await api.sha(file);
      if(!sha)return false;
      var o={
        sha,
        message:'del to '+file
      }
      await api.request('DELETE '+baseurl+file,o)
      return true;
    }
    api.set=async (content,file)=>{
      var {debug,baseurl} = api;      
      var sha = await api.sha(file);
      var message = 'image to'+file;
      if(istext(file)) message = content.slice(0,50).replace('\n',' ');
      content = await api.encode(content);
      var o={
        sha,
        message,
        content
      }
      var res =await api.request('PUT '+baseurl+file,o)
      .catch(e=>void 0)
      if(debug) console.log('api.set',res.data);
      return res.data;
    }

    api.rename=async (content,file,oldfile)=>{
      await api.del(oldfile)
      api.file = file;//
      return await api.set(content,file)
    }

    //
    return api;
  }
  root.githubApi = entry;
  root.githubapi = entry;
}(window||this));

/*
var opt={};
opt.token1 ="ghp_WjFtZHMWbe2u3v4";
opt.token2 ="Dhr5ziHCR2ufMNi37mp3f";
opt.file = '';
opt.baseurl ='/repos/pinkromeo18/quick-post/contents/';
opt.debug=false;

var api = githubapi(opt);
console.log(api);
*/
