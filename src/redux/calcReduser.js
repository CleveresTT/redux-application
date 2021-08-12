import { COLOR, RESULT } from "./types";

export function calculatorReduser(state={result:'',color:'black'}, action){
    switch(action.type){
        case RESULT:{

            function Pr(ch){
                if(ch==='+') return 1;
                if(ch==='-') return 1;
                if(ch==='*') return 2;
                if(ch==='/') return 2;
            }
        
            function Compute(textContent){
                let num=[];
                let S=[];
                let res=[];
                let size=textContent.length;
                let hasPoint = false;
                let firstChar = true;
                for(let i=0;i<size;i++){
                    let ch=textContent[i];
                    if (ch==='(') S.push(ch);
                    else if (ch===')'){
                        while (S[S.length - 1]!=='('){
                            switch (S[S.length - 1]) {
                                case '+':
                                    res[res.length-2]=res[res.length-2]+res[res.length-1];
                                    console.log(res[res.length-2]);
                                    res.pop();
                                    break;
                                case '-':
                                    res[res.length-2]=res[res.length-2]-res[res.length-1];
                                    console.log(res[res.length-2]);
                                    res.pop();
                                    break;
                                case '*':
                                    res[res.length-2]=res[res.length-2]*res[res.length-1];
                                    console.log(res[res.length-2]);
                                    res.pop();
                                    break;
                                case '/':
                                    res[res.length-2]=res[res.length-2]/res[res.length-1];
                                    console.log(res[res.length-2]);
                                    res.pop();
                                    break;
                                default:
                                    throw new Error('Compute error')
                            }
                            S.pop();
                        }
                        ch=S[S.length - 1];
                        S.pop();
                    }
                    else if (ch==='+' || ch==='-' || ch==='*' || ch==='/'){
                        if(S.length===0) S.push(ch);
                        else{
                            if (S[S.length - 1]==='+' || S[S.length - 1]==='-' || S[S.length - 1]==='*' || S[S.length - 1]==='/'){
                                if(Pr(ch)>Pr(S[S.length - 1])) S.push(ch);
                                else{
                                    switch (S[S.length - 1]) {
                                        case '+':
                                            res[res.length-2]=res[res.length-2]+res[res.length-1];
                                            console.log(res[res.length-2]);
                                            res.pop();
                                            break;
                                        case '-':
                                            res[res.length-2]=res[res.length-2]-res[res.length-1];
                                            console.log(res[res.length-2]);
                                            res.pop();
                                            break;
                                        case '*':
                                            res[res.length-2]=res[res.length-2]*res[res.length-1];
                                            console.log(res[res.length-2]);
                                            res.pop();
                                            break;
                                        case '/':
                                            res[res.length-2]=res[res.length-2]/res[res.length-1];
                                            console.log(res[res.length-2]);
                                            res.pop();
                                            break;
                                        default:
                                            throw new Error('Compute error')
                                    }
                                    S.pop();
                                    S.push(ch);
                                }
                            }
                            else S.push(ch);
                        }
                    }
                    else if((ch>='0' && ch<='9')||ch==='.'){
                        hasPoint = false;
                        firstChar = true;
                        while((ch>='0' && ch<='9')||ch==='.'){
                            if(ch==='.'){
                                if (firstChar===true) throw new Error('Compute error')
                                if (hasPoint===true) throw new Error('Compute error')
                                hasPoint=true;
                            }
                            num.push(ch);
                            i++;
                            ch=textContent[i];
                            firstChar=false;
                        }
                        i--;
                        num=num.join('');
                        res.push(Number(num));
                        num=[];
                    }
                }
                while(S.length!==0){
                    switch (S[S.length - 1]) {
                        case '+':
                            res[res.length-2]=res[res.length-2]+res[res.length-1];
                            console.log(res[res.length-2]);
                            res.pop();
                            break;
                        case '-':
                            res[res.length-2]=res[res.length-2]-res[res.length-1];
                            console.log(res[res.length-2]);
                            res.pop();
                            break;
                        case '*':
                            res[res.length-2]=res[res.length-2]*res[res.length-1];
                            console.log(res[res.length-2]);
                            res.pop();
                            break;
                        case '/':
                            res[res.length-2]=res[res.length-2]/res[res.length-1];
                            console.log(res[res.length-2]);
                            res.pop();
                            break;
                        default:
                            throw new Error('Compute error')
                    }
                    S.pop();
                }
                console.log('Result: ', res[0]);
                if (!res[0]) return ('')
                return(Number(res[0].toFixed(8)));
            }

            const result=''

            if(!action.payload)
                return {...state, result:''}
            if(action.payload==='error')
                return {...state, result:'error'}

            return {...state, result: Compute(action.payload)}
        }
        case COLOR:{
            return {...state, color: action.payload}
        }
        default: return state
    }
}