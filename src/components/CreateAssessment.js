import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Intervieweesidebar from './IntervieweeSidebar';
import Navigationbar from './Navbar';

function CreateAssessment({recruiter}) {
    const [title, setTitle] = useState('')
    const [randomLink, setLink] = useState("")
    const [duration, setDuration] = useState("")
    const [time, setTime] = useState("")

    const [data, setData] = useState('')
    const [assessment_id, setAssessment_id] = useState('')


    const [q1, setQ1] = useState('')
    const [q1_choices, setQ1Choices] = useState('')
    const [q1_type, setQ1Type] = useState('')

    const [q2, setQ2] = useState('')
    const [q2_keyword, setQ2Keyword] = useState('')
    const [q2_type, setQ2Type] = useState('')

    const [q3, setQ3] = useState('')
    const [q3_test, setQ3_test] = useState('')
    const [q3_type, setQ3Type] = useState('')

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
    console.log(assessment_id)

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
            "solution": q1_choices,
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
    
    }
    
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
                <Intervieweesidebar />
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
                            <label htmlFor='q1_choices' className='input-label' style={{marginTop: '10px'}}><p style={{color: 'white'}}>Expected solution:</p></label>
                                <br/>
                            <input
                                className='authentication-input'
                                autoComplete="off"
                                name='q1_choices'
                                required
                                type='text'
                                value={q1_choices}
                                onChange={(e) => setQ1Choices(e.target.value)}
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
                            style={{ maxHeight: '100px', width: '95%'}}
                            /> 

                            <p style={{color: 'white'}}>Tests:</p>
                            <textarea
                            value={q3_test}
                            onChange={(e) => setQ3_test(e.target.value)}
                            placeholder="Enter tests"
                            rows="5"
                            className="w-full p-2 rounded-md bg-gray-800 text-[#f3f0ca]"
                            style={{ maxHeight: '100px', width: '95%'}}
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
                        <Button type='submit' variant="outline-success" style={{marginTop: '10px'}}>Create Assessment</Button>{' '}
                        
                    </form>
               
                </div> 
            </div>
        
        </div>
    )
}

export default CreateAssessment