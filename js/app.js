
//toggle spinner

const toggleSpinner = displayStyle =>{
  document.getElementById('spinner').style.display = displayStyle;
}

const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value='';
    if ( searchText === '' || searchText == parseInt(searchText) || searchText == 'vivo' || searchText == 'realmi') {
      document.getElementById('invailed-Text').innerText = `Not acceptable empty or number. 
      Please input your phone name and try again`;
      
    } else {

    document.getElementById('invailed-Text').textContent='';
    toggleSpinner('block');
    //console.log(searchText);
    const url =`https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch (url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.data))
}
      
    }

const displaySearchResult = data => {
  const searchResult = document.getElementById('search-result');
  searchResult.textContent='';
  for (let phone = 0; phone < data.length; phone++) {
      const element = data[phone];
      //console.log(element);
      const div = document.createElement('div');
      div.classList.add('col');
      div.innerHTML=`
       <div class="card m-4 border border-success border-4 rounded-3 p-3">
        <img src="${element.image}" class="card-img-top" alt="...">
         <div class="card-body">
           <h5 class="card-title">Brand:'${element.brand}'</h5>
           <h5>Model Name:'${element.phone_name}'</h5>
           <p>Phone Id:'${element.slug}'</p>
           <button onclick="phoneDetails('${element.slug}')" class="btn btn-success">Details</button>
         </div>
       </div>
       `;
    searchResult.appendChild(div);
    toggleSpinner('none');
  }
}
//Phone Details
const phoneDetails = slug =>{
    //console.log(slug)
   const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
    fetch(url)
   .then(res => res.json())
   .then(data => displayPhoneDeatails(data.data))
}
const displayPhoneDeatails = data => {
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent='';
    const div = document.createElement('div')
    div.classList.add('card');
    div.innerHTML=`
    <div class="card border border-info border-4 rounded-3 p-3">
    <img src="${data.image}" class="card-img-top" alt="...">
    <h2 class="text-center"><span style="color:aqua;">Full Specifications</span></h2>
    <ul class="list-group list-group-flush card border border- border-4 rounded-3 p-3">
    <li class="list-group-item">Phone Id:${data.slug}</li>
    <li class="list-group-item"> storage:'${data.mainFeatures.storage}'</li>
    <li class="list-group-item">DisplaySize:'${data.mainFeatures.displaySize}'</li>
    <li class="list-group-item">Memory:'${data.mainFeatures.memory}'</li>
    <li class="list-group-item">Brand:'${data.brand}'</li>
    <li class="list-group-item">ReleaseDate:'${data.releaseDate}'</li>
    <li class="list-group-item">Others:'${data.others.Bluetooth}'</li>
    <li class="list-group-item">WLAN:'${data.others.WLAN}'</li>
    <li class="list-group-item">USB:'${data.others.USB}'</li>
    <li class="list-group-item">GPS:'${data.others.GPS}'</li>
    <li class = "list-group-item">Radio:'${data.others.Radio}'</li>
    </ul>
  </div>
    `;
    phoneDetails.appendChild(div);
    //console.log(data);
}

