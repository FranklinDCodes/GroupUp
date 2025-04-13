/*
    This file contains fetch functions that will be used to fetch info from the API.
    For now, we will simply use sample data to exhibit the functionalities of the website.
*/

function fetchProjectLeaderSurveys() {
    const arrSurveys = [
        {
            surveyid: '001',
            title: 'Team Collaboration Survey',
            description: 'A survey to evaluate team collaboration and communication.',
            questions: [
                {
                    questionText: 'How satisfied are you with the team collaboration?',
                    questionType: 'likert',
                    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
                    questionid: 'q1'
                },
                {
                    questionText: 'How often do you communicate with your team?',
                    questionType: 'multipleChoice',
                    options: ['Daily', 'Weekly', 'Monthly', 'Rarely'],
                    questionid: 'q2'
                },
                {
                    questionText: 'What can be improved in team collaboration?',
                    questionType: 'shortAnswer',
                    options: [],
                    questionid: 'q3'
                }
            ],
            groupResponses: [
                {
                    groupid: 'ABC',
                    groupName: 'Group A',
                    memberResponses: [
                        {
                            memberName: 'Seth Risner',
                            answers: [
                                { question: 'How satisfied are you with the team collaboration?', answer: 'Agree', questionid: 'q1' },
                                { question: 'How often do you communicate with your team?', answer: 'Daily', questionid: 'q2' },
                                { question: 'What can be improved in team collaboration?', answer: 'More frequent meetings', questionid: 'q3' }
                            ]
                        },
                        {
                            memberName: 'Franklin Doane',
                            answers: [
                                { question: 'How satisfied are you with the team collaboration?', answer: 'Strongly Agree', questionid: 'q1' },
                                { question: 'How often do you communicate with your team?', answer: 'Weekly', questionid: 'q2' },
                                { question: 'What can be improved in team collaboration?', answer: 'Better task delegation', questionid: 'q3' }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            surveyid: '002',
            title: 'Project Feedback Survey',
            description: 'A survey to gather feedback on the current project progress.',
            questions: [
                {
                    questionText: 'How clear are the project goals?',
                    questionType: 'likert',
                    options: ['Very Unclear', 'Unclear', 'Neutral', 'Clear', 'Very Clear'],
                    questionid: 'q1'
                },
                {
                    questionText: 'How satisfied are you with the project timeline?',
                    questionType: 'likert',
                    options: ['Very Dissatisfied', 'Dissatisfied', 'Neutral', 'Satisfied', 'Very Satisfied'],
                    questionid: 'q2'
                },
                {
                    questionText: 'What challenges have you faced during the project?',
                    questionType: 'shortAnswer',
                    options: [],
                    questionid: 'q3'
                }
            ],
            groupResponses: [
                {
                    groupid: 'DEF',
                    groupName: 'Group B',
                    memberResponses: [
                        {
                            memberName: 'Alice Johnson',
                            answers: [
                                { question: 'How clear are the project goals?', answer: 'Clear', questionid: 'q1' },
                                { question: 'How satisfied are you with the project timeline?', answer: 'Satisfied', questionid: 'q2' },
                                { question: 'What challenges have you faced during the project?', answer: 'None', questionid: 'q3' }
                            ]
                        },
                        {
                            memberName: 'Bob Smith',
                            answers: [
                                { question: 'How clear are the project goals?', answer: 'Very Clear', questionid: 'q1' },
                                { question: 'How satisfied are you with the project timeline?', answer: 'Very Satisfied', questionid: 'q2' },
                                { question: 'What challenges have you faced during the project?', answer: 'Tight deadlines', questionid: 'q3' }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            surveyid: '003',
            title: 'Group Satisfaction Survey',
            description: 'A survey to measure group member satisfaction and engagement.',
            questions: [
                {
                    questionText: 'How satisfied are you with your group members?',
                    questionType: 'likert',
                    options: ['Very Dissatisfied', 'Dissatisfied', 'Neutral', 'Satisfied', 'Very Satisfied'],
                    questionid: 'q1'
                },
                {
                    questionText: 'How engaged are you in group activities?',
                    questionType: 'likert',
                    options: ['Not Engaged', 'Somewhat Engaged', 'Engaged', 'Highly Engaged'],
                    questionid: 'q2'
                },
                {
                    questionText: 'What suggestions do you have for improving group satisfaction?',
                    questionType: 'shortAnswer',
                    options: [],
                    questionid: 'q3'
                }
            ],
            groupResponses: [
                {
                    groupid: 'GHI',
                    groupName: 'Group C',
                    memberResponses: [
                        {
                            memberName: 'Charlie Brown',
                            answers: [
                                { question: 'How satisfied are you with your group members?', answer: 'Satisfied', questionid: 'q1' },
                                { question: 'How engaged are you in group activities?', answer: 'Engaged', questionid: 'q2' },
                                { question: 'What suggestions do you have for improving group satisfaction?', answer: 'Better communication', questionid: 'q3' }
                            ]
                        },
                        {
                            memberName: 'Diana Prince',
                            answers: [
                                { question: 'How satisfied are you with your group members?', answer: 'Very Satisfied', questionid: 'q1' },
                                { question: 'How engaged are you in group activities?', answer: 'Highly Engaged', questionid: 'q2' },
                                { question: 'What suggestions do you have for improving group satisfaction?', answer: 'More team-building activities', questionid: 'q3' }
                            ]
                        }
                    ]
                }
            ]
        }
    ];
    return arrSurveys;
}