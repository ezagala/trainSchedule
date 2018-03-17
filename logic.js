
var config = {
    apiKey: "AIzaSyDb4Jhsm6OpqFpCAbtTL60JuAe1VZl-6L8",
    authDomain: "train-table-2ef4e.firebaseapp.com",
    databaseURL: "https://train-table-2ef4e.firebaseio.com",
    projectId: "train-table-2ef4e",
    storageBucket: "",
    messagingSenderId: "958458046896"
  };

  firebase.initializeApp(config);

  var database = firebase.database(); 

  $(".btn").on("click", function(event){

      event.preventDefault(); 

      var trainName = $("#nameInput").val().trim(); 
      var destination = $("#destinationInput").val().trim(); 
      var firstTrain = $("#firstTrainInput").val(); 
      var freq = $("#frequencyInput").val().trim(); 

    var newTrain = {
        trainName: trainName,
        destination: destination, 
        firstTrain: firstTrain, 
        freq: freq
    }

    database.ref().push(newTrain); 

    $("#nameInput").val(''); 
    $("#destinationInput").val(''); 
    $("#firstTrainInput").val(''); 
    $("#frequencyInput").val(''); 

  })

  database.ref().on("child_added", function(snapshot){
      console.log(snapshot.val()); 

      var trainName = snapshot.val().trainName; 
      var destination = snapshot.val().destination;
      var firstTrainTime = snapshot.val().firstTrain; 
      var freq = snapshot.val().freq;

    //   Calculate mintues away
    //   var minutesAway = moment().diff(firstTrainTime); 
    //   console.log(firstTrainTime); 
    
    var tableRow = $("<tr>"); 

    var nameCell = $("<th scope='row'>" + trainName + "</th>"); 
    $(tableRow).append(nameCell); 

    var destCell = $("<td>" + destination + "</td>");
    $(tableRow).append(destCell);

    var freqCell = $("<td>" + freq + "</td>");
    $(tableRow).append(freqCell);

    var firstTrainCell = $("<td>" + firstTrainTime + "</td>");
    $(tableRow).append(firstTrainCell);

    // var minAwayCell = $("<td>" + minutesAway + "</td>");
    // $(tableRow).append(minAwayCell);

    $("tbody").append(tableRow)
      
  })