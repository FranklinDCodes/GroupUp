// When the groups side bar button is clicked, the dashboard should be populated with the groups the user is in
function onClickBtnMenuPanelGroups() {
    boolInProjectsTab = false // Do this so that the plus button in the header bar knows what to do
    clearDashboard()

    // add a header indicating that groups are being displayed
    const objGroupsHeader = document.createElement('h1')
    objGroupsHeader.innerHTML = 'Groups'
    document.querySelector('#divDashboard').appendChild(objGroupsHeader)

    const objUserGroupData = fetchUserGroups() // make a call to the API to get all the groups the user is in

    let objDashboardData = []
    // iterate over each group and add them to a JSON obj in the form that the dashboard accepts
    // (must have header, subheader, and uid attributes)
    objUserGroupData.forEach(group => { 
        objDashboardData.push(
            {
                header: group.name,
                subheader: group.projectName,
                uid: group.groupId 
            }
        )
    })
    populateDashboard(objDashboardData, displayGroupMembers)
}

// This function displays all of the members of a given group, including their name and contact info
// This is the func that executes when a group element is clicked on the Home Page, and it
// is the default dashboard for the Groups Page.
function displayGroupMembers(strGroupID) {

    clearDashboard()

    // Since we are changing pages, we need to change the menu panel config to be that of the Groups Page
    populateMenuPanel(objMenuPanelConfigs.objGroupPageConfig)

    console.log(`Loading data for Group ID: ${strGroupID}...`)

    // This data will eventually be retrieved from the API, for now just use dummy data
    // We are getting the name and contact information
    const objGroupMemberInfo = fetchGroupMemberInfo()

    // Add a wrapper div for displaying the group members
    // Needed for formatting
    let divGroupMembersWrapper = document.createElement("div")
    divGroupMembersWrapper.setAttribute('class', 'd-flex justify-content-center flex-column align-items-center')
    divGroupMembersWrapper.setAttribute('id', 'divGroupMembersWrapper')
    document.querySelector('#divDashboard').appendChild(divGroupMembersWrapper)

    // Add the header
    let objGroupMembersHeader = document.createElement("h1")
    objGroupMembersHeader.innerHTML = 'Group Members'
    objGroupMembersHeader.setAttribute('class', 'mt-4')
    document.querySelector('#divGroupMembersWrapper').appendChild(objGroupMembersHeader)

    // Iterate over each group member and add them to the dashboard
    objGroupMemberInfo.forEach(member => {
        let objMemberNameHeader = document.createElement('h4')
        objMemberNameHeader.innerHTML = member.name
        document.querySelector('#divGroupMembersWrapper').appendChild(objMemberNameHeader)

        // Iterate over each available contact method
        Object.keys(member.contactInfo).forEach(key => {
            console.log(key + ' - ' + member.contactInfo[key])
            let objContactMethod = document.createElement('p')
            objContactMethod.innerHTML = `${key}: ${member.contactInfo[key]}` // the key is the name of the contact method (e.g. Discord), and the value is their specific username
            document.querySelector('#divGroupMembersWrapper').appendChild(objContactMethod) // we add the info to the list
        })
    });
}

// This function executes when the surveys menu panel button is clicked in the Groups Page
function viewIssuedSurveys() {
    console.log('Surveys button clicked on Group Page')
    clearDashboard()
    addHeaderToDashboard('Surveys Your Project Leader Has Issued')

    // Fetch data from the API
    const objSurvey = fetchProjectLeaderSurveys()[0]
    const arrGroupMembers = fetchGroupMemberInfo()

    // We need to add the survey to the dashboard.
    // A survey is sent for every group member. For example, if you are working with two
    // other group members, you will receive two copies of one survey. One for each group
    // member. 
    let arrDashboardData = []
    arrGroupMembers.forEach(member => {
        arrDashboardData.push({
            header: objSurvey.title,
            subheader: "Evaluate " + member.name + " (responses are public)", // The user evaluates each group member
            uid: objSurvey.surveyid
        })
    })
    populateDashboard(arrDashboardData, loadSurvey)
}

