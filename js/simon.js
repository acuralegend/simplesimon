var pattern = [];
  var usedPattern = [];
  var level = 0;
  var gameOverCheck = false;      //Simple check condition to see if the game is over.
                                  // I can probably re-use this to do error-control in
                          02        // future scripts.

  function addPattern() {
    var pValue = randNum(1, 4); //These are integers I'm going to use for randomness


                                // add pattern to array
    pattern.push(pValue);
  }


  function playPattern() {
                              // takes pattern array
    for (var i = 0; i < pattern.length; i++) {
      var delayTime = i * 600;

      setTimeout(flashSquare, delayTime);
    }

  }

                                  // This is how I generate the pattern. I figured random numbers are cool, and to
                                  // keep from getting a 0 or a crazy impossible pattern.
  function randNum(min, max) {
    return Math.round(Math.random() * (max - min)) + min ;
  }


  function flashSquare() {

    var item = pattern.pop();
    gameOverCheck = true;

       // remove first item of array
    $('#' + item).animate({
      opacity: 0.2
    }, 200).animate({
      opacity: 1
    }, 100);
    //animation takes 300 ms

    usedPattern.push(item);
    // take the item  removed from pattern and add it to used pattern

    if (pattern.length <= 0) {

      createClicks();
    }

  } // end flashSquare()

  function createClicks() {
    $('.square').click(function() {



      // just a check to see if clicked item is the correct square
      var item = usedPattern.shift();

      var squareId = $(this).attr('id');

      $(this).animate({opacity:.2},200).animate({opacity:1},100)

      // if answer is yes then delete pattern/add to current
      if (item == squareId) {

        //adds item back to pattern array
        pattern.push(item);

        if (usedPattern.length <= 0) {
          level++;
          $('#level').html('Level: ' + level);



          //Take all the clicks away
          removeClicks();


          //user is finished clicking through the pattern successfully
          // add new square to pattern
          addPattern();

          // How long will it take to show the full pattern?
          setTimeout(playPattern, 800);
        }

      } else {
        // The simple check to see if the game is over
        gameOverCheck = false;
        $('h1').html('Game Over').css({
          fontSize: 20,
          marginBottom: 0,
          paddingTop: 0
        });
        $('p').html('Click for me drawrrrrrings....to begin again');
        // clear out pattern arrays
        pattern = [];
        usedPattern = [];
      }


    });
  }

  function removeClicks() {

    //removes all the events events from the element
    $('.square').unbind();

  }


                                // Starts game
  function startGame() {
    removeClicks();
    resetGame();
    addPattern();
    addPattern();
    playPattern();
  }


//Go back to Zero
  function resetGame() {
    level = 0;

    $('#level').html('Level: ' + level);
    $('h1').html('Simon').css({
      fontSize: 20,
      marginBottom: 0,
      paddingTop: 0
    });
    $('p').html('Click for me drawrrrrrings....');
  }

//click and start the game
  $('#centerCircle').click(function() {
    if(gameOverCheck === false){
      startGame();
    }
  });
