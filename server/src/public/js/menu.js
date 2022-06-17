$(document).ready(function () {
  const element = $('meta[name="active-menu"]').attr('content');
  $(`#${element}`).addClass('active');
});
