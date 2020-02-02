$.getJSON("/articles", function(data) {

  for (let i = 0; i < data.length; i++) {

    let photo;

      let thediv = $("<div>")
        .addClass("card m-2")
        .addClass("theCard")
        .attr("style", "width: 18rem;")
         .attr("id", "cardBody")
        .attr("data-aos", "flip-left")
        .attr("data-aos-duration", "1500");

      let theImg = $("<img>")
        .attr("src", photo)
        .attr("alt", "")
        .addClass("card-img-top");

      let divBody = $("<div>").addClass("card-body");

      let theTitle = $("<h5>")
        .addClass("card-title").html(`${data[i].title}`)

      let theBody = $("<p>")
        .addClass("card-text")
        .addClass("card-text ml-3").html(`${data[i].blurb}`)

      var saveBtn = $("<button>");

      saveBtn.attr("id", data[i]._id);
      saveBtn.addClass("update");
      // saveBtn.addClass("ml-3");
      // saveBtn.addClass("mb-3");
      saveBtn.addClass("btn btn-danger");
      saveBtn.addClass("btn-sm");
      saveBtn.text(" Save ");

      var readBtn = $("<button>");

      readBtn.attr("id", data[i].link);
      readBtn.addClass("delete");
      // readBtn.addClass("ml-3");
      // readBtn.addClass("mb-3");
      readBtn.addClass("btn btn-danger");
      readBtn.addClass("btn-sm");
      readBtn.text(" Read More ");

      var noteBtn = $("<button>");

      noteBtn.attr("id", "place-holder");
      noteBtn.addClass("rsvp");
      // noteBtn.addClass("ml-3");
      // noteBtn.addClass("mb-3");
      noteBtn.addClass("btn btn-danger");
      noteBtn.addClass("btn-sm");
      noteBtn.text(" Create Note ");

      let applySave = $("<td class='align-middle'>").html(saveBtn);
      let applyRead = $("<td class='align-middle'>").html(readBtn);
      let applyNote = $("<td class='align-middle'>").html(noteBtn);

      thediv.append(theImg);
      thediv.append(divBody);
      thediv.append(theTitle);
      thediv.append(theBody);
      thediv.append(applySave);
      thediv.append(applyRead);
      thediv.append(applyNote);
      $("#articles").append(thediv);
  };
});


// Whenever someone clicks a p tag
$(document).on("click", "p", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
