/* =========================================================
   1. DEFAULT DATA
========================================================= */

const DEFAULT_USER = {
    name: "Robert",
    email: "user@ecoloop.test",
    password: "1234",
    role: "user",
    ecoPoints: 1250,
    devicesRecycled: 8
};

const DEFAULT_RECYCLER = {
    name: "GreenCycle Center",
    email: "recycler@ecoloop.test",
    password: "1234",
    role: "recycler"
};


/* Demo requests used on first run */

const DEFAULT_REQUESTS = [
    {
        id: 1,
        user: "Aarav Mehta",
        device: "Dell Inspiron Laptop",
        category: "Laptop",
        date: "Sep 19",
        recycler: "GreenCycle Center",
        location: "Andheri West",
        status: "pending"
    },

    {
        id: 2,
        user: "Priya Nair",
        device: "OnePlus 9 Phone",
        category: "Phone",
        date: "Sep 19",
        recycler: "EcoCenter",
        location: "Powai",
        status: "pending"
    },

    {
        id: 3,
        user: "Rohan Iyer",
        device: 'LG 27" Monitor',
        category: "Monitor",
        date: "Sep 18",
        recycler: "RecycleHub",
        location: "Bandra East",
        status: "scheduled"
    },

    {
        id: 4,
        user: "Sneha Kulkarni",
        device: "Samsung Galaxy S21",
        category: "Phone",
        date: "Sep 18",
        recycler: "Green Earth Recycling",
        location: "Thane West",
        status: "pending"
    },

    {
        id: 5,
        user: "Karan Shah",
        device: "Lenovo ThinkPad T14",
        category: "Laptop",
        date: "Sep 17",
        recycler: "EcoCenter",
        location: "Borivali West",
        status: "scheduled"
    },

    {
        id: 6,
        user: "Ananya Rao",
        device: "HP LaserJet Printer",
        category: "Other Electronics",
        date: "Sep 17",
        recycler: "GreenCycle Center",
        location: "Goregaon East",
        status: "recycled"
    },

    {
        id: 7,
        user: "Vikram Desai",
        device: "Laptop chargers (6)",
        category: "Accessory",
        date: "Sep 16",
        recycler: "GreenCycle Center",
        location: "Dadar",
        status: "recycled"
    },

    {
        id: 8,
        user: "Isha Kapoor",
        device: "UPS batteries (4)",
        category: "Other Electronics",
        date: "Sep 15",
        recycler: "GreenCycle Center",
        location: "Vashi",
        status: "pending"
    }
];


/* =========================================================
   2. INITIALISE LOCAL STORAGE
========================================================= */

function initialiseEcoLoop() {

    if (!localStorage.getItem("ecoloopAccounts")) {

        const accounts = [
            DEFAULT_USER,
            DEFAULT_RECYCLER
        ];

        localStorage.setItem(
            "ecoloopAccounts",
            JSON.stringify(accounts)
        );
    }


    if (!localStorage.getItem("ecoloopRequests")) {

        localStorage.setItem(
            "ecoloopRequests",
            JSON.stringify(DEFAULT_REQUESTS)
        );
    }

}


/* =========================================================
   3. HELPER FUNCTIONS
========================================================= */

function getAccounts() {

    return JSON.parse(
        localStorage.getItem("ecoloopAccounts")
    ) || [];

}


function saveAccounts(accounts) {

    localStorage.setItem(
        "ecoloopAccounts",
        JSON.stringify(accounts)
    );

}


function getRequests() {

    return JSON.parse(
        localStorage.getItem("ecoloopRequests")
    ) || [];

}


function saveRequests(requests) {

    localStorage.setItem(
        "ecoloopRequests",
        JSON.stringify(requests)
    );

}


function getCurrentUser() {

    return JSON.parse(
        localStorage.getItem("ecoloopCurrentUser")
    );

}


function saveCurrentUser(user) {

    localStorage.setItem(
        "ecoloopCurrentUser",
        JSON.stringify(user)
    );

}


/* =========================================================
   4. REGISTRATION
========================================================= */

