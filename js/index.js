//display words according to lesson button press
function displayWordsByLessonButton(id){
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then((response) => response.json())
    .then((d) => loadAllLessonButtons(d.data))
}
//fetch all content -> words
function loadWords(){
    fetch('https://openapi.programming-hero.com/api/words/all')
    .then((response) => response.json())
    .then((data) => loadAllLessonButtons(data.data))
}
// all lesson buttons contents -> words
function loadAllLessonButtons(data){
    if(data.length===0){
        noLessonFound.classList.remove("hidden");
        lessonFound.classList.add("hidden");
        const lessonBtnContainer = document.getElementById('lession-words-container');
        lessonBtnContainer.innerHTML="";
        return;
    }
    else{
        noLessonFound.classList.add("hidden");
        lessonFound.classList.add("hidden");
        const lessonBtnContainer = document.getElementById('lession-words-container');
        lessonBtnContainer.innerHTML="";
        
        data.forEach(lesson => {
            const wordCard = document.createElement('div');
            wordCard.innerHTML = `
                <div class="card bg-gray-100 text-black w-96">
                        <div class="card-body items-center text-center">
                            <h2 class="card-title">${lesson.word}</h2>
                            <p class="text-sm">Meaning /Pronounciation</p>
                            <p>${lesson.meaning} / ${lesson.pronunciation}</p>                        
                            <div class="flex gap-36 mt-10">
                                <button class=""><i class="fa-solid fa-circle-info"></i></button>
                                <button class=""><i class="fa-solid fa-volume-low"></i></button>
                            </div>
                        </div>
                </div>
            `;
            lessonBtnContainer.append(wordCard);
        }); 
    }
}
// fetch lesson buttons API
function loadButtons(){
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then((response) => response.json())
    .then((data) => displayButtons(data.data));
}
// display Lesson Buttons
function displayButtons(data){
    const lessonBtnContainer = document.getElementById('lession-btn-container');
    for (let level of data){
        const createDiv = document.createElement('div');    
        createDiv.classList.add();
        createDiv.innerHTML = `
         <button onclick="displayWordsByLessonButton(${level.level_no})" class="flex btn btn-sm border-btnBackground text-btnBackground bg-white rounded-sm hover:bg-btnBackground hover:text-white"><img src="assets/fa-book-open.png" alt="">Lesson-${level.level_no}</button>
         `;
         lessonBtnContainer.append(createDiv)
    }
}
// for showing all words at a time

// for lesson buttons showing -> dynamically
loadButtons();