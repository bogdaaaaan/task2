// Сортировку сделай там по индексам в массиве, а потом чето с этим массивом делать
// может тип по индексам репарсить с локал стореджа, я хз подумай сам

var cur_id;
var notes = [];
if(localStorage.length != 0 ) {
    notes = JSON.parse(localStorage.getItem('notes'));
}
console.log(notes);

function parseFunction() {
    var temp_arr = [];
    for (var i = 0; i < notes.length; i++) {
    
        temp_arr = JSON.parse(localStorage.getItem(notes[i]));
        console.log(temp_arr);
        
        let note = document.createElement('div');
        note.className =  "note-wrapper";
    
        note.insertAdjacentHTML("afterbegin", ` 
        <div class="note" id="`+notes[i]+`" tabindex="0"  onfocus="focusNote()">
            <div class="note-header" >
                <textarea id="note-header-text"  onchange="update()">`+temp_arr[0]+`</textarea>
            </div>
            <div class="note-del-button">
                X
            </div> 
        </div>
        `);
        var parent = document.getElementById("nav-menu");
        var parentNode = note.parentNode;
        parent.insertBefore(note, parentNode);
    }
}

function addNote(name = "Blank note", id = String(Math.random()).slice(2,8), text = '') {
    var date = new Date();
    var time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    notes.push(id);

    console.log(notes);

    localStorage.setItem('notes', JSON.stringify(notes));

    document.getElementById("text-area-input").value = text;
    document.getElementById("time-section").value = '';
   
    
    let note = document.createElement('div');
    note.className =  "note-wrapper";
      
    note.insertAdjacentHTML("afterbegin", ` 
    <div class="note" id="`+id+`" tabindex="0"  onfocus="focusNote()">
        <div class="note-header" >
            <textarea id="note-header-text"  onchange="update()">`+name+`</textarea>
        </div>
        <div class="note-del-button">
            X
        </div> 
    </div>
    `);
    
    var parent = document.getElementById("nav-menu");
    var parentNode = note.parentNode;
    parent.insertBefore(note, parentNode);




    localStorage.setItem(id, JSON.stringify([name,'',time]));
}

function focusNote() {
    unselect();

    cur_id = document.activeElement.id;
    document.getElementById(cur_id).classList.add('selected-note');

    document.getElementById("text-area-input").value = '';
    document.getElementById("time-section").innerHTML = '';
    
    var info = JSON.parse(localStorage.getItem(cur_id));

    var name = info[0];
    var text = info[1];
    var time = info[2];
    

    document.getElementById(cur_id).querySelector('div.note-header textarea[id=note-header-text]').value = name;
    document.getElementById("text-area-input").value = text;
    document.getElementById("time-section").value = time;
}

function update() {
    var date = new Date();
    var time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    var name = document.getElementById(cur_id).querySelector('div.note-header textarea[id=note-header-text]').value;

  

    var content = document.getElementById('text-area-input').value;

    document.getElementById('time-section').value = time;    
    localStorage.setItem(cur_id,JSON.stringify([name,content,time] ));

    
    var temp_indx = notes.indexOf(cur_id);
    notes.splice(temp_indx, 1)
    notes.splice(0, 0, cur_id)
    console.log(notes);
    
}

function unselect() {
    if(cur_id == null) {
        return;
    }
    document.getElementById(cur_id).classList.remove('selected-note');
}