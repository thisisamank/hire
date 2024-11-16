const dataContainer = document.getElementById("dataContainer");
const searchInput = document.getElementById("search");
const statusFilter = document.getElementById("statusFilter");
const roleFilter = document.getElementById("roleFilter");
const lookingForFilters = document.querySelectorAll(".lookingForFilter");

let jsonData = []; 

function renderData(data) {
    dataContainer.innerHTML = "";
    data.forEach((item) => {
        const card = document.createElement("div");
        card.className =
            "p-4 bg-white rounded-lg shadow-md flex flex-col gap-2 hover:shadow-lg transition-shadow";

        card.innerHTML = `
            <h2 class="text-lg font-medium text-gray-800">${item.name}</h2>
            <p class="text-sm text-gray-600"><strong>Email:</strong> ${item.email}</p>
            <p class="text-sm text-gray-600"><strong>Years of Experience:</strong> ${
                item.yoe
            }</p>
            <p class="text-sm text-gray-600"><strong>Role:</strong> ${item.role}</p>
            <p class="text-sm text-gray-600"><strong>Status:</strong> ${item.status}</p>
            <p class="text-sm text-gray-600"><strong>Looking For:</strong> ${
                item.lookingFor
            }</p>
            <p class="text-sm text-gray-600"><strong>Can Join In:</strong> ${
                item.canJoinIn
            }</p>
            <p class="text-sm text-gray-600"><strong>Skills:</strong> ${item.skills.join(
                ", "
            )}</p>
            <p class="text-sm text-gray-600"><strong>Expertise:</strong> ${item.expertise.join(
                ", "
            )}</p>
            <div class="text-sm text-gray-600">
                <strong>Experience:</strong>
                <ul class="list-disc list-inside">
                    ${item.experience
                        .map(
                            (exp) =>
                                `<li>${exp.role} at ${exp.company} (${exp.yoe} years)</li>`
                        )
                        .join("")}
                </ul>
            </div>
            <a href="${
                item.resume
            }" target="_blank" class="text-sm text-indigo-600 font-medium hover:underline">View Resume</a>
        `;
        dataContainer.appendChild(card);
    });
}

function filterData() {
    const searchQuery = searchInput.value.toLowerCase();
    const status = statusFilter.value;
    const role = roleFilter.value;

    const selectedLookingFor = Array.from(lookingForFilters)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);

    const filteredData = jsonData.filter((item) => {
        const matchesSearch =
            item.name.toLowerCase().includes(searchQuery) ||
            item.email.toLowerCase().includes(searchQuery) ||
            item.role.toLowerCase().includes(searchQuery);
        const matchesStatus = status ? item.status === status : true;
        const matchesRole = role ? item.role === role : true;
        const matchesLookingFor =
            selectedLookingFor.length > 0
                ? selectedLookingFor.some((value) =>
                      item.lookingFor.toLowerCase().includes(value.toLowerCase())
                  )
                : true;

        return matchesSearch && matchesStatus && matchesRole && matchesLookingFor;
    });

    renderData(filteredData);
}

async function fetchData() {
    try {
        const response = await fetch("data.json");
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        jsonData = await response.json();
        renderData(jsonData);
    } catch (error) {
        console.error("Error fetching JSON data:", error);
    }
}

searchInput.addEventListener("input", filterData);
statusFilter.addEventListener("change", filterData);
roleFilter.addEventListener("change", filterData);
lookingForFilters.forEach((checkbox) =>
    checkbox.addEventListener("change", filterData)
);

fetchData();
