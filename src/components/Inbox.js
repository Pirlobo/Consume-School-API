import React, {useState, useEffect} from "react";
import StudentCard from "./StudentCard";
import TeacherService from "../services/teacherService";
function Inbox(props) {
    const[content, setContent] = useState("");
    const[loading, setLoading] = useState(false);
    const onChange = (e) => {
        setContent(e.target.value); 
    }
    const send = (e) => {
        setLoading(true);
        TeacherService.sendAnnounement(content).then(
            (response) => {
                if (response.data.message) {
                    setLoading(false);
                }
            }
        )
       
    }
   

    
  return (
    <div>
      <div className="profile">
        <StudentCard props = {props}></StudentCard>
        <div className="container inbox-container student-profile">
          <input className="inbox" type="text" placeholder = "Text Message" onChange={onChange}></input>
         
          <div>
          <button 
           disabled={loading}
           className="left-btn"
          id="btn"  onClick={send}>
           {loading && (
                    <span className=" spinner-border spinner-border-sm"></span>
                  )}
                Send
              </button>
          </div>
        </div>
        
      </div>
      
    </div>
  );
}

export default Inbox;
