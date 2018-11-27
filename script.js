// Database Initialization



// This is for the current RAID.io page but these values can be changed to a new firestore backend
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

/** newTicket()
  * Function used by bugform.html to create a bug ticket
  * Takes information from user entered fields on page
  * Upon completion, the new ticket is properly added to the backend
  */
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


// Document query for end users
// populates user_list section in corresponding html file
function userList() {
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
}

// document query for managers
// populates report_list section in corresponding html file
function managerList() {
const report_list = document.querySelector("#report_list");

db.collection("tickets").orderBy("created")
    .get()
    .then(function(querySnapshot) {
		if(!querySnapshot.empty) {
        	querySnapshot.forEach(function(doc) {
				report_list.innerHTML += "<div class='w3-container w3-card w3-white w3-round w3-margin'>";
				report_list.innerHTML += "<h6><i class='fa fa-bug'></i>   Bug Ticket " + doc.id + "</h6>";
        		report_list.innerHTML += "<p>Software: " + doc.data().software + " </p>";
				report_list.innerHTML += "<p>Reported: " + doc.data().created + "</p>";
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
}

// document query for testers
// populates tester_list section in corresponding html file
function testerList() {
const tester_list = document.querySelector("#tester_list");

db.collection("tickets").orderBy("created")
    .get()
    .then(function(querySnapshot) {
        if(!querySnapshot.empty) {
            querySnapshot.forEach(function(doc) {
                tester_list.innerHTML += "<div class='w3-container w3-card w3-white w3-round w3-margin'>";
                tester_list.innerHTML += "<h6><i class='fa fa-bug'></i>   Bug Ticket " + doc.id + "</h6>";
                tester_list.innerHTML += "<p>Software: " + doc.data().software + " </p>";
				tester_list.innerHTML += "<p>Reported: " + doc.data().created + "</p>";
                tester_list.innerHTML += "<p>Problem: " + doc.data().problem + "</p>";
                tester_list.innerHTML += "<p>Description: " + doc.data().description + "</p>";
                tester_list.innerHTML += "<p>Type of Error: " + doc.data().typeoferror + "</p>";
                tester_list.innerHTML += "<p>Status of Bug: " + doc.data().status + "</p></div>";

				tester_list.innerHTML += "<label for='Priotities'>Priorities</label>";
				tester_list.innerHTML += "<select id = 'Priorities' name='Priorities' class='w3-button w3-theme-d1 w3-margin-bottom'><i class='fa fa-sort-amount-desc'></i>";
                tester_list.innerHTML += "<option value = 'choosepriority'> --Update Priority of Bug-- </option>";
                tester_list.innerHTML += "<option value = 'Severe'> Severe </option>";
                tester_list.innerHTML += "<option value = 'Moderate'> Moderate </option>";
                tester_list.innerHTML += "<option value = 'Low'> Low </option> </select>";

				tester_list.innerHTML += "<label for='Status'>Status</label>";
				tester_list.innerHTML += "<select id = 'Status' name='Status' class='w3-button w3-theme-d1 w3-margin-bottom'><i class='fa fa-asterisk'></i>";
                tester_list.innerHTML += "<option value = 'chooseStatus'> --Update Status of Bug-- </option>";
                tester_list.innerHTML += "<option value = 'Fix in Progress'> Fix in Progress </option>";
                tester_list.innerHTML += "<option value = 'Ready for Deployment'> Ready for Deployment </option> </select>";

				tester_list.innerHTML += "<button onclick=document.getElementById('id01').style.display='block' class='w3-button w3-theme-d1 w3-margin-bottom'>Update Notes</button>";

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
}

/* ******** ATTEMPTING LOGIN ******** */
function clickLoginBtn() {
    
    // Get elements
    const txtEmail = document.getElementById("userEmail");
    const txtPassword = document.getElementById("userPassword");
    const btnLogin = document.getElementById("btnLogin");
    
    // Get email and password
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    
    // Sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
    console.log(promise);
    
    // Add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser) {
            console.log('logged in');
            console.log(firebaseUser);
            if(firebaseUser.email == "tester@scu.edu"){
                window.location.href="testerpage.html";
            }
            if(firebaseUser.email == "manager@scu.edu") {
                window.location.href="managerpage.html";
            }
            if(firebaseUser.email == "developer@scu.edu") {
                window.location.href="developer.html";
            } 
            if(firebaseUser.email == "enduser@scu.edu") {
                window.location.href="userpage.html";
            }
        }
    }); 
}

// setup signout feature
function clickLogoutBtn() {
    firebase.auth().signOut();
    console.log('not logged in');
    window.location.href="index.html";
};



