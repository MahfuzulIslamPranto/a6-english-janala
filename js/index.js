//Loading
const loader = document.getElementById('loader');
//main banner
main_banner.classList.remove('hidden');
document.getElementById('get_btn').addEventListener('click',function (){
    const nm = document.getElementById('name_input');
    const pw = document.getElementById('password_input');
    const name = nm.value;
    const password = pw.value;
    if(!name){
        alert("Please enter a user name!");
    }
    if(password==='123456'){
        button_container.classList.remove("hidden");
        lessonFound.classList.remove('hidden');
        nav_bar.classList.remove("hidden");
        main_banner.classList.add('hidden');
        questions.classList.remove("hidden");
        alert("Success!")
    }
    else{
        alert("Please enter correct password!");
    }
})
// nav_bar : FAQ, LogOut
function faq(){
    const qs = document.getElementById('questions');
    //qs.classList.add("");
    qs.scrollIntoView({
        behavior: 'smooth'
    })
}
document.getElementById('logout').addEventListener('click',function(){
    main_banner.classList.remove('hidden');
    lessonFound.classList.add('hidden');
    nav_bar.classList.add("hidden");
    button_container.classList.add("hidden");
    questions.classList.add("hidden");
    noLessonFound.classList.add("hidden")
})
// Button Details
function details(id) {
    fetch(`https://openapi.programming-hero.com/api/word/${id}`)
        .then((response) => response.json())
        .then((data) => displayDetails(data.data))
}
function beep(){
    alert("Completed");
}
function displayDetails(data) {
    const lessonBtnContainer = document.getElementById('lession-words-modal-container');
    lessonBtnContainer.innerHTML = `
        <!-- Open the modal using ID.showModal() method -->
        <dialog id="my_modal_2" class="modal">
        <div class="modal-box text-start">
            <h3 class="text-lg font-bold">${data.word} (${data.pronunciation})</h3>
            <p class="pt-4 text-sm font-bold">Meaning</p>
            <p class="">${data.meaning}</p>
            <p class="pt-4 text-sm font-bold">Example</p>
            <p class="">${data.sentence}</p>
            <p class="pt-4 text-sm font-bold mb-1">সমার্থক শব্দ গুলো</p>
            <p>${data.synonyms}</p>
            <button onclick="document.getElementById('my_modal_2').close(); beep();" class="btn bg-btnBackground text-white mt-4 text-sm">Complete Learning</button>
        </div>
        </dialog>
    `;
    document.getElementById('my_modal_2').showModal();
}
//display words according to lesson button press
function displayWordsByLessonButton(id) {
    loader.classList.remove("hidden");
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then((response) => response.json())
        .then((d) => {
            loader.classList.add("hidden");
            loadAllLessonButtons(d.data)})
}
//fetch all content -> words
function loadWords() {
    fetch('https://openapi.programming-hero.com/api/words/all')
        .then((response) => response.json())
        .then((data) => {

            loadAllLessonButtons(data.data)
        });
}
// all lesson buttons contents -> words
function loadAllLessonButtons(data) {
    if (data.length === 0) {
        noLessonFound.classList.remove("hidden");
        lessonFound.classList.add("hidden");
        const lessonBtnContainer = document.getElementById('lession-words-container');
        lessonBtnContainer.innerHTML = "";
        alert("No Word Found!")
        return;
    }
    else {
        noLessonFound.classList.add("hidden");
        lessonFound.classList.add("hidden");
        const lessonBtnContainer = document.getElementById('lession-words-container');
        lessonBtnContainer.innerHTML = "";

        data.forEach(lesson => {
            const wordCard = document.createElement('div');
            wordCard.innerHTML = `
                <div class="card bg-gray-100 text-black w-96">
                        <div class="card-body items-center text-center">
                            <h2 class="card-title">${lesson.word}</h2>
                            <p class="text-sm">Meaning /Pronounciation</p>
                            <p>${lesson.meaning} / ${lesson.pronunciation}</p>                        
                            <div class="flex gap-36 mt-10">
                                
                                <button onclick="details(${lesson.id})" class=""><i class="fa-solid fa-circle-info"></i></button>
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
function loadButtons() {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then((response) => response.json())
        .then((data) => displayButtons(data.data));
}
// display Lesson Buttons
function displayButtons(data) {
    const lessonBtnContainer = document.getElementById('lession-btn-container');
    lessonBtnContainer.innerHTML="";
    for (let level of data) {
        const createDiv = document.createElement('div');
        createDiv.innerHTML = `
         <button onclick="handleLessonClick(this,${level.level_no})" class="lesson_btn flex btn btn-sm border-btnBackground text-btnBackground bg-white rounded-sm hover:bg-btnBackground hover:text-white"><img src="assets/fa-book-open.png" alt="">Lesson-${level.level_no}</button>
         `;
        lessonBtnContainer.append(createDiv)
    }
}
//for active lesson button clicked -> Color changed and selected showed
function handleLessonClick(clicked,lesson){
    const allBtn = document.querySelectorAll('.lesson_btn');
    allBtn.forEach(btn => btn.classList.remove('active'));
    clicked.classList.add('active');
    displayWordsByLessonButton(lesson);
}
// for showing all words at a time

// for lesson buttons showing -> dynamically
loadButtons();