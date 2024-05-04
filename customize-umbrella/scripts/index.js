// Maximum file size allowed in megabytes
const MAX_FILE_SIZE_MB = 5;

// Object containing color themes and their properties
let switchColorObj = {
    blue: {
        imgSrc: "../customize-umbrella/assets/blue-umbrella.png",
        mainBgColor: "#e5f5fe",
        btnBgColor: "#34b5e5",
        imageSrc: "",
        uplodIcon: "../customize-umbrella/assets/upload_icon.svg",
    },
    pink: {
        imgSrc: "../customize-umbrella/assets/pink-umbrella.png",
        mainBgColor: "#F9EBF9",
        btnBgColor: "#d9378d",
        imageSrc: "",
        uplodIcon: "../customize-umbrella/assets/upload_icon.svg"
    },
    yellow: {
        imgSrc: "../customize-umbrella/assets/yellow-umbrella.png",
        mainBgColor: "#fffaed",
        btnBgColor: "#fccf41",
        imageSrc: "",
        uplodIcon: "../customize-umbrella/assets/upload_icon.svg"
    },
};

// Hide brand logo by default
let img = document.querySelector(".brand-logo");
img.style.display = "none";

// Select color elements and container
let blue = document.querySelector(".blue");
let pink = document.querySelector(".pink");
let yellow = document.querySelector(".yellow");
let main_box = document.querySelector("#container");

// Set default background color for the container
main_box.style.backgroundColor = "#e6f6fc";

// Set background color for the file input label
let label = document.querySelector(".file-input");
label.style.backgroundColor = "#34b5e5"

// Select upload button element
let upload_btn = document.querySelector(".upload_btn");

// Select color selector element and add event listener
let button_div = document.querySelector(".color-selector");
button_div.addEventListener("click", colorSwitch);

// Add 'selected' class to the default color element (blue)
blue.classList.add('selected');

// Function to handle color selection
function colorSwitch(e) {
    if (e.target.classList.contains("pink") || e.target.classList.contains("blue") || e.target.classList.contains("yellow")) {
        // Remove 'selected' class from all color elements
        button_div.querySelectorAll('.selected').forEach(button => button.classList.remove('selected'));
        // Add 'selected' class to the clicked color element
        e.target.classList.add('selected');
        // Get the color name from the clicked element's class
        let color = e.target.className.split(' ')[0];
        themeChanger(switchColorObj[color]);
    }
}

// Select umbrella image element and set default image source
let display_image = document.querySelector(".umbrella-img");
display_image.src = "../customize-umbrella/assets/blue-umbrella.png";

// Select upload icon element and set default icon source
let upload_svg = document.querySelector("#change_color");
upload_svg.src = "../customize-umbrella/assets/upload_icon.svg";

let button = document.querySelector(".upload-logo");

let logoImage = undefined;
let logoIsUploading = false;

// Function to convert file to base64 format
const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = () => {
            reject(fileReader.error);
        };
    });
};

// Event listener for file input change
button.addEventListener("change", (e) => {
    let file = e.target.files[0];

    // Check if file size exceeds the maximum allowed size
    if (file && file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        alert(`File size exceeds the maximum allowed size of ${MAX_FILE_SIZE_MB}MB.`);
        return;
    }

    // Set logo upload status to true and display loader
    logoIsUploading = true;
    display_image.style.display = "none";
    img.style.display = "block";
    img.setAttribute("src", "../customize-umbrella/assets/loader_icon.svg");
    img.setAttribute('class', 'loader-img');
    upload_svg.setAttribute("src", "../customize-umbrella/assets/loader_icon.svg");
    upload_svg.setAttribute('class', 'upload_icon');

    setTimeout(async () => {
        try {
            let base64File = await convertBase64(file);
            logoImage = base64File.toString();
            logoIsUploading = false;
            if (!logoIsUploading && logoImage) {
                display_image.style.display = "block";
                img.setAttribute("src", logoImage);
                upload_btn.textContent = `${file.name}`
                upload_btn.style.fontSize = "30px";
                img.setAttribute('class', '');
                upload_svg.src = "../customize-umbrella/assets/upload_icon.svg";
                upload_svg.setAttribute('class', '');
            }
        } catch (err) {
            alert(err.message);
        }
    }, 3000);
});

// Function to apply selected theme
function themeChanger(payload) {
    const { imgSrc, mainBgColor, btnBgColor, imageSrc, uplodIcon } = payload;
    logoIsUploading = true;
    main_box.style.backgroundColor = mainBgColor;
    label.style.backgroundColor = btnBgColor;
    // Hide display image and show loader image
    display_image.style.display = "none";
    img.style.display = "block";
    img.setAttribute("src", "../customize-umbrella/assets/loader_icon.svg");
    img.setAttribute('class', 'loader-img');
    upload_svg.setAttribute("src", "../customize-umbrella/assets/loader_icon.svg");
    upload_svg.setAttribute('class', 'upload_icon');
    setTimeout(() => {
        display_image.src = imgSrc;
        img.src = imageSrc;
        upload_svg.src = uplodIcon;
        upload_svg.setAttribute('class', '');
        img.style.display = "none";
        logoIsUploading = false;
        display_image.style.display = "block";
        if (!logoIsUploading && logoImage) {
            img.style.display = "block";
            img.setAttribute("src", logoImage);
            img.setAttribute('class', '');
        }
    }, 2000);
}