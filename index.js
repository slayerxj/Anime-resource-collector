const stars = [
  "&#9733;&#9733;&#9733;&#9733;&#9733;",
  "&#9733;&#9733;&#9733;&#9733;",
  "&#9733;&#9733;&#9733;",
  "&#9733;&#9733;",
  "&#9733;",
];

const convertToTimeString = (date) => date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate();

const sorter = (a, b) => new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime();

const generateTableContent = (items) => {
  const table = document.getElementById("mainView");
  table.innerHTML =
    "<tr><th>Time</th><th>Title</th><th>Rank</th><th>Download</th></tr>" +
    items
      .map((cur) => {
        return `<tr><td>${convertToTimeString(
          new Date(cur.publishTime)
        )}</td><td><a href='${cur.url}'>${cur.name}</a></td><td>${stars[cur.generalRanking]
          }</td><td><a href='${cur.magnetLink}'>link</a></td></tr>`;
      })
      .join("");
}

fetch('result.json')
  .then(response => response.json())
  .then(data => data.sort(sorter))
  .then(generateTableContent);