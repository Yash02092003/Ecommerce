let arr = [10 , 20 , 30 , 40 , 50]

let newarr = arr.map(function(ele , index){
    return ele * 2;
})

for (let num of newarr) {
    console.log(num);
}