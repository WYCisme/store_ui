export const  objectToParma =( obj)=> {
    console.log('obj',obj);
    let parma="?";
    for( let i in obj){
        console.log(i);
        if (parma === '?') {
            parma += i.toString() + '='+obj[i];
        }else {
            parma += '&' + i.toString() + '='+obj[i];
        }
    }
    return parma;
};