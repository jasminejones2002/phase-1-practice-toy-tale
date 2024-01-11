let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  function createDivElement() {
    fetch('http://localhost:3000/toys')
      .then(res => res.json())
      .then(toys => {
        const toyCard = document.getElementById('toy-collection');
        toys.forEach(toy => {
          const toyDiv = document.createElement('div');
          toyDiv.className ='card';

          const h2 = document.createElement('h2');
          const img = document.createElement('img');
          const p = document.createElement('p');
          const button = document.createElement('button');

          img.src = toy.image;
          img.className = 'toy-avatar';

          button.className = 'like-btn';
          button.id = 'toy-id';
          button.textContent = 'Like ❤️';

          p.className = 'likes-count';
          p.textContent = 'Likes: '

          toyDiv.appendChild(h2);
          toyDiv.appendChild(img);
          toyDiv.appendChild(p);
          toyDiv.appendChild(button);

          toyCard.appendChild(toyDiv);
    });
  })
  .catch(error => {
    console.log('error', error)
  })
  updatingLikes();
  }
  createDivElement();

  function addingNewToy() {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: 
    {
      'Content-type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      'name': 'Jessie',
      'image': 'https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist',
      'likes': 0
    }),
  })
  .then(res => res.json())
  .then(data => {})
  }

  const toyForm = document.querySelector('.add-toy-form');
  toyForm.addEventListener('submit', event => {
    event.preventDefault();
    addingNewToy();
    toyForm.reset()
  })

  function updatingLikes() {
    const likeButton = document.querySelectorAll('.like-btn');

    likeButton.forEach(button => {
      button.addEventListener('click', () => {
        const toyId = button.dataset.toyId;

        console.log('toyId', toyId)

        const currentLikes = parseInt(button.dataset.likes);
        const newNumberOfLikes = currentLikes + 1;

        console.log('currentLikes', currentLikes)
        console.log('newNumberOfLikes', newNumberOfLikes)

        fetch(`http://localhost:3000/toys/${toyId}`, {
          method: 'PATCH',
          headers: 
        {
          'content-type': 'application/json',
          Accept: 'application/json'
        },
          body: JSON.stringify({
          'likes': newNumberOfLikes
          })
        })
        .then(res => res.json())
        .then(data => {
          console.log('Response data', data);
          const likesDis = button.parentElement.querySelector('.likes-count');
          likesDis.textContent = data.likes;
        })
        .catch(error => {
          console.log('Error', error)
        })
      })
    })
  }
  updatingLikes();
});
