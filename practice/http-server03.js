const http=require('http');
const fs=require('fs');

const server =http.createServer(function(req,res){
    
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

server.listen(3000);