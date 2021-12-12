// ===============================
// =======Browser functions=======

// Check localStorage support
if (!localStorage) {
  alert(
    "localStorage not supported under certain browser or incognito mode, please check your browser"
  );
}

// ============================
// =======Form functions=======

// Get value from given form
function getInput(name, inputs) {
  for (let index = 0; index < inputs.length; index++) {
    if (inputs[index].name == name) {
      return inputs[index].value;
    }
  }
}

// Remove verification highlight and message
function removeMsg(elementName) {
  $("." + elementName + "-input").removeClass("highlight");
  $("." + elementName + "-msg").each(function () {
    this.innerHTML = "";
  });
}

$(".add-btn").click(function () {
  // Reset form on adding item
  $("#daily-form")[0].reset();
  // Remove verification highlight and message if existed
  removeMsg("time");
  removeMsg("title");
});

// Verify and reset the form on save
$(".save-btn").click(function () {
  // Convert the form data to JSON object
  let inputs = $(".form-control");

  // Verify form
  if (!verifyDaily($(this), inputs)) {
    return;
  }
  newDaily(inputs);
});

// Form verification
function verifyDaily(saveBtn, inputs) {
  let title = getInput("title", inputs);
  let time = getInput("time", inputs);
  // Allow the modal to close when both required fields are not null
  if (title) {
    saveBtn.attr("data-dismiss", "modal");
    return true;
  }

  if (title) {
    removeMsg("title");
  } else {
    $(".title-input").addClass("highlight");
    $(".title-msg").each(function () {
      this.innerHTML = "Please enter a title";
    });
  }

  if (time) {
    removeMsg("time");
  } else {
    $(".time-input").addClass("highlight");
    $(".time-msg").each(function () {
      this.innerHTML = "Please enter a time";
    });
  }
  // Prevent the modal from being closed when any required field is null
  saveBtn.removeAttr("data-dismiss");
  return false;
}

// ============================
// =======Page functions=======

let storage = localStorage;
// Get last saved date, if null, assign as current date
let today = new Date().toLocaleDateString();
let savedDate = storage.getItem(0);
if (!savedDate) {
  storage.setItem(0, today);
  savedDate = storage.getItem(0);
}

// Insert DOM and bind icon functions if there is data in storage
for (let index = 1; index < storage.length; index++) {
  let data = storage.getItem(index);
  $(".add-btn").before(data);
  let delBtn = $(".item-del-btn")[index - 1];
  $(delBtn).click(() => {
    deleteItem($(delBtn), index - 1);
  });
  let itemMain = $(".item-main")[index - 1];
  $(itemMain).click(() => {
    checkItem($(itemMain), index - 1);
  });
}

// Reset checklist for a new day
if (today != savedDate) {
  // Remove checked class on the page
  $(".checked").removeClass("checked");
  // Remove checked in stored string
  for (let index = 0; index < storage.length; index++) {
    storage[index] = storage[index].replace(" checked", "");
  }
  storage.setItem(0, today);
}

// Delete certain item and remove its data in local storage
function deleteItem(delBtn, key) {
  let confirmed = confirm("Are you sure to delete this item?");
  if (confirmed) {
    // Remove item on page
    delBtn.parents(".reminder-item").remove();
    // Remove data
    if (storage.length > 2) {
      for (let index = key + 1; index < storage.length; index++) {
        storage.setItem(index, storage.getItem(index + 1));
      }
      storage.removeItem(storage.length - 1);
    } else {
      storage.clear();
      storage.setItem(0, today);
    }
  }
}

// Change css of checked item, replace the saved in local storage item with checked one
function checkItem(itemMain, key) {
  itemMain.toggleClass("checked");
  storage.setItem(key + 1, itemMain.parents(".reminder-item")[0].outerHTML);
}

// Insert daily item, save to localStorage
function newDaily(inputs) {
  let title = getInput("title", inputs);
  let time = getInput("time", inputs);
  let notes = getInput("notes", inputs);
  // Insert item before the add button
  let DOM =
    "<div class='reminder-item'>" +
    "<div class='row'>" +
    "<div class='col-lg-11 col-md-11 col-sm-11 row item-main'>" +
    "<h4 class='col-lg-11 col-md-11 col-sm-11 item-title'>" +
    title +
    "</h4><span class='col-lg-1 col-md-1 col-sm-1 item-time'>" +
    time +
    "</span></div><div class='col-lg-1 col-md-1 col-sm-1'>" +
    "<button type='button' class='item-del-btn'>" +
    "<i class='far fa-trash-alt'></i></button></div></div>";
  if (notes == "") {
    $(".add-btn").before((DOM += "</div>"));
  } else {
    $(".add-btn").before(
      (DOM += "<div class='item-notes'><span>" + notes + "</span></div></div>")
    );
  }

  // Save the item DOM just inserted in string
  let key = storage.length;
  let savedDOM = $(".add-btn").prev()[0];
  storage.setItem(key, savedDOM.outerHTML);

  // Bind delete function with trash can icon
  let delBtn = $(savedDOM).find(".item-del-btn")[0];
  $(delBtn).click(() => {
    deleteItem($(delBtn), key);
  });

  // Check the item on clicking on main content
  let itemMain = $(savedDOM).find(".item-main")[0];
  $(itemMain).click(() => {
    checkItem($(itemMain), key);
  });
}
