var pswpElement = document.querySelectorAll('.pswp')[0];

// build items array
var items = JSON.parse(document.getElementById("gallery_script").textContent);

// define options (if needed)
var options = {
    // optionName: 'option value'
    // for example:
    //index: 0 // start at first slide
};

comics = document.querySelectorAll(".comic");
for (i=0; i < comics.length; i++){
    comics[i].addEventListener("click", () => {
        // Initializes and opens PhotoSwipe
        var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
        console.log("clicked")
    })
}