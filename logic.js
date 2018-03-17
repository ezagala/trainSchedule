
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
      var firstTimeCon = moment(firstTrainTime, "HH:mm").subtract(1, "years");
      console.log(firstTimeCon); 

      var frequency = snapshot.val().freq;

      var currentTime = moment(); 

      var timeDiff = moment().diff(moment(firstTimeCon), "mintues"); 
      console.log(timeDiff); 

      var timeRem = timeDiff % frequency; 
      console.log(timeRem); 

      var minLeft = frequency - timeRem; 

      var nextTrain = moment().add(minLeft, "mintes"); 
      var nextTrainFormatted = moment(nextTrain).format("hh:mm") 
      console.log(moment(nextTrain).format("hh:mm")); 
    
    var tableRow = $("<tr>"); 

    var nameCell = $("<th scope='row'>" + trainName + "</th>"); 
    $(tableRow).append(nameCell); 

    var destCell = $("<td>" + destination + "</td>");
    $(tableRow).append(destCell);

    var freqCell = $("<td>" + frequency + "</td>");
    $(tableRow).append(freqCell);

    var nextTrainCell = $("<td>" + nextTrainFormatted + "</td>");
    $(tableRow).append(nextTrainCell);

    var minAwayCell = $("<td>" + minLeft + "</td>");
    $(tableRow).append(minAwayCell);

    $("tbody").append(tableRow)
      
  })