const accessKey = "gBDTwLnAyLGyuu8BVRK2TtcPBoQ37BH-xA8BUnEJfCg";

const form = document.querySelector("form");
const searchInput = document.getElementById("search-input");
const searchResult = document.querySelector(".search-results");
const showMoreButton= document.getElementById("showmore-button");

page = 1;

form.addEventListener("submit", (event)=>{
    event.preventDefault();
    page = 1;
    searchImage(searchInput.value);
});

async function searchImage(key){
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${key}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    if(page == 1){
        searchResult.innerHTML = "";
    }
    const result = data.results;
    result.map((results) => {    
    const imageWrapper = document.createElement("div")
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = results.urls.small;
    image.alt = results.alt_description;
    const imageLink = document.createElement("a");
    imageLink.classList.add("anchor-tag");
    imageLink.href = results.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = results.alt_description;
    
    imageWrapper.onclick = function(){
        window.open(`${results.links.html}` ,'_blank');
        // window.location.href="thml";
    }

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);

    searchResult.appendChild(imageWrapper);


    });

    page++;

    if(page > 1){
        showMoreButton.style.display = "block";
    }
}

showMoreButton.addEventListener("click", () => {
    searchImage(searchInput.value);
    console.log("clicked");
})