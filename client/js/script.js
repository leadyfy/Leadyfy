const addLeadBtn = document.getElementById("addLeadBtn");
const leadPopup = document.getElementById("leadPopup");
const closePopup = document.getElementById("closePopup");
const saveLeadBtn = document.getElementById("saveLeadBtn");

addLeadBtn.addEventListener("click", function () {
    leadPopup.style.display = "flex";
});

closePopup.addEventListener("click", function () {
    leadPopup.style.display = "none";
});

saveLeadBtn.addEventListener("click", async function () {

    const customerName = document.getElementById("customerName").value.trim();
    const mobileNumber = document.getElementById("mobileNumber").value.trim();
    const loanType = document.getElementById("loanType").value.trim();
    const loanAmount = document.getElementById("loanAmount").value.trim();

    const errorMessage = document.getElementById("errorMessage");

    errorMessage.style.color = "red";

    if (customerName === "") {
        errorMessage.innerText = "Please Enter Customer Name";
        return;
    }

    if (mobileNumber.length !== 10) {
        errorMessage.innerText = "Please Enter Valid Mobile Number";
        return;
    }

    if (loanType === "") {
        errorMessage.innerText = "Please Enter Loan Type";
        return;
    }

    if (loanAmount === "") {
        errorMessage.innerText = "Please Enter Loan Amount";
        return;
    }

    try {

        const response = await fetch("http://localhost:5000/api/leads", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                customerName,
                mobileNumber,
                loanType,
                loanAmount
            })

        });

        const result = await response.json();

        errorMessage.style.color = "green";
        errorMessage.innerText = result.message;

    } catch (error) {

        errorMessage.style.color = "red";
        errorMessage.innerText = "Server Connection Failed";

        console.log(error);

    }

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

    }

}

loadDashboard();