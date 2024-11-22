const dataContainer = document.getElementById("dataContainer");
const searchInput = document.getElementById("search");
const statusFilter = document.getElementById("statusFilter");
const roleFilter = document.getElementById("roleFilter");
const gradYearFiltersContainer = document.getElementById("gradYearFilters");

let jsonData = [];

function populateGradYearFilters(data) {
  const gradYears = [...new Set(data.map((item) => item["grad-year"]))].sort();
  gradYears.forEach((year) => {
    const label = document.createElement("label");
    label.className = "flex items-center gap-2 text-sm text-gray-600";
    label.innerHTML = `
      <input type="checkbox" value="${year}" class="gradYearFilter"> ${year}
    `;
    gradYearFiltersContainer.appendChild(label);
  });

  const gradYearFilters = document.querySelectorAll(".gradYearFilter");
  gradYearFilters.forEach((checkbox) =>
    checkbox.addEventListener("change", filterData)
  );

  gradYearFilters.forEach((checkbox) => {
    if (checkbox.value === "2024") checkbox.checked = true;
  });
}

const formatExperience = (item) => {
  if (typeof item.yoe !== "undefined" && item.yoe !== null) {
    return `${item.yoe} year${item.yoe !== 1 ? "s" : ""}`;
  } else if (typeof item.moe !== "undefined" && item.moe !== null) {
    return `${item.moe} month${item.moe !== 1 ? "s" : ""}`;
  }
  return "Not specified";
};

function renderData(data) {
  dataContainer.innerHTML = "";

  if (data.length === 0) {
    dataContainer.innerHTML = `
      <div class="col-span-full text-center text-gray-600">
        <p>No candidates found. Try adjusting your filters.</p>
      </div>
    `;
    return;
  }

  data.forEach((item) => {
    const card = document.createElement("div");
    card.className =
      "p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col gap-4";

    const hiringReadyTag =
      item.hiringReady === true
        ? `<span class="inline-flex items-center gap-1 bg-green-100 text-green-800 text-sm font-medium px-2 py-0.5 rounded-full">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414L9 13.414l4.707-4.707z" clip-rule="evenodd"/>
            </svg>
            Ready to Hire
          </span>`
        : `<span class="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 text-sm font-medium px-2 py-0.5 rounded-full">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M18 10c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-8-3a1 1 0 100 2 1 1 0 000-2zm1 3H9v5a1 1 0 102 0v-5z"/>
          </svg>
            In Training
          </span>`;

    const header = `
      <div class="flex flex-wrap justify-between items-center">
        <div class="flex-1 min-w-0">
          <h2 class="text-xl font-semibold text-gray-800">${item.name}</h2>
          <p class="text-sm text-gray-600"><strong>Role:</strong> ${item.role}</p>
          <p class="text-sm text-gray-600"><strong>Email:</strong> <a href="mailto:${item.email}" class="text-indigo-600 hover:underline break-all">${item.email}</a></p>
        </div>
        <div class="mt-2 sm:mt-0">
          ${hiringReadyTag}
        </div>
      </div>
    `;

    const mainInfo = `
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p class="text-sm text-gray-600"><strong>Graduation Year:</strong> ${item["grad-year"] || 'N/A'}</p>
          <p class="text-sm text-gray-600"><strong>Experience:</strong> ${formatExperience(item)}</p>
          <p class="text-sm text-gray-600"><strong>Can Join In:</strong> ${item.canJoinIn}</p>
        </div>
        <div>
          <p class="text-sm text-gray-600"><strong>Status:</strong> ${item.status}</p>
          <p class="text-sm text-gray-600"><strong>Looking For:</strong> ${item.lookingFor}</p>
        </div>
      </div>
    `;

    const skills = `
      <div>
        <p class="text-sm text-gray-600 mb-2"><strong>Skills:</strong></p>
        <div class="flex flex-wrap gap-2">
          ${item.skills
            .map(
              (skill) =>
                `<span class="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">${skill}</span>`
            )
            .join("")}
        </div>
      </div>
    `;

    const expertise = `
      <div>
        <p class="text-sm text-gray-600 mb-2"><strong>Expertise:</strong></p>
        <div class="flex flex-wrap gap-2">
          ${item.expertise
            .map(
              (exp) =>
                `<span class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">${exp}</span>`
            )
            .join("")}
        </div>
      </div>
    `;

    const experience = `
      <details class="mt-4">
        <summary class="text-sm text-gray-600 cursor-pointer"><strong>Work Experience:</strong></summary>
        <ul class="list-disc list-inside mt-2">
          ${
            item.experience.length > 0
              ? item.experience
                  .map(
                    (exp) =>
                      `<li class="text-sm text-gray-600">
                        ${exp.role} at ${exp.company} (${formatExperience(exp)})
                      </li>`
                  )
                  .join("")
              : `<li class="text-sm text-gray-600">No work experience listed.</li>`
          }
        </ul>
      </details>
    `;

    const resumeLink = `
      <a href="${item.resume}" target="_blank" class="mt-4 inline-block text-sm text-indigo-600 font-medium hover:underline">View Resume</a>
    `;

    card.innerHTML = `
      ${header}
      ${mainInfo}
      ${skills}
      ${expertise}
      ${experience}
      ${resumeLink}
    `;

    dataContainer.appendChild(card);
  });
}

function filterData() {
  const searchQuery = searchInput.value.toLowerCase();
  const status = statusFilter.value;
  const role = roleFilter.value;

  const lookingForFilters = document.querySelectorAll(".lookingForFilter");
  const gradYearFilters = document.querySelectorAll(".gradYearFilter");

  const selectedLookingFor = Array.from(lookingForFilters)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  const selectedGradYears = Array.from(gradYearFilters)
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
    const matchesGradYear =
      selectedGradYears.length > 0
        ? selectedGradYears.includes(item["grad-year"])
        : true;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesRole &&
      matchesLookingFor &&
      matchesGradYear
    );
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
    populateGradYearFilters(jsonData);

    attachEventListeners();

    filterData();
  } catch (error) {
    console.error("Error fetching JSON data:", error);
  }
}

function attachEventListeners() {
  searchInput.addEventListener("input", filterData);
  statusFilter.addEventListener("change", filterData);
  roleFilter.addEventListener("change", filterData);

  const lookingForFilters = document.querySelectorAll(".lookingForFilter");
  lookingForFilters.forEach((checkbox) =>
    checkbox.addEventListener("change", filterData)
  );
}

fetchData();
