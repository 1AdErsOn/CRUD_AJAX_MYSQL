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

//import Admin 
class User {
    constructor () {
        //login
        this.addForm = document.getElementById('addUser');
        //register
        this.updateForm = document.getElementById('updateUser');
        //logout
        //this.logoutBtn = document.getElementById('logout');
        //instance
        this.alert = new Alert('index');
    }
    submitAdd (callback) {
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
    submitEdit (callback) {
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
}

//import Model from './model.js';
class Model {
    constructor(){
        this.view = null;
        this.method = 'POST';
        this.urlUser = './userAction.php';
        //this.urlUser = './userAction.php';
        //instance
        this.alert = new Alert('index');
    }
    setView (view){
        this.view = view;
    }
    async getUsers (){
        const response = await fetch(this.urlUser, {
            method: 'GET'
        }).then(response => response.json())
        .catch(error => console.error('Error: ',error));
        return response.data;
    }
    async viewUser (id){
        const response = await fetch(this.urlUser, {
            method: this.method,
            body: id,
        }).then(response => response.json())
        .catch(error => console.error('Error: ', error));
        return response.data;
    }
    async addUser (data) {
        const response = await fetch(this.urlUser, {
            method: this.method,
            body: camps
        }).then(response => response.json())
        .catch(error => console.error('Error: ',error));

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
        return 
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

//import View from './view.js';
class View{
    constructor(){
        this.model = null;
        //instances
        this.user = new User();
        
        //callbacks
        this.user.submitAdd((data) => this.addUser(data));
        this.user.submitEdit((id, values) => this.editUser(id, values));
    }
    //set model
    setModel (model){
        this.model = model;
    }
    render (){
        const users = this.model.getUsers();

        users.forEach((user) => this.createRow(user));
    }
    addUser (data){
        const user = this.model.addUser(data);
        this.createRow(user);
    }
    editUser (id, values){
        this.model.editUser(id, values);
        const row = document.getElementById(id);
        //
    }
    createRow(todo){
        const row = table.insertRow();
        row.setAttribute('id', todo.id);
        row.innerHTML = `
        <td>${todo.tittle}</td>
        <td>${todo.description}</td>
        <td class="text-center">
            <!--create input-->
        </td>
        <td class="text-right">
            <!--create buttons-->
        </td>
        `;
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.onclick = () => this.toggleCompleted(todo.id);//view
        row.children[2].appendChild(checkbox);

        const editBtn = document.createElement('button');
        editBtn.classList.add('btn', 'btn-primary', 'mb-1');
        editBtn.setAttribute('data-toggle','modal');
        editBtn.setAttribute('data-target','#modal');
        editBtn.innerHTML = `<i class="fa fa-pencil"></i>`;
        editBtn.onclick = () => this.modal.setValues({
            id: todo.id,
            tittle: row.children[0].innerText,
            description: row.children[1].innerText,
            completed: row.children[2].children[0].checked,
        });//view
        row.children[3].appendChild(editBtn);

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
        removeBtn.innerHTML = `<i class="fa fa-trash"></i>`;
        removeBtn.onclick = () => this.removeTodo(todo.id);//view
        //console.log('Borrando Fila');
        row.children[3].appendChild(removeBtn);
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