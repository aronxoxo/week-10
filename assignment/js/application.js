function addPointRecords(cartodbResults) {
  _.each(cartodbResults.rows, function(rec){
    var name = $('<p></p>')
      .text('School Name: ' + rec.facil_name);

    var address = $('<p></p>')
      .text('Address: ' + rec.facil_address + ', Philadelphia, PA' + rec.zipcode);

    var grade = $('<p></p>')
      .text('Grade Level: ' + rec.grade_level);

    var enrollment = $('<p></p>')
      .text('Enrollment: ' + rec.enrollment);

    var recordElement = $('<li></li>')
      .addClass('list-group-item')
      .append(name)
      .append(address)
      .append(grade)
      .append(enrollment);

    $('#project-list').append(recordElement);
  });
};

function addPolygonRecords(cartodbResults) {
  _.each(cartodbResults.rows, function(rec){
    var tract = $('<p></p>')
      .text('Census Tract: ' + rec.name10);

    var enrollment = $('<p></p>')
      .text('Sum of enrollment: ' + rec.sum_of_enrollment);

    var count = $('<p></p>')
      .text('Number of schools: ' + rec.count_of_schools);

    var recordElement = $('<li></li>')
      .addClass('list-group-item')
      .append(tract)
      .append(enrollment)
      .append(count);

    $('#project-list').append(recordElement);
  });
};

function polygonsWithin(rect) {
  $('#project-list').empty();
  var sw = rect[0];
  var ne = rect[2];
  var sql = 'SELECT * FROM phillytracts_merge_merge WHERE the_geom @ ST_MakeEnvelope(' +
    sw.lng + ','+ sw.lat + ',' + ne.lng + ',' + ne.lat + ', 4326)';
  $.ajax('https://aaronsu.cartodb.com/api/v2/sql/?q=' + sql).done(function(results) {
    addPolygonRecords(results);
  });
};

$('.dropDown').change(function(e){
  $('#project-list').empty();
  if (drawnLayerID) { map.removeLayer(map._layers[drawnLayerID]); }

  var sql = "SELECT * FROM phillyschools WHERE type = '" + $('.dropDown').val() +"'";
  subLayer.set({
    sql: sql,
    cartocss: "#phillyschools { marker-fill: #055D00 }",
  });
  $.ajax('https://aaronsu.cartodb.com/api/v2/sql/?q=' + sql).done(function(results) {
    addPointRecords(results);
  });

});
