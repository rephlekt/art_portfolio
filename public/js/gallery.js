var pswpElement = document.querySelectorAll('.pswp')[0];

// build items array
var items = [
    {
        src: 'images/plus_one.jpg',
        w: 2048,
        h: 2048,
        title: "plus one"
    },
    {
        src: 'images/walking_distance.jpg',
        w: 3800,
        h: 2400,
        title: "walking distance"
    }
];

// define options (if needed)
var options = {
    // optionName: 'option value'
    // for example:
    index: 0 // start at first slide
};

// Initializes and opens PhotoSwipe
var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);

comics = document.querySelectorAll(".comic");
for (i=0; i < comics.length; i++){
    comics[i].addEventListener("click", () => {
        gallery.init();
        console.log("clicked")
    })
}