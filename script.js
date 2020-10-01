const pushToURL = (name, key, value) => window.history.replaceState(null, null, `${name}?${key}=${value}`)

var cur_id;
var notes = [];
if(localStorage.length > 1 ) {
    notes = JSON.parse(localStorage.getItem('notes'));
}

console.log(notes); 

cur = (((window.location.href).split('='))[1]);
localStorage.setItem('last-id', cur);

var isInStorage = false;

for (let i = 0; i < notes.length; i++) {
    if (localStorage.getItem('last-id') == notes[i]) {
        pushToURL('', 'id', localStorage.getItem('last-id'));
        isInStorage = true;
    }
}

if (!isInStorage) {
    localStorage.setItem('last-id', 'undefined');
    pushToURL('', 'id', 'undefined');
}


function parseFunction() {
    var temp_arr = [];
    
    for (var i = 0; i < notes.length; i++) {
    
        temp_arr = JSON.parse(localStorage.getItem(notes[i]));
        console.log(temp_arr);
        
        let note = document.createElement('div');
        note.className =  "note";
        note.id = notes[i];
        note.tabIndex = "0";
        note.setAttribute('onfocus', 'focusNote()');
        note.insertAdjacentHTML("afterbegin", ` 
            <div class="note-header" >
                <input type="text" id="note-header-text"  oninput="update()" value="`+temp_arr[0]+`" readonly="true">
            </div>
            <div class="note-del-button" onclick="deleteNote()">
                X
            </div> 
        `);

        var parent = document.getElementById("nav-menu");
        var parentNode = note.parentNode;
        parent.insertBefore(note, parentNode);
    }
    

    if (localStorage.getItem('last-id') != 'undefined') {
        focusNote(localStorage.getItem('last-id'));
    }
}

function addNote(name = "Blank note", id = String(Math.random()).slice(2,8), text = '') {
    var date = new Date();
    var time = 'Last change: Hours: ' +date.getHours() + ', Minutes: ' + date.getMinutes() + ', Seconds: ' + date.getSeconds();
    unselect();
    localStorage.setItem('last-id','undefined');
    
    document.getElementById("text-area-input").setAttribute('readonly','true');
    notes.splice(0,0,id);
    //console.log(notes);
    localStorage.setItem('notes', JSON.stringify(notes));


    document.getElementById("text-area-input").value = text;
    document.getElementById("time-section").value = '';
   
    
    let note = document.createElement('div');
    note.className =  "note";
    note.id = id;
    note.tabIndex = "0";
    note.setAttribute('onfocus', 'focusNote()');
    
    note.insertAdjacentHTML("afterbegin", ` 
        <div class="note-header" >
            <input type="text" id="note-header-text" oninput="update()" value="`+name+`" readonly="true">
        </div>
        <div class="note-del-button" onclick="deleteNote()">
            X
        </div> 
    `);
    
    var parent = document.getElementById("nav-menu");
    var parentNode = note.parentNode;
    parent.insertBefore(note, parentNode);

    localStorage.setItem(id, JSON.stringify([name,'',time]));
    document.location.reload();
}

function focusNote(cur) {
    if (cur == null) {
        unselect();
        cur_id = document.activeElement.id;
    
    } else {
        unselect();
        cur_id = cur;
    }
   
    console.log(cur_id);

    pushToURL('', 'id', cur_id);

    localStorage.setItem('last-id', cur_id);

    document.getElementById(cur_id).classList.add('selected-note');
    document.getElementById(cur_id).querySelector('div.note-header input[id=note-header-text]').value = name;
    document.getElementById(cur_id).querySelector('div.note-header input[id=note-header-text]').removeAttribute('readonly');
    document.getElementById("text-area-input").removeAttribute('readonly');
    
    document.getElementById("text-area-input").value = '';
    document.getElementById("time-section").innerHTML = '';
    
    var info = JSON.parse(localStorage.getItem(cur_id));

    var name = info[0];
    var text = info[1];
    var time = info[2];
    

    document.getElementById(cur_id).querySelector('div.note-header input[id=note-header-text]').value = name;
    document.getElementById("text-area-input").value = text;
    document.getElementById("time-section").value = time;

    document.getElementById("text-area-input").focus();
}

function update() {
    var date = new Date();
    var time = 'Last change: Hours: ' +date.getHours() + ', Minutes: ' + date.getMinutes() + ', Seconds: ' + date.getSeconds();
    var name = document.getElementById(cur_id).querySelector('div.note-header input[id=note-header-text]').value;

  

    var content = document.getElementById('text-area-input').value;

    document.getElementById('time-section').value = time;    
    localStorage.setItem(cur_id,JSON.stringify([name,content,time] ));

    if (cur_id == Number(notes[0])) {
        
    } else {
        var temp_indx = notes.indexOf(cur_id);
        notes.splice(temp_indx, 1)
        notes.splice(0, 0, cur_id)
        console.log(notes);
        localStorage.setItem('notes', JSON.stringify(notes));
        reloadPage();
    }   
}

function unselect() {
    if(cur_id == undefined) {
        return;
    }
    document.getElementById(cur_id).classList.remove('selected-note');
}

function deleteNote() {
    if (confirm('Are you sure?')) {
        var temp_indx = notes.indexOf(cur_id);
        notes.splice(temp_indx, 1);
        localStorage.setItem('notes',  JSON.stringify(notes));
        localStorage.removeItem(cur_id);
        localStorage.setItem('last-id', 'undefined');
        console.log(localStorage.getItem('last-id'));
        window.location.href = window.location.origin + window.location.pathname +'?id=undefined';
        document.location.reload();
    }
   
   
}

function reloadPage() {
    document.location.reload();
}
