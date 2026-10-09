//DOM Elements
const gallery = document.getElementById('gallery');

//Get and Display 12 Random Users
let usersList = [];

async function fetchData(){
    try{
        const response = await fetch ("https://randomuser.me/api/?results=12");
        if (!response.ok){
            throw new Error (`Error fetching data - Status: ${response.status}`);
        }

        const data = await response.json();

        //Store the user inside an array
        usersList = data.results;

        //fucntion call to build the page
        userGalleryGenerator(usersList);

    }catch(error){
        console.error(error);
        gallery.innerHTML = '<p class="error"> Failed to load empolyee data. Please try again later</p>';
    }
}

// call the fetch function to start the app
fetchData();

function userGalleryGenerator(users){
    //clear the content
    gallery.innerHTML = "";

    //if there is no user then show an message
    if (users.length === 0){
        gallery.innerHTML = '<p class = "no_users"> No employee found</p>';
        return
    }

    users.forEach((user,index) => {
        let eachCard = `
            <div class="card" data-index = ${index}>
                    <div class="card-img-container">
                        <img class="card-img" src="${user.picture.large}" alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                        <p class="card-text">${user.email}</p>
                        <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
                    </div>
                </div>
        `;
        //allow you to add strings of HTML to the DOM without disrupting what already exists in the DOM
        gallery.insertAdjacentHTML('beforeend', eachCard);
    })
}