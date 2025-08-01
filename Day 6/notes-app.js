
let noteList = JSON.parse(localStorage.getItem('noteList')) || [];

const titleInput = document.querySelector("#note-title");
const contentInput = document.querySelector("#note-content");

const noteTitle = document.querySelector("#title");
const notecontent = document.querySelector("#content");

const searchInput = document.querySelector("#search");
const searchBtn = document.querySelector("#search-btn");

searchBtn.addEventListener('click', () => {
  const searchValue = searchInput.value.trim().toLowerCase();

  const matchingNote = noteList.filter(note => note.title.toLowerCase().includes(searchValue));
  console.log(matchingNote);
  
  searchInput.value = '';

  if (matchingNote.length === 0) console.log("NO matching note found");

  document.querySelectorAll(".note-card").forEach(card => {
    card.classList.remove("highlighted");
  });

  const firstMatchTitle = matchingNote[0].title;
  const matchingNoteCard = document.querySelector(`.note-card[data-title="${firstMatchTitle}"]`);

  if(matchingNoteCard){
    matchingNoteCard.classList.add('pulse');
  }

  matchingNoteCard.scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  });

});

document.querySelector("#add-note-btn").addEventListener('click', () => {
  addNote();
  renderNoteList();
});

function addNote(){

  if (titleInput.value === '' || contentInput.value === ''){
    alert("Note is empty!")
  }
  else {
    const title = titleInput.value;
    const content = contentInput.value;

    noteList.push({
      title: title,
      content: content
    });
    localStorage.setItem('noteList',JSON.stringify(noteList));
    
    titleInput.value = '';
    contentInput.value = '';
  }
  
}

function renderNoteList(){
  console.log(noteList);
  let noteListHtml = '';
  for (let i = 0; i < noteList.length; i++){
    let noteObject = noteList[i];
    const { title, content } = noteObject;
    let html = `
      <div class="note-card" data-title="${title}">
        <h3 id ="title">${noteObject.title}</h3>
        <p id ="content">${noteObject.content}</p>
        <button class="delete-btn"  
          onclick="
            noteList.splice(${i}, 1);
            localStorage.setItem('noteList', JSON.stringify(noteList));
            renderNoteList();
          " >&times;</button>
      </div>
    `;

    noteListHtml += html;
  }
  document.querySelector("#notes-list").innerHTML = noteListHtml;
}

renderNoteList(); //initial render