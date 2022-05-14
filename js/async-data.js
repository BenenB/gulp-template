
const $carousel = "example-carousel";
var global_data;

$(()=>{
  data = fetchData();
  console.log(`no data outside the callback:\n${data}`);
})

async function fetchData(){
  await $.getJSON("data/posts.json",(data)=>{
    console.log(`inside the callback we do have data:\n${JSON.stringify(data)}`)
    global_data = data;
    handleData(data);
    return data;
  })
}

function handleData(data){

  var posts_to_insert = [];

  for (var post of data.posts){
    console.log(`creating: ${JSON.stringify(post)}`);
    var post_html = createCarouselItem(post);
    console.log(`result: ${post_html}`);
    posts_to_insert.push(post_html);
  }

  addItemsToCarousel($carousel,posts_to_insert);
  //startCarousel($carousel);
}

function createCarouselItem(data){
  var frame = $('<div></div>').addClass("example-item").css({"background-image":"url('" + data.image_url+"')"});
  var title = $('<h2></h2>').text(data.title);
  var description = $('<p></p>').text(trimText(data.description,80));
  var link = $('<a></a>').attr("href",data.post_url).text("Read More");

  frame.append(title,description,link);
  console.log(frame);
  return frame;
}

function addItemsToCarousel(target,items){
  if (Array.isArray(items)){
    console.log(`inserting ${items.length} items`);
    for(let i of items){
      $("#"+target).append(i);
    }
  }
  else{
    //case where item is a single object
    $("#"+target).append(items);
  }
}

function trimText(text,len){
  if (len < 5){
    console.log("Can't trim text to less than 5 characters")
    return;
  }
  if(text.length > len){
    return text.slice(0, len - 3) + "...";
  }
  else{
    return text;
  }
}

function startCarousel(name){
  $('#'+name).owlCarousel({
    loop: true,
    nav: false,
    smartSpeed: 900,
    dots: false,
    items: 1,
    margin: 24,
    autoplay: true,
    autoplayTimeout: 4000,
  })
}


