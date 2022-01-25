const obj=require('./person');
const {Person}=require('./person');

const p3=new obj.Person('Nick',22);
const p4=new Person('Vick',29);
const p5=new Person();


console.log(p3);
console.log(JSON.stringify(p3));
console.log(p3.toJSON());
console.log(p4);
console.log(Person===obj.Person);
console.log(p5);
