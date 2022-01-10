const operazioni = 
{ addizione: function(a,b) { return a + b; }, 
sottrazione: function(a,b) { return a - b; },
moltiplicazione: function(a,b) { return a * b },
potenza: function(a,b) { 
    prod=1;
    for (let i = 1; i <= b; i++)
        prod=prod*a;
    return prod;
},
haResto: function(a,b) {
    var r = a % b;
    if (r==0)
        return false;
    return true;
}
}
module.exports = operazioni