function setupRegistration() {

    const registerForm =
        document.getElementById("registerForm");

    if (!registerForm) {
        return;
    }


    registerForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById("fullName")
                    .value.trim();

            const email =
                document.getElementById("registerEmail")
                    .value.trim()
                    .toLowerCase();

            const password =
                document.getElementById("registerPassword")
                    .value;

            const confirmPassword =
                document.getElementById("confirmPassword")
                    .value;

            const accountType =
                document.querySelector(
                    'input[name="accountType"]:checked'
                );


            /* Basic validation */

            if (
                !name ||
                !email ||
                !password ||
                !confirmPassword ||
                !accountType
            ) {

                alert("Please fill in all fields.");

                return;
            }


            if (password !== confirmPassword) {

                alert("Passwords do not match.");

                return;
            }


            if (password.length < 4) {

                alert(
                    "Password must contain at least 4 characters."
                );

                return;
            }


            const accounts = getAccounts();


            /* Check duplicate email */

            const existingAccount =
                accounts.find(
                    account =>
                        account.email.toLowerCase() === email
                );


            if (existingAccount) {

                alert(
                    "An account with this email already exists."
                );

                return;
            }


            /* Create account */

            const newAccount = {

                name: name,
                email: email,
                password: password,
                role: accountType.value,

                ecoPoints:
                    accountType.value === "user"
                        ? 0
                        : undefined,

                devicesRecycled:
                    accountType.value === "user"
                        ? 0
                        : undefined
            };


            accounts.push(newAccount);

            saveAccounts(accounts);


            alert(
                "Registration successful! Please login."
            );


            window.location.href =
                "login.html";

        }
    );

}


/* =========================================================
   5. LOGIN
========================================================= */

function setupLogin() {

    const loginForm =
        document.getElementById("loginForm");

    if (!loginForm) {
        return;
    }


    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const email =
                document.getElementById("loginEmail")
                    .value.trim()
                    .toLowerCase();

            const password =
                document.getElementById("loginPassword")
                    .value;


            const accounts = getAccounts();


            const account =
                accounts.find(
                    user =>
                        user.email.toLowerCase() === email &&
                        user.password === password
                );


            if (!account) {

                alert(
                    "Invalid email address or password."
                );

                return;
            }


            saveCurrentUser(account);


            if (account.role === "recycler") {

                alert(
                    "Recycler login successful!"
                );

                window.location.href =
                    "recycler.html";

            } else {

                alert(
                    "Login successful!"
                );

                window.location.href =
                    "user.html";

            }

        }
    );

}


/* =========================================================
   6. LOGOUT
========================================================= */

function setupLogout() {

    const logoutButtons =
        document.querySelectorAll(
            "#logoutButton"
        );


    logoutButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                function () {

                    localStorage.removeItem(
                        "ecoloopCurrentUser"
                    );

                    alert(
                        "You have been logged out."
                    );

                    window.location.href =
                        "login.html";

                }
            );

        }
    );

}


/* =========================================================
   7. DISPLAY LOGGED-IN USER NAME
========================================================= */

function displayCurrentUser() {

    const user =
        getCurrentUser();

    if (!user) {
        return;
    }


    const nameElements =
        document.querySelectorAll(
            "#userName"
        );


    nameElements.forEach(
        element => {

            element.textContent =
                user.name;

        }
    );

}


/* =========================================================
   8. IMAGE UPLOAD + PREVIEW
========================================================= */

