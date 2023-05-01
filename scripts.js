var dataToUse = [];
$(document).ready(function () {

    $.getJSON('/src/sample_colenda_objects.json',
        function (data) {
            var obj = data.objects;
            dataToUse = obj;
            let galleryComp = document.querySelector('gallery-comp');
            let cardComp = document.querySelector('full-width-comp');
            let featuredComp = document.querySelector('featured-comp');

            const demoContainer = document.getElementById("demo-container");

            demoContainer.appendChild(galleryComp);
            demoContainer.appendChild(cardComp);
            demoContainer.appendChild(featuredComp);
    });


});


// web component #1
class GalleryComp extends HTMLElement {
    constructor() {
        super();
    }

    // connect component
    connectedCallback() {
        var obj = dataToUse;
        var itemClass, linkClass;
        $.each(obj, function (index, element) {
            var divElement = '';
            var totalItems = $('.carousel-item');
            if (totalItems.length === 0) {
                itemClass = 'carousel-item active';
                linkClass = 'active';
            }
            else {
                itemClass = 'carousel-item';
                linkClass = '';
            }
            console.log(totalItems);
            var n = index % 3;
            var m = parseInt(index / 3);
            console.log(n, m);
            if (n == 0) {
                $('.carousel-inner').append('<div class="gallery-item-container ' + itemClass + '"></div>');
                $('.carousel-indicators').append('<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="' + m + '" class="' + linkClass + '"></button>');
            }


            divElement += '<div class="gallery-item">';

            var imageURL = element.image_url ? element.image_url : '/src/UniversityofPennsylvania_FullLogo.png';
            divElement += '<div class="image-wrapper"><img src="' + imageURL + '"></img>' + '</div>';

            divElement += '<div class="badge-wrapper"><span>' + element.item_type[0] + '</span></div>';
            divElement += '<div class="text-wrapper m-4 mb-2">';

            divElement += '<h3>' + element.title[0] + '</h3>';
            divElement += '<p class="mb-1 text-body-secondary date">' + element.date[0] + '</p>';
            divElement += '<p>' + element.description[0] + '</p>';

            divElement += '</div>';
            divElement += '<div class="action-button-wrapper mb-3"><button type="button" class="btn btn-outline-dark">Read More</button></div>';

            divElement += '</div>';

            $($('.carousel-item')[m]).append(divElement);
        });

    }

}

// web component #2
class FullWidthComp extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        var obj = dataToUse;
        $.each(obj, function (index, element) {
            var divElement = '';
            divElement += '<div class="card-item row">';

            var imageURL = element.image_url ? element.image_url : '/src/UniversityofPennsylvania_FullLogo.png';
            divElement += '<div class="image-wrapper col-md-5"><img src="' + imageURL + '"></img>' + '<div class="action-button-wrapper"><button type="button" class="btn btn-outline-light">Read More</button></div>' + '</div>';

            divElement += '<div class="text-wrapper col-md-7">';

            divElement += '<h3>' + element.title[0] + '</h3>';
            divElement += '<p class="mb-2 text-body-secondary date">' + element.date[0] + '</p>';
            divElement += '<p class="description">' + element.description[0] + '</p>';

            divElement += '<div class="badge-wrapper">';
            for (let i = 0; i < element.language.length; i++) {
                divElement += '<span>' + element.language[i] + '</span>';
            }
            divElement += '</div>';

            divElement += '</div>';

            divElement += '</div>';

            $('.card-item-container').append(divElement);
        });

    }

}

// web component #3
class FeaturedComp extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        var obj = dataToUse;
        // only use one item for now
        var element = obj[2];
        console.log('element: '+element);

        var divElement = '';
        divElement += '<div class="featured-item">';

        var imageURL = element.image_url ? element.image_url : '/src/UniversityofPennsylvania_FullLogo.png';
        divElement += '<div class="image-wrapper"><div class="image-outer"></div><img src="' + imageURL + '"></img>' + '</div>';

        divElement += '<div class="text-wrapper">';
        divElement += '<div class="text-wrapper_header">Featured Item</div>';

        divElement += '<div class="text-wrapper_content">';
        divElement += '<h2>' + element.title[0] + '</h2>';
        divElement += '<p class="mb-4 text-body-secondary date">' + element.date[0] + '</p>';
        divElement += '<button type="button" class="btn btn-outline-light mt-4">Read More</button>';

        divElement += '</div>';

        divElement += '</div>';

        divElement += '</div>';

        $('.featured-item-container').append(divElement);
            

    }

}

// register components
customElements.define('gallery-comp', GalleryComp);
customElements.define('full-width-comp', FullWidthComp);
customElements.define('featured-comp', FeaturedComp);
