
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('TodoList').del()
    .then(function () {
      // Inserts seed entries
      return knex('TodoList').insert([
        {id: 1, Tasks: 'Get bottle of wine', Description:'Red wine xxxBrand',   Priority:'', Completed:'Not Yet'},
        {id: 2, Tasks: 'Pick up kids from school', Description:'Call around 12:00pm',    Priority:'', Completed:'Not Yet' },
        {id: 3, Tasks: 'Call mom', Description:'Call around 12pm',  Priority:'',     Completed:'Not Yet'},
        {id: 4, Tasks: 'Do Shopping', Description:'Bananas, apples, lentils',  Priority:'', Completed:'Not Yet' },
      ])
    })
}
