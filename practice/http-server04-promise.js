const http=require('http');
const fs=require('fs');

function myWriteFile(file_name){

    return new Promise((resolve, reject)=>{
        fs.writeFile(file_name,JSON.stringify(req.headers,null,4),error=>{
            if(error){
                reject(error);
            }else{
                resolve('OK');
            }
        });
    });
}
const server =http.createServer(async (req,res)=>{
    res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8'
    });
        let file_name=__dirname+`/headers5.txt`;
        try{
            await fs.myWriteFile(file_name);
        }catch(ex){
            return res.end('error:' + ex);
        }
        
        res.end('ok');
        
});

server.listen(5000);