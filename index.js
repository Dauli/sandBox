// All event listners on selected IDs
document.getElementById('getText')
.addEventListener('click', getText);
document.getElementById('getUsers')
.addEventListener('click', getUsers);
document.getElementById('getPosts')
.addEventListener('click', getPosts);
document.getElementById('addPost')
.addEventListener('submit', addPost);

// function to get a sample text file format and display to the DOM
function getText() {
    fetch('sample.txt')
    .then( res => res.text() )
    .then( data => {
        document.getElementById('output').innerHTML = data;
    }).catch(err => console.log(err));
}

// function to get a local json from our own folder
function getUsers() {
    fetch('users.json')
    .then( res => res.json() )
    .then( data => {
        let output = `<h2 class="mb-4">Users</h2>`;
        data.forEach(user => {
            output += `
                <ul class="list-group mb-4">
                    <li class="list-group-item">ID: ${user.id}</li>
                    <li class="list-group-item">Name: ${user.name}</li>
                    <li class="list-group-item">Email: ${user.email}</li>
                    <li class="list-group-item">Gender: ${user.gender}</li>
                </ul>
            `;
        });
        document.getElementById('output').innerHTML = output;
    })
}

// function to get some API from server and display on the page
function getPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then( res => res.json() )
    .then( posts => {
        let output = `<h2 class="mb-4">Posts</h2>`;
        posts.forEach(post => {
            output += `
                <div class="card card-body mb-4">
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                </div>
            `;
        });
        document.getElementById('output').innerHTML = output;
    })
}

// function to post some data to the database
function addPost(e) {
    e.preventDefault();

    let title = document.getElementById('title').value;
    let body = document.getElementById('body').value;

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({title: title, body: body})
    })
    .then( res => res.json())
    .then( data => {
        console.log(data);
    })
    .catch( err => console.log(err) );
} 
