//import Alert from "./alerts.js";
class Alert {
    constructor (idAlert) {
        this.alert = document.getElementById(idAlert);
        this.alertType = null;
    }
    setAlertType (type) {
        this.alertType = type;
    }
    show (message) {
        this.alert.classList.remove('d-none');
        this.alert.classList.add(this.alertType);
        this.alert.innerText = message;
    }
    hide () {
        const type = this.alertType;
        if (type != null) {
            this.alert.classList.remove(this.alertType);
        }
        this.alert.classList.add('d-none');
    }
}

//import Model from './model.js';
class Model {
    constructor(){
        this.view = null;
        this.method = 'POST';
        this.urlAdmin = './userLogin.php';
        //this.urlUser = './userAction.php';
        //instance
        this.alert = new Alert('index');
    }
    setView(view){
        this.view = view;
    }
    createAdmin(camps) {
        fetch(this.urlAdmin, {
            method: this.method,
            body: camps
        }).then(response => response.json())
        .catch(error => console.error('Error: ',error))
        .then((response) => {
            const status = response.status;
            //console.log(resp);
            if(status){
                this.alert.setAlertType('alert-success');
                this.alert.show(response.msg);
            }else{
                this.alert.setAlertType('alert-danger');
                this.alert.show(response.msg);
            }
            setTimeout(() => { 
                this.alert.hide(); 
                if (status){
                    window.location.replace('./home.php');
                } 
            }, 3000);
        });
        /* // Opciones por defecto estan marcadas con un *
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects */
    }
    LoginAdmin (camps) {
        fetch(this.urlAdmin, {
            method: this.method,
            body: camps
        }).then(response => response.json())
        .catch(error => console.error('Error: ',error))
        .then((response) => {
            const status = response.status;
            //console.log(resp);
            if(status){
                this.alert.setAlertType('alert-success');
                this.alert.show(response.msg);
            }else{
                this.alert.setAlertType('alert-danger');
                this.alert.show(response.msg);
            }
            setTimeout(() => { 
                this.alert.hide(); 
                if (status){
                    window.location.replace('./home.php');
                } 
            }, 3000);
        });
    }
}

//import Admin 
class Admin {
    constructor () {
        //login
        this.loginForm = document.getElementById('login');
        //register
        this.registerForm = document.getElementById('register');
        //logout
        this.logoutBtn = document.getElementById('logout');
        //instance
        this.alert = new Alert('index');
    }
    adLogin (callback) {
        this.loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const camps = new FormData(this.loginForm);
            const email = camps.get('email');
            const password = camps.get('password');
            if (!email || !password) {
                const type = 'alert-warning';
                const message = 'email and password required';
                this.alert.setAlertType(type);
                this.alert.show(message);
                setTimeout(() => { 
                    this.alert.hide(); 
                }, 3000);
            } else {
                callback(camps);
            }
        });
    }
    adRegister (callback) {
        this.registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const camps = new FormData(this.registerForm);
            const name = camps.get('name');
            const email = camps.get('email');
            const password = camps.get('password');
            if (!name || !email || !password) {
                const type = 'alert-warning';
                const message = 'name, email and password required';
                this.alert.setAlertType(type);
                this.alert.show(message);
                setTimeout(() => { 
                    this.alert.hide(); 
                }, 3000);
            } else {
                callback(camps);
            }
        });
    }
    adLogout (callback) {
        this.logoutBtn.onclick = ((id) => callback(id));
    }
}

//import View from './view.js';
class View{
    constructor(){
        this.model = null;
        //instances
        this.admin = new Admin();
        
        //callbacks
        this.admin.adLogin((camps) => this.login(camps));
        this.admin.adRegister((camps) => this.register(camps));
    }
    //set model
    setModel(model){
        this.model = model;
    }
    login(camps){
        //console.log(email, password);
        this.model.LoginAdmin(camps);
    }
    register(camps){
        //console.log(name, email, password);
        this.model.createAdmin(camps);
    }
}

//main.js
document.addEventListener('DOMContentLoaded', () =>{
    const model = new Model();
    const view = new View();
    model.setView(view);
    view.setModel(model);
});

// Update the users data list
function getUsers(){
    $.ajax({
        type: 'POST',
        url: 'userAction.php',
        data: 'action_type=view',
        success:function(html){
            $('#userData').html(html);
        }
    });
}
// Send CRUD requests to the server-side script
function userAction(type, id){
    id = (typeof id == "undefined")?'':id;
    var userData = '', frmElement = '';
    if(type == 'add'){
        frmElement = $("#modalUserAddEdit");
        userData = frmElement.find('form').serialize()+'&action_type='+type+'&id='+id;
    }else if (type == 'edit'){
        frmElement = $("#modalUserAddEdit");
        userData = frmElement.find('form').serialize()+'&action_type='+type;
    }else{
        frmElement = $(".row");
        userData = 'action_type='+type+'&id='+id;
    }
    frmElement.find('.statusMsg').html('');
    $.ajax({
        type: 'POST',
        url: 'userAction.php',
        dataType: 'JSON',
        data: userData,
        beforeSend: function(){
            frmElement.find('form').css("opacity", "0.5");
        },
        success:function(resp){
            frmElement.find('.statusMsg').html(resp.msg);
            if(resp.status == 1){
                if(type == 'add'){
                    frmElement.find('form')[0].reset();
                }
                getUsers();
            }
            frmElement.find('form').css("opacity", "");
        }
    });
}

// Fill the user's data in the edit form
function editUser(id){
    $.ajax({
        type: 'POST',
        url: 'userAction.php',
        dataType: 'JSON',
        data: 'action_type=data&id='+id,
        success:function(data){
            $('#id').val(data.id);
            $('#name').val(data.name);
            $('#email').val(data.email);
            $('#phone').val(data.phone);
        }
    });
}

// Actions on modal show and hidden events
$(function(){
    $('#modalUserAddEdit').on('show.bs.modal', function(e){
        var type = $(e.relatedTarget).attr('data-type');
        var userFunc = "userAction('add');";
        if(type == 'edit'){
            userFunc = "userAction('edit');";
            var rowId = $(e.relatedTarget).attr('rowID');
            editUser(rowId);
        }
        $('#userSubmit').attr("onclick", userFunc);
    });
    
    $('#modalUserAddEdit').on('hidden.bs.modal', function(){
        $('#userSubmit').attr("onclick", "");
        $(this).find('form')[0].reset();
        $(this).find('.statusMsg').html('');
    });
});