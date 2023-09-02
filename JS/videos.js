const allCatagories = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/categories`
  );
  const data = await response.json();

  const tabButton = document.getElementById("tab-container");

  data.data.forEach((videos) => {
    const video = document.createElement("div");
    video.innerHTML = `
            <a class="btn bg-gray-300 normal-case" onclick="showVideos('${videos.category_id}')">${videos.category}</a> 
            `;
    tabButton.appendChild(video);
  });
};

const showVideos = async (videoId) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${videoId}`
  );
  const data = await response.json();

  const eachVideo = document.getElementById("videos-container");
  const noVideo = document.getElementById("noData");

  eachVideo.innerHTML = "";

  if (data.data.length === 0) {
    const noData = document.createElement("div");
    eachVideo.innerHTML = `
    <div class="" id="noDataAvailable">
                  <div class='flex justify-center items-center'>
                    <div class="mt-10">
                    <div class="flex justify-center">
                    <img src="image/Icon.png">
                   </div>
                   <p class="text-4xl text-semibold text-center mt-10">Oops!! Sorry, There is no content here</p>
                   </div>
                   </div>
                </div>
    `;
    eachVideo.appendChild(noData);
  } else {
    data.data.forEach((contains) => {
      let hours = parseInt(contains.others.posted_date / 3600);
      let mins = parseInt(contains.others.posted_date / 60 - hours * 60);

      const contain = document.createElement("div");

      contain.innerHTML = `
    <div class="card w-96 bg-base-100 shadow-xl m-10">
    <figure><img class="w-full h-60" src="${contains.thumbnail}"/></figure>
    <div class="card-body"> 
    <div class="flex gap-5">
      <div class="w-10">
      <img class="rounded-full w-10 h-10" src="${
        contains.authors[0].profile_picture
      }" alt="">
      </div>
      <h2 class="font-bold text-2xl">${contains.title}</h2>
      </div>
      <div class="flex gap-3">
      <h2 class="text-gray-500">${contains.authors[0].profile_name}</h2>
      <p>${
        contains.authors[0].verified
          ? '<img class="w-5" src="image/verified.png" alt="">'
          : ""
      }</p>
      </div>
      <p class="text-gray-500">${contains.others.views} views</p>
      <p class="absolute top-48 right-10 text-white text-sm bg-gray-900 p-2 rounded-md ">${
        contains.others.posted_date ? hours : ""
      } hrs ${contains.others.posted_date ? mins : ""} min ago</p>
  </div>
</div>
    `;
      eachVideo.appendChild(contain);
    });
  }
};

allCatagories();
showVideos("1000");
