function getData(event){
    event.preventDefault()
    
    let name = "name = " + document.getElementById("formGroupExampleName").value
    let email = "\nemail = " + document.getElementById("formGroupExampleEmail").value
    let phoneNumber = "\nPhone Number = " + document.getElementById("formGroupExamplePhoneNumber").value
    let subject = "\nsubject = " + document.getElementById("option").value
    let yourMessage = "\nYour Message = " + document.getElementById("exampleFormControlTextarea1").value

    alert("Data Has Been Received\n" + name + email + phoneNumber + subject + yourMessage);
}