// helper
const sanitize = (string) => string.toLowerCase().replace(/[^a-z0-9]/g, '')

// Data
const ukraine = ukraineRaw.games.map(game => sanitize(game.title));
const rJE = rJERaw.games.map(game => sanitize(game.title));
const bundles = [
  { title: 'Ukraine',
    games: ukraine,
    url: 'https://itch.io/b/1316'
  },
  { title: 'Racial Justice and Equality',
    games: rJE,
    url: 'https://itch.io/b/520'
  }
]

// Document
const output = document.getElementById('output');
const input = document.getElementById('input');
const submit = document.getElementById('submit');

// Functions
const check = (shoppingArray) => {
  shoppingArray.forEach(title => {

    // Render the gmae's title to the document
    const h3 = document.createElement('a');
    h3.classList.add('h3');
    h3.setAttribute('target', '_blank');
    h3.appendChild(document.createTextNode(title));
    output.appendChild(h3);

    const includedIn = [];

    bundles.forEach(bundle => {
      if (bundle.games.includes(sanitize(title))) {
        includedIn.push(bundle.title);

        // Render the list of bundles to the document
        const anchor = document.createElement('a');
        anchor.setAttribute('target', '_blank');
        anchor.setAttribute('href', bundle.url);
        anchor.appendChild(document.createTextNode(bundle.title));
        output.appendChild(anchor);
      }
    });

    if (!includedIn.length) {
      const p = document.createElement('p');
      p.classList.add('c-fg-neg');
      p.appendChild(document.createTextNode('Not found in any Itch bundles'));
      output.appendChild(p);
    }
  });
}

// Event Handlers
submit.onclick = (event) => {
  const inputValue = input.value;
  input.value = '';
  check([inputValue]);
  event.preventDefault();
}

// Use this to block on document load if need be
// document.addEventListener('DOMContentLoaded', (event) => { ... });
