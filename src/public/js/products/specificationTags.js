$("#productSpecificationsInput").keyup(function(event){
    if(event.keyCode === 188 || event.keyCode === 13) { // Check if comma or Enter key is pressed
        var tagText = $(this).val().trim().replace(/,/g, ''); // Remove commas from input
        if(tagText !== '') {
            let tagG = $('<span>').addClass('whitespace-nowrap ml-2 inline-flex items-center rounded h-6 px-2 py-1 text-sm font-medium bg-blue-900 text-blue-300')
            let svgCode = '<svg class="h-2 w-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" /> </svg>'
            let clearButton = $('<button>').addClass('ms-1 inline-flex items-center rounded-sm bg-transparent p-1 text-sm text-blue-400').attr('id', 'tagRemove').attr('type', 'button')
            tagG.text(tagText)
            clearButton.append(svgCode)
            tagG.append(clearButton);
            $("#productSpecList").append(tagG)
            $(this).val('')
        }
    }
});