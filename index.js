const star = "&#9733;";

const sorter = (a, b) => new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime();

const convertToTimeString = (date) => date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate();

const generateTableContent = (items) => {
  const table = document.getElementById("mainView");
  table.innerHTML =
    "<tr><th>Time</th><th>Title</th><th>Rank</th><th>Download</th></tr>" +
    items.map((item) =>
      `<tr>
        <td>${convertToTimeString(new Date(item.publishTime))}</td>
        <td><a href='${item.url}'>${item.name}</a></td>
        <td>${star.repeat(5 - item.generalRanking)}</td>
        <td><a href='${item.magnetLink}'>link</a></td>
      </tr>`
    ).join("");
}

fetch('result.json')
  .then(response => response.json())
  .then(data => data.sort(sorter))
  .then(generateTableContent);