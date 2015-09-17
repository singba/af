  (function(){
    function get(obj, path) {
      if((typeof (obj) == "undefined") || obj == null){
        return null;
      }

      if(path.indexOf('.')<0){
        if(obj.get){
          return obj.get(path) || obj[path];
        }else{
          return obj[path];
        }
      }

      if(path == '.'){
        return obj;
      }

      if(path.indexOf('.')==0){
        return get(obj,path.substr(1));
      }

      var pindex = path.indexOf('.');
      var pname = path.substring(0,pindex);
      var pvalue = get(obj,pname);
      if(pvalue){
        return get(pvalue,path.substr(pindex+1));
      }else{
        return null;
      }
    }

    function set(obj,path,value){      
      if((typeof (obj) == "undefined") || obj == null){
        return null;
      }

      if(path.indexOf('.')<0){
        if(obj.set){
          return obj.set(path,value);
        }else{
          obj[path]=value;
          return obj;
        }
      }

      if(path == '.'){
        return value;
      }

      if(path.indexOf('.')==0){
        return set(obj,path.substr(1));
      }

      var pindex = path.indexOf('.');
      var pname = path.substring(0,pindex);
      var pvalue = get(obj,pname) || {}; 
      var newValue = set(pvalue,path.substr(pindex+1),value);
      return set(obj,pname,newValue);
    }

    var AF={};
    AF['get'] = get;
    AF['set'] = set;
    window['AF'] = AF;
  })();
