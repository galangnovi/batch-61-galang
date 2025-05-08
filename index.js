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
function getData2(event){
    event.preventDefault()
    let mail = document.getElementById("email").value
    let startDate = new Date(document.getElementById("start").value)
    let endDate = new Date (document.getElementById("end").value)
    let duration = (endDate-startDate)/(1000*60*60*24)
    let dayDuration= []
    for ( let i=0; i<duration.length; i++){
        if(duration[i].value ==="NaN"){
            dayDuration.push(`Kosong`)
        } else {
            dayDuration.push(Math.floor(duration % 30))
        }
    }
    let mountDuration = [] 
    for ( let i=0; i<duration.length; i++){
        if(duration[i].value ==="NaN"){
            mountDuration.push(`Kosong`)
        } else {
            mountDuration.push(Math.floor (duration / 30))
        }
    }
    let desc = document.getElementById("desc").value
    let check = document.getElementsByName("oh")
    let selected = []
    for ( let i=0; i<check.length; i++){
        if (check[i].checked)
        if (check[i].value==="Next JS"){
            selected.push(`<img src="next.png" alt='Next JS' class="icon-techno">`)
        }else if (check[i].value==="Node JS"){
            selected.push(`<img src="node.png" alt='Node JS' class="icon-techno">`)
        }else if (check[i].value==="React JS"){
            selected.push(`<img src="react.png" alt='React JS' class="icon-techno">`)
        }else if (check[i].value==="TypeScript"){
            selected.push(`<img src="TypeScript.png" alt='Next JS' class="icon-techno">`)
        }
    }
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
    document.getElementById("change").innerHTML = ``
    for ( let i=0 ; i<accounts.length; i++){
        document.getElementById("change").innerHTML += `
        <div class="card" style="width: 18rem;">
            <img src=${accounts[i].imageURL} class="imagProject" alt="...">
            <div class="card-body">
                <b>
                    <h7 class="card-title">${accounts[i].mail}</h7>
                </b>
                <br>
                <P> Duration ${accounts[i].dayDuration} Hari ${accounts[i].mountDuration} Bulan </P>
                <p class="card-text">${accounts[i].desc}</p>
                <div> ${accounts[i].selected.join(' ')}</div>
                <div class="submited">
                    <a href="#" class="btn btn-dark">edit</a>
                    <a href="#" class="btn btn-dark">delete</a>
                </div>
            </div>
        </div>
        `
    }
}