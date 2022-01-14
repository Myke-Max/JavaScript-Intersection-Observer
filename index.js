const cardContainer = document.getElementById("card-container");
const cards = document.querySelectorAll(".card");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("show", entry.isIntersecting);
      // do not hide the card after scroll up
      if (entry.isIntersecting) observer.unobserve(entry.target);
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

const lastCardObserver = new IntersectionObserver(
  (entries) => {
    const lastCard = entries[0];
    if (!lastCard.isIntersecting) return;
    loadNewCard();
    lastCardObserver.unobserve(lastCard.target);

    lastCardObserver.observe(document.querySelector(".card:last-child"));
  },
  { rootMargin: "100px" }
);

lastCardObserver.observe(document.querySelector(".card:last-child"));

cards.forEach((card) => {
  observer.observe(card);
});

function loadNewCard() {
  for (let i = 0; i < 10; i++) {
    const newCard = document.createElement("div");
    newCard.textContent = "New Card";
    newCard.classList.add("card");
    observer.observe(newCard);
    cardContainer.append(cards);
  }
}