function setupImagePreview() {

    const imageInput =
        document.getElementById(
            "deviceImage"
        );

    const preview =
        document.getElementById(
            "imagePreview"
        );

    const placeholder =
        document.getElementById(
            "uploadPlaceholder"
        );


    if (
        !imageInput ||
        !preview
    ) {
        return;
    }


    imageInput.addEventListener(
        "change",
        function () {

            const file =
                this.files[0];


            if (!file) {
                return;
            }


            /* Check file type */

            const allowedTypes = [
                "image/jpeg",
                "image/png"
            ];


            if (
                !allowedTypes.includes(
                    file.type
                )
            ) {

                alert(
                    "Please upload a JPG or PNG image."
                );

                imageInput.value = "";

                return;
            }


            /* Check maximum size - 5 MB */

            if (
                file.size >
                5 * 1024 * 1024
            ) {

                alert(
                    "Image must be smaller than 5MB."
                );

                imageInput.value = "";

                return;
            }


            const reader =
                new FileReader();


            reader.onload =
                function (event) {

                    preview.src =
                        event.target.result;

                    preview.style.display =
                        "block";


                    if (placeholder) {

                        placeholder.style.display =
                            "none";

                    }

                };


            reader.readAsDataURL(file);

        }
    );

}


/* =========================================================
   9. ADD E-WASTE
========================================================= */

function setupEWasteForm() {

    const form =
        document.getElementById(
            "ewasteForm"
        );


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const category =
                document.getElementById(
                    "deviceCategory"
                ).value;

            const brand =
                document.getElementById(
                    "deviceBrand"
                ).value.trim();

            const model =
                document.getElementById(
                    "deviceModel"
                ).value.trim();

            const condition =
                document.getElementById(
                    "deviceCondition"
                ).value;

            const notes =
                document.getElementById(
                    "deviceNotes"
                ).value.trim();

            const image =
                document.getElementById(
                    "deviceImage"
                );


            if (
                !category ||
                !brand ||
                !model ||
                !condition
            ) {

                alert(
                    "Please complete all required device details."
                );

                return;
            }


            if (
                !image.files ||
                image.files.length === 0
            ) {

                alert(
                    "Please upload a device image."
                );

                return;
            }


            /*
                We DO NOT claim OpenCV verification
                here.

                Mid-sem:
                Image is uploaded and previewed.

                Final:
                Send image to OpenCV backend.
            */


            const pendingDevice = {

                category: category,

                brand: brand,

                model: model,

                device:
                    brand + " " + model,

                condition: condition,

                notes: notes,

                createdAt:
                    new Date().toISOString()

            };


            localStorage.setItem(
                "ecoloopPendingDevice",
                JSON.stringify(
                    pendingDevice
                )
            );


            alert(
                "Device details saved successfully! Now select a recycler."
            );


            window.location.href =
                "find-recycler.html";

        }
    );

}


/* =========================================================
   10. FIND RECYCLER MODAL
========================================================= */

function setupRecyclerModal() {

    const buttons =
        document.querySelectorAll(
            ".view-recycler-button"
        );

    const modal =
        document.getElementById(
            "recyclerModal"
        );

    const closeButton =
        document.getElementById(
            "closeRecyclerModal"
        );

    const selectButton =
        document.getElementById(
            "selectRecyclerButton"
        );


    if (!modal) {
        return;
    }


    let selectedRecycler = null;


    buttons.forEach(
        button => {

            button.addEventListener(
                "click",
                function () {

                    selectedRecycler = {

                        name:
                            this.dataset.recycler,

                        location:
                            this.dataset.location,

                        distance:
                            this.dataset.distance,

                        accepts:
                            this.dataset.accepts

                    };


                    document.getElementById(
                        "modalRecyclerName"
                    ).textContent =
                        selectedRecycler.name;


                    document.getElementById(
                        "modalRecyclerLocation"
                    ).textContent =
                        selectedRecycler.location;


                    document.getElementById(
                        "modalRecyclerDistance"
                    ).textContent =
                        selectedRecycler.distance;


                    document.getElementById(
                        "modalRecyclerDevices"
                    ).textContent =
                        selectedRecycler.accepts;


                    modal.classList.add(
                        "show"
                    );

                }
            );

        }
    );


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            function () {

                modal.classList.remove(
                    "show"
                );

            }
        );

    }


    /* Close by clicking outside */

    modal.addEventListener(
        "click",
        function (event) {

            if (event.target === modal) {

                modal.classList.remove(
                    "show"
                );

            }

        }
    );


    /* Select Recycler */

    if (selectButton) {

        selectButton.addEventListener(
            "click",
            function () {

                if (!selectedRecycler) {
                    return;
                }


                createRecyclingRequest(
                    selectedRecycler
                );

            }
        );

    }

}


