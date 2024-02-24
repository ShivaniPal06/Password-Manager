//logic to make password visible like *****
function maskPassword(pass){
    let str = "";
    for (let index = 0; index < pass.length; index++) {
        str += "*"        
    }
    return str;
}

//logic to copy text 
function copyText(txt) {
    navigator.clipboard.writeText(txt).then(
        () => {
            /* clipboard successfully set */
            // alert("Text copied to clipboard: " + txt);
            document.getElementById("alert").style.display = "inline";
            setTimeout(() => {
                document.getElementById("alert").style.display = "none";
            },2000);
        },
        () => {
            /* clipboard write failed */
            alert("failed");
        },
    );
};

//logic to delete passwords
const deletePasswords = (website) => {
    let data = localStorage.getItem("passwords");
    let arr = JSON.parse(data);
    let arrUpdated = arr.filter((e) => {
        return e.website != website;
    })
    localStorage.setItem("passwords", JSON.stringify(arrUpdated));
    alert(`Successfully deleted ${website}'s password`);
    showPasswords();
}

//logic to fill the table
const showPasswords = () => {
    let tb = document.querySelector("table");
    let data = localStorage.getItem("passwords");
    if (data == null || JSON.parse(data).length == 0) {
        tb.innerHTML = "No Data To Show";
    }
    else {
        tb.innerHTML = `<tr>
        <th>Website</th>
        <th>Username</th>
        <th>Password</th>
        <th>Delete</th>
    </tr>`;
        let arr = JSON.parse(data);
        let str = "";
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];

            str += `<tr>
    <td>${element.website} <img onclick="copyText('${element.website}')" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='9' y='9' width='13' height='13' rx='2' ry='2'%3E%3C/rect%3E%3Cpath d='M5 15L19 15'/%3E%3Cpath d='M12 4L12 15'/%3E%3C/svg%3E" alt="Copy Button">
    </td>
    <td>${element.username} <img onclick="copyText('${element.username}')" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='9' y='9' width='13' height='13' rx='2' ry='2'%3E%3C/rect%3E%3Cpath d='M5 15L19 15'/%3E%3Cpath d='M12 4L12 15'/%3E%3C/svg%3E" alt="Copy Button">
    </td>
    <td>${maskPassword(element.password)} <img onclick="copyText('${element.password}')" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='9' y='9' width='13' height='13' rx='2' ry='2'%3E%3C/rect%3E%3Cpath d='M5 15L19 15'/%3E%3Cpath d='M12 4L12 15'/%3E%3C/svg%3E" alt="Copy Button">
    </td>
    <td><button class="btnsml" onclick="deletePasswords('${element.website}')">Delete</button></td>
</tr>`
        }
        tb.innerHTML = tb.innerHTML + str;
    }
    website.value = "";
    username.value = "";
    password.value = "";
}
console.log("working");
showPasswords();
document.querySelector(".btn").addEventListener("click", (e) => {
    e.preventDefault();
    console.log("clicked...");
    console.log(username.value, password.value);
    let passwords = localStorage.getItem("passwords");
    console.log(passwords);
    if (passwords == null) {
        let json = [];
        json.push({website: website.value, username: username.value, password: password.value });
        alert("Password Saved");
        localStorage.setItem("passwords", JSON.stringify(json));
    }
    else {
        let json = JSON.parse(localStorage.getItem("passwords"));
        json.push({website: website.value, username: username.value, password: password.value });
        alert("Password Saved");
        localStorage.setItem("passwords", JSON.stringify(json));
    }
    showPasswords();
})