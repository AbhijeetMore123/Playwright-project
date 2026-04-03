
//map array function
var score = [12, 14, 20]
var newfilescore=[]
let finalscore=score.map(score=> score*3)
console.log(finalscore)
let totalval= finalscore.reduce((Sum,val)=> Sum+val,0)
console.log(totalval)

var score1 = [14, 25, 36]

let sumvalue=score1.filter(score=> score%2==0).map(score=>score*3).reduce((Sum,val)=> Sum+val,0)
console.log(sumvalue)

