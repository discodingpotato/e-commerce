$(document).on('click', function(event) {
    if (!$(event.target).closest('#modalContainer').length) {
        $('#modalContainer').remove();
    }
});
$("#modalContainer").click(function (e) {
    e.stopPropagation()
})