
<script src="https://www.gstatic.com/firebasejs/5.5.8/firebase.js"></script>
<script>
  // Initialize Firebase
     var config = {
         apiKey: "AIzaSyBthwSzrnSsJ_HIxqDlPkW9NU1_iA2jLCs",
         authDomain: "raidscu.firebaseapp.com",
         databaseURL: "https://raidscu.firebaseio.com",
         projectId: "raidscu",
         storageBucket: "raidscu.appspot.com",
         messagingSenderId: "494501454671"
      };
      firebase.initializeApp(config);
</script>

//Initialize your Firebase app
firebase.initializeApp(config);


var recommendations = firebase.database().ref("recommendations");

// Save a new recommendation to the database, using the input in the form
var submitRecommendation = function () {
//
//   // Get input values from each of the form elements
     var title = $("#talkTitle").val();
     var presenter = $("#talkPresenter").val();
     var link = $("#talkLink").val();
//
     // Push a new recommendation to the database using those values
//             recommendations.push({
            "title": title,
            "presenter": presenter,
             "link": link
            });
  };
//
//                           // When the window is fully loaded, call this function.
//                           // Note: because we are attaching an event listener to a particular HTML element
//                           // in this function, we can't do that until the HTML element in question has
//                           // been loaded. Otherwise, we're attaching our listener to nothing, and no code
//                           // will run when the submit button is clicked.
                  $(window).load(function () {
//
//                             // Find the HTML element with the id recommendationForm, and when the submit
//                               // event is triggered on that element, call submitRecommendation.
                         $("#recommendationForm").submit(submitRecommendation);
//
                               });



