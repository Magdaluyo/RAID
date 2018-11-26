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
		//	user_list.innerHTML = "<div class='w3-container w3-card w3-white w3-round w3-margin'><br><h6><i class='fa fa-bug'></i> No Current Bugs</h6><hr class='w3-clear'></div>";
		//}
		//else {
        	querySnapshot.forEach(function(doc) {
        	    // doc.data() is never undefined for query doc snapshots
        	    // console.log(doc.id, " => ", doc.data());
				user_list.innerHTML += "<div class='w3-container w3-card w3-white w3-round w3-margin'>";
				user_list.innerHTML += "<h6><i class='fa fa-bug'></i>   Bug Ticket " + doc.id + "</h6>";
        		//user_list.innerHTML += "<hr class='w3-clear'>";
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

function viewReport() {
    
   document.getElementById("report_list").innerHTML = 1 + 1;
   db.collection("tickets").where("reporter", "==", "dfh5lXUrkYMpGRfzDatc").orderBy("created")
    .get()
    .then(function(querySnapshot) {
		if(!querySnapshot.empty) {
		//	user_list.innerHTML = "<div class='w3-container w3-card w3-white w3-round w3-margin'><br><h6><i class='fa fa-bug'></i> No Current Bugs</h6><hr class='w3-clear'></div>";
		//}
		//else {
        	querySnapshot.forEach(function(doc) {
        	    // doc.data() is never undefined for query doc snapshots
        	    // console.log(doc.id, " => ", doc.data());
				document.getElementById("report_list").innerHTML += "<div class='w3-container w3-card w3-white w3-round w3-margin'>";
				document.getElementById("report_list").innerHTML += "<h6><i class='fa fa-bug'></i>   Bug Ticket " + doc.id + "</h6>";
        		//user_list.innerHTML += "<hr class='w3-clear'>";
        		document.getElementById("report_list").innerHTML += "<p>Software: " + doc.data().software + " </p>";
        		document.getElementById("report_list").innerHTML += "<p>Problem: " + doc.data().problem + "</p>";
        		document.getElementById("report_list").innerHTML += "<p>Description: " + doc.data().description + "</p>";
        		document.getElementById("report_list").innerHTML += "<p>Type of Error: " + doc.data().typeoferror + "</p>";
        		document.getElementById("report_list").innerHTML += "<p>Status of Bug: " + doc.data().status + "</p></div>";
				document.getElementById("report_list").innerHTML += "<hr class='w3-clear'>";
	        });
		}
		else {
			document.getElementById("report_list").innerHTML = "<div class='w3-container w3-card w3-white w3-round w3-margin'><br><h6><i class='fa fa-bug'></i> No Current Bugs</h6><hr class='w3-clear'></div>";
		}
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    
}
