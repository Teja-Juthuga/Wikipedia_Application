let searchInputEl = document.getElementById("searchInput");

let searchResultsDiv = document.getElementById("searchResults");

let spinEl = document.getElementById("spinner"); 

function createAndAppendSearchResult(result){
    let {title, link, description} = result;
    
    searchResultsDiv.classList.add('search-results');
    
    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.textContent = title;
    titleEl.target = "_blank";
    titleEl.classList.add('result-title');
    searchResultsDiv.appendChild(titleEl);
    
    let lineBreakEl = document.createElement("br");
    searchResultsDiv.appendChild(lineBreakEl);
    
    let linkEl = document.createElement("a");
    linkEl.href = link;
    linkEl.textContent = link;
    linkEl.target = "_blank";
    linkEl.classList.add('result-url');
    searchResultsDiv.appendChild(linkEl);
    
    let linkBreakEl = document.createElement("br");
    searchResultsDiv.appendChild(linkBreakEl);
    
    let descriptionEl = document.createElement("a");
    descriptionEl.textContent = description;
    descriptionEl.classList.add('link-description');
    searchResultsDiv.appendChild(descriptionEl);
    
    let descriptionBreakEl = document.createElement("br");
    searchResultsDiv.appendChild(descriptionBreakEl);
    
    
}

function display_result(search_results){
    spinEl.classList.toggle("d-none");
    for (let result of search_results){
        createAndAppendSearchResult(result);
    }
}

function wikipediaSearch(e) {
    if (e.key === "Enter") {
        searchResultsDiv.textContent = ""; 
        spinEl.classList.toggle("d-none");
        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method : "Get"
        };
        fetch(url,options)
        .then(function(response){
            return response.json();
        })
        .then(function(jsonData){
            let {search_results} = jsonData;
            display_result(search_results);
      
        });
        
    }
}
searchInputEl.addEventListener("keydown", wikipediaSearch);