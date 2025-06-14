let data=[
    {id:1,name:"shiv",email:"shiv@gmail.com",phone:1234567890,dob:"1999-05-03",address:"New Delhi"},
    {id:2,name:"prag",email:"prag@gmail.com",phone:8588090297,dob:"1999-03-05",address:"Bangalore"},
]

let currentPage = 1;
const rowsPerPage = 3;

let sortColumn = null;
let sortDirection = "asc"; // or "desc"


window.onload = function() {
    readAll();
    setDOBMaxOnFocus();
};


function readAll() {
    localStorage.setItem("object", JSON.stringify(data));
    const tabledata = document.querySelector(".data_table");
    const object = localStorage.getItem("object");
    const objectdata = JSON.parse(object);

    // for sorting
    if (sortColumn) {
        objectdata.sort((a, b) => {
            let valA = a[sortColumn];
            let valB = b[sortColumn];

            // Convert to lowercase for string comparison
            if (typeof valA === "string") valA = valA.toLowerCase();
            if (typeof valB === "string") valB = valB.toLowerCase();

            if (valA < valB) return sortDirection === "asc" ? -1 : 1;
            if (valA > valB) return sortDirection === "asc" ? 1 : -1;
            return 0;
        });
    }

    //for pagination
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedData = objectdata.slice(startIndex, endIndex);

    let elements = "";

    paginatedData.forEach(record => {
        elements += `<tr> 
            <td>${record.name}</td>
            <td>${record.email}</td>
            <td>${record.phone}</td>
            <td>${record.dob}</td>
            <td>${record.address}</td>
            <td>
                <button class="edit" onclick="edit(${record.id})">Edit</button>
                <button class="delete" onclick="delet(${record.id})">Delete</button>
            </td>
        </tr>`;
    });

    tabledata.innerHTML = elements;
    renderPagination(objectdata.length);
}


function isValidAddress(address) {
    const regex = /^[a-zA-Z0-9\s,-]+$/;
    return regex.test(address);
}

function validatePhoneNumber(phone, errorElement) {
    errorElement.textContent = "";

    if (phone.length !== 10) {
        errorElement.textContent = "Phone number must be exactly 10 digits.";
        return false;
    }

    return true;
}

function validateEmail(email, errorElement) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    errorElement.textContent = "";

    if (!emailPattern.test(email)) {
        errorElement.textContent = "Please enter a valid email address.";
        return false;
    }

    return true;
}

function create (){
    document.querySelector(".create_form").style.display="block"
    document.querySelector(".add_div").style.display="none"
}

function add(){
    var name= document.querySelector(".name").value
    const emailField=document.querySelector(".email")
    const emailError=document.querySelector(".email-error")
    const email=emailField.value.trim()
    if (!validateEmail(email, emailError)) return;

    const phoneField = document.querySelector(".phone");
    const phoneError = document.querySelector(".phone-error");
    const phone = phoneField.value.trim();
    if (!validatePhoneNumber(phone, phoneError)) return;

    var dob= document.querySelector(".dob").value

    const addressField = document.querySelector(".address");
    const addressError = document.querySelector(".address-error");
    const address = addressField.value.trim();
    // Clear previous error
    addressError.textContent = "";
    if (!isValidAddress(address)) {
        addressError.textContent = "Address must not contain special characters.";
        return;
    }

    var newObj={id:data.length + 1, name: name, email:email,phone:phone,dob:dob,address:address}
    data.push(newObj)

    name.value = "";
    email.value = "";
    phone.value="";

    document.querySelector(".create_form").style.display="none"
    document.querySelector(".add_div").style.display="block"

    readAll();
}

function edit(id){
    document.querySelector(".create_form").style.display="none"
    document.querySelector('.update_form').style.display="block"
    var obj=data.find(rec=>rec.id===id)
    document.querySelector('.uname').value=obj.name
    document.querySelector('.uemail').value=obj.email
    document.querySelector('.uphone').value=obj.phone
    document.querySelector('.uaddress').value=obj.address
    document.querySelector('.udob').value=obj.dob
    document.querySelector('.id').value=obj.id
}

function delet(id){
    data=data.filter(rec=>rec.id !==id)
    readAll()
}

function update(){
    var id=parseInt(document.querySelector('.id').value)
    var name=document.querySelector('.uname').value
    const emailField=document.querySelector(".uemail")
    const emailError=document.querySelector(".uemail-error")
    const email=emailField.value.trim()
    if (!validateEmail(email, emailError)) return;

    const phoneField = document.querySelector(".uphone");
    const phoneError = document.querySelector(".uphone-error");
    const phone = phoneField.value.trim();
    if (!validatePhoneNumber(phone, phoneError)) return;

    var dob= document.querySelector(".udob").value

    const addressField = document.querySelector(".uaddress");
    const addressError = document.querySelector(".uaddress-error");
    const address = addressField.value.trim();
    addressError.textContent = "";

    if (!isValidAddress(address)) {
        addressError.textContent = "Address must not contain special characters.";
        return;
    }

    var index=data.findIndex(rec=>rec.id===id)
    data[index]={id,name,email,phone,dob,address}
    if (phone.length !== 10) {
        alert("Phone number must be exactly 10 digits.");
        return;
    }
    document.querySelector('.update_form').style.display="none"
    document.querySelector('.uname').value = "";
    document.querySelector('.uemail').value = "";

    // Show add button again
    document.querySelector('.add_div').style.display = "block";
    readAll()
}

function addEmptyRow() {
    const newObj = {
        id: data.length + 1,
        name: "",
        email: "",
        phone: "",
        dob: "",
        address: ""
    };

    data.push(newObj);
    readAll();
}

function searchTable() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const table = document.querySelector(".data_table");
    const rows = table.getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {
        const rowText = rows[i].innerText.toLowerCase();
        if (rowText.includes(input)) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
}

function setDOBMaxOnFocus() {
    document.querySelectorAll(".dob, .udob").forEach(input => {
        input.addEventListener("focus", () => {
            const today = new Date().toISOString().split("T")[0];
            input.max = today;
        });
    });
}


function renderPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / rowsPerPage);
    const paginationContainer = document.getElementById("pagination");
    let buttons = "";

    if (totalPages <= 1) {
        paginationContainer.innerHTML = "";
        return;
    }

    if (currentPage > 1) {
        buttons += `<button onclick="goToPage(${currentPage - 1})">Previous</button>`;
    }

    for (let i = 1; i <= totalPages; i++) {
        buttons += `<button onclick="goToPage(${i})" ${i === currentPage ? 'style="font-weight:bold;"' : ''}>${i}</button>`;
    }

    if (currentPage < totalPages) {
        buttons += `<button onclick="goToPage(${currentPage + 1})">Next</button>`;
    }

    paginationContainer.innerHTML = buttons;
}

function goToPage(page) {
    currentPage = page;
    readAll();
}

function sortTable(column) {
    if (sortColumn === column) {
        // Toggle direction if clicking the same column
        sortDirection = sortDirection === "asc" ? "desc" : "asc";
    } else {
        sortColumn = column;
        sortDirection = "asc";
    }

    readAll();
}
