<?php include("./include/header.php"); ?>

<div class="container pt-5">
  <div class="row justify-content-center">
    <div class="col-md-8">
      <div class="card">
        <div class="card-body">
          <div class="alert d-none" role="alert" id="index">
            A simple danger alert—check it out!
          </div>
          <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
              <button class="nav-link active" id="nav-login-tab" data-bs-toggle="tab" data-bs-target="#nav-login" type="button" role="tab" aria-controls="nav-home" aria-selected="true">LOGIN</button>
              <button class="nav-link" id="nav-register-tab" data-bs-toggle="tab" data-bs-target="#nav-register" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">REGISTER</button>
            </div>
          </nav>
          <div class="tab-content mt-3" id="nav-tabContent">
            <div class="tab-pane fade show active" id="nav-login" role="tabpanel" aria-labelledby="nav-login-tab" tabindex="0">
              <div class="mb-3 row">
                <label for="lemail" class="col-md-4 col-form-label text-md-end">Email</label>
                <div class="col-md-6">
                  <input id="lemail" type="email" class="form-control" name="email" autocomplete="email" autofocus>
                </div>
              </div>

              <div class="mb-3 row">
                <label for="lpassword" class="col-md-4 col-form-label text-md-end">Password</label>
                <div class="col-md-6">
                  <input id="lpassword" type="password" class="form-control" name="password" autocomplete="password" autofocus>
                </div>
              </div>

              <div class="mb-3 row">
                <div class="col-md-6 offset-md-4">
                  <button id="login" class="btn btn-primary">Login</button>
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="nav-register" role="tabpanel" aria-labelledby="nav-register-tab" tabindex="0">
              <div class="mb-3 row">
                <label for="rname" class="col-md-4 col-form-label text-md-end">Name</label>
                <div class="col-md-6">
                  <input id="rname" type="text" class="form-control" name="name" autocomplete="name" autofocus>
                </div>
              </div>

              <div class="mb-3 row">
                <label for="remail" class="col-md-4 col-form-label text-md-end">Email</label>
                <div class="col-md-6">
                  <input id="remail" type="email" class="form-control" name="email" autocomplete="email" autofocus>
                </div>
              </div>

              <div class="mb-3 row">
                <label for="rpassword" class="col-md-4 col-form-label text-md-end">Password</label>
                <div class="col-md-6">
                  <input id="rpassword" type="password" class="form-control" name="password" autocomplete="password" autofocus>
                </div>
              </div>

              <div class="mb-3 row">
                <div class="col-md-6 offset-md-4">
                  <button id="register" class="btn btn-primary">Register</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<?php include("./include/footer.php"); ?>