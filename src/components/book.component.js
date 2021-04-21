import React, { useEffect, useState } from "react";
import StudentCard from "./StudentCard";
import BookService from "../services/book.service";
function Book(props) {
  const [keys, setKeys] = useState([]);
  const [books, setBooks] = useState([]);
  useEffect(() => {
    BookService.getAllRequiredBooks().then((response) => {
      if (response.status !== 404) {
        console.log(response.data)
        setBooks(Object.values(response.data));
        setKeys(Object.keys(response.data));
      }
    });
  }, []); // run only one

  return (
    <div>
      <div className="profile">
        <StudentCard props={props}></StudentCard>

        {keys.length > 0 ? (
          <div className="container student-profile ">
            <div className="table ">
              <h1 id="course_list">Required Materials</h1>
              <table>
                <thead id="book_header">
                  <tr>
                    <th>Course Required</th>
                    <th>Title</th>
                    <th>ISBN</th>
                    <th>Author/s</th>
                    <th>Language</th>
                    <th>Pages</th>
                    <th>Publisher</th>
                  </tr>
                </thead>
                <tbody>
                  {keys.map((k, index) => (
                    <tr key={index}>
                      <td>{k}</td>
                      <td>
                        {books.map((book) =>
                          book.map((b) => (
                            <div>
                              {b.subjectCode === k && <span>{b.title}</span>}
                            </div>
                          ))
                        )}
                      </td>
                      <td>
                        {books.map((book) =>
                          book.map((b) => (
                            <div>
                              {b.subjectCode === k && <span>{b.isbn}</span>}
                            </div>
                          ))
                        )}
                      </td>
                      <td>
                        {books.map((book) =>
                          book.map((b) => (
                            <div>
                              {b.subjectCode === k &&
                                b.authorList.map((author) => (
                                  <span>
                                    {author.name}
                                    <span> </span>
                                  </span>
                                ))}
                            </div>
                          ))
                        )}
                      </td>
                      <td>
                        {books.map((book) =>
                          book.map((b) => (
                            <div>
                              {b.subjectCode === k && <span>{b.language}</span>}
                            </div>
                          ))
                        )}
                      </td>
                      <td>
                        {books.map((book) =>
                          book.map((b) => (
                            <div>
                              {b.subjectCode === k && (
                                <span>{b.numOfPages}</span>
                              )}
                            </div>
                          ))
                        )}
                      </td>
                      <td>
                        {books.map((book) =>
                          book.map((b) => (
                            <div>
                              {b.subjectCode === k && (
                                <span>{b.publisher}</span>
                              )}
                            </div>
                          ))
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="container student-profile ">
            <h1 id="course_list">You have no Required Books </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Book;

{
  /* <td>
                        {books.map((book) =>
                          book.map((b) => (
                            <div>
                              {b.subjectCode === k && <p>{b.title}</p>}
                              
                            </div>
                          ))
                        )}
                      </td>
                      <td>
                        {books.map((book) =>
                          book.map((b) => (
                            <div>
                              {b.subjectCode === k && <p>{b.isbn}</p>}
                             
                            </div>
                          ))
                        )}
                      </td>
                      <td>
                        {books.map((book) =>
                          book.map((b) => (
                            <div>
                              {b.subjectCode === k &&
                                b.authorList.map((author) => (
                                  <p>{author.name}</p>
                                ))}
                              
                            </div>
                          ))
                        )}
                      </td> */
}
