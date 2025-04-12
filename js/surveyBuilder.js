/*
    All content in this file was generated by Github Copilot
*/




function loadSurveyBuilder() {
    // Dynamically load the survey builder HTML
    fetch('components/surveyBuilder.html')
        .then(response => response.text())
        .then(html => {
            clearDashboard();
            let divSurveyBuilderWrapper = document.createElement('div');
            divSurveyBuilderWrapper.id = 'divSurveyBuilderWrapper';
            divSurveyBuilderWrapper.className = 'scrollable-container'; // Add a class for styling
            document.querySelector('#divDashboard').appendChild(divSurveyBuilderWrapper);
            document.getElementById('divSurveyBuilderWrapper').innerHTML = html;

            // Initialize survey builder functionality
            document.getElementById('surveyForm').addEventListener('submit', function (e) {
                e.preventDefault();
                const surveyData = [];
                for (let i = 1; i <= questionCount; i++) {
                    const questionElement = document.getElementById(`question-${i}`);
                    if (questionElement) {
                        const questionText = document.getElementById(`questionText-${i}`).value;
                        const questionType = document.getElementById(`questionType-${i}`).value;
                        const options = [];
                        if (questionType === 'multipleChoice') {
                            const optionElements = document.querySelectorAll(`#options-${i} input`);
                            optionElements.forEach(option => options.push(option.value));
                        }
                        surveyData.push({ questionText, questionType, options });
                    }
                }
                console.log('Survey Data:', surveyData);
                if (surveyData.length == 0) {
                    Swal.fire({
                        title: "Oops!",
                        text: "You must add at least one question before sending a survey.",
                        icon: "error"
                    })
                }

                // Send the survey to all groups in the project
                else {
                    Swal.fire({
                        title: "Success!",
                        text: "Survey sent to all groups!",
                        icon: "success"
                      });
                }
                
            });
        })
        .catch(error => console.error('Error loading survey builder:', error));
}


let questionCount = 0;

function addQuestion() {
    questionCount++;
    const questionHTML = `
        <div class="question mb-4" id="question-${questionCount}">
            <label for="questionText-${questionCount}" class="form-label">Question ${questionCount}</label>
            <input type="text" id="questionText-${questionCount}" class="form-control mb-2" placeholder="Enter your question" required>
            <select id="questionType-${questionCount}" class="form-select mb-2" onchange="updateQuestionType(${questionCount})">
                <option value="multipleChoice">Multiple Choice</option>
                <option value="likert">Likert Scale</option>
                <option value="shortAnswer">Short Answer</option>
            </select>
            <div id="optionsContainer-${questionCount}">
                <!-- Options for multiple choice or Likert scale will be added here -->
            </div>
            <button type="button" class="btn btn-danger mt-2" onclick="removeQuestion(${questionCount})">Remove Question</button>
        </div>
    `;
    document.getElementById('questionsContainer').insertAdjacentHTML('beforeend', questionHTML);
}

function updateQuestionType(questionId) {
    const questionType = document.getElementById(`questionType-${questionId}`).value;
    const optionsContainer = document.getElementById(`optionsContainer-${questionId}`);
    optionsContainer.innerHTML = '';

    if (questionType === 'multipleChoice') {
        optionsContainer.innerHTML = `
            <button type="button" class="btn btn-secondary mb-2" onclick="addOption(${questionId})">Add Option</button>
            <div id="options-${questionId}">
                <!-- Options will be added here -->
            </div>
        `;
    } else if (questionType === 'likert') {
        optionsContainer.innerHTML = `
            <p>Likert scale will have predefined options (e.g., Strongly Disagree to Strongly Agree).</p>
        `;
    }
}

function addOption(questionId) {
    const optionsDiv = document.getElementById(`options-${questionId}`);
    const optionCount = optionsDiv.children.length + 1;
    const optionHTML = `
        <div class="input-group mb-2">
            <input type="text" class="form-control" placeholder="Option ${optionCount}" required>
            <button type="button" class="btn btn-danger" onclick="this.parentElement.remove()">Remove</button>
        </div>
    `;
    optionsDiv.insertAdjacentHTML('beforeend', optionHTML);
}

function removeQuestion(questionId) {
    questionCount--;
    document.getElementById(`question-${questionId}`).remove();
}

function previewSurvey() {
    const previewContainer = document.getElementById('previewContainer');
    previewContainer.innerHTML = ''; // Clear previous preview

    for (let i = 1; i <= questionCount; i++) {
        const questionElement = document.getElementById(`question-${i}`);
        if (questionElement) {
            const questionText = document.getElementById(`questionText-${i}`).value;
            const questionType = document.getElementById(`questionType-${i}`).value;

            const questionPreview = document.createElement('div');
            questionPreview.classList.add('mb-4');

            // Add question text
            const questionLabel = document.createElement('p');
            questionLabel.textContent = `${i}. ${questionText}`;
            questionPreview.appendChild(questionLabel);

            // Add input fields based on question type
            if (questionType === 'multipleChoice') {
                const options = document.querySelectorAll(`#options-${i} input`);
                options.forEach(option => {
                    const optionLabel = document.createElement('div');
                    optionLabel.classList.add('form-check');
                    optionLabel.innerHTML = `
                        <input class="form-check-input" type="radio" disabled>
                        <label class="form-check-label">${option.value}</label>
                    `;
                    questionPreview.appendChild(optionLabel);
                });
            } else if (questionType === 'likert') {
                const likertOptions = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];
                likertOptions.forEach(option => {
                    const optionLabel = document.createElement('div');
                    optionLabel.classList.add('form-check');
                    optionLabel.innerHTML = `
                        <input class="form-check-input" type="radio" disabled>
                        <label class="form-check-label">${option}</label>
                    `;
                    questionPreview.appendChild(optionLabel);
                });
            } else if (questionType === 'shortAnswer') {
                const shortAnswerInput = document.createElement('input');
                shortAnswerInput.type = 'text';
                shortAnswerInput.classList.add('form-control');
                shortAnswerInput.placeholder = 'Short answer text';
                shortAnswerInput.disabled = true;
                questionPreview.appendChild(shortAnswerInput);
            }

            previewContainer.appendChild(questionPreview);
        }
    }

    // Show the modal
    const previewModal = new bootstrap.Modal(document.getElementById('previewModal'));
    previewModal.show();
}
