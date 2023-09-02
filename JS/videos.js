const allCatagories = async () => {
  const response = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
  const data = await response.json();

  const tabButton = document.getElementById('tab-container');

    data.data.forEach(videos => {
      const video = document.createElement("div");
            video.innerHTML = `
            <a class="tab" onclick="showVideos('${videos.category_id}')">${videos.category}</a> 
            `;
            tabButton.appendChild(video)
    });
   
};

const showVideos = async (videoId) =>{
   const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${videoId}`);
   const data = await response.json();

   const eachVideo = document.getElementById('videos-container');
   
   eachVideo.innerHTML = "";
   
   if(data.data.length === 0){

     const noData = document.getElementById('noDataAvailable')
     noData.classList.remove('hidden')
  }
   else{
   data.data.forEach(contains => {
     
    const contain = document.createElement('div');
    
    contain.innerHTML = `
    <div class="card w-96 bg-base-100 shadow-xl m-10">
    <figure><img class="w-full h-60" src="${contains.thumbnail}"/></figure>
    <div class="card-body"> 
    <div class="flex gap-5">
      <div class="w-10">
      <img class="rounded-full" src="${contains.authors[0].profile_picture}" alt="">
      </div>
      <h2 class="font-bold text-2xl">${contains.title}</h2>
      </div>
      <div class="flex gap-3">
      <h2 class="text-gray-500">${contains.authors[0].profile_name}</h2>
      <p>${contains.authors[0].verified?'<img class="w-5" src="image/verified.png" alt="">':''}</p>
      </div>
      <p class="text-gray-500">${contains.others.views} views</p>
  </div>
</div>
    `
    eachVideo.appendChild(contain);
    })
    const sortAll = (videoId) => {
    const sortedData = contains.sort((a, b) => {
      const aViews = parseInt(a.others.views);
      const bViews = parseInt(b.others.views);
        return bViews - aViews
    })
  }
  
}
}
// sortAll()
allCatagories();
showVideos('1000')
