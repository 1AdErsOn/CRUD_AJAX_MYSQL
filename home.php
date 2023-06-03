<?php
//session 
$isLoged = true;
session_start();
if (!isset($_SESSION['user'])) {
  header("Location: ./index.php");
  $isLoged = false;
}

// Include and initialize DB class
require_once 'DB.class.php';
$db = new dataBase("users");

// Fetch the users data
$users = $db->getData();
//header
include("./include/header.php");
?>
 <div class="container">
    <div class="row">
        <div class="col-md-12 head">
            <h1>Users</h1>
            <!-- Add link -->
            <div class="mb-1 d-flex justify-content-end">
                <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@new_user">New User</button>
            </div>
        </div>
        <div class="alert d-none" role="alert" id="index">
          A simple danger alert—check it out!
        </div>
        <!-- List the users -->
        <table class="table table-success table-striped-columns">
            <thead class="thead-dark">
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody id="userData">
                <?php if(!empty($users)): foreach($users as $row): ?>
                <tr>
                    <td><?= '#'.$row['id'] ?></td>
                    <td><?= $row['name'] ?></td>
                    <td><?= $row['email'] ?></td>
                    <td><?= $row['phone'] ?></td>
                    <td>
                        <a href="javascript:void(0);" class="btn btn-warning" rowID="<?= $row['id'] ?>" data-type="edit" data-toggle="modal" data-target="#modalUserAddEdit">edit</a>
                        <a href="javascript:void(0);" class="btn btn-danger" onclick="return confirm('Are you sure to delete data?')?userAction('delete', '<?= $row['id'] ?>'):false;">delete</a>
                    </td>
                </tr>
                <?php endforeach; else: ?>
                <tr><td colspan="5">No user(s) found...</td></tr>
                <?php endif ?>
            </tbody>
        </table>
    </div>
</div>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">New message</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="statusMsg"></div>
        <!--<form>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Recipient:</label>
            <input type="text" class="form-control" id="recipient-name">
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Message:</label>
            <textarea class="form-control" id="message-text"></textarea>
          </div>
        </form>-->
        <form class="mt-3" method="POST" action="./register.php">

            <div class="mb-3 row">
              <label for="name" class="col-md-4 col-form-label text-md-end">Name</label>
              <div class="col-md-6">
                <input id="name" type="text" class="form-control" name="name" autocomplete="name" autofocus>
              </div>
            </div>

            <div class="mb-3 row">
              <label for="email" class="col-md-4 col-form-label text-md-end">Email</label>
              <div class="col-md-6">
                <input id="email" type="email" class="form-control" name="email" autocomplete="email" autofocus>
              </div>
            </div>

            <div class="mb-3 row">
              <label for="number" class="col-md-4 col-form-label text-md-end">Phone</label>
              <div class="col-md-6">
                <input id="number" type="number" class="form-control" name="phone" autocomplete="phone" autofocus>
              </div>
            </div>

            <input type="hidden" class="form-control" name="id" id="id"/>
          </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <!--<button type="button" class="btn btn-success" id="userSubmit">SUBMIT</button>-->
        <a href="javascript:void(0);" class="btn btn-success" onclick="userAction('add');">SUBMIT</a>
      </div>
    </div>
  </div>
</div>

<?php
//footer
include("./include/footer.php");