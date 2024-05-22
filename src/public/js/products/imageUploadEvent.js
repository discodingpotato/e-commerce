$("#images").change(function (e) {
    e.preventDefault();
    croppedImageCount = 0;
    totalUploaded = e.target.files.length;
    uploadedImages = [...e.target.files].filter(file => file.type.startsWith('image'));
    if(e.target.files.length == 1){
        if(!e.target.files[0].type.startsWith('image/')) {
            $("#previewContainer").siblings('h3').find('span').text('Upload only images!');
            return;
        };
    }
    if(e.target.files.length > 0) {
        previewContainer.classList.replace('hidden', 'grid')
        handleImageCrop()
    }
});