/** 

Prints all positive integers from 1 to 100 in numeric order

* indicates whether number is `odd` or `even`
* if divisible by three, instead states this
* if divisible by two and three, instead states this

 */

 for(let lcv = 1; lcv <= 100; lcv++) {
     let statement = "The number '" + lcv + "' is ";

     if(lcv % 2 === 0 && lcv % 3 === 0) {
         statement += "divisible by two and three";
     } else if(lcv % 3 === 0) {
         statement += "divisible by three";
     } else if(lcv % 2 === 0) {
         statement += "even";
     } else {
         statement += "odd";
     }

     console.log(statement);
 }