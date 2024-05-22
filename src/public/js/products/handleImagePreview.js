function handleImagePreview(imageFile) {
    const reader = new FileReader();
    reader.onload = function (e) {
        // Preview Div
        const previewImageDiv = document.createElement('div');
        previewImageDiv.className = 'relative rounded-lg bg-neutral-900 p-2 h-auto max-w-full lg:w-36';
        previewImageDiv.id = `previewImageDiv`;
        // Preview Image
        let previewImage = document.createElement('img');
        console.log(e.target);
        previewImage.src = e.target.result;
        previewImage.alt = `previewImage`;
        // Remove Button
        let previewDeleteButton = document.createElement('button');
        previewDeleteButton.className = 'absolute bottom-1 left-1 cursor-pointer bg-transparent text-red-600';
        previewDeleteButton.innerHTML = '<svg aria-hidden="true" class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">\n<path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path>\n</svg>'
        
        previewImageDiv.appendChild(previewImage);
        previewImageDiv.appendChild(previewDeleteButton);
        previewContainer.appendChild(previewImageDiv);
    }
    reader.readAsDataURL(imageFile);
}