import React, { useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/snippets/python";
import "ace-builds/src-noconflict/snippets/javascript";
import "ace-builds/src-noconflict/snippets/java";
import "ace-builds/src-noconflict/snippets/ruby";

const Playground = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [tests, setTests] = useState([]);
  const [testResults, setTestResults] = useState(null);

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const addTest = (name, testFunction) => {
    const newTest = { name, testFunction };
    setTests((prevTests) => [...prevTests, newTest]);
  };

  const runCode = () => {
    // Clear previous output and test results
    setOutput("");
    setTestResults(null);

    const passedTests = [];
    const failedTests = [];

    // Execute each test
    tests.forEach((test) => {
      const testResult = test.testFunction(code);
      if (testResult) {
        passedTests.push(test.name);
      } else {
        failedTests.push(test.name);
      }
    });

    // Display the test results separately
    const testResultsText = `Tests Passed: ${passedTests.length}, Tests Failed: ${failedTests.length}`;
    setTestResults(testResultsText);

    // Simulate running the code (you can replace this with actual code execution)
    // For demonstration purposes, it sets the code as output
    const lines = code.split('\n');
    const lastStatement = lines[lines.length - 2]; // Assuming the last line is the statement
    let evalResult = null;
  
    try {
      evalResult = eval(lastStatement);
    } catch (error) {
      // If there is an error in the code execution, capture the error message
      evalResult = error.toString();
    }
  
    setOutput(evalResult);
    setIsRunning(true);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 overflow-y-scroll">
      <div className="bg-gray-900 text-white p-4">
        <div className="container mx-auto flex items-center">
          <div className="mr-4">
            Choose Language:
            <select
              value={language}
              onChange={(e) => changeLanguage(e.target.value)}
              className="ml-2 py-1 px-2 bg-indigo-500 text-white rounded"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="ruby">Ruby</option>
            </select>
          </div>
          <button
            onClick={runCode}
            className={`py-1 px-3 bg-indigo-500 hover:bg-indigo-600 rounded ${
              isRunning ? "cursor-not-allowed" : ""
            }`}
            disabled={isRunning}
          >
            {isRunning ? "Running..." : "Run Code"}
          </button>
        </div>
      </div>
      <div className="container mx-auto mt-4">
        <AceEditor
          mode={language}
          theme="Ascetic White"
          value={code}
          onChange={setCode}
          name="coding-editor"
          editorProps={{ $blockScrolling: true }}
          fontSize={16} // Adjust the font size
          style={{
            width: "100%",
            height: "400px", // Adjust the height
            color: "black", // Change text color
            background: "black", // Change background color
            borderRadius: "8px", // Add rounded corners
          }}
        />
      </div>
      <div className="container mx-auto mt-4">
        <div className="bg-gray-300 p-4 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Output:</h2>
          <pre>{output}</pre>
        </div>
      </div>
      <div className="container mx-auto mt-4">
        <div className="bg-gray-300 p-4 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Test Results:</h2>
          <pre>{testResults}</pre>
        </div>
      </div>
      <div className="bg-gray-100 p-4 mt-4">
        <div className="container mx-auto">
        <button
  onClick={() => {
    addTest("Custom Test", (code) => {
      try {
        // An example test for a simple Python function
        // This function should return True if the code is correct
        const pythonCode = `
          def add_numbers(a, b):
              return a + b
          result = add_numbers(2, 3)
          print(result)
        `;
        
        const userCode = code; // The code entered by the user

        // Use a Python interpreter or library to execute the code
        // You can replace this with your actual Python code execution logic
        // Here, we are comparing the user's code with the example code
        const isTestPassed = pythonCode.trim() === userCode.trim();
        
        return isTestPassed;
      } catch (error) {
        console.error(error);
        return false;
      }
    });
  }}
  className="bg-indigo-500 text-white py-1 px-3 rounded"
>
  Add Custom Test
</button>
<br />
In this example, we define a simple Python function in the pythonCode string, and we compare the user's entered code (userCode) with the example code. If the user's code matches the example code, the test will pass; otherwise, it will fail.

Please note that this is a basic comparison, and in a real application, you would typically use a more robust approach to execute and evaluate user code securely.
        </div>
      </div>
    </div>
  );
};

export default Playground;
