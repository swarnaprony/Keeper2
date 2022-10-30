import React, { useState ,useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";

function App() {
  const [notes, setNotes] = useState([{
    title: "",
  content: ""
  }]);


  // Get Method
  useEffect(() => {
    fetch("http://localhost:9000/notes")
    .then(res => res.json()
    .then(data => {
      setNotes(data)
    })
    .catch((err) => {
      console.log(err.message);
    })
    );
  },[]);

  //Post method
  const addNotes = async(newNote) => {
    await fetch("http://localhost:9000/notes", {
    method: "POST",
    body: JSON.stringify({
      title: newNote.title,
      content: newNote.content
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    })
    .then((response) => response.json())
    .then((data) => {
      setNotes((prevValue) => [data, ...prevValue]);
    })
    .catch((err) => {
      console.log(err.message);
    });
  };

  // Delete method



  const deleteNote = async(id) => {
    await fetch(
      `http://localhost:9000/notes/${id}`, {
      method: "DELETE",
    }).then(response => {
      if (response.status === 200) {
        setNotes(notes.filter((note) =>{
          return note._id !== id;
        })
        )
      } else {
         return;
      }
      });
  };
    

  const [newNote, setNewNote] = useState({
    title: "",
    content: ""
  });

  const handleNewNoteChange = (event) => {
    const {name, value} = event.target;
    setNewNote((prevValue) => {
      return {
        ...prevValue, [name]:value
      }
      
    });
  }

  const handleSubmit = (event) => {
    addNotes(newNote);
    event.preventDefault();
  };




  // function deleteNote(id) {
  //   setNotes(prevNotes => {
  //     return prevNotes.filter((noteItem, index) => {
  //       return index !== id;
  //     });
  //   });
  // }

  return (
    <div>
      <Header />
      <div>
      <form className="create-note">
        <input
          name="title"
          onChange={handleNewNoteChange}
          value={notes.title}
          placeholder="Title"
        />
        <textarea
          name="content"
          onChange={handleNewNoteChange}
          value={notes.content}
          placeholder="Take a note..."
          rows="3"
        />
        <button onClick={handleSubmit}>Add</button>
      </form>
    </div>


      {notes.map((noteItem, index) => {
        return (
          <Note
            key={noteItem._id}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
