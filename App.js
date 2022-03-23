import { useState } from "react";
import axios from "axios";
import "./App.css";
import UpdateForm from "./UpdateForm";

function App() {
  const [studentsData, setStudentstData] = useState([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [studentID, setStudentId] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const getStudentData = async () => {
    const response = await axios.get(" http://localhost:5000/students"); //making request to get data
    if (response && response.status === 200) {
      // CHecking if request is successful and it gave me response and the response status is 200
      setStudentstData(response.data);
    }
  };

  const deleteStudent = async (id) => {
    axios.delete(`http://localhost:5000/students/${id}`); // Passing the id of student to be deleted
    getStudentData(); //Update the data in UI after delete matlab jo item delete hue use UI se hata do instantly
  };

  const updateStudent = (id) => {
    axios.put(`http://localhost:5000/students/${id}`, { name, email });
    setIsUpdateModalOpen(false);
    getStudentData();
  };

  // falna && chilna    , left agar true hoga to right wala render hoga nahi to kuch nahi render hoga

  return (
    <div className="App">
      {isUpdateModalOpen && (
        <UpdateForm
          studentID={studentID}
          updateStudent={updateStudent}
          setEmail={setEmail}
          setName={setName}
          name={name}
          email={email}
        />
      )}
      <button onClick={getStudentData}>Get Student Data</button>
      <table>
        <thead>
          <tr>
            <th>serial</th>
            <th>name</th>
            <th>email</th>
          </tr>
        </thead>
        {studentsData.map((singleStudentData, index) => {
          return (
            <tbody key={index}>
              <tr>
                <td>{singleStudentData.id}</td>
                <td>{singleStudentData.name}</td>
                <td>{singleStudentData.email}</td>
                <td>
                  <button
                    onClick={() => {
                      setIsUpdateModalOpen(true);
                      setStudentId(singleStudentData.id);
                    }}
                  >
                    Update
                  </button>
                  <button onClick={() => deleteStudent(singleStudentData.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
}

export default App;
