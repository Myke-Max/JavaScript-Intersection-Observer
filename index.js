const cardContainer = document.getElementById("card-container");
const cards = document.querySelectorAll(".card");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("show", entry.isIntersecting);
      // do not hide the card after scroll up
      // if (entry.isIntersecting) observer.unobserve(entry.target);
    });
    // console.log(entries);
  },
  {
    // root: container

    // preload content earlie 100px and -100px  smaller container
    // rootMargin: "-50px",

    threshold: 1,
  }
);

const lastCardObserver = new IntersectionObserver((entries) => {
  const lastCard = entries[0];
  if (!lastCard.isIntersecting) return;
  loadNewCard();
  lastCardObserver.unobserve(lastCard.target);

  lastCardObserver.observe(document.querySelector(".card:last-child"));
});

lastCardObserver.observe(document.querySelector(".card:last-child"));
// console.log(document.querySelector(".card:last-child"));
cards.forEach((card) => {
  observer.observe(card);
});

// fetch imitation

function loadNewCard() {
  for (let i = 0; i < 1; i++) {
    const newCard = document.createElement("div");
    newCard.textContent = "New Card";
    newCard.classList.add("card");
    observer.observe(newCard);
    cardContainer.append(newCard);
  }
}

// MutationObserver

const mutationObserver = new MutationObserver((entries) => {
  console.log(entries);
});
// observe text node of one element
// mutationObserver.observe(cardContainer.children[0].childNodes[0]

mutationObserver.observe(cardContainer, {
  // observe changes insaid
  // childList: true,

  // observe  attributes,old attributes , and filter
  // attributes: true,
  // attributeOldValue: true,
  // attributeFilter: ["id"],

  // observe all text inside the perent
  subtree: true,

  // observe text inside something
  characterData: true,
  characterDataOldValue: true,
});

// // child exemple
// cardContainer.children[0].remove();
// setTimeout(() => {
//   cardContainer.appendChild(document.createElement("div"));
// }, 2000);

// // attributes exemple
// cardContainer.id = "cardID";
