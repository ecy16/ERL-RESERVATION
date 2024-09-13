/*register*/
document.getElementsByClassName("register-wrapper") 
.addEventListener("submit" ,function (event)
{
       const firstname = document('fname').value
       const lastname  = document.getElementsById('lname').value;
       const national  =document.getElementsById('national-id').value;
       const address   =document.getElementsById('address').value;
       const email     =document.getElementsById('mail').value;





       if (firsrtname===""){
              alert('please enter firstname');
              event.preventDefault();

       }
                if (lastname===""){
              alert('please enter lastname');
              event.PreventDefault();
              
       }
       if (national===""){
              alert('please enter National Id no');
              event.PreventDefault();
              
       }
       if (address===""){
              alert('please enter address');
              event.PreventDefault();
              
       }
       if (email===""){
              alert('please enter email');
              event.PreventDefault();
              
       }
});
