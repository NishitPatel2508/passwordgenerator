import { useCallback, useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+*/-={}[]?~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);
  //These are the dependecies for useCallback for optimization:  [length,numberAllowed,charAllowed,setPassword]

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, length);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  //useCallBack use after checking that there is any dependancies or not.
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);
  //[length,numberAllowed,charAllowed,passwordGenerator] <- for any changes, changes are set to passwordField
  return (
    <>
      <div
        className="w-full rounded-3 text-center  p-4"
        style={{ backgroundColor: "#20c997" }}
      >
        <h1 className="mb-2  fs-3">Password Generator</h1>
        <div className="input-group overflow-hidden d-flex mb-4 justify-content-center">
          <input
            type="text"
            value={password}
            className="form-control w-50"
            placeholder="Generate a password"
            readOnly
            ref={passwordRef}
          />
          <button
            type="button"
            className="btn btn-dark"
            onClick={copyPasswordToClipboard}
          >
            COPY
          </button>
        </div>
        <Container>
          <Row lg={12} className="d-flex ">
            <Col
              xs={12}
              md={6}
              lg={4}
              className="mt-3 d-flex justify-content-center"
            >
              <div className="">
                <input
                  type="range"
                  min={8}
                  max={100}
                  value={length}
                  style={{ cursor: "pointer" }}
                  onChange={(e) => {
                    setLength(e.target.value);
                  }}
                />
                <label className="ms-2">Length({length})</label>
              </div>
              <div className="">
                <input
                  type="checkbox"
                  defaultChecked={numberAllowed}
                  id="numberInput"
                  // Prev value to reverse value
                  onChange={() => {
                    setNumberAllowed((prev) => !prev);
                  }}
                />
                <label htmlFor="numberInput" className="ms-1">
                  Number
                </label>
              </div>
              <div className="">
                <input
                  type="checkbox"
                  defaultChecked={charAllowed}
                  id="charInput"
                  // Prev value to reverse value
                  onChange={() => {
                    setCharAllowed((prev) => !prev);
                  }}
                />
                <label htmlFor="charInput" className="ms-1">
                  Characters
                </label>
              </div>
            </Col>
          </Row>
        </Container>
        <div className="d-flex justify-content-center  mt-2 gap-4">
          {/* <div className="">
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              style={{ cursor: "pointer" }}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className="ms-2">Length({length})</label>
          </div>
          <div className="">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              // Prev value to reverse value
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput" className="ms-1">
              Number
            </label>
          </div>
          <div className="">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              // Prev value to reverse value
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="charInput" className="ms-1">
              Characters
            </label>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default App;
