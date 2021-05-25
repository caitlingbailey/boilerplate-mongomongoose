require('dotenv').config();
var mongoose = require('mongoose');

mongoose.connect(process.env['MONGO_URI'], { useNewUrlParser: true, useUnifiedTopology: true });

// Create new schema instance
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

// Create instance of new schema
const Person = mongoose.model("Person", personSchema);


const createAndSavePerson = (done) => {

  let bobSmith = new Person({name: "Bob Smith", age: 25, favoriteFoods: ["Pizza", "Burger", "Tacos"]});
  
  bobSmith.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

let arrayOfPeople = [
  {name: "Eric Bob", age: 50, favoriteFoods: ["Pizza", "Burger"]}, 
  {name: "Smith Bob", age: 25, favoriteFoods: ["Fajitas", "Pasta"]}];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data) {
    if (err) return console.error(err);
    done(null, data)
})};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, personFound) {
    if (err) return console.error(err);
    done(null, personFound) 
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function (err, data) {
    if (err) return console.log(err);
    done(null, data) 
  });
};


const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return console.log(err);
    done(null, data)
  });
};


const findEditThenSave = (personId, done) => {
  // Define the food to add
  const foodToAdd = "hamburger";

  // Find the person by ID
  Person.findById(personId, (err, person) => {
    if (err) return console.log(err);

    // Add the new food
    person.favoriteFoods.push(foodToAdd);

    // Save the updated person
    person.save((err, updatedPerson) => {
      if (err) return console.log(err);
      done(null, updatedPerson)
    });
  });
};


const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName},
    {age : ageToSet},
    { new: true },
    (err, updatedDoc) => {
      if (err) return console.log(err);
      done(null, updatedDoc)
    }
  );
};




const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
