// check for premission after setting reminder
// Notification.requestPermission().then(function (status) {
//   if (status != "granted") {
//     alert("Please allow notification of the site.");
//   }
// });
$(".btn-toggle").mouseup(function () {
  $(this).removeClass("btn-info").addClass("btn-outline-info");
});
