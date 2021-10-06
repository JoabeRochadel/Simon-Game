function main () {
    const buttonColors = ["red", "blue", "green", "yellow"];
    let gamePattern = [];
    let userClickedPattern = [];

    let started = false;
    let level = 0;

    function fAudio(param) {
        let audio = new Audio(`sounds/${param}.mp3`);
        audio.play();
    }

    function animatePress(currentColour) {
        $(`#${currentColour}`).addClass("pressed");
        setTimeout(function () {
            $(`#${currentColour}`).removeClass("pressed")
        }, 100);
    }

    function checkAnswer(currentValue) {
        if (gamePattern[currentValue] === userClickedPattern[currentValue]) {
            console.log("Sucess");

            if (userClickedPattern.length === gamePattern.length) {
                setTimeout(function () {
                    nextSequence();
                }, 1000);
            }
        } else {
            fAudio("wrong");
            startOver();
        }
    }

    function nextSequence() {
        userClickedPattern = [];
        level++;
        $("h1").text(`level ${level}`);
        let randomNumber = Math.floor(Math.random() * 4);
        let randomChosenColour = buttonColors[randomNumber]; // return a color, red, blue etc...
        gamePattern.push(randomChosenColour);

        $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
        fAudio(randomChosenColour);
    }

    function startOver() {
        level = 0;
        gamePattern.splice(0, gamePattern.length);
        started = false;
    }

    $(".btn").on("click", function () {
        let userChosenColour = (this).id;

        userClickedPattern.push(userChosenColour);
        fAudio(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);
    });

    $("body").keydown(function () {
        if (!started) {
            $("h1").text(`level ${level}`);
            nextSequence();
            started = true;
        }
    });
}

main();