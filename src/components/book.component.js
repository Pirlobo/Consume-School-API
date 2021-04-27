import React, { useEffect, useState } from "react";
import StudentCard from "./StudentCard";
import BookService from "../services/book.service";
import TeacherService from "../services/teacherService";
import AuthService from "../services/auth.service";
function Book(props) {
  const [isClicked, setIsClicked] = useState(false);
  const currentLoggedUser = AuthService.getCurrentUser();
  const [regId, setRegId] = useState({
    regId: props.match.params.id,
  });
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(currentLoggedUser);
  const [keys, setKeys] = useState([]);
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState("");
  const [createdBook, setCreatedBook] = useState({
    isbn: "",
    title: "",
    publisher: "",
    authors: "",
    imageUrl: "",
  });
  const onCreate = (e) => {
    setError("");
    setIsClicked(!isClicked);
  };
  const handleIsbnChange = (e) => {
    setCreatedBook({ ...createdBook, isbn: e.target.value });
  };
  const handleTitleChange = (e) => {
    setCreatedBook({ ...createdBook, title: e.target.value });
  };
  const handlePublisherChange = (e) => {
    setCreatedBook({ ...createdBook, publisher: e.target.value });
  };
  const handleAuthorsChange = (e) => {
    setCreatedBook({ ...createdBook, authors: e.target.value });
  };
  const handleImageUrlChange = (e) => {
    setCreatedBook({ ...createdBook, imageUrl: e.target.value });
  };
  const imageExists = (url, callback) => {
    var img = new Image();
    img.onload = function() { callback(true); };
    img.onerror = function() { callback(false); };
    img.src = url;
  }
  const persist = (e) => {
    if (
      createdBook.isbn.length > 0 &&
      createdBook.title.length > 0 &&
      createdBook.publisher.length > 0 &&
      createdBook.authors.length > 0
    ) {
      imageExists(createdBook.imageUrl, function(exists) {
        if (exists) {
          TeacherService.addBook(
            regId.regId,
            createdBook.isbn,
            createdBook.title,
            createdBook.publisher,
            createdBook.authors,
            createdBook.imageUrl,
          )
            .then((response) => {
              window.location.reload();
            })
            .catch((error) => {
              setError("Error: this book is already saved");
            });
        }
        else{
          setError("Error: Image Url is invalid");
        }
      });
      
    } else {
      setError("Error: Fields must not be null");
    }
  };
  useEffect(() => {
    if (currentUser.roles == "ROLE_TEACHER") {
      TeacherService.getRequiredBooksByCourse(regId.regId).then((response) => {
        setBooks(response.data);
      });
    } else if (currentUser.roles == "ROLE_USER"){
      BookService.getAllRequiredBooks().then((response) => {
        if(response.data.message) {
          setMessage(response.data.message);
        }
        else{
          setBooks(response.data)
        }
      })
    }
  }, []); // run only one

  return (
    <div className="profile">
      <StudentCard isActive="true" props={props}></StudentCard>
      <div className="container student-profile ">
        <h1 id="assignment-header">Required Books</h1>
        <div className="table assignment-table">
          {currentUser.roles == "ROLE_TEACHER" ? (
            <button id="assignment-btn" onClick={onCreate}>
              {!isClicked ? "Add" : "Cancel"}
            </button>
          ) : null}
          <div
            className="alert alert-light"
            style={{ color: "red" }}
            role="alert"
          >
            {error}
            <h1 style={{ color: "#00defc"}}>{message}</h1>
          </div>
          <table id="assignment-table">
            <thead id="assignment">
              <tr>
               {currentUser.roles == "ROLE_USER" && <th>Course</th>}
                <th>Image</th>
                <th>ISBN</th>
                <th>Tite</th>
                <th>Publisher</th>
                <th>Author(s)</th>
              </tr>
            </thead>
            <tbody>
              {!isClicked ? (
                books.map((book) => (
                  <tr>
                  {currentUser.roles == "ROLE_USER" && <td>{book.subjectCode}</td>}
                    <td>
                      {book.imageUrl == null ? 'Image not available' : 
                      <img
                        src={book.imageUrl}
                        width="80"
                        height="70"
                        alt="Cheetah!"
                      />
                      } 
                      
                    </td>
                    <td>{book.isbn}</td>
                    <td>{book.title}</td>
                    <td>{book.publisher}</td>
                    <td>{book.listOfAuthors}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>
                    <input
                     onChange={handleImageUrlChange}
                      type = "text"
                      placeholder="image url"
                    ></input>
                  </td>
                  <td>
                    <input
                      onChange={handleIsbnChange}
                      type="text"
                      placeholder="isbn"
                    ></input>
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="book's title"
                      onChange={handleTitleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="publisher's name"
                      onChange={handlePublisherChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="author(s)"
                      onChange={handleAuthorsChange}
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {!isClicked ? null : (
            <button
              onClick={persist}
              id="btn"
              className="save-btn"
              style={{ marginTop: 45 }}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Book;
