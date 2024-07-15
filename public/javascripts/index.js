$(document).ready(function() {
    $("#demo").carousel ({
      interval: 2000 // 2 seconds
    });
  });

  window.addEventListener("Load",function(){
    settimeout(
      function open(event){
        document.querySelector(".popup").style.
        display="block";
  
      },
      3000
    )
  });
  
  
  
    document.querySelector("#close").addEventListener
    ("click", function(){
      document.querySelector(".popup").style.display="none";
    });
    
    const overlay = document.querySelector('.overlay');
    const popup = document.querySelector('.popup');
    const close = document.querySelector('#close');
    
    function openPopup() {
      overlay.classList.remove('hide');
      popup.classList.remove('hide');
    }
    
    function closePopup() {
      overlay.classList.add('hide');
      popup.classList.add('hide');
    }
    
    close.addEventListener('click', closePopup);


    function showImage(imageId) {
      // Hide all images
      var images = document.getElementsByClassName("menu");
      for (var i = 0; i < images.length; i++) {
        images[i].style.display = "none";
      }
    
      // Show the selected image
      var image = document.getElementById(imageId);
      image.style.display = "block";
    }
    

  //modal footer button changes color after i click on it

    const button = document.querySelector('.modal-footer button');
    button.addEventListener('click', function() {
      button.classList.add('clicked');
    });

   
//----------------------------------EDIT DELETE BUTTON------------------------------------------//


    

 //------------------------------------------------------------//

//  var modal = document.getElementById("myModal2");

//     // Get the button that opens the modal
//     var btn = document.getElementById("myBtn2");
    
//     // Get the <span> element that closes the modal
//     var span = document.getElementsByClassName("close")[0];
    
//     // When the user clicks the button, open the modal 
//     btn.onclick = function() {
//       modal.style.display = "block";
//     }
    
//     // When the user clicks on <span> (x), close the modal
//     span.onclick = function() {
//       modal.style.display = "none";
//     }
    
//     // When the user clicks anywhere outside of the modal, close it
//     window.onclick = function(event) {
//       if (event.target == modal) {
//         modal.style.display = "none";
//       }
//     }