const API_MAP = {
    tv_unit: "https://69dce09c84f912a26404571d.mockapi.io/Tv_Unit",
    sofa: "https://your-api.com/sofa",
    bed: "https://your-api.com/bed"
};

const DEFAULT_IMG = "https://via.placeholder.com/300x200?text=No+Image";

const container = document.getElementById("products");
const categorySelect = document.getElementById("categorySelect");

const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.querySelector(".close");

// Load Data Function
function loadData(category) {
    container.innerHTML = "<p>Loading...</p>";

    fetch(API_MAP[category])
        .then(res => res.json())
        .then(data => {
            let html = "";

            data.forEach(item => {
                let img = item.tv_img || item.image || DEFAULT_IMG;

                html += `
                    <div class="card">
                        <img src="${img}" 
                             onerror="this.src='${DEFAULT_IMG}'"
                             onclick="openModal('${img}')"/>
                        <div class="card-body">
                            <h3>${category.toUpperCase()} ${item.id}</h3>
                        </div>
                    </div>
                `;
            });

            container.innerHTML = html;
        })
        .catch(err => {
            container.innerHTML = "<p>Error loading data</p>";
            console.log(err);
        });
}

// Dropdown Change
categorySelect.addEventListener("change", (e) => {
    loadData(e.target.value);
});

// Modal
function openModal(src) {
    modal.style.display = "block";
    modalImg.src = src;
}

closeBtn.onclick = () => modal.style.display = "none";

window.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
};

// Initial Load
loadData("tv_unit");
