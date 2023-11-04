// OPERATORS IN MONGO DB 

// MongoDb operators are powerful operators 

// 1> LOGICAL OPERATORS :

/*  (we write operators in mongo with a $ symbol in the start of operator)
   
$inc => it is an increment operator used to increment values 
        Mongo doesn't have a decrement operator so we use  $inc -1,-2,-3.....  instead.

$min => To find the minimum value

$max => To find the Max value

$set => used to set a data   
        (It is equivalent to eg.  book.title="xyz" just write in diff way )

$unset => removing a property from an object 
         ( We can use unset to remove title property from the object Book 
            eg. Book = {
                title : "xyz"
            })

*/ 


// 2> ARRAY OPERATORS 

/* 

$push => Used to insert an element into the array (element is inserted into last position)

$pop => Used to extract/remove/delete last element from an Array.

$pull => it is used to pull any element from an Array
         ( Eg. Book = ["abc", "qwe", "xyz"]
           pull : {
            Book : "qwe"
           })

$addToSet => it has same function as push but it doesn't allows duplicates
*/