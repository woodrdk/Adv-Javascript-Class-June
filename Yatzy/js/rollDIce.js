
  
  
  
//for(var dice=0; dice<6; dice++){}

    var randomdice1 = Math.round(Math.random()*5)
    var randomdice2 = Math.round(Math.random()*5)
    var randomdice3 = Math.round(Math.random()*5)
    var randomdice4 = Math.round(Math.random()*5)
    var randomdice5 = Math.round(Math.random()*5) 

    document.getElementById("dicePic1").src="images/" + diceImage[randomdice1];
    document.getElementById("dicePic2").src="images/" + diceImage[randomdice2];
    document.getElementById("dicePic3").src="images/" + diceImage[randomdice3];
    document.getElementById("dicePic4").src="images/" + diceImage[randomdice4];
    document.getElementById("dicePic5").src="images/" + diceImage[randomdice5];
  
  
  function myMove() {

    var elem = document.getElementById("animate");   
    var pos = 0;
    var id = setInterval(frame, 5);
    function frame() {
      if (pos == 350) {
        clearInterval(id);
      } else {
        pos++; 
        elem.style.top = pos + 'px'; 
        elem.style.left = pos + 'px'; 
      }
    }
  }
  