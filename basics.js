console.log("hello world")

let a = 4

console.log(a)

let b=283.2
console.log(typeof(b))

let c= "rahul"
console.log(typeof(c))

let required = true
console.log(typeof(required))

var e = a+b
console.log(e)

let i = 0
while(i<10)
{
i++
console.log(i)
}

for(let k=0; k<=10; k++)
{
    console.log(k)
}

console.log("****************************")


let n=0
for(let k=1; k<=100; k++)
{

    if(k%2 ==0 && k%5 == 0)
    {
        n++
         console.log(k)
        if(n == 4)
        
            break;
        
       

    }
}


if(dost = true)
{
    console.log("wo mera dost hai")
}
else
{
    console.log(" ja re tu")
}

var marks = Array(6)
var marks = new Array(20, 40, 35, 12, 37, 100)

var marks = [20, 40, 35, 12, 37, 100]
console.log(marks[2])

marks[3]=14

console.log(marks)
console.log(marks.length)

marks.push(65) // append the value in current array
console.log(marks)

marks.pop() //Delete the last value
marks.indexOf(100)
console.log(marks.indexOf(14))


var score = [12, 14, 17, 19, 20]
var filterscore = []
let newfilterscore = score.filter(score=> score%2==0)
console.log(newfilterscore)
console.log("***************************")

for(let i=0; i<=score.length; i++)
{
 if(score[i] %2==0)
 {
    filterscore.push(score[i])
 }
}
console.log(filterscore)






