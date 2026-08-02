document.getElementById("addLeadBtn").addEventListener("click", function () {
    alert("Add Lead Button Working ✅");
});

async function loadDashboard() {
    try {
        const response = await fetch("http://localhost:5000/api/dashboard");

        const data = await response.json();

        document.getElementById("totalLeads").innerText = data.totalLeads;
        document.getElementById("todayLeads").innerText = data.todayLeads;
        document.getElementById("followUps").innerText = data.followUps;
        document.getElementById("approvedLoans").innerText = data.approvedLoans;

    } catch (error) {
        console.log(error);
        alert("Backend Connection Failed!");
    }
}

loadDashboard();