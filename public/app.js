$(".notes").hide()

$.getJSON("/articles", function(data) {

  creatCard(data)
});

$.getJSON("/saved", function(data) {

  for (let i = 0; i < data.length; i++) {

    let photo;

      let thediv = $("<div>")
        .addClass("card w-100 mt-3 mb-3 p-2")
        .addClass("theCard")
        .addClass("align-top")
        .attr("style", "width: 18rem;")
        .attr("id", "cardBody")

      let theImg = $("<img>")
        .attr("src", photo)
        .attr("alt", "")
        .addClass("card-img-top");

      let divBody = $("<div>").addClass("card-body");

      let theTitle = $("<p>")
        .addClass("card-text ml-3")
        .html(`<h2>${data[i].title}</h2>`)

      let theBody = $("<p>")
        .addClass("card-text ml-3")
        .html(`${data[i].blurb}`)

      var saveBtn = $("<button>")
        .attr("id", data[i]._id)
        .attr("saved", data[i].saved)
        .addClass("ml-3")
        .addClass("save")
        .addClass("btn btn-danger")
        .addClass("btn-sm")
        .html(" Save ")

      var readBtn = $("<button>")
        .addClass("ml-3")
        .addClass("read")
        .addClass("btn-sm")
        .addClass("btn btn-danger")
        .html(`<a href="${data[i].link}" target="blank">${"Read More"}</a>`)

      var noteBtn = $("<button>")
        .attr("id", data[i]._id)
        .addClass("ml-3")
        .addClass("note")
        .addClass("btn btn-danger")
        .addClass("btn-sm")
        .html(" Create Note ")
 
      let applySave = $("<td class='align-middle'>").html(saveBtn);
      let applyRead = $("<td class='align-middle'>").html(readBtn);
      let applyNote = $("<td class='align-middle'>").html(noteBtn);
      
      thediv.append(divBody);
      thediv.append(theImg);
      thediv.append(theTitle);
      thediv.append(theBody);
      thediv.append(applySave);
      thediv.append(applyRead);
      thediv.append(applyNote);
      $(".articles").append(thediv);
  };
});

$(document).on("click", ".save", function() {

  // $("#notes").empty();
  var thisId = $(this).attr("id");

  console.log("save works")
  console.log(thisId)
  console.log($(this).attr("saved"))

  $.ajax({
    method: "PUT",
    url: "/articles/" + thisId,
    data: {
      id: $(this).attr("id"),
      saved: $(this).attr("saved")
    }
  })
    .then(function(data) {
      console.log(data);
    });
});

$(document).on("click", ".read", function() {
  // Grab the id associated with the article from the submit button
  console.log("read works")  
  console.log(thisId)
});

$(document).on("click", ".note", function() {

  var thisId = $(this).attr("id");
  $(".submitNote").attr("note-id", thisId)

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    .then(function(data) {
      
      $(".notes").show()
      $(".articleTitle").html(data.title);
      $(".articleBlurb").html(data.blurb);

      if (data.note) {
        $(".noteTitle").val(data.note.title);
        $(".articleNote").val(data.note.body);
      }
    });
});

$(".submitNote").on("click", function(event) {
  event.preventDefault()
  console.log("this works")

  var thisId = $(this).attr("note-id");
  console.log(thisId)

  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $(".noteTitle").val().trim(),
      body: $(".articleNote").val().trim()
    }
  })
    .then(function(data) {
      // $("#notes").hide()
      $(".noteTitle").val("")
      $(".articleNote").val("")
    });
})

function creatCard(data) {

  for (let i = 0; i < data.length; i++) {

    let photo;

      let thediv = $("<div>")
        .addClass("card w-100 mt-3 mb-3 p-2")
        .addClass("theCard")
        .addClass("align-top")
        .attr("style", "width: 18rem;")
        .attr("id", "cardBody")

      let theImg = $("<img>")
        .attr("src", photo)
        .attr("alt", "")
        .addClass("card-img-top");

      let divBody = $("<div>").addClass("card-body");

      let theTitle = $("<p>")
        .addClass("card-text ml-3")
        .html(`<h2>${data[i].title}</h2>`)

      let theBody = $("<p>")
        .addClass("card-text ml-3")
        .html(`${data[i].blurb}`)

      var saveBtn = $("<button>")
        .attr("id", data[i]._id)
        .attr("saved", data[i].saved)
        .addClass("ml-3")
        .addClass("save")
        .addClass("btn btn-danger")
        .addClass("btn-sm")
        .html(" Save ")

      var readBtn = $("<button>")
        .addClass("ml-3")
        .addClass("read")
        .addClass("btn-sm")
        .addClass("btn btn-danger")
        .html(`<a href="${data[i].link}" target="blank">${"Read More"}</a>`)

      var noteBtn = $("<button>")
        .attr("id", data[i]._id)
        .addClass("ml-3")
        .addClass("note")
        .addClass("btn btn-danger")
        .addClass("btn-sm")
        .html(" Create Note ")
 
      let applySave = $("<td class='align-middle'>").html(saveBtn);
      let applyRead = $("<td class='align-middle'>").html(readBtn);
      let applyNote = $("<td class='align-middle'>").html(noteBtn);
      
      thediv.append(divBody);
      thediv.append(theImg);
      thediv.append(theTitle);
      thediv.append(theBody);
      thediv.append(applySave);
      thediv.append(applyRead);
      thediv.append(applyNote);
      $(".articles").append(thediv);
  };
}
