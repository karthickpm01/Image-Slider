const initslider = () => {
    const imagelist = document.querySelector(".slide-wrapper .image-list");
    const slidebuttons = document.querySelectorAll(".slide-wrapper .slide-button");
    const sliderscrollbar = document.querySelector(".container .slider-scrollbar");
    const scrollbarthumb = sliderscrollbar.querySelector(".scrollbar-thumb");
    const maxscroll = imagelist.scrollWidth - imagelist.clientWidth;

    scrollbarthumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbposition = scrollbarthumb.offsetLeft;

        //update thumb position on mouse move
        const handleMouseMOve = (e) => {
            const deltaX = e.clientX - startX;
            const newthumbposition = thumbposition + deltaX;

            const maxthumbposition = sliderscrollbar.getBoundingClientRect().width - scrollbarthumb.offsetWidth;

            const boundedposition = Math.max(0,Math.min(maxthumbposition,newthumbposition));
            const scrollposition = (boundedposition / maxthumbposition) * maxscroll;

            scrollbarthumb.style.left = `${boundedposition}px`;
            imagelist.scrollLeft = scrollposition;
        }

        const handleMouseup = () => {
            document.removeEventListener("mousemove", handleMouseMOve);
            document.removeEventListener("mouseup", handleMouseup);
        }
        //add event to drag interaction
        document.addEventListener("mousemove", handleMouseMOve) 
        document.addEventListener("mouseup", handleMouseup)
    });

    slidebuttons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollamt = imagelist.clientWidth * direction;
            imagelist.scrollBy({ left: scrollamt, behavior: "smooth" });
        });
    });

    //hiding buttons if no more items
    const handleslidebuttons = () => {
        slidebuttons[0].style.display = imagelist.scrollLeft <= 0 ? "none" : "block";
        slidebuttons[1].style.display = imagelist.scrollLeft >= maxscroll ? "none" : "block";
    }

    //update scrollbar thumb
    const updatescrollbarthumb = () => {
        const scrollposition = imagelist.scrollLeft;
        const thumbposition = (scrollposition / maxscroll) * (sliderscrollbar.clientWidth - scrollbarthumb.offsetWidth)
        scrollbarthumb.style.left = `${thumbposition}px`;
    }
    imagelist.addEventListener("scroll", () => {
        handleslidebuttons();
        updatescrollbarthumb();
    });
};
window.addEventListener("load", initslider)