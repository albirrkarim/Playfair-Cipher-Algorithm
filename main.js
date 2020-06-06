console.log("Play Fair Chipper Algorithm");
/*
Nama        : AL BIRR KARIM SUSANTO
NIM         : A11.2017.10642
Kelompok    : A11.4601

*/


function except(exception=""){
    /* 
    Mencegah huruf yang sama
    jika parameter exeption di isi maka
    
    "exception"+(karakter yang ada di "sentences" dan tidak ada di "exception"

    func("good","")  -> "god"
    func("sweep","") -> "swep"
    func("sweep","we") -> "wesp"
    */
    exception = exception.toUpperCase();
    var sentences    = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
    var ada,i,j;
    for(i=0,len=sentences.length;i<len;i++){
        ada=false;
        for(j=0,lenJ=exception.length;j<lenJ;j++){
            if(sentences[i]==exception[j]){
                ada=true;
                j=lenJ;
            }
        }
        if(!ada){
            exception+=sentences[i];
        }
    }
    return exception;
}

function toMatrix(text){
    /* 
    Array satu dimensi ke array dua dimensi (matrix)
    */
    var matrix=[],i,j,idx=0,baris;
    
    for(i=0;i<5;i++){
        baris=[];
        for(j=0;j<5;j++){
            baris.push(text[idx]);
            idx++;
        }
        matrix.push(baris);
    }
    return matrix;
}

function normalizePlainText(text){
    text = text.toUpperCase();
    text = text.split(" ").join("");
    var newText="",idx=0,i;

    for(i=0,len=text.length;i<len;i++){
        if(idx<=len-1){
            if(idx+1==len){
                newText+=text[idx]+"Z";
                newText+=" ";
                break;
            }
            else if(text[idx]!=text[idx+1]){
                newText+=text[idx]+text[idx+1];
                newText+=" ";
                idx+=2;
            }
            else{
                newText+=text[idx]+"Z";
                newText+=" ";
                idx++;
            }
        }
    }

    return newText;
}

function whereLocation(matrix,character){
    /* 
    Cari "character" di matrix
    return {
        baris:
        kolom:
    }
    */
    var i,j,len=matrix[0].length;
    for(i=0;i<len;i++){
        for(j=0;j<len;j++){
            if(matrix[i][j]==character){
                return{
                    baris:i,
                    kolom:j,
                };
            }
        }
    }
    return false;
}

function transEncrypt(matrix,text){
    var i,kata=text.split(" "),
        stringOut="",
        karakter1Out="",
        karakter2Out="";  

    for(i=0,len=kata.length;i<len;i++){
        if(kata[i]!=""){

            karakter1=whereLocation(matrix,kata[i][0]);
            karakter2=whereLocation(matrix,kata[i][1]);
            
            
            if(karakter1.baris==karakter2.baris){
                /* Jika baris sama */
                karakter1Out=matrix[karakter1.baris][(karakter1.kolom+1)%5];
                karakter2Out=matrix[karakter1.baris][(karakter2.kolom+1)%5];
            }
            else if(karakter1.kolom==karakter2.kolom){
                /* Jika kolomnya sama */
                karakter1Out=matrix[(karakter1.baris+1)%5][karakter1.kolom];
                karakter2Out=matrix[(karakter2.baris+1)%5][karakter1.kolom];
            }
            else{
                /* Jika baris dan kolom berbeda */
                karakter1Out=matrix[karakter1.baris][karakter2.kolom];
                karakter2Out=matrix[karakter2.baris][karakter1.kolom];
            }
            stringOut+=karakter1Out+karakter2Out+" ";
        }
    }
    return stringOut;
}

function transDecrypt(matrix,text){
    var i,kata=text.split(" "),
        stringOut="",
        karakter1Out="",
        karakter2Out="";
   
    for(i=0,len=kata.length;i<len;i++){
        if(kata[i]!=""){
            karakter1=whereLocation(matrix,kata[i][0]);
            karakter2=whereLocation(matrix,kata[i][1]);

            if(karakter1.baris==karakter2.baris){
                
                /* Jika baris sama */
                a = karakter1.kolom-1
                if (a<0){
                    a=4
                }

                b = karakter2.kolom-1
                if (b<0){
                    b=4
                }

                karakter1Out=matrix[karakter1.baris][a];
                karakter2Out=matrix[karakter1.baris][b];
            }
            else if(karakter1.kolom==karakter2.kolom){
                /* Jika kolomnya sama */
                a = karakter1.baris-1
                if (a<0){
                    a=4
                }

                b = karakter2.baris-1
                if (b<0){
                    b=4
                }

                karakter1Out=matrix[a][karakter1.kolom];
                karakter2Out=matrix[b][karakter1.kolom];
            }
            else{
                /* Jika baris dan kolom berbeda */
                karakter1Out=matrix[karakter1.baris][karakter2.kolom];
                karakter2Out=matrix[karakter2.baris][karakter1.kolom];
            }
            stringOut+=karakter1Out+karakter2Out+" ";
        }
    }
    return stringOut;
}


function encrypt(PlainText,Key){
    Matrix      = toMatrix(except(Key));
    // console.log(PlainText)
    PlainText   = normalizePlainText(PlainText);
    // console.log(PlainText)
    return transEncrypt(Matrix,PlainText);
}

function decrypt(Chipper,Key){
    
    var Matrix  = toMatrix(except(Key));
    // console.log(Matrix)
    return transDecrypt(Matrix,Chipper);
}


var Key         = "MONARCHY";
var PlainText   = "AL BIRR KARIM SUSANTO";
/* j is equal with i */

console.log("Kunci : \n",Key)
console.log("PlainText : \n",PlainText)

var Chipper = encrypt(PlainText,Key);

console.log("Chipper : \n",Chipper);

var result = decrypt(Chipper,Key); 

console.log("Plain text hasil decrypt : \n",result)