let allLeads = [];

async function loadLeads() {

    try {

        const response = await fetch("http://localhost:5000/api/leads");

        allLeads = await response.json();

        displayLeads(allLeads);

    } catch (error) {

        console.log(error);

    }

}

function displayLeads(leads) {

    let html = "";

    leads.forEach((lead) => {

        html += `

        <tr>

            <td>${lead.id}</td>

            <td>${lead.customerName}</td>

            <td>${lead.mobileNumber}</td>

            <td>${lead.loanType}</td>

            <td>₹ ${lead.loanAmount}</td>

            <td>${lead.createdAt}</td>

            <td>

                <button onclick="window.location.href='tel:${lead.mobileNumber}'">
                    📞
                </button>

                <button onclick="window.open('https://wa.me/91${lead.mobileNumber}')">
                    💬
                </button>

                <button onclick="alert('Edit Feature Coming Soon')">
                    ✏️
                </button>

                <button onclick="deleteLead(${lead.id})">
                    🗑️
                </button>

            </td>

        </tr>

        `;

    });

    document.getElementById("leadTable").innerHTML = html;

}

function searchLead() {

    const value = document
        .getElementById("searchBox")
        .value
        .toLowerCase();

    const filtered = allLeads.filter((lead) => {

        return (

            lead.customerName.toLowerCase().includes(value)

            ||

            lead.mobileNumber.includes(value)

        );

    });

    displayLeads(filtered);

}

// DELETE LEAD

async function deleteLead(id) {

    const confirmDelete = confirm("Are you sure you want to delete this lead?");

    if (!confirmDelete) {
        return;
    }

    try {

        const response = await fetch(
            `http://localhost:5000/api/leads/${id}`,
            {
                method: "DELETE"
            }
        );

        const result = await response.json();

        alert(result.message);

        loadLeads();

    } catch (error) {

        console.log(error);

        alert("Delete Failed");

    }

}

loadLeads();