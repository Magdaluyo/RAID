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

/**
  * End User Page Functions
  */
function bugResubmit(id, desc) {
	var docRef = db.collection("tickets").doc(id);
	var currentDesc;
	docRef.get().then(function(doc) { currentDesc = doc.data().description; });
	var timestamp = new Date();
	updateData = {
		description: currentDesc + "[Updated " + timestamp + "] " + desc,
		active: true,
		status: "Pending Verification"
	}
	db.collection("tickets").doc(id).set(updateData, { merge: true })
	.then(function() {
		window.location.href="userpage.html";
	});
}

/** Function used by bugform.html to create a bug ticket
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
		reporter: "mwcu0DvWPOeGGSbmK7iE",
		hasreport: false,
		created: timestamp,
		status: "Pending Verification",
		assigned: "",
		active: true
	})
	.then(function(docRef) {
		console.log("Document written with ID: ", docRef.id);
		window.location.href="userpage.html";
	})
	.catch(function(error) {
		console.error("Error adding document: ", error);
	});


	alert("Bug Report Submitted! Return to Dashboard to view.");
}

/**
  * Manager Page Functions 
  */

function assignTester(id) {
	db.collection("tickets").doc(id).set({
		assigned: "dfh5lXUrkYMpGRfzDatc"
	}, { merge: true })
	.then(function() {
        window.location.href="managerpage.html";
    });
}

function assignDev(id) {
	db.collection("tickets").doc(id).set({
		assigned: "OiIxPQtRS6pk5VNKrQhA"
	}, { merge: true })
	.then(function() {
        window.location.href="managerpage.html";
    });
}

function deployFix(id) {
	db.collection("tickets").doc(id).set({
		active: false,
		assigned: "",
		status: "Deployed"
	}, { merge: true })
	.then(function() {
        window.location.href="managerpage.html";
    });
}


/**
  * Tester Page Functions
  */

function bugConfirm(id) {
    db.collection("tickets").doc(id).set({
        assigned: "",
        status: "Fix in Progress"
    }, { merge: true })
	.then(function() {
		window.location.href="testerpage.html";
	});
}

function bugDeny(id) {
    db.collection("tickets").doc(id).set({
        active: false,
        assigned: "",
        status: "Needs more info"
    }, { merge: true })
	.then(function() {
		window.location.href="testerpage.html";
	});
}

function fixConfirm(id) {
    db.collection("tickets").doc(id).set({
        assigned: "",
        status: "Ready to Deploy"
    }, { merge: true })
	.then(function() {
		window.location.href="testerpage.html";
	});
}

/**
  * Developer Page Functions
  */

function bugFixed(id) {
    db.collection("tickets").doc(id).set({
        assigned: "",
        status: "Fix Verification"
    }, { merge: true })
	.then(function() {
        window.location.href="developerpage.html";
    });
}

