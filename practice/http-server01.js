const http=require('http');

const server =http.createServer(function(req,res){
    res.writeHead(200,{
        'Content-Type':'text/html',
    });
    res.write(`<h2>Hello!!!!</h2>`);
    res.end(`<h3>World</h3>
    <p>req: ${req.url}</p>`);
});

server.listen(3000);