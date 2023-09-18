function printPattern(n){
    for(let i=0;i<n;i++){
        str = " ";
        for(let j=0;j<=i;j++){
            str += "*";
        }
        console.log(str);
    }
}

let n = 5;
printPattern(n);