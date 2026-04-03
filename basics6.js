let person = {
    firstName : 'mark',
    lastName : 'joe',
    fullname : function()
    {
    console.log(this.firstName+this.lastName)
    }
}

console.log(person.firstName)
console.log(person.lastName)
person.gener = 'male'
console.log(person)
console.log(person.fullname())

