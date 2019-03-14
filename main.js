window.onload = function () {
    var unit, numerator, denominator, multiplayer,
        ansNumerator, ansDenominator, factor,
        turnCounter, correctCounter;
    correctCounter = 0;
    turnCounter = 0;

    var uiElems = {// dictionaryt of textbox ids 
        // txtFullNumUnsimp: "txtFullNumUnsimp",
        txtNumerUnsimp: "txtNumerUnsimp",
        txtDinomUnsimp: "txtDinomUnsimp",
        // txtFullNumSimp: "txtFullNumSimp",
        txtNumerSimp: "txtNumerSimp",
        txtDinomSimp: "txtDinomSimp"
    };
    var scoreBoard = "scoreBoard";// id of score p tag
    var btnCheck = "btnCheck";// stored the id of the button 

    el().addEventListener("click", function () {//check answer button listener
        checkAns();
    });

    var setupEvents = function () {
        //used to add events to the textboxes so that when enter is pressed the check answer function is run 
        for (var key in uiElems) {
            el(key).addEventListener("keyup", function (e) {
                if (e.isComposing || e.keyCode === 13) {
                    checkAns();
                }
            });
        }
    };

    var checkAns = function () {
        if (turnCounter < 10) {// checks if the game is over
            if (checkAnsValid()) {// checks if the textboxes have been left blank
                // if (unit == el(uiElems.txtFullNumSimp).value &&
                //     ansNumerator == el(uiElems.txtNumerSimp).value &&
                //     ansDenominator == el(uiElems.txtDinomSimp).value) {

                // used to compare correct answers to the user entered answers
                if (ansNumerator == el(uiElems.txtNumerSimp).value &&
                    ansDenominator == el(uiElems.txtDinomSimp).value) {
                        //if the user is correct the game will add a point to the correct answer 
                    correctCounter++;
                }
                turnCounter++;
                if (turnCounter < 10) {// used to check if the game is over
                    //if not the next question will be generated
                    nextQuestion();
                } else {
                    // if the game is over a textbox will be displayed to show the user score
                    el(scoreBoard).innerText = " You Scored " + correctCounter + " out of 10";
                }
            }
        }
    };

    var checkAnsValid = function () {//used to check if user input is valid
        for (var key in uiElems) { //need to change needless looping
            if (el(key).value == "") {
                alert(getError(key, true));
                return false;
            } else {
                if (Number.isSafeInteger(el(key).value)) {
                    alert(getError(key, false));
                    return false;
                }
            }
        }
        return true;
    };

    var getError = function (id, errorType) {// used to build the error message
        var element;
        switch (id) {
            // case uiElems.txtFullNumSimp:
            //     element = "whole number";
            //     break;
            case uiElems.txtNumerSimp:
                element = "numerator";
                break;
            case uiElems.txtDinomSimp:
                element = "denominator";
                break;
        }
        if (errorType) {
            return "The " + element + " textbox has been left blank";
        }
        return "The " + element + " textbox has a number that is way too big";
    };

    var getAnswer = function () {// used to calculate the answers
        factor = gcd(Math.abs(numerator), Math.abs(denominator));
        ansNumerator = numerator / factor;
        ansDenominator = denominator / factor;
    };

    var genQuestion = function () {//used to generate the questions
        // unit = randFromRange(0, 10);
        numerator = randFromRange(1, 10);
        denominator = randFromRange(numerator + 1, numerator + 5);
        multiplayer = randFromRange(1, 10);
        numerator = numerator * multiplayer;
        denominator = denominator * multiplayer;
        getAnswer();
        if (!(factor > 1)) {
            genQuestion();
        }
    };

    var clearUI = function () {// used to clear the textboxes
        for (var key in uiElems) {
            el(key).value = "";
        }
    };

    var setQuestion = function () { //used to show the unsimplified fraction
        // el(uiElems.txtFullNumUnsimp).value = unit;
        el(uiElems.txtNumerUnsimp).value = numerator;
        el(uiElems.txtDinomUnsimp).value = denominator;
    }

    var randFromRange = function (s, e) { //s will store the starting value and e will stone the end value
        //return value will be a random integer from a predefined range.
        return Math.floor(Math.random() * e) + s;
    };

    function el(elem) { // used to shorten the code
        return document.getElementById(elem);
    }

    //https://stackoverflow.com/questions/17445231/js-how-to-find-the-greatest-common-divisor
    var gcd = function (a, b) { //used to find the smallest factor
        if (!b) {
            return a;
        }
        return gcd(b, a % b);
    };

    var nextQuestion = function () { //used in preparation for the next question
        if (turnCounter < 10) {
            clearUI();
            genQuestion();
            setQuestion();
        }
    };

    var init = function () { //starting point of the application
        clearUI();
        setupEvents();
        genQuestion();
        setQuestion();
    };

    init(); // <-- starting point
};