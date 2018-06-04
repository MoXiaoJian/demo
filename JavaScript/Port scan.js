<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>js实现端口扫描</title>
</head>
<body>
<form>
  <label for="target">target</label>
  <br/>
  <input type="text" name="target" value="www.baidu.com"/>
  <br/>
  <label for="port">port</label>
  <br/>
  <input type="text" name="port" value="80"/>
  <br/>
  <p>你可以使用80,81,8080的序列</p>
  <label for="timeout">timeout</label>
  <br/>
  <input type="text" name="timeout" value="1000"/>
  <br/>
  <label for="result">result</label>
  <br/>
  <textarea id="result" name="result" rows="7" cols="50"></textarea>
  <br/>
  <input class="button" type="button" value="scan" onClick="javascript:scan(this.form)"/>
</form>
<script>
var AttackAPI={
    version:'0.1',
    author:'liushuai',
    homepage:'http://www.baidu.com'
    };
    AttackAPI.PortScanner={};
    AttackAPI.PortScanner.scanPort=function(callback,target,port,timeout){
        var timeout=(timeout==null)?100:timeout;
        var img=new Image();
        img.onerror=function(){
            if(!img) return;
            img=undefined;
            callback(target,port,'open');
            };
            img.onload=img.onerror;
            img.src='http://'+target+':'+port;
            setTimeout(function(){
                if(!img) return;
                img=undefined;
                callback(target,port,'closed');
            },timeout);};
            AttackAPI.PortScanner.scanTarget=function(callback,target,ports,timeout)
            {
                for(index=0;index<ports.length;index++)
                AttackAPI.PortScanner.scanPort(callback,target,ports[index],timeout);
                };
</script>
<script>
var result=document.getElementById('result');
var callback=function(target,port,status){
    result.value+=target+':'+port+''+status+"\n";
    };
    var scan=function (form){
        AttackAPI.PortScanner.scanTarget(callback,form.target.value,form.port.value.split(','),form.timeout.value);
        };
</script>
</body>
</html>
