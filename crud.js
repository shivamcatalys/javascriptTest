let data=[
    {id:1,name:"shiv",email:"shiv@gmail.com",phone:1234567890,dob:"1999-05-03",address:"New Delhi"},
    {id:2,name:"shiv1",email:"shiv1@gmail.com",phone:8588090297,dob:"1999-03-05",address:"Bangalore"},
]

function readAll(){
    localStorage.setItem("object",JSON.stringify(data))
    var tabledata=document.querySelector(".data_table")

    var object=localStorage.getItem("object")
    var objectdata=JSON.parse(object)
    var elements="";

    objectdata.map(record=>(
        elements += `<tr> 
        <td>${record.name}</td>
        <td>${record.email}</td>
        <td>${record.phone}</td>
        <td>${record.dob}</td>
        <td>${record.address}</td>
        <td>
        <button class="edit" onclick={edit(${record.id})}>Edit</button>
        <button class="delete" onclick={delet(${record.id})}>Delete</button>
        </td>
        </tr>`
    ))
    tabledata.innerHTML=elements
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

