let express = require('express');
let knex = require('knex');

let app = express();

app.get('/api/artists', function(request, response) {
  let filter = request.query.filter;
  let connection = knex({
    client: 'sqlite3',
    connection: {
      filename: 'chinook.db'
    }
  });

  if (filter) {
    connection.select().from('artists').where('Name', 'like', `%${filter}%`).then((artists) => {
        response.json(artists);
    });
  } else {
    connection.select().from('artists').then((artists) => {
      var original = artists;
      var reformatted = original.map(obj => {
        var rObj = {};
        rObj['id'] = obj.ArtistId;
        rObj['name'] = obj.Name;
        return rObj;
      });
      response.json(reformatted);
    });
  }
});















// PORT for Heroku
app.listen(process.env.PORT || 8000);
