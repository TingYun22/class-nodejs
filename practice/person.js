class Person{
    constructor(name='John',age=0){
        this.name=name;
        this.age=age;
    }
    toJSON(){
        return {
            name:this.name,
            age:this.age,
        }
    }
    sayHello(){
        return `Hello ${this.name}`
    }
}
console.log('person定義');
 const f3=a=>a*a*a;

module.exports={Person,f3};
// const p1 =new Person('Adam',30);
// console.log(JSON.stringify(p1));
// console.log(JSON.stringify(p1.toJSON()));
// console.log(JSON.stringify(p1.sayHello()));