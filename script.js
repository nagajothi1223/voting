let generatedOTP;
let votedIds = JSON.parse(localStorage.getItem("votedIds")) || [];

function showBox(hideIds, showId) {
    hideIds.forEach(id => document.getElementById(id).classList.add("hidden"));
    document.getElementById(showId).classList.remove("hidden");
}

function goToLogin() {
    showBox(["welcomeBox"], "loginBox");
}

function sendOTP() {
    const voterId = document.getElementById("voterId").value.trim();
    const pattern = /^TN-\d{4}-\d{4}$/;

    if (!pattern.test(voterId)) {
        alert("Invalid Voter ID format");
        return;
    }

    if (votedIds.includes(voterId)) {
        alert("This Voter ID has already voted");
        return;
    }

    generatedOTP = Math.floor(1000 + Math.random() * 9000);
    alert("Your OTP is: " + generatedOTP); // simulation

    localStorage.setItem("currentVoter", voterId);
    showBox(["loginBox"], "otpBox");
}

function verifyOTP() {
    const userOTP = document.getElementById("otpInput").value;

    if (userOTP == generatedOTP) {
        showBox(["otpBox"], "voteBox");
    } else {
        alert("Incorrect OTP");
    }
}

function castVote(candidate) {
    const voterId = localStorage.getItem("currentVoter");

    votedIds.push(voterId);
    localStorage.setItem("votedIds", JSON.stringify(votedIds));
    localStorage.removeItem("currentVoter");

    showBox(["voteBox"], "doneBox");
}
