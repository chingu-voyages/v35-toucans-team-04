// check for premission after setting reminder
// Notification.requestPermission().then(function (status) {
//   if (status != "granted") {
//     alert("Please allow notification of the site.");
//   }
// });

// Toggle effects of week buttons
$(".btn-toggle").mouseup(function () {
  $(this).removeClass("btn-info").addClass("btn-outline-info");
});

// Form functions

// Form verification
function verifyForm(thisObj, formArr) {
  // Hightlight the border and prevent the modal from being closed when required fields are not completed
  if (getTitle(formArr).value || getTime(formArr).value) {
    $(".required").removeClass("highlight");
    $(".required-msg").each(function () {
      this.innerHTML = "";
    });
    thisObj.attr("data-dismiss", "modal");
    return true;
  } else {
    thisObj.removeAttr("data-dismiss");
    $(".required").addClass("highlight");
    $(".required-msg").each(function () {
      this.innerHTML = "Please fill in the * fields";
    });
    return false;
  }
}

// Look for this button's parent with class "modal-content", find "form" element in all childrens, get the "id" attribute of this form
function getFormID(thisObj) {
  return "#" + thisObj.parents(".modal-content").find("form")[0].id;
}
// Get title object from given form array
function getTitle(formArr) {
  return formArr.filter(function (e) {
    return e.name === "title";
  })[0];
}
// Get time object from given form array
function getTime(formArr) {
  return formArr.filter(function (e) {
    return e.name === "time";
  })[0];
}
// Get date object from given form array
function getDate(formArr) {
  return formArr.filter(function (e) {
    return e.name === "date";
  })[0];
}

// Insert daily item into daily list
function newDailyItem(formArr) {
  var title = getTitle(formArr);
  var time = getTime(formArr);
  $(".daily-list")
    // Append item into list, displaying title and time
    .append(
      "<li href='#' class='list-group-item list-group-item-action'><div class='d-flex justify-content-between'><h5><a class='far fa-square'></a>" +
        title.value +
        "</h5><span>" +
        time.value +
        "<a class='far fa-trash-alt'></a></span></div></li>"
    )
    // Temporary data storage, will be repalced with storing to browser
    .append("<p class='item-data'>" + JSON.stringify(formArr) + "</p>");
}

// Bind functions to plus button
$(".new-daily").click(function () {
  formID = getFormID($(this));
  // Convert the form data to JSON object
  formArr = $(formID).serializeArray();
  // Verify form, close modal, clear form and add item if verified
  if (verifyForm($(this), formArr)) {
    newDailyItem(formArr);
    // Reset form content
    $(formID)[0].reset();
  }
});

$(".edit-daily").click(function () {
  //Read item into form
  // Convert string to JSON object
  var obj = $.parseJSON(formData);
});

// Insert todo item into todo list
function newTodoItem(formArr) {
  var title = getTitle(formArr);
  var date = getDate(formArr);
  $(".todo-list")
    // Append item into list, displaying title and time
    .append(
      "<li href='#' class='list-group-item list-group-item-action'><div class='d-flex justify-content-between'><h5><a class='far fa-square'></a>" +
        title.value +
        "</h5><span>" +
        date.value +
        "<a class='far fa-trash-alt'></a></span></div></li>"
    )
    // Temporary data storage, will be repalced with storing to browser
    .append("<p class='item-data'>" + JSON.stringify(formArr) + "</p>");
}

$(".new-todo").click(function () {
  formID = getFormID($(this));
  // Convert the form data to JSON object
  formArr = $(formID).serializeArray();
  // Verify form, close modal, clear form and add item if verified
  if (verifyForm($(this), formArr)) {
    newTodoItem(formArr);
    // Reset form content
    $(formID)[0].reset();
  }
});
