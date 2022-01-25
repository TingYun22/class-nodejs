const http=require('http');
const fs=require('fs').promises;

const server =http.createServer(function(req,res){
    res.writeHead(200,{
        'Content-Type':'text/html; charset=utf-8'
    });
    
    fs.writeFile(__dirname+'/headers2.txt',JSON.stringify(req.headers,null,4)).then(()=>{
        
        res.end('ok');
        fs.readFile(__dirname+'/headers.txt',(error,data)=>{
            if(error){
                console.log(error);
                res.end('錯誤');
            }else{
                res.writeHead(200,{
                    'Content-Type':'application/json; charset=utf-8'
                })
                res.end(data);
            }
        });
    });
});

server.listen(3000);