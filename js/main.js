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
        this.urlUser = './userAction.php';
        //instance
    }
    setView(view){
        this.view = view;
    }
    createAdmin(name, email, password) {
        const adminData = 'register=&name='+name+'&email='+email+'&password='+password;
        //const serve = null;
        $.ajax({
            type: this.method,
            url: this.urlAdmin,
            dataType: 'JSON',
            data: adminData,
            beforeSend: function(){
                //frmElement.find('form').css("opacity", "0.5");
            },
            success:function(resp){
                //frmElement.find('.statusMsg').html(resp.msg);
                const alert = new Alert('index');
                const status = resp.status;
                //console.log(resp);
                if(status){
                    alert.setAlertType('alert-success');
                    alert.show(resp.msg);
                }else{
                    alert.setAlertType('alert-danger');
                    alert.show(resp.msg);
                }
                setTimeout(() => { 
                    alert.hide(); 
                    if (status){
                        window.location.replace('./home.php');
                    } 
                }, 3000);
            }
        });
    }
    LoginAdmin (email, password) {
        const adminData = 'login=&email='+email+'&password='+password;
        //const serve = null;
        $.ajax({
            type: this.method,
            url: this.urlAdmin,
            dataType: 'JSON',
            data: adminData,
            beforeSend: function(){
                //frmElement.find('form').css("opacity", "0.5");
            },
            success:function(resp){
                //frmElement.find('.statusMsg').html(resp.msg);
                const alert = new Alert('index');
                const status = resp.status;
                //console.log(resp);
                if(status){
                    alert.setAlertType('alert-success');
                    alert.show(resp.msg);
                }else{
                    alert.setAlertType('alert-danger');
                    alert.show(resp.msg);
                }
                setTimeout(() => { 
                    alert.hide(); 
                    if (status){
                        window.location.replace('./home.php');
                    } 
                }, 3000);
            }
        });
    }
}

//import Admin 
class Admin {
    constructor () {
        //login
        this.loginBtn = document.getElementById('login');
        this.lEmail = document.getElementById('lemail');
        this.lPassword = document.getElementById('lpassword');
        //register
        this.registerBtn = document.getElementById('register');
        this.rName = document.getElementById('rname');
        this.rEmail = document.getElementById('remail');
        this.rPassword = document.getElementById('rpassword');
        //instance
        this.alert = new Alert('index');
    }
    adLogin (callback) {
        this.loginBtn.onclick = () => {
            const email = this.lEmail.value;
            const password = this.lPassword.value;
            if (!email || !password) {
                const type = 'alert-warning';
                const message = 'email and password required';
                this.alert.setAlertType(type);
                this.alert.show(message);
                setTimeout(() => { 
                    this.alert.hide(); 
                }, 3000);
            } else {
                callback(email, password);
            }
        }
    }
    adRegister (callback) {
        this.registerBtn.onclick = () => {
            const name = this.rName.value;
            const email = this.rEmail.value;
            const password = this.rPassword.value;
            if (!name || !email || !password) {
                const type = 'alert-warning';
                const message = 'name, email and password required';
                this.alert.setAlertType(type);
                this.alert.show(message);
                setTimeout(() => { 
                    this.alert.hide(); 
                }, 3000);
            } else {
                callback(name, email, password);
            }
        }
    }
}

//import View from './view.js';
class View{
    constructor(){
        this.model = null;
        //instances
        this.admin = new Admin();
        
        //callbacks
        this.admin.adLogin((email, password) => this.login(email, password));
        this.admin.adRegister((name, email, password) => this.register(name, email, password));
    }
    //set model
    setModel(model){
        this.model = model;
    }
    // Update the users data list
    getUsers(){
        $.ajax({
            type: 'POST',
            url: 'userAction.php',
            data: 'action_type=view',
            success:function(html){
                $('#userData').html(html);
            }
        });
    }
    login(email, password){
        //console.log(email, password);
        this.model.LoginAdmin(email, password);
    }
    register(name, email, password){
        //console.log(name, email, password);
        this.model.createAdmin(name, email, password);
    }
}

//main.js
document.addEventListener('DOMContentLoaded', () =>{
    const model = new Model();
    const view = new View();
    model.setView(view);
    view.setModel(model);
});
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