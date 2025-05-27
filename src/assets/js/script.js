function getData1(event){
    event.preventDefault()
    let name = "name = " + document.getElementById("formGroupExampleName").value
    let email = "\nemail = " + document.getElementById("formGroupExampleEmail").value
    let phoneNumber = "\nPhone Number = " + document.getElementById("formGroupExamplePhoneNumber").value
    let subject = "\nsubject = " + document.getElementById("option").value
    let yourMessage = "\nYour Message = " + document.getElementById("exampleFormControlTextarea1").value

    alert("Data Has Been Received\n" + name + email + phoneNumber + subject + yourMessage)
}

let accounts = []
function getD(){
    event.preventDefault()
    let mail = document.getElementById("email").value
    let startDate = new Date(document.getElementById("start").value)
    let endDate = new Date (document.getElementById("end").value)
    let duration = (endDate-startDate)/(1000*60*60*24)
    let dayDuration= duration % 30
    let mountDuration = Math.floor (duration / 30) 
    let desc = document.getElementById("desc").value
    //buat gunakan map harus ubah dulu nodelist jadi array,sisanya seperti biasa
    let check = Array.from (document.getElementsByName("oh"))
    let selected = check.map(check => {
    // for ( let i=0; i<check.length; i++){
        if (check.checked)
        if (check.value==="Next JS"){
            return(`<img src="../assets/img/next.png" alt='Next JS' class="icon-techno">`)
        }else if (check.value==="Node JS"){
            return(`<img src="../assets/img/node.png" alt='Node JS' class="icon-techno">`)
        }else if (check.value==="React JS"){
            return(`<img src="../assets/img/react.png" alt='React JS' class="icon-techno">`)
        }else if (check.value==="TypeScript"){
            return(`<img src="../assets/img/TypeScript.png" alt='Next JS' class="icon-techno">`)
        }
    })
    let imageInput = document.getElementById("image")
    let imageFile = imageInput.files[0]
    let imageURL = imageFile ?
    URL.createObjectURL (imageFile) : "kosong"

    let account = {
        mail,
        startDate,
        endDate,
        duration,
        dayDuration,
        mountDuration,
        desc,
        check,
        selected,
        imageURL,
    }

    accounts.push(account)
    changeElement()
}
function changeElement(){
    // document.getElementById("change").innerHTML = ``
    // for ( let i=0 ; i<accounts.length; i++)
    document.getElementById("change").innerHTML = accounts.map(accounts=>
        `<div class="card" style="width: 18rem;">
            <img src=${accounts.imageURL} class="imagProject" alt="...">
            <div class="card-body">
                <b>
                    <h7 class="card-title">${accounts.mail}</h7>
                </b>
                <br>
                <P> Duration ${accounts.dayDuration} Hari ${accounts.mountDuration} Bulan </P>
                <p class="card-text">${accounts.desc}</p>
                <div> ${accounts.selected.join(" ")}</div>
                <div class="submited">
                    <a href="#" class="btn btn-dark">edit</a>
                    <a href="#" class="btn btn-dark">delete</a>
                </div>
            </div>
        </div>
        `).join(" ")
}
//join setelah pemanggilan array
  
console.log("Script loaded");
const form = document.getElementById('form');
  const changeDiv = document.getElementById('change');

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = new FormData(this);

    const res = await fetch('/kirim', {
      method: 'POST',
      body: formData
    });

    const html = await res.text();

    // Buat container div untuk card
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;

    // Tambahkan event untuk tombol delete
    const deleteBtn = wrapper.querySelector('.btn-delete');
    deleteBtn.addEventListener('click', () => {
      wrapper.remove();
    });

    // Event untuk tombol edit
    const editBtn = wrapper.querySelector('.btn-edit');
    editBtn.addEventListener('click', () => {
      const email = wrapper.querySelector('.card-title').textContent;
      const desc = wrapper.querySelector('.card-text').textContent;
      const dates = wrapper.querySelector('p').textContent.match(/\d+/g);
      alert("Fungsi edit belum lengkap, ini hanya simulasi ambil data.\nEmail: " + email + "\nDesc: " + desc);

      // Kamu bisa isi kembali input di form kalau mau otomatis isi form
    });

    changeDiv.appendChild(wrapper);
    form.reset(); // kosongkan form setelah submit
  });