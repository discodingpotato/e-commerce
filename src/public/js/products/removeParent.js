$("#previewContainer").on('click', 'button', function (e) {
    e.preventDefault()
    $(this).parent().remove()
});

$("#productSpecList").on('click', 'button', function (e) {
    e.preventDefault();
    $(this).parent().remove();
})