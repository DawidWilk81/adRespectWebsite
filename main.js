imgTable = [
    "https://picsum.photos/470/550",
    "https://picsum.photos/460/540",
    "https://picsum.photos/480/530",
    "https://picsum.photos/490/520",
    "https://picsum.photos/500/510",
    "https://picsum.photos/510/500",
];
window.onload = ()=>{ 
    const searchToggler = document.getElementById('searchMagnify');
    const searchInput = document.getElementById('naviSearch');
    const submitSearch = document.getElementById('submitSearch');
    //Overlay
    const gridOverlay = document.getElementById('gridOverlay');
    const overlayBtn = document.getElementById('overlayBtn');
    //Hide overlay
    const gridOverlayHide = document.getElementById('gridOverlayHide');
    const overlayHideBtn = document.getElementById('overlayHideBtn');

    // Image gallery
    var masonryImage = document.querySelectorAll('.grid-item');
    const imageGallery = document.getElementById('imageGallery');
    const galleryImg = document.getElementById('galleryImg');
    const exit = document.getElementById('exit');
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');
    var showImageId;
    // ONSCROLL 
    const cards = document.querySelectorAll(".card");
    const triggerPosition = window.innerHeight * 0.7;
    console.log('POSISIS', triggerPosition);
    function handleScroll() {
      const scrollPosition = window.scrollY;
  
      cards.forEach(card => {
        if (scrollPosition > triggerPosition) {
          card.style.transform = "translateX(0%)";
        } else{
          card.style.transform = "translateX(-300%)";
        }
      });
    }
  
    window.addEventListener("scroll", handleScroll);
    // Show photo in image gallery 
    showInGallery = () =>{
        masonryImage = document.querySelectorAll('.grid-item');
        masonryImage.forEach((item, index) => {
   
            item.addEventListener('click', () => {
                showImageId = index;
                this.imageGallery.style.opacity = '1';
                this.imageGallery.style.pointerEvents = 'auto';
                galleryImg.innerHTML = `<img src='${item.childNodes[0].src}' alt='galleryImg'>`
            });
        });        
    }
    showInGallery();
    
    // GALLERY INDICATORS
    prev.addEventListener('click', () =>{
        galleryImg.style.opacity = 0;
        if(showImageId != 0){
            showImageId -=1;
        }
        galleryImg.innerHTML = `<img src='${masonryImage[showImageId].childNodes[0].src}' alt='galleryImg'>`;
        galleryImg.style.opacity = 1;
    })
    next.addEventListener('click', () =>{
        galleryImg.style.opacity = 0;
        if(showImageId != masonryImage.length -1){
            showImageId +=1;
        }
        galleryImg.innerHTML = `<img src='${masonryImage[showImageId].childNodes[0].src}' alt='galleryImg'>`;
        galleryImg.style.opacity = 1;

    })
    exit.addEventListener('click', ()=>{
        this.imageGallery.style.opacity = '0';
        this.imageGallery.style.pointerEvents = 'none';
    })
    
    // MASONRY
    var grid = document.querySelector('.grid');
    var msnry = new Masonry( grid, {
    itemSelector: '.grid-item',
    columnWidth: '.grid-item',
    percentPosition: true,
    gutter:30,
    transitionDuration: '0.3s'
    });

    overlayBtn.addEventListener('click', () => {
        var elems = [];
        var fragment = document.createDocumentFragment();
    
        // Tworzenie i dodawanie nowych elementów do fragmentu
        imgTable.forEach((element) => {
            
            var newGridItem = document.createElement('div');
            newGridItem.className = 'grid-item new';
            newGridItem.innerHTML = `<img src="${element}" alt='MasonryGridImage' loading="eager">`;
    
            fragment.appendChild(newGridItem);
            elems.push(newGridItem);
        });
    
        // Dodawanie nowych elementów do .grid
        grid.appendChild(fragment);
        
        // Informuj masonry, o dodanych elementach i po załadowaniu aktualizuj siatke
        msnry.appended(elems);
        imagesLoaded( '.grid', function() {
            msnry.layout();
            // Ukryj overlay
            gridOverlay.style.opacity = 0;
            gridOverlayHide.style.display = 'flex';
            gridOverlayHide.style.justifyContent = 'center';
            gridOverlayHide.style.alignItems = 'flex-end';
            showInGallery();
        });
    }, true);

    //hide new images in masonry
    overlayHideBtn.addEventListener('click', () => {
        const elementsToRemove = document.querySelectorAll('.new'); 
        console.log(`jest ${elementsToRemove.length} elementów do usunięcia`);
      
        elementsToRemove.forEach(element => {
          element.parentNode.removeChild(element);
        });
        gridOverlay.style.opacity = 1;
        gridOverlayHide.style.display = 'none';
        msnry.layout();
      });

    //Functions
    //#Search Magnify
    let showSearch = false;

    let toggleSearch = () =>{
        showSearch = !showSearch;
        if(showSearch){
            searchInput.style.opacity= "1";
            searchInput.style.display= "flex";
            searchInput.style.visibility= "visible";
            showSearch = true;
        }else if(!showSearch){
            searchInput.style.visibility= "hidden";
            searchInput.style.opacity= "0";
            searchInput.style.display= "none";
            showSearch = false;
        }


    }
    searchToggler.addEventListener("click", toggleSearch, true);
}