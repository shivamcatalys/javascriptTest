let data=[
    {id:1,name:"shiv",email:"shiv@gmail.com",phone:1234567890},
    {id:2,name:"shiv1",email:"shiv1@gmail.com",phone:8588090297},
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
        <td>
        <button class="edit" onclick={edit(${record.id})}>Edit</button>
        <button class="delete" onclick={delet(${record.id})}>Delete</button>
        </td>
        </tr>`
    ))
    tabledata.innerHTML=elements
}

function create (){
    document.querySelector(".create_form").style.display="block"
    document.querySelector(".add_div").style.display="none"
}

function add(){
    var name= document.querySelector(".name").value
    var email= document.querySelector(".email").value
    var phone= document.querySelector(".phone").value

    if (phone.length !== 10) {
        alert("Phone number must be exactly 10 digits.");
        return;
    }

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    var newObj={id:data.length + 1, name: name, email:email,phone:phone}
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
    document.querySelector('.id').value=obj.id
}

function delet(id){
    data=data.filter(rec=>rec.id !==id)
    readAll()
}

function update(){
    var id=parseInt(document.querySelector('.id').value)
    var name=document.querySelector('.uname').value
    var email=document.querySelector('.uemail').value
    var phone=document.querySelector('.uphone').value
    var index=data.findIndex(rec=>rec.id===id)
    data[index]={id,name,email,phone}
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

