$(function () {
  const layer = layui.layer;
  const $image = $("#image");
  const options = {
    aspectRatio: 1,
    preview: ".img-preview",
  };

  //create cropper area
  $image.cropper(options);

  $("#btnChooseImage").on("click", function () {
    $("#file").click();
  });

  $("#btnChangeImage").on("click", function () {
    $("#file").click();
  });

  $("#file").on("change", function (e) {
    const filelist = e.target.files;
    if (filelist.length === 0) {
      fileUploaded(false);
      return layer.msg("Please select an image!");
    }
    fileUploaded(true);
    const file = e.target.files[0];
    const imgURL = URL.createObjectURL(file);
    $(image).cropper("destroy").attr("src", imgURL).cropper(options);
  });

  function fileUploaded(res) {
    const changeAvatarContainer = document.getElementById(
      "changeAvatarContainer"
    );
    const profileImage = document.querySelector(".profileImg");
    const previewbox = document.querySelector(".previewbox");
    const btnRow = document.querySelector(".row2");
    const html = `
      <span class="previewlabel">Preview</span>
      <div>
        <div class="img-preview w200">
        </div> 
        <p class="size">200 x 200</p>
      </div> 
      <div>
        <div class="img-preview w100"></div> 
        <p class="size">100 x 100</p>
      </div>`;
    if (res) {
      profileImage.classList.add("hidden");
      changeAvatarContainer.classList.remove("hidden");
      previewbox.innerHTML = "";
      previewbox.insertAdjacentHTML("beforeend", html);
      btnRow.classList.remove("hidden");
    }
  }

  // $("#btnChooseImage").click(function () {

  // });

  $("#btnUpload").on("click", function () {
    const dataURL = $image
      .cropper("getCroppedCanvas", {
        width: 100,
        height: 100,
      })
      .toDataURL("image/png");

    $.ajax({
      type: "post",
      url: "/apiAuth/updateAvatarImg",
      data: { avatar_pic: dataURL },
      headers: { Authorization: localStorage.getItem("token") || "" },
      success: (res) => {
        if (res.code !== 200) return alert("Update Fail");
        layer.msg("Profile image change succesfully!");
        setTimeout(function () {
          hideChangeAvatarITF();
          getCurentUserInfo();
        }, 800);
      },
    });
  });
});