/* =========================================================
   11. CREATE RECYCLING REQUEST
========================================================= */

function createRecyclingRequest(
    recycler
) {

    const device =
        JSON.parse(
            localStorage.getItem(
                "ecoloopPendingDevice"
            )
        );


    if (!device) {

        alert(
            "Please add a device before selecting a recycler."
        );

        window.location.href =
            "add-ewaste.html";

        return;
    }


    const currentUser =
        getCurrentUser();


    const requests =
        getRequests();


    const newRequest = {

        id: Date.now(),

        user:
            currentUser &&
            currentUser.role === "user"
                ? currentUser.name
                : "Robert",

        userEmail:
            currentUser &&
            currentUser.role === "user"
                ? currentUser.email
                : DEFAULT_USER.email,

        device:
            device.device,

        category:
            device.category,

        brand:
            device.brand,

        model:
            device.model,

        condition:
            device.condition,

        notes:
            device.notes,

        recycler:
            recycler.name,

        location:
            recycler.location,

        distance:
            recycler.distance,

        date:
            formatCurrentDate(),

        status:
            "pending",

        pointsAwarded:
            false

    };


    requests.unshift(
        newRequest
    );


    saveRequests(
        requests
    );


    localStorage.removeItem(
        "ecoloopPendingDevice"
    );


    alert(
        "Recycler selected! Your recycling request has been created."
    );


    window.location.href =
        "user.html";

}


/* =========================================================
   12. DATE FORMAT
========================================================= */

function formatCurrentDate() {

    const date =
        new Date();


    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];


    return (
        months[date.getMonth()] +
        " " +
        date.getDate()
    );

}


/* =========================================================
   13. REQUEST ACTION BUTTONS
========================================================= */

function setupRequestActions() {

    document.addEventListener(
        "click",
        function (event) {


            /* Schedule */

            const scheduleButton =
                event.target.closest(
                    ".schedule-button"
                );


            if (scheduleButton) {

                const id =
                    scheduleButton.dataset
                        .requestId;

                changeRequestStatus(
                    id,
                    "scheduled"
                );

                return;
            }


            /* Confirm Recycling */

            const confirmButton =
                event.target.closest(
                    ".confirm-button"
                );


            if (confirmButton) {

                const id =
                    confirmButton.dataset
                        .requestId;

                changeRequestStatus(
                    id,
                    "recycled"
                );

            }

        }
    );

}


/* =========================================================
   14. CHANGE REQUEST STATUS
========================================================= */

function changeRequestStatus(
    requestId,
    newStatus
) {

    const requests =
        getRequests();


    const request =
        requests.find(
            item =>
                String(item.id) ===
                String(requestId)
        );


    if (!request) {

        /*
            Static HTML rows may not match
            localStorage in some cases.
        */

        updateStaticRow(
            requestId,
            newStatus
        );

        return;
    }


    request.status =
        newStatus;


    /*
        EcoPoints are awarded ONLY when
        recycler confirms recycling.
    */

    if (
        newStatus === "recycled" &&
        !request.pointsAwarded
    ) {

        awardEcoPoints(
            request
        );

        request.pointsAwarded =
            true;

    }


    saveRequests(
        requests
    );


    if (
        newStatus === "scheduled"
    ) {

        alert(
            "Recycling request scheduled."
        );

    }


    if (
        newStatus === "recycled"
    ) {

        alert(
            "Recycling confirmed. EcoPoints have been awarded to the user."
        );

    }


    /*
        Update page without requiring
        manual refresh.
    */

    updateStaticRow(
        requestId,
        newStatus
    );


    updateRequestCounts();

}


/* =========================================================
   15. UPDATE STATIC TABLE ROW
========================================================= */

