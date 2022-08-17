const request = (options) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: options.url,
      type: options.type ? options.type : "get",
      headers: options.headers ? options.headers : "",
      contentType: "application/json",
      data: options.data,
      success: (res) => {
        console.log("res:", res);
        if (res.code === 200 || res.code === 201) {
          resolve(res);
        } else if (res.code === 501) {
          location.href = "/";
        } else {
          layer.msg(res.msg);
        }
      },
    });
  });
};
