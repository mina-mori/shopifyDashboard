const form = document.querySelector('#productForm');
let tagsArr = [];
form.addEventListener('submit', async (event) => {
    if (event.key !== 'Enter') {
        event.preventDefault();


        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        //const tags = document.getElementById('tags').value;
        const images = document.getElementById('images').files;
        const price = document.getElementById('price').value;
        const sku = document.getElementById('sku').value;
        const tagsInput = document.getElementById('tagsInput');
        let tagsList = document.getElementById('tagsList');


        const product = await addProductToShopify(title, description, tagsArr, images, price, sku).then(() => {

            alert('the product has been added');
            window.location.reload();

        }, (error) => {
            console.error(error);
            alert('Error adding product. Please try again later.');
        });
    }
});

tagsInput.addEventListener('keydown', function(event) {
    if (event.key == 'Enter') {
        event.preventDefault();
        const tag = this.value.trim();
        if (tag !== '') {
            tagsArr.push(tag);
            const tagElement = document.createElement('span');
            tagElement.textContent = tag;
            tagsList.appendChild(tagElement);
            this.value = '';
        }
    }
});
async function addProductToShopify(title, description, tagsArr, images, price, sku) {

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:4000/api/products');
    xhr.onload = function() {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            console.log(data);
        } else {
            console.error(xhr.statusText);
        }
    };
    xhr.onerror = function() {
        console.error('Network Error');
    };
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    // formData.append('tags', tagsArr);
    formData.append('vendor', 'Vindor 1');
    formData.append('sku', sku);
    formData.append('price', price);
    for (var i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
    }
    for (var i = 0; i < tagsArr.length; i++) {
        formData.append('tags', tagsArr[i]);
    }

    xhr.send(formData);
}