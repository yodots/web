export default function (movies, container) {
	let html = '';

	Object.keys(movies).forEach((year) => {
    html += `<h3>${year}</h3>`;

    for (let month in movies[year]) {
      if (month === '1')
        html += `<h4>January</h4>`;
      else if (month === '2')
        html += `<h4>February</h4>`;
      else if (month === '3')
        html += `<h4>March</h4>`;
      else if (month === '4')
        html += `<h4>April</h4>`;
      else if (month === '5')
        html += `<h4>May</h4>`;
      else if (month === '6')
        html += `<h4>June</h4>`;
      else if (month === '7')
        html += `<h4>July</h4>`;
      else if (month === '8')
        html += `<h4>August</h4>`;
      else if (month === '9')
        html += `<h4>September</h4>`;
      else if (month === '10')
        html += `<h4>October</h4>`;
      else if (month === '11')
        html += `<h4>November</h4>`;
      else if (month === '12')
        html += `<h4>December</h4>`;

      for (let day in movies[year][month]) {
        html += `<h5>${day}:</h5>`;

        for (let i=0; i<movies[year][month][day].length; i++) {
          html += `<div class="database-entry">
                    <div class="database-title" data-id="${movies[year][month][day][i]._id}">${movies[year][month][day][i].title}
                      <span class="edit-title" data-id="${movies[year][month][day][i]._id}"><span class="edit-title-text">( edit title )</span></span></div>
                    </div>
                      <div class="database-starrating" data-id="${movies[year][month][day][i]._id}">`;
          for (let j=0; j<movies[year][month][day][i].starRating; j++)
            html += `*`;
          html += `<span class="edit-starRating" data-id="${movies[year][month][day][i]._id}"><span class="edit-starRating-text">( edit stars )</span></span></div>
                    <div class="database-review">
                      <div class="read-review" data-id="${movies[year][month][day][i]._id}">${movies[year][month][day][i].review}</div>
                      <div class="edit-review" data-id="${movies[year][month][day][i]._id}"><button type="submit" class="edit-review-button">Edit Your Review</button></div>
                    </div>
                    <div class="database-delete">
                      <button type="submit" class="delete-movie-button" data-id="${movies[year][month][day][i]._id}">Delete This Movie</button>
                    </div>
                  </div>`;
        }
      }
    }
  });

  if (html === '')
    html = `<p><br />You have no movies! Please add some!</p>`;

	container.html(`<div class="database-add">
                   <button type="add-movie-button" class="add-movie-button">Add a Movie</button>
                  </div>` + html);
}