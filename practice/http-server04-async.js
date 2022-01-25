const http=require('http');
const fs=require('fs').promises;

const server =http.createServer(async function(req,res){
    res.writeHead(200,{
        'Content-Type':'text/html; charset=utf-8'
    });
    
    try{
        await fs.writeFile(__dirname+'/headers2.txt',JSON.stringify(req.headers,null,4)).then(()=>{
            res.end('ok');
        });
    }catch(ex){
        res.end('NO!');
    }
    
});

server.listen(3000);