function updateStaticRow(
    requestId,
    status
) {

    const row =
        document.querySelector(
            `[data-request-id="${requestId}"]`
        );


    if (!row) {
        return;
    }


    row.dataset.status =
        status;


    const statusElement =
        row.querySelector(
            ".status"
        );


    if (statusElement) {

        statusElement.className =
            "status " + status;


        if (status === "pending") {

            statusElement.textContent =
                "● Pending";

        }


        if (status === "scheduled") {

            statusElement.textContent =
                "● Scheduled";

        }


        if (status === "recycled") {

            statusElement.textContent =
                "● Recycled";

        }

    }


    const actionCell =
        row.querySelector(
            "td:last-child"
        );


    if (!actionCell) {
        return;
    }


    if (status === "scheduled") {

        actionCell.innerHTML = `
            <button
                type="button"
                class="confirm-button"
                data-request-id="${requestId}"
            >
                Confirm Recycling
            </button>
        `;

    }


    if (status === "recycled") {

        actionCell.innerHTML = `
            <span class="completed-text">
                Completed
            </span>
        `;

    }

}


/* =========================================================
   16. ECOPOINTS
========================================================= */

function awardEcoPoints(
    request
) {

    const accounts =
        getAccounts();


    let user =
        null;


    /*
        New requests contain userEmail.
    */

    if (request.userEmail) {

        user =
            accounts.find(
                account =>
                    account.email ===
                    request.userEmail
            );

    }


    /*
        Demo fallback.
    */

    if (!user) {

        user =
            accounts.find(
                account =>
                    account.role === "user"
            );

    }


    if (!user) {
        return;
    }


    /*
        Mid-sem fixed reward:
        500 EcoPoints per confirmed request.
    */

    user.ecoPoints =
        Number(
            user.ecoPoints || 0
        ) + 500;


    user.devicesRecycled =
        Number(
            user.devicesRecycled || 0
        ) + 1;


    saveAccounts(
        accounts
    );


    /* Update logged-in copy */

    const current =
        getCurrentUser();


    if (
        current &&
        current.email === user.email
    ) {

        current.ecoPoints =
            user.ecoPoints;

        current.devicesRecycled =
            user.devicesRecycled;

        saveCurrentUser(
            current
        );

    }

}


/* =========================================================
   17. BADGE CALCULATION
========================================================= */

function getBadge(
    points
) {

    if (points >= 5000) {

        return "Eco Legend";

    }

    if (points >= 2000) {

        return "Green Champion";

    }

    if (points >= 1000) {

        return "Eco Warrior";

    }

    if (points >= 500) {

        return "Eco Recycler";

    }

    return "Eco Beginner";

}


/* =========================================================
   18. USER DASHBOARD DATA
========================================================= */

function updateUserDashboard() {

    const ecoPointsElement =
        document.getElementById(
            "ecoPoints"
        );

    const devicesElement =
        document.getElementById(
            "devicesRecycled"
        );

    const badgeElement =
        document.getElementById(
            "currentBadge"
        );


    if (
        !ecoPointsElement &&
        !devicesElement &&
        !badgeElement
    ) {
        return;
    }


    let user =
        getCurrentUser();


    /*
        If the recycler was previously logged in,
        use default/demo user for dashboard display.
    */

    if (
        !user ||
        user.role !== "user"
    ) {

        user =
            getAccounts().find(
                account =>
                    account.role === "user"
            );

    }


    if (!user) {
        return;
    }


    if (ecoPointsElement) {

        ecoPointsElement.textContent =
            Number(
                user.ecoPoints || 0
            ).toLocaleString();

    }


    if (devicesElement) {

        devicesElement.textContent =
            Number(
                user.devicesRecycled || 0
            );

    }


    if (badgeElement) {

        badgeElement.textContent =
            getBadge(
                Number(
                    user.ecoPoints || 0
                )
            );

    }


    renderRecentUserRequests(
        user
    );

}


/* =========================================================
   19. RENDER RECENT USER REQUESTS
========================================================= */