// Function executes when a survey dashboard element is clicked in the Groups Page.
// It loads a survey into the dashboard for the user to fill out. 
function loadSurvey(strSurveyID) {
    // Fetch all surveys and find the one matching the given survey ID
    const arrSurveys = fetchProjectLeaderSurveys();
    const objSurvey = arrSurveys.find(survey => survey.surveyid == strSurveyID);

    if (!objSurvey) {
        console.error(`Survey with ID ${strSurveyID} not found.`);
        return;
    }

    console.log(objSurvey);

    // Clear the dashboard
    clearDashboard();

    /*
        REMAINDER OF THE loadSurvey FUNC WAS GENERATED BY GITHUB COPILOT
        Copilot assisted in the creation of the survey card format
    */

    // Add a header for the survey
    addHeaderToDashboard(objSurvey.title);

    // Iterate over each question in the survey and generate HTML
    objSurvey.questions.forEach(question => {
        // Create a container for the question
        let divQuestionContainer = document.createElement('div');
        divQuestionContainer.className = 'question-container mb-4';

        // Add the question text
        let objQuestionText = document.createElement('h4');
        objQuestionText.innerHTML = question.questionText;
        divQuestionContainer.appendChild(objQuestionText);

        // Generate the options or input field based on the question type
        if (question.questionType === 'likert' || question.questionType === 'multipleChoice') {
            question.options.forEach(option => {
                let divOption = document.createElement('div');
                divOption.className = 'form-check';

                let inputOption = document.createElement('input');
                inputOption.className = 'form-check-input';
                inputOption.type = 'radio';
                inputOption.name = `question-${question.questionid}`;
                inputOption.id = `option-${question.questionid}-${option}`;
                inputOption.disabled = false; 

                let labelOption = document.createElement('label');
                labelOption.className = 'form-check-label';
                labelOption.setAttribute('for', `option-${question.questionid}-${option}`);
                labelOption.innerHTML = option;

                divOption.appendChild(inputOption);
                divOption.appendChild(labelOption);
                divQuestionContainer.appendChild(divOption);
            });
        } else if (question.questionType === 'shortAnswer') {
            let inputShortAnswer = document.createElement('textarea');
            inputShortAnswer.className = 'form-control';
            inputShortAnswer.placeholder = 'Short answer text';
            inputShortAnswer.disabled = false; 
            divQuestionContainer.appendChild(inputShortAnswer);
        }

        // Append the question container to the dashboard
        document.querySelector('#divDashboard').appendChild(divQuestionContainer);

        
    });
    // Create submission button
    let btnSubmitSurvey = document.createElement('button')
    btnSubmitSurvey.type = 'button'
    btnSubmitSurvey.class = 'btn btn-success mt-3'
    btnSubmitSurvey.innerHTML = 'Submit Survey'
    document.querySelector('#divDashboard').appendChild(btnSubmitSurvey)
}

function viewFeedback() {
    console.log('View feedback button clicked on Groups Page')
    clearDashboard()
    addHeaderToDashboard('View Feedback Your Group Members Have Given You')


    const arrSurveys = fetchProjectLeaderSurveys(); // Fetch all surveys
    const objCurrentSurvey = arrSurveys[0];

    console.log(objCurrentSurvey)

    if (!objCurrentSurvey) {
        console.error('Survey not found');
        return;
    }

    const strGroupID = "ABC"

    const groupResponses = objCurrentSurvey.groupResponses.find(group => group.groupid === strGroupID);

    if (!groupResponses) {
        console.error('Group responses not found for the given group ID.');
        return;
    }



    // Iterate over each member's responses
    groupResponses.memberResponses.forEach(memberResponse => {
        // Create a response card for each member
        const memberCard = document.createElement('div');
        memberCard.className = 'response-card'; // Use the new custom class

        // Add the member's name as the card title
        const memberName = document.createElement('h3');
        memberName.textContent = memberResponse.memberName;
        memberCard.appendChild(memberName);

        // Iterate over each question in the survey
        objCurrentSurvey.questions.forEach(question => {
            const questionContainer = document.createElement('div');
            questionContainer.className = 'mb-4';

            // Add the question text
            const questionText = document.createElement('p');
            questionText.innerHTML = `<strong>${question.questionText}</strong>`;
            questionContainer.appendChild(questionText);

            // Display options based on question type
            if (question.questionType === 'likert' || question.questionType === 'multipleChoice') {
                question.options.forEach(option => {
                    const optionLabel = document.createElement('div');
                    optionLabel.classList.add('form-check');

                    // Check if this option was selected by the member
                    const isSelected = memberResponse.answers.some(
                        answer => answer.question === question.questionText && answer.answer === option
                    );

                    optionLabel.innerHTML = `
                        <input class="form-check-input" type="radio" disabled ${isSelected ? 'checked' : ''}>
                        <label class="form-check-label">${option}</label>
                    `;
                    questionContainer.appendChild(optionLabel);
                });
            } else if (question.questionType === 'shortAnswer') {
                // Find the member's answer for the short answer question
                const memberAnswer = memberResponse.answers.find(
                    answer => answer.question === question.questionText
                );

                const shortAnswerInput = document.createElement('input');
                shortAnswerInput.type = 'text';
                shortAnswerInput.classList.add('form-control');
                shortAnswerInput.placeholder = 'Short answer text';
                shortAnswerInput.value = memberAnswer ? memberAnswer.answer : '';
                shortAnswerInput.disabled = true;
                questionContainer.appendChild(shortAnswerInput);
            }

            // Append the question container to the member card
            memberCard.appendChild(questionContainer);
        });

        // Append the member card to the dashboard
        document.querySelector('#divDashboard').appendChild(memberCard);
    })

}