// Document query for end users
// populates user_list section in corresponding html file
function userList() {
const user_list = document.querySelector("#user_list");

db.collection("tickets").where("reporter", "==", "mwcu0DvWPOeGGSbmK7iE").orderBy("created")
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
				if(doc.data().status == "Needs more info") {
					user_list.innerHTML += "<style>textarea { width: 700px; height: 15em; }</style>";
					user_list.innerHTML += "<label for='description'>Description:</label><br>";
					user_list.innerHTML += "<textarea id='description' name='description'></textarea><br>";
					user_list.innerHTML += "<button onclick=\"bugResubmit('" + doc.id + "', 'document.getElementById(description).value')\" class='w3-button w3-theme-d1 w3-margin-bottom'>Update</button>";
				}
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

db.collection("tickets").where("active", "==", true).orderBy("created")
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
				report_list.innerHTML += "<p>Assigned to: " + doc.data().assigned + "</p></div>";
				if(doc.data().status == "Pending Verification") 
					report_list.innerHTML += "<button onclick=\"assignTester('" + doc.id + "')\" class='w3-button w3-theme-d1 w3-margin-bottom'>Assign Tester</button>";
				if(doc.data().status == "Fix in Progress")
                    report_list.innerHTML += "<button onclick=\"assignDev('" + doc.id + "')\" class='w3-button w3-theme-d1 w3-margin-bottom'>Assign Developer</button>";
				if(doc.data().status == "Fix Verification")
                    report_list.innerHTML += "<button onclick=\"assignTester('" + doc.id + "')\" class='w3-button w3-theme-d1 w3-margin-bottom'>Assign Tester</button>";
				if(doc.data().status == "Ready to Deploy")
                    report_list.innerHTML += "<button onclick=\"deployFix('" + doc.id + "')\" class='w3-button w3-theme-d1 w3-margin-bottom'>Deploy Fix</button>";

				report_list.innerHTML += "<hr class='w3-clear'>";
	        });
		}
		else {
			report_list.innerHTML = "<div class='w3-container w3-card w3-white w3-round w3-margin'><br><h6><i class='fa fa-bug'></i> No Current Bugs </h6><hr class='w3-clear'></div>";
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

db.collection("tickets").where("assigned", "==", "dfh5lXUrkYMpGRfzDatc").orderBy("created")
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
/*
				//tester_list.innerHTML += "<label for='Priotities'>Priorities</label>";
				tester_list.innerHTML += "<select id='Priorities' name='Priorities' class='w3-button w3-theme-d1 w3-margin-bottom'>";
                tester_list.innerHTML += "<option value='choosepriority'> --Update Priority of Bug-- </option>";
                tester_list.innerHTML += "<option value='Severe'> Severe </option>";
                tester_list.innerHTML += "<option value='Moderate'> Moderate </option>";
                tester_list.innerHTML += "<option value='Low'> Low </option></select>";

				var select = document.createElement("select");
				select.id = "Priorities";
				select.name="Priorities";
				select.class="w3-button w3-theme-d1 w3-margin-bottom";
				select.options.add( new Option("choosepriority","--Update Priority of Bug--", true, true) );

				//tester_list.innerHTML += "<label for='Status'>Status</label>";
				tester_list.innerHTML += "<select id='Status' name='Status' class='w3-button w3-theme-d1 w3-margin-bottom'><i class='fa fa-asterisk'></i>";
                tester_list.innerHTML += "<option value='chooseStatus'> --Update Status of Bug-- </option>";
                tester_list.innerHTML += "<option value='Fix in Progress'> Fix in Progress </option>";
                tester_list.innerHTML += "<option value='Ready for Deployment'> Ready for Deployment </option> </select>";
*/
				if(doc.data().status == "Pending Verification") {
                    tester_list.innerHTML += "<button onclick=\"bugConfirm('" + doc.id + "')\" class='w3-button w3-theme-d1 w3-margin-bottom'>Bug Exists</button>";
					tester_list.innerHTML += "<button onclick=\"bugDeny('" + doc.id + "')\" class='w3-button w3-theme-d1 w3-margin-bottom'>Bug not Found</button>";
				}
				if(doc.data().status == "Fix Verification")
                    tester_list.innerHTML += "<button onclick=\"fixConfirm('" + doc.id + "')\" class='w3-button w3-theme-d1 w3-margin-bottom'>Bug Fixed</button>";
				tester_list.innerHTML += "<hr class='w3-clear'>";
            });
        }
        else {
            tester_list.innerHTML = "<div class='w3-container w3-card w3-white w3-round w3-margin'><br><h6><i class='fa fa-bug'></i> No Bugs Assigned </h6><hr class='w3-clear'></div>";
        }
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    }); 
}

// document query for developers
// populates dev_list section in corresponding html file
function developerList() {
const dev_list = document.querySelector("#dev_list");

db.collection("tickets").where("assigned", "==", "OiIxPQtRS6pk5VNKrQhA").orderBy("created")
    .get()
    .then(function(querySnapshot) {
        if(!querySnapshot.empty) {
            querySnapshot.forEach(function(doc) {
                dev_list.innerHTML += "<div class='w3-container w3-card w3-white w3-round w3-margin'>";
                dev_list.innerHTML += "<h6><i class='fa fa-bug'></i>   Bug Ticket " + doc.id + "</h6>";
                dev_list.innerHTML += "<p>Software: " + doc.data().software + " </p>";
				dev_list.innerHTML += "<p>Reported: " + doc.data().created + "</p>";
                dev_list.innerHTML += "<p>Problem: " + doc.data().problem + "</p>";
                dev_list.innerHTML += "<p>Description: " + doc.data().description + "</p>";
                dev_list.innerHTML += "<p>Type of Error: " + doc.data().typeoferror + "</p>";
                dev_list.innerHTML += "<p>Status of Bug: " + doc.data().status + "</p></div>";
				if(doc.data().status == "Fix in Progress")
                    dev_list.innerHTML += "<button onclick=\"bugFixed('" + doc.id + "')\" class='w3-button w3-theme-d1 w3-margin-bottom'>Fix Complete</button>";
                dev_list.innerHTML += "<hr class='w3-clear'>";
            });
        }
        else {
            user_list.innerHTML = "<div class='w3-container w3-card w3-white w3-round w3-margin'><br><h6><i class='fa fa-bug'></i> No Bugs Assigned </h6><hr class='w3-clear'></div>";
        }
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}

   /* ******** ATTEMPTING LOGIN ******** 

=======
/* ******** ATTEMPTING LOGIN ******** */
function clickLoginBtn() {
    
    // Get elements
    const txtEmail = document.getElementById("userEmail");
    const txtPassword = document.getElementById("userPassword");
    const btnLogin = document.getElementById("btnLogin");
    
    // Add login event
    btnLogin.addEventListener('click', e => {
        // Get email and password
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        // Sign in
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });
    
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
                window.location.href="developerpage.html";
            } 
            if(firebaseUser.email == "enduser@scu.edu") {
                window.location.href="userpage.html";
            }
        }
    }); 
}