function renderRecentUserRequests(
    user
) {

    const table =
        document.getElementById(
            "userRecyclingTable"
        );


    if (!table) {
        return;
    }


    const requests =
        getRequests();


    /*
        Keep demo rows + newly created
        requests relevant to this user.

        New requests have userEmail.
    */

    const userRequests =
        requests.filter(
            request =>
                !request.userEmail ||
                request.userEmail ===
                    user.email
        );


    if (
        userRequests.length === 0
    ) {
        return;
    }


    table.innerHTML = "";


    userRequests
        .slice(0, 5)
        .forEach(
            request => {

                const row =
                    document.createElement(
                        "tr"
                    );


                row.dataset.requestId =
                    request.id;


                row.innerHTML = `

                    <td>

                        <div class="device-info">

                            <div class="device-icon">
                                ${getDeviceIcon(
                                    request.category
                                )}
                            </div>

                            <div>

                                <strong>
                                    ${escapeHTML(
                                        request.device
                                    )}
                                </strong>

                                <small>
                                    ${escapeHTML(
                                        request.category
                                    )}
                                </small>

                            </div>

                        </div>

                    </td>

                    <td>
                        ${escapeHTML(
                            request.date || "-"
                        )}
                    </td>

                    <td>
                        ${escapeHTML(
                            request.recycler || "-"
                        )}
                    </td>

                    <td>

                        <span class="status ${request.status}">
                            ● ${capitalise(
                                request.status
                            )}
                        </span>

                    </td>

                `;


                table.appendChild(
                    row
                );

            }
        );

}


/* =========================================================
   20. DEVICE ICON
========================================================= */

function getDeviceIcon(
    category
) {

    const value =
        String(
            category || ""
        ).toLowerCase();


    if (
        value.includes("laptop")
    ) {

        return "▰";

    }


    if (
        value.includes("phone") ||
        value.includes("tablet")
    ) {

        return "▯";

    }


    if (
        value.includes("monitor")
    ) {

        return "▣";

    }


    return "♻";

}


/* =========================================================
   21. REQUEST FILTERS
========================================================= */

function setupRequestFilters() {

    const filterButtons =
        document.querySelectorAll(
            ".filter-button"
        );


    if (
        filterButtons.length === 0
    ) {
        return;
    }


    filterButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                function () {

                    filterButtons.forEach(
                        item =>
                            item.classList.remove(
                                "active"
                            )
                    );


                    this.classList.add(
                        "active"
                    );


                    applyRequestFilters();

                }
            );

        }
    );

}


/* =========================================================
   22. REQUEST SEARCH
========================================================= */

function setupRequestSearch() {

    const search =
        document.getElementById(
            "requestSearch"
        );


    if (!search) {
        return;
    }


    search.addEventListener(
        "input",
        function () {

            applyRequestFilters();

        }
    );

}


/* =========================================================
   23. APPLY SEARCH + FILTER
========================================================= */

function applyRequestFilters() {

    const rows =
        document.querySelectorAll(
            ".request-row"
        );


    if (
        rows.length === 0
    ) {
        return;
    }


    const activeButton =
        document.querySelector(
            ".filter-button.active"
        );


    const filter =
        activeButton
            ? activeButton.dataset.filter
            : "all";


    const search =
        document.getElementById(
            "requestSearch"
        );


    const searchValue =
        search
            ? search.value
                .trim()
                .toLowerCase()
            : "";


    let visibleCount = 0;


    rows.forEach(
        row => {

            const status =
                row.dataset.status;

            const text =
                row.textContent
                    .toLowerCase();


            const matchesStatus =
                filter === "all" ||
                status === filter;


            const matchesSearch =
                text.includes(
                    searchValue
                );


            if (
                matchesStatus &&
                matchesSearch
            ) {

                row.style.display = "";

                visibleCount++;

            } else {

                row.style.display =
                    "none";

            }

        }
    );


    const resultText =
        document.getElementById(
            "requestResultText"
        );


    if (resultText) {

        resultText.textContent =
            `Showing ${visibleCount} of ${rows.length} requests`;

    }

}


/* =========================================================
   24. UPDATE REQUEST COUNTS
========================================================= */

