
// ===== DOM element references =====
let player1 = document.getElementById('player1')        // input: player 1 name
let player2 = document.getElementById('player2')        // input: player 2 name
let firstP = document.getElementById('firstP')          // input: who plays first
let role = document.getElementById("role")              // status bar showing current turn
let start_form = document.getElementById("start-form")// start panel with inputs
let Separation_wall = document.getElementById("Separation_wall")
let btnstart = document.getElementById("btnstart")      // start button
let btnreplay = document.getElementById("btnreplay")    // replay button
let btnExit = document.getElementById("btnExit")        // exit button
let Rep_OR_EX = document.getElementById("Rep_OR_EX")    // replay/exit panel
let player = ''         // name of the player whose turn it is
let Pwinner = ''        // name of the last player who made a move
let item = []           // array holding the 9 board squares
let j = 0;              // counter of filled squares           

// Grab each square (item1 to item9)
for(let i=1 ; i < 10 ; i++){
    item[i] = document.getElementById('item' + i)
}

// Called when a player wins: colors the 3 winning squares, shows the replay/exit panel
function end(num1,num2,num3){
   role.textContent = Pwinner + ' is winner'
   item[num1].style.background = '#000'
   item[num2].style.background = '#000'
   item[num3].style.background = '#000'
   role.style.background ='green'
   Rep_OR_EX.style.display = 'flex'
   Separation_wall.style.display = 'block'

}

// Checks all 8 winning lines (3 rows, 3 columns, 2 diagonals); also detects a draw
function winner(){
// first row
if(item[1].innerHTML == item[2].innerHTML && item[2].innerHTML == item[3].innerHTML && item[1].innerHTML != ''){
  end(1,2,3)
}

// second row
else if(item[4].innerHTML == item[5].innerHTML && item[5].innerHTML == item[6].innerHTML && item[4].innerHTML != ''){
  end(4,5,6)
}

// third row
else if(item[9].innerHTML == item[8].innerHTML && item[8].innerHTML == item[7].innerHTML && item[7].innerHTML != ''){
  end(7,8,9)
}

// diagonal (top right -> bottom left)
else if(item[3].innerHTML == item[5].innerHTML && item[5].innerHTML == item[7].innerHTML && item[7].innerHTML != ''){
  end(3,5,7)
}

// diagonal (top left -> bottom right)
else if(item[1].innerHTML == item[5].innerHTML && item[5].innerHTML == item[9].innerHTML && item[1].innerHTML != ''){
  end(1,5,9)

}

// first column
else if(item[1].innerHTML == item[4].innerHTML && item[4].innerHTML == item[7].innerHTML && item[1].innerHTML != ''){
  end(1,4,7)

}
// second column
else if(item[2].innerHTML == item[5].innerHTML && item[5].innerHTML == item[8].innerHTML && item[2].innerHTML != ''){
  end(2,5,8)

}
// third column
else if(item[3].innerHTML == item[6].innerHTML && item[6].innerHTML == item[9].innerHTML && item[3].innerHTML != ''){
  end(3,6,9)

}else{
  // no winner: if all 9 squares are filled it's a draw
  if(j==9){
   Rep_OR_EX.style.display = 'flex'
   role.textContent = 'Draw'
   role.style.background = '#ff0000'
   Separation_wall.style.display = "block"
  }

 }

}

// Handles a click on a square: checks the square is empty, then places X or O
function game(id){

    j++ // assume the move is valid, increment the counter
      // square already contains X
      if(document.getElementById(id).textContent == 'X'){
       document.getElementById(id).textContent = 'X'
        j-- // undo the counter
        role.style.background ='red'
        role.textContent = 'please select another square'

      }else if(document.getElementById(id).textContent == 'O'){
        // square already contains O
        j--
       document.getElementById(id).textContent = 'O'
       role.style.background ='red'
       role.textContent = 'please select another square'
      }


      else{
        // square is empty: place the mark and switch turns
          if(player == player1.value){
         // current player is player1 -> put X, next turn goes to player2
         document.getElementById(id).textContent = 'X'
         role.textContent = 'this turn is : ' + player2.value
         player = player2.value
         Pwinner = player1.value

    }else{
         // current player is player2 -> put O, next turn goes to player1
         document.getElementById(id).textContent = 'O'
        role.textContent = 'this turn is : ' + player1.value
        player = player1.value
        Pwinner= player2.value
    }

 role.style.background ='#dcdcdc'
      }
 
winner() // check for a win or draw after every move   

} 



// Removes < and > characters to prevent HTML injection (XSS protection)
function sanitize(value){
    return value.replace(/[<>]/g, '')
}

// Validates the start form, then starts the game
function start_game(){

    // mark empty fields with a red border
    if(player1.value == '')
     document.getElementsByTagName('input')[0].style.border = '4px solid red'
  
  if(player2.value == '')
      document.getElementsByTagName('input')[1].style.border = '4px solid red'
  
  if(firstP.value == '')
      document.getElementsByTagName('input')[2].style.border = '4px solid red'

    // first player name must match one of the two players
    if(player1.value != '' && player2.value != '' && firstP.value != '' && firstP.value != player1.value && firstP.value != player2.value){
       window.alert('The first player name must be player 1 or player 2')
       return;
    }
    
    

    // the two players must have different names
    if(player1.value != '' && player2.value != '' && player1.value == player2.value){
      alert("Player 1 and player 2 names must be different")
      return;
    }
      
    
     

    // everything is valid: start the game (unblur board, enable clicks, hide panel)
    if(player1.value != '' && player2.value != '' && firstP.value != ''){
       player = sanitize(firstP.value)
       role.textContent = 'this turn is :' + player
       Separation_wall.style.display = 'none'
       start_form.style.display = 'none'
       return;
    }
     

  
  
   
}




// Restores the normal border color while typing in an input
function error(id){
  document.getElementById(id).style.border = '4px solid rgb(206, 134, 0)'

}


btnreplay.onclick = function(){
  j = 0;

  item.forEach(item => {
    item.textContent = '';
    item.style.backgroundColor = "#430179"
  })

  role.style.backgroundColor = "#dcdcdc"
  role.textContent = 'this turn is : ' + player

  Rep_OR_EX.style.display = "none"
  Separation_wall.style.display = "none"
  
}

// Exit: closes the browser tab/window
btnExit.onclick = function(){
  window.close()
}








