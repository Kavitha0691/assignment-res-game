const gameLevel1 = [
    { 
        first: "wood", 
        options: ["pecker", "land", "house"], 
        answer: "pecker", 
        hint: "It's a type of bird!" 
    },
    { 
        first: "book", 
        options: ["shelf", "cover", "shop"], 
        answer: "cover", 
        hint: "It's the outer part of a book!" 
    },
    { 
        first: "post", 
        options: ["box", "man", "office"], 
        answer: "man", 
        hint: "A human being, typically an adult male." 
    },
    { 
        first: "sky", 
        options: ["fall", "view", "blue"], 
        answer: "view", 
        hint: "A perspective of the sky from a particular location." 
    },
    { 
        first: "rain", 
        options: ["drop", "coat", "forest"], 
        answer: "drop", 
        hint: "A small, round quantity of liquid, often falling from a height." 
    },
    { 
        first: "shoe", 
        options: ["lace", "heel", "sole"], 
        answer: "lace", 
        hint: "It's something you tie on your shoe!" 
    }
];

let score = 0;
let wins = 0;
let losses = 0;
let currentPairIndex = 0;
let hintUsed = false;

const updateScoreboard = () => {
    $("#score-display").text(`Score: ${score}`);
    $("#win-loss-counter").text(`Wins: ${wins} | Losses: ${losses}`);
};

const newOptions = (pair) => {
    $("#options-container").empty();
    pair.options.forEach(option => {
        const button = $(`<button class="option-button">${option}</button>`);
        button.on("click", () => handleUserInput(option));
        $("#options-container").append(button);
    });
};

const startGame = () => {
    score = 0;
    wins = 0;
    losses = 0;
    currentPairIndex = 0;
    hintUsed = false;

    $("#start-button").hide();
    $("#replay-button").show();
    $("#player-indicator").text("");
    $("#message-area").empty(); 
    $("#options-container").empty();
    updateScoreboard();

    showNextPair();
};

const showNextPair = () => {
    $(".game-container").show(); 
    $("#message-area").empty(); 

    if (currentPairIndex < gameLevel1.length) {
        const pair = gameLevel1[currentPairIndex];
        $("#player-indicator").text(`What pairs with: "${pair.first}"`);
        newOptions(pair);
    } else {
        endGame();
    }
};

const handleUserInput = (userInput) => {
    const pair = gameLevel1[currentPairIndex];
    $("#message-area").empty(); 

    if (userInput === pair.answer) {
        score++;
        wins++;
        updateScoreboard();
        $(".game-container").hide();
        $("#message-area").append(`<p class="message success">\u2705 Correct! Great job.</p>`);
        setTimeout(() => {
            currentPairIndex++;
            hintUsed = false;
            showNextPair();
        }, 2000); 
    } else if (!hintUsed) {
        hintUsed = true;
        $(".game-container").hide(); 
        $("#message-area").append(`<p class="message hint">\u{1F4A1} Hint: ${pair.hint}</p>`);
        setTimeout(() => {
            $("#message-area").empty();
            $(".game-container").show(); 
        }, 3000); 
    } else {
        losses++;
        updateScoreboard();
        $(".game-container").hide();
        $("#message-area").append(`<p class="message error">\u274C Wrong! The correct answer is: "${pair.first}  ${pair.answer}".</p>`);
        setTimeout(() => {
            currentPairIndex++;
            hintUsed = false;
            showNextPair();
        }, 3000); 
    }
};

const endGame = () => {
    $(".game-container").fadeOut(500, () => { 
        $("#message-area").empty();
        $("#message-area").append(`<p class="message final">Game Over! Your Score: ${score}/${gameLevel1.length} \u{1F3C6}</p>`);
        
        $("#message-area").fadeIn(500).delay(2000).fadeOut(500, () => { 
            $(".game-container").fadeIn(500); 
            $("#replay-button").show(); 
            $("#options-container").hide();
            $("#player-indicator").hide();
        });
    });

    $("#replay-button").off("click").on("click", () => {
        score = 0;
        wins = 0;
        losses = 0;
        currentPairIndex = 0;
        hintUsed = false;
        updateScoreboard();

        $("#start-button").hide();
        $("#replay-button").show();
        $("#options-container").show();
        $("#message-area").empty().show(); 
        $("#player-indicator").show();

        showNextPair();
    });

    $("#replay-button").hide(); 
};

const handleCancelClick = () => {
    $(".game-container").hide();
    $("#message-area").empty();
    $("#message-area").append(`<p class="message final">Game Over! Your Score: ${score}/${gameLevel1.length} \u{1F3C6}</p>`);
    $("#message-area").fadeIn(500);
    $("#replay-button").show(); // Show the replay button after cancelling
};

// Attach event listeners
$("#cancel-button").on("click", handleCancelClick);
// Attach event listeners
$("#start-button").on("click", startGame);
$("#replay-button").on("click", startGame);

$("#replay-button").hide();
updateScoreboard();

$(document).ready(() => {
    $("#start-button").on("click", startGame);
    $("#replay-button").on("click", startGame).hide(); 
});

const addBackgroundVideo = () => {
    const video = document.createElement("video");
    video.src = "./images/wordgamevideo.mp4"; 
    video.autoplay = true;
    video.loop = true;
    video.muted = true; 
    video.playsInline = true; 

    video.style.position = "fixed";
    video.style.top = "0";
    video.style.left = "0";
    video.style.width = "100%";
    video.style.height = "100%";
    video.style.objectFit = "cover";
    video.style.zIndex = "-1";

    document.body.appendChild(video);
};

addBackgroundVideo();
