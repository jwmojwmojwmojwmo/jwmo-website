let hue = 0;
let isScrolling = false;
const minPage = 1;
const maxPage = 4;
let page = minPage;
const footerDownButton = document.getElementById("footer-down-button");
const pageMap = new Map();
pageMap.set(1, document.getElementById("about-me"));
pageMap.set(2, document.getElementById("my-stuff"));
pageMap.set(3, document.getElementById("fun-facts"));
pageMap.set(4, document.getElementById("contact-me"));

function updateColors() {
    hue += 0.07;
    hue = (hue + ((Math.random() - 0.7) / 1.5)) % 360;

    // red=0, yellow=60, green=120, blue=240, purple=300
    const color1 = `hsl(${hue}, 100%, 50%)`;
    const color2 = `hsl(${(hue + 60) % 360}, 100%, 50%)`;
    const color3 = `hsl(${(hue + 120) % 360}, 100%, 50%)`;
    const color4 = `hsl(${(hue + 240) % 360}, 100%, 50%)`;
    const color5 = `hsl(${(hue + 300) % 360}, 100%, 50%)`;

    document.documentElement.style.setProperty('--color-1', color1);
    document.documentElement.style.setProperty('--color-2', color2);
    document.documentElement.style.setProperty('--color-3', color3);
    document.documentElement.style.setProperty('--color-4', color4);
    document.documentElement.style.setProperty('--color-5', color5);

    requestAnimationFrame(updateColors);
}

requestAnimationFrame(updateColors);
pageMap.get(page).classList.add("active-page");

window.addEventListener("wheel", (e) => {
    if (isScrolling) {
        return;
    }
    isScrolling = true;
    if (e.deltaY < 0) {
        console.log("up");
        flipAndUpdatePage(-1, false);
    } else {
        console.log("down");
        flipAndUpdatePage(1, false);
    }
    setTimeout(() => {
        isScrolling = false;
    }, 250);
});

footerDownButton.addEventListener("click", () => {
    console.log("test");
    flipAndUpdatePage(1, true);
});

function flipAndUpdatePage(pageChange, circularPage) {
    const prevPage = pageMap.get(page);
    page += pageChange;
    if (page < minPage) {
        page = minPage;
    }
    if (page > maxPage) {
        if (circularPage) {
            page = minPage;
        } else {
            page = maxPage;
        }
    }
    const currentPage = pageMap.get(page);
    if (prevPage == currentPage) {
        return;
    }
    prevPage.classList.toggle("active-page");
    currentPage.classList.toggle("active-page");
}