/**
 * Example store structure
 */
let answered = false;

const store = {
    // 5 or more questions are required
    questions: [{
            question: 'Question 1 of 5: What is the main cause of falling asleep during a meditation?',
            answers: [
                'Inadequate Sleep',
                'Wandering Thoughts',
                'Poor Posture',
                'All of these'
            ],
            correctAnswer: '4'
        },
        {
            question: 'Question 2 of 5: How does meditation affect the mind?',
            answers: [
                'Increased Lethargy',
                'Increased Stress',
                'Increased Memory & Cognitive Ability',
                'Increased Desire for Sugary Foods'
            ],
            correctAnswer: '3'
        },
        {
            question: 'Question 3 / 5: What is the best time to meditate?',
            answers: [
                'When you are energized & alert',
                'When in a noisy room',
                'After exhausting exercise',
                'After a meal'
            ],
            correctAnswer: '1'
        },
        {
            question: 'Question 4 of 5: Which of the following statements is true about meditation?',
            answers: [
                'You need strong visualization to do it',
                'It is boring and never gets easier',
                'You need to be very calm in order to start doing it',
                'Anyone can immediately benefit from practicing it'
            ],
            correctAnswer: '4'
        },
        {
            question: 'Question 5 of 5: What should you do if you see/hear strange things during a meditation session?',
            answers: [
                'Seek medical help',
                'Hold your breath',
                'Calmly ignore the experience and continue your practice',
                'Travel to India and dance around'
            ],
            correctAnswer: '3'
        }
    ],
    quizStarted: false,
    questionNumber: 0,
    score: 0
};


/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates
function generateQuestion(chosenIndex) {
    let questionData = store.questions[store.questionNumber];
    answered = false;
    //+ questionData.question +
    //+ store.questions[store.questionNumber].answers[0] +
    return ` <form id="question-form">
   
    <div class="item-question">
        <h3>` + questionData.question + `</h3>
    </div>

    <div class="responses">
        <div class="response-option">
            <input type="radio" id='rb' class="radio-button" name="rb" value="1" >
            <label for="1">` + store.questions[store.questionNumber].answers[0] + `</label>
        </div>
        <div class="response-option">
            <input type="radio" id='rb' class="radio-button" name="rb" value="2" >
            <label for="2">` + store.questions[store.questionNumber].answers[1] + `</label>
        </div>
        <div class="response-option">
            <input type="radio" id='rb' class="radio-button" name="rb" value="3" >
            <label for="3">` + store.questions[store.questionNumber].answers[2] + `</label>
        </div>
        <div class="response-option">
            <input type="radio" id='rb' class="radio-button" name="rb" value="4" >
            <label for="4">` + store.questions[store.questionNumber].answers[3] + `</label>
        </div>
        <div class="response-option">
        <p id='correct-message' class='hide'><i>That answer is correct! Click Continue to Proceed</i></p>
        <p id='incorrect-message' class='hide'><i>Oops, that's not right... Click Continue to Proceed</i></p>

        </div>
        <div class="response-option">
        <button id='answer-button' class='stylish-button hide'>Answer</button>

        <button id='next-button' class='stylish-button hide'>Continue</button>
        </div>
        <div class="response-option">
        <p id="score">Current Score: ` + store.score + ` / 5 </p>
        </div>
    </div>
</form>`;

}

function generateIntro() {
    return `<div class ="intro-img">
    <img class="start-img" src="images/meditation.png" alt="header landscape graphic"></img>
    <div class="intro">

        <h1>Meditation Fundamentals Quiz App</h1>
        <p>Use this quiz to identify any problem spots with your meditation practice and correct them! This is part of my Thinkful Flex Engineering Program Quiz-App.
        </p>
    </div>
</div>`;
}

function generatePreQuiz() {
    return ` <form id="start-quiz-form"><div class="pre-quiz">
<h2>Are you ready to take the Meditation Fundamentals Quiz?</h2>

    <p><button type="submit" class="stylish-button">Begin</button></p>

</div></form>`
}

function generateResults() {
    return `<form id="results-form"><div class="results">
    
            <div class="results">
                <h3>Results! Let's see how well you did...</h3>
                        <p>You got ` + store.score + ` out of 5 questions correct!</p>
                        <p>I hope you learned some interesting facts about meditation today.</p>  
                        <p><button type="submit" class="stylish-button">Restart</button></p>
             
            </div>
            </div></form>`;
}

/********** RENDER FUNCTION(S) **********/

//replace the <main> tag contents based upon the state
function renderMain(state) {
    let mainHtml = generateIntro();

    if (state == "main") {
        store.score = 0;
        store.questionNumber = 0;
        mainHtml = mainHtml + generatePreQuiz();

    } else if (state == "question") {
        mainHtml = mainHtml + generateQuestion(store.questionNumber);
    } else if (state == "results") { //question-list
        mainHtml = mainHtml + generateResults();
    }
    $('main').html(mainHtml);
}

/********** EVENT HANDLER FUNCTIONS **********/
function handleAnswerButton() {
    $('main').on('click', '#answer-button', function(event) {
        event.preventDefault();
        answered = true;
        $('#answer-button').addClass('hide');
        $('#next-button').removeClass('hide');

        console.log("Hey you clicked a radio button!");
        var value = $('.radio-button:checked').val();

        if (store.questions[store.questionNumber].correctAnswer == value) {
            //show message for correct answer and show next button
            $('#correct-message').removeClass('hide');
            $('#incorrect-message').addClass('hide');
            store.score++;

        } else {
            //show incorrect message
            $('#incorrect-message').removeClass('hide');
            $('#correct-message').addClass('hide');
        }

    });
}

function handleRadioButton() {
    $('main').on('click', '#rb', function(event) {

        console.log("Hey you clicked a radio button!");
        if (!answered) {
            $('#answer-button').removeClass('hide');
            answered = true;
        }
    });
}

function handleNextButton() {
    $('main').on('click', '#next-button', function(event) {
        event.preventDefault();


        store.questionNumber++;

        if (store.questionNumber == 5) {
            renderMain("results");

        } else {
            renderMain("question");
        }

    });
}


function handleStartQuiz() {
    $('#start-quiz-form').submit(function(event) {
        event.preventDefault();
        renderMain("question");
        console.log('`handleNewItemSubmit` ran');
    });
}

//main render callback
function handleMain() {
    console.log("Run Handle main");
    renderMain("main");
    handleStartQuiz();
    handleNextButton();
    handleRadioButton();
    handleAnswerButton();

}

//page loads, call this
$(handleMain);