<?php include("./include/header.php"); ?>

<div class="container pt-5">
  <div class="row justify-content-center">
    <div class="col-md-8">
      <div class="card">
        <div class="card-body">
          <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
              <button class="nav-link" id="nav-login-tab" data-bs-toggle="tab" data-bs-target="#nav-login" type="button" role="tab" aria-controls="nav-home" aria-selected="true">LOGIN</button>
              <button class="nav-link" id="nav-register-tab" data-bs-toggle="tab" data-bs-target="#nav-register" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">REGISTER</button>
            </div>
          </nav>
          <div class="tab-content mt-3" id="nav-tabContent">
            <div class="tab-pane fade show active" id="nav-login" role="tabpanel" aria-labelledby="nav-login-tab" tabindex="0">
              <form method="POST" action="./login.php">
                <div class="mb-3 row">
                  <label for="email" class="col-md-4 col-form-label text-md-end">Email</label>
                  <div class="col-md-6">
                    <input id="email" type="email" class="form-control" name="email" autocomplete="email" autofocus>
                  </div>
                </div>

                <div class="mb-3 row">
                  <label for="password" class="col-md-4 col-form-label text-md-end">Password</label>
                  <div class="col-md-6">
                    <input id="password" type="password" class="form-control" name="password" autocomplete="password" autofocus>
                  </div>
                </div>

                <div class="mb-3 row">
                  <div class="col-md-6 offset-md-4">
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </div>
                </div>
              </form>
            </div>
            <div class="tab-pane fade" id="nav-register" role="tabpanel" aria-labelledby="nav-register-tab" tabindex="0">
              <form method="POST" action="./register.php">
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
                  <label for="password" class="col-md-4 col-form-label text-md-end">Password</label>
                  <div class="col-md-6">
                    <input id="password" type="password" class="form-control" name="password" autocomplete="password" autofocus>
                  </div>
                </div>

                <div class="mb-3 row">
                  <div class="col-md-6 offset-md-4">
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<?php include("./include/footer.php"); ?>