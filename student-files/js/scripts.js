//DOM Elements
const gallery = document.getElementById('gallery');
const body = document.querySelector('body');

//Get and Display 12 Random Users
let usersList = [];

async function fetchData(){
    try{
        //paste the URL and add =12 to fecth 12 random users
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

//Create a Modal Window

//keep track of the current employee modal
let currentModalIndex = 0;

gallery.addEventListener('click', (e) => {
    const clcikedCard = e.target.closest('.card');

    if(!clcikedCard){
        return
    }

    let employeeIndex = clcikedCard.getAttribute('data-index');
    //open the modal of the employee
    displayEmployeeModal(parseInt(employeeIndex));

})


function displayEmployeeModal(index){
    //remove any exixting moadal first so they don't stack up
    const existingModal = document.querySelector('.modal-container');
    if (existingModal){
        existingModal.remove();
    }

    //get the specific employee data using the index 
    let user = usersList[index]

    //formatting birthday to mm/dd/yyyy
    let birthday = new Date(user.dob.date);
    let formattedBirthday = (birthday.getMonth() + 1) + '/' + birthday.getDate() + '/' + birthday.getFullYear();

    const modalHTML = `
        <div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${user.picture.large}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
                        <p class="modal-text">${user.email}</p>
                        <p class="modal-text cap">${user.location.city}</p>
                        <hr>
                        <p class="modal-text">${user.phone}</p>
                        <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}</p>
                        <p class="modal-text">Birthday: ${formattedBirthday}</p>
                    </div>
                </div>
        </div>
    `
    //append modal to body
    body.insertAdjacentHTML('beforeend', modalHTML);

    const closeBtn = document.getElementById('modal-close-btn')
    const modalContainer = document.querySelector('.modal-container')
    
    //close modal using X button
    closeBtn.addEventListener('click', () => {
        modalContainer.remove();
    })
    
    // close modal when user click elsewhere
    modalContainer.addEventListener('click', (e) => {
        if (e.target.className === "modal-container"){
            modalContainer.remove()
        }
    })

}

