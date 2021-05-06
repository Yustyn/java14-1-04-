let $gallery = document.querySelector('.gallery'),
    $slider = document.querySelector('.slider'),
    $list = document.querySelector('.list'),
    $imageList = document.querySelector('.image-list')

let prev,
    idx = 0

let $LTArrow = document.createElement('SPAN'),
    $RTArrow = document.createElement('SPAN'),
    $LBArrow = document.createElement('SPAN'),
    $RBArrow = document.createElement('SPAN')

$slider.appendChild($LTArrow)
$slider.appendChild($RTArrow)
$list.appendChild($LBArrow)
$list.appendChild($RBArrow)

$LTArrow.classList.add('LTArrow')
$RTArrow.classList.add('RTArrow')
$LBArrow.classList.add('LBArrow')
$RBArrow.classList.add('RBArrow')

$LTArrow.innerHTML = '&#10148'
$RTArrow.innerHTML = '&#10148'
$LBArrow.innerHTML = '&#10148'
$RBArrow.innerHTML = '&#10148'


function load() {

    let url = 'https://pixabay.com/api/?key=17057678-b4c4954d8c62e2cb084b2680c&q=yellow+flower&image_type=photo'

    let GET_Server = new XMLHttpRequest()

    GET_Server.open("GET", url)
    GET_Server.send()
    GET_Server.onload = function () {
        if (GET_Server.status !== 200) {
            console.log("Error loading data!")
        } else {
            let data = JSON.parse(GET_Server.response).hits
            createList(data)
        }
    }
}

function createList(images) {
    for (image of images) {
        const $LI = document.createElement('LI')
        $LI.style.backgroundImage = `url(${image.webformatURL})`
        $imageList.appendChild($LI)
    }
    let $images = document.querySelectorAll('.image-list li'),
        img_width = $images[0].getBoundingClientRect().width,
        imageListPosition = 0,
        imageListWidth = img_width * $images.length
    if ($images.length >= 5) {
        $list.style.width = img_width * 5 + 'px'
    } else {
        $list.style.width = img_width * $images.length + 'px'
        $slider.style.borderBottomLeftRadius = 20 + "px";
        $slider.style.borderBottomRightRadius = 20 + "px";
    }
    $imageList.style.width = $list.style.width

    activeImage(0, $images)

    for (let i = 0; i < $images.length; i++) {
        $images[i].addEventListener('click', () => {
            activeImage(i, $images)
            idx = i
        })
    }

    $RBArrow.addEventListener('click', () => {
        imageListPosition = imageListPosition - img_width
        if (imageListPosition < (-(imageListWidth - img_width * 5))) {
            imageListPosition = 0
        }
        $imageList.style.left = imageListPosition + 'px'
    })

    $LBArrow.addEventListener('click', () => {
        imageListPosition = imageListPosition + img_width
        if (imageListPosition > 0) {
            imageListPosition = -(imageListWidth - img_width * 5)
        }
        $imageList.style.left = imageListPosition + 'px'
    })

    $RTArrow.addEventListener('click', () => {
        imageListPosition = 0
        if (idx > 1 && idx < ($images.length - 3)) {
            imageListPosition = imageListPosition - img_width * (idx - 1)
            $imageList.style.left = imageListPosition + 'px'
        }
        if (idx < 2 || idx > ($images.length - 2)) {
            $imageList.style.left = 0 + 'px'
        }
        idx++
        if (idx >= $images.length) {
            idx = 0
        }
        activeImage(idx, $images)


    })

    $LTArrow.addEventListener('click', () => {

        idx--
        if (idx == $images.length) {
            imageListPosition = imageListPosition - img_width * ($images.length - 5)
            $imageList.style.left = imageListPosition + 'px'
        } else if (idx <= $images.length - 1) {
            imageListPosition = imageListPosition - img_width * ($images.length - 5)
            $imageList.style.left = imageListPosition + 'px'
        }
        imageListPosition = 0
        if (idx >= 2 && idx < $images.length - 2) {
            imageListPosition = imageListPosition - img_width * (idx - 2)
            $imageList.style.left = imageListPosition + 'px'

        }
        if (idx == 1) {
            imageListPosition = imageListPosition - img_width * (idx - 1)
            $imageList.style.left = imageListPosition + 'px'
        }
        if (idx == 0) {
            imageListPosition = imageListPosition - img_width * idx
            $imageList.style.left = imageListPosition + 'px'
        }
        if (idx < 0) {
            idx = $images.length - 1
        }
        console.log("idx=", idx, "imageListPosition=", imageListPosition)

        activeImage(idx, $images)
    })
}

function activeImage(index, list) {
    $slider.style.backgroundImage = list[index].style.backgroundImage
    list[index].classList.add('active')

    if (prev >= 0 && prev != index) {
        list[prev].classList.remove('active')
    }
    prev = index
}


load()