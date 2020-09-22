function addNote() {
    let div = document.createElement('div');
    var parent = document.getElementById("nav-menu");
    var parentNode = div.parentNode;
    div.className = "note";
    div.insertAdjacentHTML("afterbegin", `<p class="note-name">Note</p> <p class="note-desc">Desc</p>`);
    parent.insertBefore(div, parentNode);

}