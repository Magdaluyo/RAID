var config = {
	apiKey: "AIzaSyBthwSzrnSsJ_HIxqDlPkW9NU1_iA2jLCs",
	authDomain: "raidscu.firebaseapp.com",
	databaseURL: "https://raidscu.firebaseio.com",
	projectId: "raidscu",
	storageBucket: "raidscu.appspot.com",
	messagingSenderId: "494501454671"
};
firebase.initializeApp(config);

var db = firebase.firestore();

function newTicket() {

	var problemText = document.getElementById("problem").value;
	var softwareText = document.getElementById("software").value;
	var descriptionText = document.getElementById("description").value;
	var errorText = document.getElementById("bugs").value;
	var timestamp = new Date();

	db.collection("tickets").add({
		software: softwareText,
		problem: problemText,
		description: descriptionText,
		typeoferror: errorText,
		reporter: "dfh5lXUrkYMpGRfzDatc",
		hasreport: false,
		created: timestamp,
		status: "Pending Verification"
	})
	.then(function(docRef) {
		console.log("Document written with ID: ", docRef.id);
	})
	.catch(function(error) {
		console.error("Error adding document: ", error);
	});

}

const user_list = document.querySelector("#user_list");

db.collection("tickets").where("reporter", "==", "dfh5lXUrkYMpGRfzDatc").orderBy("created")
    .get()
    .then(function(querySnapshot) {
		if(!querySnapshot.empty) {
        	querySnapshot.forEach(function(doc) {
				user_list.innerHTML += "<div class='w3-container w3-card w3-white w3-round w3-margin'>";
				user_list.innerHTML += "<h6><i class='fa fa-bug'></i>   Bug Ticket " + doc.id + "</h6>";
        		user_list.innerHTML += "<p>Software: " + doc.data().software + " </p>";
        		user_list.innerHTML += "<p>Problem: " + doc.data().problem + "</p>";
        		user_list.innerHTML += "<p>Description: " + doc.data().description + "</p>";
        		user_list.innerHTML += "<p>Type of Error: " + doc.data().typeoferror + "</p>";
        		user_list.innerHTML += "<p>Status of Bug: " + doc.data().status + "</p></div>";
				user_list.innerHTML += "<hr class='w3-clear'>";
	        });
		}
		else {
			user_list.innerHTML = "<div class='w3-container w3-card w3-white w3-round w3-margin'><br><h6><i class='fa fa-bug'></i> No Current Bugs</h6><hr class='w3-clear'></div>";
		}
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

const report_list = document.querySelector("report_list");

db.collection("tickets").orderBy("created")
    .get()
    .then(function(querySnapshot) {
		if(!querySnapshot.empty) {
        	querySnapshot.forEach(function(doc) {
				report_list.innerHTML += "<div class='w3-container w3-card w3-white w3-round w3-margin'>";
				report_list.innerHTML += "<h6><i class='fa fa-bug'></i>   Bug Ticket " + doc.id + "</h6>";
        		report_list.innerHTML += "<p>Software: " + doc.data().software + " </p>";
        		report_list.innerHTML += "<p>Problem: " + doc.data().problem + "</p>";
        		report_list.innerHTML += "<p>Description: " + doc.data().description + "</p>";
        		report_list.innerHTML += "<p>Type of Error: " + doc.data().typeoferror + "</p>";
        		report_list.innerHTML += "<p>Status of Bug: " + doc.data().status + "</p></div>";
				report_list.innerHTML += "<hr class='w3-clear'>";
	        });
		}
		else {
			report_list.innerHTML = "<div class='w3-container w3-card w3-white w3-round w3-margin'><br><h6><i class='fa fa-bug'></i> No Current Bugs</h6><hr class='w3-clear'></div>";
		}
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

const tester_list = document.querySelector("#tester_list");

db.collection("tickets").orderBy("created")
    .get()
    .then(function(querySnapshot) {
        if(!querySnapshot.empty) {
            querySnapshot.forEach(function(doc) {
                tester_list.innerHTML += "<div class='w3-container w3-card w3-white w3-round w3-margin'>";
                tester_list.innerHTML += "<h6><i class='fa fa-bug'></i>   Bug Ticket " + doc.id + "</h6>";
                tester_list.innerHTML += "<p>Software: " + doc.data().software + " </p>";
                tester_list.innerHTML += "<p>Problem: " + doc.data().problem + "</p>";
                tester_list.innerHTML += "<p>Description: " + doc.data().description + "</p>";
                tester_list.innerHTML += "<p>Type of Error: " + doc.data().typeoferror + "</p>";
                tester_list.innerHTML += "<p>Status of Bug: " + doc.data().status + "</p></div>";
                tester_list.innerHTML += "<hr class='w3-clear'>";
            });
        }
        else {
            tester_list.innerHTML = "<div class='w3-container w3-card w3-white w3-round w3-margin'><br><h6><i class='fa fa-bug'></i> No Current Bugs</h6><hr class='w3-clear'></div>";
        }
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    }); 
