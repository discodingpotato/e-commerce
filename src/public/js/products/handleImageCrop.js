function handleImageCrop() {
    let modalClone = cropperModal.clone();
    modalClone.find("#cropperContainer").attr('src', URL.createObjectURL(uploadedImages[croppedImageCount]));
    modalClone.appendTo('body');
    let cropperContainer = document.getElementById('cropperContainer');
    let cropper = new Cropper(cropperContainer, {
        aspectRatio: -1,
        zoomable: false
    });
    // Apply?
    modalClone.find("#cropTheImage").click(function (e) {
        if(cropper) {
            let canvas = cropper.getCroppedCanvas();
            cropper.destroy();
            cropper = null;
            canvas.toBlob(function (blob) {
                handleImagePreview(blob)
            });
            $("#modalContainer").remove();
            croppedImageCount++
            if(croppedImageCount < totalUploaded) {
                handleImageCrop()
            }
        }
    })
}