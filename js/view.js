

export default class View{
    constructor(){
        this.model = null;
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
        const admin = this.model.login(email,password);
        if (admin) {

        } else {

        }
    }
}