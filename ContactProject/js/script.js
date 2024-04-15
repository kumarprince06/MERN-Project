var selectedIndex = -1;

function addContact(){
    var name = document.getElementById('name').value;
    var contact = document.getElementById('contact').value;

    var btn = document.getElementById('btn').innerHTML;

    if(name.trim() === '' || contact.trim() === ''){
        document.getElementById('response').innerHTML = "Blank fields cannot be added as contact.";
        document.getElementById('response').style.backgroundColor = "red";
        return; // Exit the function if fields are empty
    }

    var newContact = {
        "name":name,
        "contact":contact
    }

   

    if(btn == "Save"){
       if(localStorage.getItem('contacts')){
            var contacts = JSON.parse(localStorage.getItem('contacts'));
            contacts.push(newContact);
            localStorage.setItem('contacts', JSON.stringify(contacts));
        }else{
            var contacts = [];
            contacts.push('newContact');
            localStorage.setItem('contacts',JSON.stringify(contacts));
        }
        document.getElementById('response').innerHTML = "Contact Added";
        document.getElementById('response').style.backgroundColor = "green";
    }else{
        var contacts = JSON.parse(localStorage.getItem('contacts'));

        contacts[selectedIndex].name = name;
        contacts[selectedIndex].contact = contact

        localStorage.setItem('contacts', JSON.stringify(contacts));
        document.getElementById('btn').innerHTML = "Save";
    }
    document.getElementById('name').value = "";
    document.getElementById('contact').value = "";

    display();
}

function display()
{
    if(localStorage.getItem('contacts'))
    {
        var contacts = JSON.parse(localStorage.getItem('contacts'));
        var temp = "";
        for(i=0; i<contacts.length; i++)
        {
            temp += '<tr>';
                temp += '<td>'+(i+1)+'</td>';
                temp += '<td>'+contacts[i].name+'</td>';
                temp += '<td>'+contacts[i].contact+'</td>';
                temp += '<td><button style="background-color: yellow;" onclick="editContact(' + i + ')">Edit</button> | ';
                temp += '<button style="background-color: red;" onclick="deleteContact(' + i + ')">Delete</button></td>';
                temp += '</tr>';
        }
        document.getElementById('contactlist').innerHTML = temp;
    }
    else{
        document.getElementById('contactlist').innerHTML = "No Data Avilable";
    }
}

function editContact(index)
{
    selectedIndex = index;

    var contacts = JSON.parse(localStorage.getItem('contacts'));

    document.getElementById('name').value = contacts[index].name;
    document.getElementById('contact').value = contacts[index].contact;

    document.getElementById('btn').innerHTML = "Update Contact";

    document.getElementById('response').innerHTML = "Contact Updated";
    document.getElementById('response').style.backgroundColor = "green";
}

function deleteContact(index)
{
    var contacts = JSON.parse(localStorage.getItem('contacts'));
    var temp = [];

    
    if(confirm("Are u sure to delete or kidding? "))
    {
        for(i=0; i<contacts.length; i++)
        {
            if(i!=index)
            {
                temp.push(contacts[i]);
            }
        }
        localStorage.setItem('contacts', JSON.stringify(temp));
        alert("Data Deleted")
    }

    display()

}