function updateRequestCounts() {

    const rows =
        document.querySelectorAll(
            ".request-row"
        );


    if (
        rows.length === 0
    ) {
        return;
    }


    let pending = 0;
    let scheduled = 0;
    let recycled = 0;


    rows.forEach(
        row => {

            if (
                row.dataset.status ===
                "pending"
            ) {

                pending++;

            }


            if (
                row.dataset.status ===
                "scheduled"
            ) {

                scheduled++;

            }


            if (
                row.dataset.status ===
                "recycled"
            ) {

                recycled++;

            }

        }
    );


    setText(
        "allCount",
        rows.length
    );

    setText(
        "pendingCount",
        pending
    );

    setText(
        "scheduledCount",
        scheduled
    );

    setText(
        "recycledCount",
        recycled
    );


    applyRequestFilters();

}


/* =========================================================
   25. ANALYTICS TOGGLE
========================================================= */

function setupAnalyticsToggle() {

    const buttons =
        document.querySelectorAll(
            ".chart-toggle-button"
        );


    if (
        buttons.length === 0
    ) {
        return;
    }


    buttons.forEach(
        button => {

            button.addEventListener(
                "click",
                function () {

                    buttons.forEach(
                        item =>
                            item.classList.remove(
                                "active"
                            )
                    );


                    this.classList.add(
                        "active"
                    );


                    updateAnalyticsChart(
                        this.dataset.chart
                    );

                }
            );

        }
    );

}


/* =========================================================
   26. UPDATE ANALYTICS BARS
========================================================= */

function updateAnalyticsChart(
    type
) {

    const bars =
        document.querySelectorAll(
            ".bar"
        );


    if (
        bars.length === 0
    ) {
        return;
    }


    let values = [];


    bars.forEach(
        bar => {

            const value =
                type === "weight"
                    ? Number(
                        bar.dataset.weight
                    )
                    : Number(
                        bar.dataset.devices
                    );


            values.push(value);

        }
    );


    const maximum =
        Math.max(...values);


    bars.forEach(
        (bar, index) => {

            const value =
                values[index];


            /*
                Scale chart to maximum
                170px.
            */

            const height =
                (value / maximum) * 170;


            bar.style.height =
                height + "px";


            const valueLabel =
                bar.parentElement
                    .querySelector(
                        ".bar-value"
                    );


            if (valueLabel) {

                valueLabel.textContent =
                    value;

            }

        }
    );

}


/* =========================================================
   27. SIMPLE HELPER
========================================================= */

function setText(
    id,
    value
) {

    const element =
        document.getElementById(id);


    if (element) {

        element.textContent =
            value;

    }

}


function capitalise(
    value
) {

    if (!value) {
        return "";
    }


    return (
        value.charAt(0).toUpperCase() +
        value.slice(1)
    );

}


/*
    Prevent user-entered HTML from
    being injected into generated rows.
*/

function escapeHTML(
    value
) {

    return String(
        value ?? ""
    )
        .replaceAll(
            "&",
            "&amp;"
        )
        .replaceAll(
            "<",
            "&lt;"
        )
        .replaceAll(
            ">",
            "&gt;"
        )
        .replaceAll(
            '"',
            "&quot;"
        )
        .replaceAll(
            "'",
            "&#039;"
        );

}


/* =========================================================
   28. GOOGLE BUTTON - MID SEM
========================================================= */

function setupGoogleButtons() {

    const buttons =
        document.querySelectorAll(
            ".google-button"
        );


    buttons.forEach(
        button => {

            button.addEventListener(
                "click",
                function () {

                    alert(
                        "Google authentication will be implemented in the final version."
                    );

                }
            );

        }
    );

}


/* =========================================================
   29. START ECOLOOP
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initialiseEcoLoop();

        setupRegistration();

        setupLogin();

        setupLogout();

        displayCurrentUser();

        setupImagePreview();

        setupEWasteForm();

        setupRecyclerModal();

        setupRequestActions();

        setupRequestFilters();

        setupRequestSearch();

        updateRequestCounts();

        setupAnalyticsToggle();

        setupGoogleButtons();

        updateUserDashboard();

    }
);