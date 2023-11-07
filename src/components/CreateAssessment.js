import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import RecruiterSidebar from './RecruiterSidebar';
import Navigationbar from './Navbar';

function CreateAssessment({recruiter}) {
    const [showModal, setShowModal] = useState(false);
    const [modalQuestions, setModalQuestions] = useState([]);

    const [title, setTitle] = useState('')
    const [randomLink, setLink] = useState("")
    const [duration, setDuration] = useState("")
    const [time, setTime] = useState("")

    const [data, setData] = useState('')
    const [assessment_id, setAssessment_id] = useState('')


    const [q1, setQ1] = useState('')
    const [q1_expected, setExpectedSolutions] = useState('')
    const [q1_choices, setChoices] = useState('')
    const [q1_type, setQ1Type] = useState('')

    const [q2, setQ2] = useState('')
    const [q2_keyword, setQ2Keyword] = useState('')
    const [q2_type, setQ2Type] = useState('')

    const [q3, setQ3] = useState('')
    const [q3_test, setQ3_test] = useState('')
    const [q3_type, setQ3Type] = useState('')

    const handleShowModal = () => {
        const questions = [
          { question: q1, type: q1_type, solution: q1_choices , expected: q1_expected},
          { question: q2, type: q2_type, solution: q2_keyword },
          { question: q3, type: q3_type, solution: q3_test },
        ];
    
        // Filter out empty questions
        const filteredQuestions = questions.filter(
          (q) => q.question && q.type && q.solution
        );
    
        setModalQuestions(filteredQuestions);
        setShowModal(true);
    };
    
      // Function to hide the modal
    const handleCloseModal = () => {
        setShowModal(false);
    };

    // Watch for changes in randomLink and update the link in assessment
    useEffect(() => {
        const domain = 'smartrecruiter/assessments.com';
        const randomPath = Math.random().toString(36).substring(2, 10);
        const link = `https://${domain}/${randomPath}`;
        setLink(link);
    }, [title]);

    useEffect(() => {
        let id = data.id
        setAssessment_id(id);
    }, [data]);

    const assessment = {
        title: title,
        link: randomLink,
        duration: duration,
        time: time,
        recruiter_id: 1,
    };

    const assessment_questions = [
        {
            "question_text": q1,
            "choices": q1_choices,
            "solution": q1_expected,
            "question_type": q1_type,
            "assessment_id": assessment_id
        },
        {
            "question_text": q2,
            "solution": q2_keyword,
            "question_type": q2_type,
            "assessment_id": assessment_id
        },
        {
            "question_text": q3,
            "solution": q3_test,
            "question_type": q3_type,
            "assessment_id": assessment_id
        }
    ]

    function handleSubmit(e) {
        e.preventDefault();
        console.log('starting');
    }
    
    const handleConfirm = () => {
        fetch('/createassessment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(assessment),
        })
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((error) => {
            console.error('Error:', error);
        });

        setTitle('')
        setDuration('')
        setTime('')
        setQ1('')
        setQ2('')
        setQ3('')
        setExpectedSolutions('')
        setQ2Keyword('')
        setQ3_test('')
        setQ1Type('')
        setQ2Type('')
        setQ3Type('')
        handleCloseModal();
    };

    useEffect(() => {
        const promises = assessment_questions.map((question) => {
            return fetch('/createquestions', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(question),
            });
        });
        Promise.all(promises)
        .then((responses) => {
            return Promise.all(responses.map((response) => response.json()));
        })
        .then((dataArray) => {
            console.log('Response data from all requests:', dataArray);
        })
        .catch((error) => {
            console.error('Error occurred:', error);
        });
       
    }, [assessment_id])
    
        
   
    return (
        <div className='page'>
            <div id="intervieweehomepage-bg"></div>
            <Navigationbar />
            <div className="display">
                <RecruiterSidebar />
                <div className="content" style={{overflowY: 'scroll', textAlign: 'center'}}>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='title' className='input-label' style={{marginTop: '10px'}}><h4><span>Assessment Title:</span></h4></label>
                            <br/>
                            <input
                            className='authentication-input'
                            autoComplete="off"
                            name='title'
                            required
                            type='text'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <>
                            <p style={{marginTop: '10px', color: 'white'}}>Question 1:</p>
                            <select name='Question Type' onChange={(e) => setQ1Type(e.target.value)}>
                                <option value="select">Select Question Type</option>
                                <option value="mcq">MCQ</option>
                                <option value="ft">Free Text</option>
                                <option value="kata">Kata</option>
                            </select>

                            <textarea
                            value={q1}
                            onChange={(e) => setQ1(e.target.value)}
                            placeholder="Enter question 1"
                            rows="5"
                            className="w-full p-2 rounded-md bg-gray-800 text-[#f3f0ca]"
                            style={{ maxHeight: '100px', width: '95%'}}
                            />
                            <label htmlFor='q1_choices' className='input-label' style={{marginTop: '10px'}}><p style={{color: 'white'}}>Choices:</p></label>
                                <br/>
                            <input
                                className='authentication-input'
                                autoComplete="off"
                                name='q1_choices'
                                required
                                type='text'
                                value={q1_choices}
                                onChange={(e) => setChoices(e.target.value)}
                            />
                            <br/>
                            <label htmlFor='q1_choices' className='input-label' style={{marginTop: '10px'}}><p style={{color: 'white'}}>Expected solution:</p></label>
                                <br/>
                            <input
                                className='authentication-input'
                                autoComplete="off"
                                name='q1_choices'
                                required
                                type='text'
                                value={q1_expected}
                                onChange={(e) => setExpectedSolutions(e.target.value)}
                            />
                        </>
                        <hr></hr>
                        <>
                            <p style={{marginTop: '10px', color: 'white'}}>Question 2:</p>
                            <select name='Question Type' onChange={(e) => setQ2Type(e.target.value)}>
                                <option value="select">Select Question Type</option>
                                <option value="mcq">MCQ</option>
                                <option value="ft">Free Text</option>
                                <option value="kata">Kata</option>
                            </select>

                            <textarea
                            value={q2}
                            onChange={(e) => setQ2(e.target.value)}
                            placeholder="Enter question 2"
                            rows="5"
                            className="w-full p-2 rounded-md bg-gray-800 text-[#f3f0ca]"
                            style={{ maxHeight: '100px', width: '95%'}}
                            />

                            <label htmlFor='q2_keyword' className='input-label' style={{marginTop: '10px'}}><p style={{color: 'white'}}>Expected Keyword:</p></label>
                                <br/>
                            <input
                                className='authentication-input'
                                autoComplete="off"
                                name='q2_keyword'
                                required
                                type='text'
                                value={q2_keyword}
                                onChange={(e) => setQ2Keyword(e.target.value)}
                            />
                        </>
                        <hr></hr>
                        <>
                            <p style={{marginTop: '10px', color: 'white'}}>Question 3:</p>
                            <select name='Question Type' onChange={(e) => setQ3Type(e.target.value)}>
                                <option value="select">Select Question Type</option>
                                <option value="mcq">MCQ</option>
                                <option value="ft">Free Text</option>
                                <option value="kata">Kata</option>
                            </select>

                            <textarea
                            value={q3}
                            onChange={(e) => setQ3(e.target.value)}
                            placeholder="Enter question 3"
                            rows="5"
                            className="w-full p-2 rounded-md bg-gray-800 text-[#f3f0ca]"
                            style={{ width: '95%'}}
                            /> 

                            <p style={{color: 'white'}}>Tests:</p>
                            <textarea
                            value={q3_test}
                            onChange={(e) => setQ3_test(e.target.value)}
                            placeholder="Enter tests"
                            rows="5"
                            className="w-full p-2 rounded-md bg-gray-800 text-[#f3f0ca]"
                            style={{ width: '95%', overflowY: 'hidden', resize: 'none'}}
                            /> 
                        </>
                        <hr></hr>
                        <label htmlFor='duration' className='input-label' style={{marginRight: '10px'}}><p style={{color: 'white'}}>Date and Time:</p></label>

                        <input
                            style={{marginTop: '10px'}}
                            className='authentication-input'
                            autoComplete="off"
                            name='time'
                            required
                            type='datetime-local'
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                        <br/>

                        <label htmlFor='duration' className='input-label' style={{marginRight: '10px'}}><p style={{color:'white'}}>Duration:</p></label>
                     
                        <input
                            style={{marginTop: '10px'}}
                            className='authentication-input'
                            autoComplete="off"
                            name='duration'
                            min={0}
                            placeholder='time in minutes'
                            required
                            type='number'
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                        />
                        <br/>
                        {/* <Button type='submit' variant="outline-success" style={{marginTop: '10px'}}>Create Assessment</Button>{' '} */}
                        <Button
                            onClick={handleShowModal}
                            variant="outline-primary"
                            style={{ marginTop: '10px' }}
                            type='submit'
                        >
                            Preview Assessment
                        </Button>
                        
                    </form>
                   

                    <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                        <Modal.Title>Assessment {title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        {modalQuestions.map((question, index) => (
                            <div key={index}>
                                <p>Question {index + 1}:<h4 style={{ display: 'inline-flex' }}>{question.question}</h4></p>
                                <p>Type: {question.type}</p>
                                <p>Choices: {question.solution}</p>
                                {question.type === "mcq" ? (
                                <p>Expected Solution: {question?.expected}</p>
                                ) : null}
                                <hr></hr>
                            </div>
                        ))}

                        </Modal.Body>
                        <div style={{display: 'flex', justifyContent: 'right', columnGap: '10px', marginRight: '10px', marginBottom: '5px'}}>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleConfirm}>
                            Confirm and Save
                        </Button>
                        </div>
                    </Modal>
               
                </div> 
            </div>
        
        </div>
    )
}

export default CreateAssessment