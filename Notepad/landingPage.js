let allContent = [];
let noteItemId;
let parent = document.getElementById("content");
allContent = JSON.parse(localStorage.getItem("notes"))
  ? JSON.parse(localStorage.getItem("notes"))
  : [];
document.getElementById("addBtn").addEventListener("click", function () {});

document.getElementById("textBold").addEventListener("click", function () {
  const fontWeight = document.getElementById("addContent").style.fontWeight;
  document.getElementById("addContent").style.fontWeight =
    fontWeight === "bold" ? "normal" : "bold";
});

document.getElementById("textUnderline").addEventListener("click", function () {
  const textDecoration =
    document.getElementById("addContent").style.textDecoration;
  document.getElementById("addContent").style.textDecoration =
    textDecoration === "underline" ? "none" : "underline";
});

document.getElementById("copyContent").addEventListener("click", function () {
  var copyText = document.getElementById("addContent");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
});
if (allContent && allContent.length > 0) {
  allContent.forEach((element) => {
    let x = element.title;
    parent.innerHTML += `
          <div class="col-md-4 col-sm-6 col-12" id="${element.id}">
          <div class="card text-white bg-dark mb-3" style="max-width: 34rem;height: 16rem;">
              <div class="card-header d-flex justify-content-between align-items-center"><span id="titleId">${element.title}</span>
              <div class="d-flex"><div class="mr-3 cursorPointer" onclick="edit('${element.title}','${element.description}','${element.id}')"><i  class="fa fa-pencil-square-o" aria-hidden="true"></i></div>
              <div class="cursorPointer" onclick="deleteItem('${element.id}')"><i class="fa fa-trash-o" aria-hidden="true"></i></div></div>
              </div>
              <div class="card-body bg-warning">
                <p class="card-text">${element.description}</p>
              </div>
            </div>
          </div>`;
  });
}
function edit(title, description, id) {
  noteItemId = id;
  let noteDom = document.getElementById(noteItemId);
  document.getElementById("addBtn").click();
  document.getElementById("saveBtn").style.display = "none";
  document.getElementById("editBtn").style.display = "block";
  document.getElementById("noteTitle").value = title;
  document.getElementById("addContent").value = description;
}
function deleteItem(id) {
  document.getElementById(id).remove();
  allContent.forEach((element, index) => {
    if (element.id === parseInt(id)) {
      allContent.splice(index, 1);
    }
  });
  localStorage.clear();
  localStorage.setItem("notes", JSON.stringify(allContent));
}
function update() {
  let updatedTitle = document.getElementById("noteTitle").value;
  let updatedDescription = document.getElementById("addContent").value;
  let noteDom = document.getElementById(noteItemId);
  noteDom.querySelector("#titleId").innerHTML = updatedTitle;
  noteDom.querySelector(".card-text").innerHTML = updatedDescription;
  noteDom.querySelector(".card-text").style.fontWeight =
    noteDom.querySelector(".card-text").style.fontWeight === "bold"
      ? "normal"
      : "bold";
  noteDom.querySelector(".card-text").style.textDecoration =
    noteDom.querySelector(".card-text").style.textDecoration === "underline"
      ? "none"
      : "underline";
  allContent.forEach((element, index) => {
    if (element.id === parseInt(noteItemId)) {
      allContent[index].title = updatedTitle;
      allContent[index].description = updatedDescription;
    }
  });
  localStorage.clear();
  localStorage.setItem("notes", JSON.stringify(allContent));
  document.getElementById("noteTitle").value = "";
  document.getElementById("addContent").value = "";
}

document.getElementById("saveBtn").addEventListener("click", function () {
  let title = document.getElementById("noteTitle").value;
  let noteContent = document.getElementById("addContent").value;
  let uniqueId = new Date().getTime();
  allContent.push({ id: uniqueId, title: title, description: noteContent });
  localStorage.setItem("notes", JSON.stringify(allContent));
  parent.innerHTML += `
    <div class="col-md-4 col-sm-6 col-12" id="${uniqueId}">
    <div class="card text-white bg-dark mb-3" style="max-width: 34rem;height: 16rem;">
        <div class="card-header d-flex justify-content-between align-items-center"><span id="titleId">${title}</span>
        <div class="d-flex"><div class="mr-3 cursorPointer" onclick="edit('${title}','${noteContent}','${uniqueId}')" ><i class="fa fa-pencil-square-o" aria-hidden="true"></i></div>
        <div class="cursorPointer" onclick="deleteItem('${uniqueId}')"><i class="fa fa-trash-o" aria-hidden="true"></i></div></div></div>
        <div class="card-body bg-warning">
          <p class="card-text">${noteContent}</p>
        </div>
      </div>
    </div>`;
  document.getElementById("noteTitle").value = "";
  document.getElementById("addContent").value = "";
});
