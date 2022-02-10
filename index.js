require('dotenv').config();

const express=require('express');
const session = require('express-session');
const MysqlStore=require('express-mysql-session')(session);
const moment= require('moment-timezone');
const multer=require('multer');
// const upload=multer({dest: 'tmp_uploads/'});
const upload=require(__dirname+'/modules/upload-imgs');
const fs=require('fs').promises;
const db = require('./modules/connect-db');
const sessionStore = new MysqlStore({},db);
const cors = require('cors');

const app=express();

app.set('view engine','ejs');
// app.get('/a.html',(req,res)=>{
//     res.send(`<h2>我先到!</h2>`);
// });

app.use(cors());
app.use(express.urlencoded({extended:false}));
// Top-level middleware 放在最前面篩選
app.use(express.json());
app.use(express.static('public'));
app.use('/joi',express.static('node_modules/joi/dist/'));


app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: 'esjrhfsoirtgreshdrtkjtkjoesjtgirehhareahyerdfhdf',
    store: sessionStore,
    cookie: {
        maxAge: 1200000
    }
}));

app.use((req, res, next)=>{
    res.locals.hello = '哈哈';
    res.locals.toDateString = d => moment(d).format('YYYY-MM-DD');
    res.locals.toDatetimeString = d => moment(d).format('YYYY-MM-DD HH:mm:ss');
    next();
});
// 自訂的頂層middleware

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
    
    sales.sort(function(a,b){
        if(orderByRule=='desc'){
            switch(orderByCol){
                case 'name':
                    return a.name > b.name ? -1:1;
                    
                case 'age':
                    return b.age - a.age;
                    
                case 'id':
                    return a.id > b.id ? -1:1;
                    
            }
        }else{
            switch(orderByCol){
                case 'name':
                    return a.name > b.name ? 1:-1;
                    
                case 'age':
                    return a.age - b.age;
                    
                case 'id':
                    return a.id > b.id ? 1:-1;
                    
            }
        }
    });

    console.log(sales);
    res.render('json-sales', {sales});
    
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
       res.json(req.file);
    
    /*const types=['image/jpeg','image/png'];
    const f=req.file;
    if(f && f.originalname){
        if(types.includes(f.mimetype)){
            await fs.rename(f.path,__dirname+'/public/img/'+f.originalname);
            return res.redirect('/img/'+f.originalname);
        }else{
            // fs.unlink(f.path,error=>{});
            return  res.send('不支援的檔案類型');
        }
    }
    res.send('bad');
    */
})

app.post('/try-uploads',upload.array('photos'),async (req, res)=>{
    let f=req.files;
    let ar=[];
    for(i of f){
        ar.push(i.filename);
    }
    res.json({ar});
});

app.get('/my-params1/:action/:id?',(req, res)=>{
    res.json(req.params);
});

app.get(/^\/m\/09\d{2}-?\d{3}-?\d{3}$/i,(req, res)=>{
    let u=req.url.split('?')[0];
    u=u.slice(3);
    u=u.replace(/-/g,''); // u=u.split('-').join('');
    // 用空字串取代 -
    res.json({mobile: u});
});


app.use('/admin2',require(__dirname+'/routes/admin2'));
app.use('/address-book',require('./routes/address-book'));

app.get('/try-session',(req,res)=>{
    req.session.my_var = req.session.my_var || 0;
    req.session.my_var++;
    res.json(req.session);
    
});

app.get('/try-moment',(req,res)=>{
    const fm = 'YYYY-MM-DD HH:mm:ss';
    res.json({
        mo1: moment().format(fm),
        mo2: moment().tz('Asia/Tokyo').format(fm),
        mo3: moment(req.session.cookie.expires).format(fm),
        mo4: moment(req.session.cookie.expires).tz('Asia/Tokyo').format(fm),
    });
})

app.get('/try-db',async (req,res)=>{
    const sql="SELECT * FROM address_book LIMIT 5";
    const [rs, fields] = await db.query(sql);
    res.json(rs);
});

/* --------所有後端路由的後面--------- */
app.use((req,res)=>{
    res.status(404).send(`<h2>走錯~~</h2>`);
});

const port=process.env.PORT || 3001;
app.listen(port,()=>{
    console.log(`server started: ${port} - `,new Date());
});