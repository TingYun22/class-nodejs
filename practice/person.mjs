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
console.log('Mjs');
export const f3=a=>a*a*a;
export const f1=a=>a*a;

export default Person;
