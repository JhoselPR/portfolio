const menuIcon = document.querySelector('#menu-icon');
const navBar = document.querySelector('.nav-bar');
const form = document.querySelector('form');
const result = document.getElementById('result');

// const fullName = document.getElementById('fullname');
// const email = document.getElementById('email');
// const subject = document.getElementById('subject');
// const message = document.getElementById('message');

//navbar
menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x");
    navBar.classList.toggle("active");
}

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec =>{
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height){
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ' ]').classList.add('active');
            })
        }
    })
}

//contact

form.addEventListener('submit', function(e) {
    const formData = new FormData(form);
    e.preventDefault();
    // checkInputs();

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    result.innerHTML = "Por favor espera..."

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                // result.innerHTML = json.message;
                Swal.fire({
                    title: "Mensaje enviado correctamente",
                    icon: "success"
                  });
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            // result.innerHTML = "Something went wrong!";
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "¡Algo salió mal!",
              });
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
});




// function checkInputs(){
//     const items = document.querySelectorAll('.item');

//     for (const item of items){
//         if (item.value == ""){
//             item.classList.add("error");
//             item.parentElement.classList.add("error");
//         }

//         item.addEventListener("keyup", () => {
//             if (item.value != ""){
//                 item.classList.remove("error");
//                 item.parentElement.classList.remove("error");
//             }
//             else{
//                 item.classList.add("error");
//                 item.parentElement.classList.add("error");
//             }
//         });
//     }
// }