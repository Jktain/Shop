document.querySelector('#link-main').addEventListener('click', () => {
  ShowMain();
});

document.querySelector('#link-basket').addEventListener('click', () => {
  ShowBasket();
});

from.addEventListener('change', e => {
  if (e.target.value.trim()) {
    groupingObject.min = +e.target.value;
  } else {
    groupingObject.min = null;
  }

  refreshCards();
});

to.addEventListener('change', e => {
  if (e.target.value.trim()) {
    groupingObject.max = +e.target.value;
  } else {
    groupingObject.max = null;
  }
  refreshCards();
});
