require('dotenv').config();

const express=require('express');
const app=express();
const multer=require('multer');
const upload=multer({dest: 'tmp_uploads/'});
const fs=require('fs').promises;

app.set('view engine','ejs');
// app.get('/a.html',(req,res)=>{
//     res.send(`<h2>我先到!</h2>`);
// });

app.use(express.urlencoded({extended:false}));
// Top-level middleware 放在最前面篩選
app.use(express.json());
app.use(express.static('public'));

/* --------後端的路由--------- */
app.get('/',(req,res)=>{
    // res.send(`<h2>Hello</h2>`);
    res.render('home',{name:'TingYun'});
});
app.get('/wow/123',(req,res)=>{
    res.render('home',{name:'TingYun'});
});

app.get('/json-sales',(req,res)=>{
    const orderByCol=req.query.orderByCol;
    const orderByRule=req.query.orderByRule;
    const sales=require('./data/sales');
    // console.log(sales);
    // res.send(sales[0].name);
    res.render('json-sales',{sales});
    
    if(orderByCol==sales.age){
        if(orderByRule==orderByRule.val()==asc){
            console.log(asc);
            res.render(
                sales.sort(function(a,b){
                    return a.age-b.age;
            }));
        }else{
            res.render(
                sales.sort(function(a,b){
                return b.age-a.age;
            }));
        }
    }

    
});
app.get('/try-qs',(req,res)=>{
    res.json(req.query);
});

app.post('/try-post',(req,res)=>{
    res.json(req.body);
});

app.get('/try-post-form', (req, res)=>{
    res.render('try-post-form');
});
app.post('/try-post-form', (req, res)=>{
    res.render('try-post-form',req.body);
});

app.post('/try-upload',upload.single('avata'),async (req, res)=>{
    //    res.json(req.file);
    const types=['image/jpeg','image/png'];
    const f=req.file;
    if(f && f.originalname){
        if(types.includes(f.mimetype)){
            await fs.rename(f.path,__dirname+'/public/img/'+f.originalname);
            return res.redirect('/img/'+f.originalname);
        }else{
            fs.unlink(f.path,error=>{});
        }
    }
    res.send('bad');
})




/* --------所有後端路由的後面--------- */
app.use((req,res)=>{
    res.status(404).send(`<h2>走錯~~</h2>`);
});

const port=process.env.PORT || 3001;
app.listen(port,()=>{
    console.log(`server started: ${port} - `,new Date());
});